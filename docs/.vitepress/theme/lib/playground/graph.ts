import * as git from 'isomorphic-git'
import type { MemoryFS } from './fs'

export interface GraphCommit {
  oid: string
  short: string
  message: string
  parents: string[]
  branches: string[]
  lane: number
  mergeConnections: { from: number; to: number }[]
  laneCount: number
}

export async function commitGraph(fs: MemoryFS, dir: string): Promise<GraphCommit[]> {
  let branchNames: string[]
  try {
    branchNames = await git.listBranches({ fs: fs as never, dir })
  } catch {
    branchNames = []
  }

  let remoteRemotes: string[] = []
  try {
    const remotes = await git.listRemotes({ fs: fs as never, dir })
    remoteRemotes = remotes.map((r) => r.remote)
  } catch {
    remoteRemotes = []
  }
  const trackingBranches = new Map<string, string[]>()
  for (const remote of remoteRemotes) {
    let names: string[]
    try {
      names = await git.listBranches({ fs: fs as never, dir, remote })
    } catch {
      continue
    }
    for (const name of names) {
      try {
        const oid = await git.resolveRef({ fs: fs as never, dir, ref: `refs/remotes/${remote}/${name}` })
        trackingBranches.set(oid, [...(trackingBranches.get(oid) ?? []), `${remote}/${name}`])
      } catch {
        continue
      }
    }
  }

  const commits = new Map<string, Awaited<ReturnType<typeof git.readCommit>>['commit'] & { oid: string; message: string }>()
  const tipBranches = new Map<string, string[]>()
  let detached: string | null = null

  let current = ''
  try {
    current = (await git.currentBranch({ fs: fs as never, dir })) ?? ''
  } catch {
    current = ''
  }
  const ordered = current ? [current, ...branchNames.filter((b) => b !== current)] : branchNames

  for (const name of ordered) {
    let oid: string
    try {
      oid = await git.resolveRef({ fs: fs as never, dir, ref: `refs/heads/${name}` })
    } catch {
      continue
    }
    let history: Awaited<ReturnType<typeof git.log>>
    try {
      history = await git.log({ fs: fs as never, dir, ref: `refs/heads/${name}`, depth: 50 })
    } catch {
      continue
    }
    const tip = history[0]
    if (!tip) continue
    tipBranches.set(oid, [...(tipBranches.get(oid) ?? []), name])
    for (const entry of history) {
      if (!commits.has(entry.oid)) {
        commits.set(entry.oid, {
          oid: entry.oid,
          message: entry.commit.message.split('\n')[0],
          parent: entry.commit.parent,
          tree: entry.commit.tree,
          author: entry.commit.author,
          committer: entry.commit.committer
        })
      }
    }
  }

  for (const [oid, labels] of trackingBranches) {
    tipBranches.set(oid, [...(tipBranches.get(oid) ?? []), ...labels])
    if (!commits.has(oid)) {
      try {
        const history = await git.log({ fs: fs as never, dir, ref: oid, depth: 50 })
        for (const entry of history) {
          if (!commits.has(entry.oid)) {
            commits.set(entry.oid, {
              oid: entry.oid,
              message: entry.commit.message.split('\n')[0],
              parent: entry.commit.parent,
              tree: entry.commit.tree,
              author: entry.commit.author,
              committer: entry.commit.committer
            })
          }
        }
      } catch {
        continue
      }
    }
  }

  let headOid: string | null = null
  try {
    headOid = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
  } catch {
    headOid = null
  }
  if (headOid && !tipBranches.has(headOid)) {
    try {
      const entry = await git.log({ fs: fs as never, dir, depth: 50 })
      if (entry.length) {
        detached = entry[0].oid
        if (!commits.has(detached)) {
          commits.set(detached, {
            oid: detached,
            message: entry[0].commit.message.split('\n')[0],
            parent: entry[0].commit.parent,
            tree: entry[0].commit.tree,
            author: entry[0].commit.author,
            committer: entry[0].commit.committer
          })
        }
      }
    } catch {
      void detached
    }
  }

  const tipOids = [...tipBranches.keys()].sort((a, b) => {
    const aIsCurrent = tipBranches.get(a)!.includes(current)
    const bIsCurrent = tipBranches.get(b)!.includes(current)
    if (aIsCurrent !== bIsCurrent) return aIsCurrent ? -1 : 1
    return a < b ? -1 : 1
  })

  const preOrder: string[] = []
  const visited = new Set<string>()
  const dfs = (oid: string): void => {
    if (visited.has(oid)) return
    visited.add(oid)
    preOrder.push(oid)
    const commit = commits.get(oid)
    if (commit) {
      for (const parent of commit.parent) dfs(parent)
    }
  }
  for (const tip of tipOids) dfs(tip)

  const preIndex = new Map<string, number>()
  preOrder.forEach((oid, index) => preIndex.set(oid, index))
  const sorted = preOrder
    .map((oid) => commits.get(oid)!)
    .sort((a, b) => {
      if (b.committer.timestamp !== a.committer.timestamp) return b.committer.timestamp - a.committer.timestamp
      return (preIndex.get(a.oid) ?? 0) - (preIndex.get(b.oid) ?? 0)
    })

  const lanes: (string | null)[] = []
  const rows: GraphCommit[] = []

  for (const tip of tipOids) lanes.push(tip)

  for (const commit of sorted) {
    let col = lanes.indexOf(commit.oid)
    if (col === -1) {
      col = lanes.length
      lanes.push(commit.oid)
    }

    const connections: { from: number; to: number }[] = []
    for (const p of commit.parent) {
      const pos = lanes.indexOf(p)
      if (pos !== -1 && pos !== col) {
        connections.push({ from: col, to: pos })
      }
    }

    lanes[col] = commit.parent.length ? commit.parent[0] : null
    for (const p of commit.parent.slice(1)) {
      let slot = lanes.indexOf(p)
      if (slot === -1) {
        slot = lanes.indexOf(null)
        if (slot === -1) {
          slot = lanes.length
          lanes.push(null)
        }
        lanes[slot] = p
      }
    }

    const headBranches: string[] = []
    if (detached === commit.oid) headBranches.push('HEAD')
    rows.push({
      oid: commit.oid,
      short: commit.oid.slice(0, 7),
      message: commit.message,
      parents: commit.parent,
      branches: [...(tipBranches.get(commit.oid) ?? []), ...headBranches],
      lane: col,
      mergeConnections: connections,
      laneCount: lanes.length
    })
  }

  return rows
}
