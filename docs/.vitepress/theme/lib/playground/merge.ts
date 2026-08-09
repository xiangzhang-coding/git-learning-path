import * as git from 'isomorphic-git'
import type { MemoryFS } from './fs'
import { lcsTable } from './lcs'
import { AUTHOR, appendReflog, listWorkdirFiles, MatrixRow, trackedDirtyRows, untrackedRows } from './scenarios'

export interface ThreeWayResult {
  text: string[]
  conflicts: boolean
}

interface Region {
  baseStart: number
  baseEnd: number
  targetStart: number
  targetEnd: number
}

function diffRegions(base: string[], target: string[]): Region[] {
  const n = base.length
  const m = target.length
  const dp = lcsTable(base, target)
  if (!dp) {
    return [{ baseStart: 0, baseEnd: n, targetStart: 0, targetEnd: m }]
  }
  const regions: Region[] = []
  let i = 0
  let j = 0
  let delStart = -1
  let insStart = -1
  const flush = (basePos: number, targetPos: number): void => {
    if (delStart >= 0 || insStart >= 0) {
      regions.push({
        baseStart: delStart === -1 ? basePos : delStart,
        baseEnd: basePos,
        targetStart: insStart === -1 ? targetPos : insStart,
        targetEnd: targetPos
      })
    }
    delStart = -1
    insStart = -1
  }
  while (i < n && j < m) {
    if (base[i] === target[j]) {
      flush(i, j)
      i++
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      if (delStart < 0) delStart = i
      if (insStart < 0) insStart = j
      i++
    } else {
      if (insStart < 0) insStart = j
      j++
    }
  }
  while (i < n) {
    if (delStart < 0) delStart = i
    i++
  }
  while (j < m) {
    if (insStart < 0) insStart = j
    j++
  }
  flush(n, m)
  return regions
}

export function splitLines(text: string | null): string[] {
  if (text === null) return []
  const lines = text.split('\n')
  if (lines.length > 1 && lines[lines.length - 1] === '') lines.pop()
  return lines
}

function regionLines(target: string[], region: Region): string[] {
  return target.slice(region.targetStart, region.targetEnd)
}

export function threeWayMerge(
  baseText: string | null,
  oursText: string | null,
  theirsText: string | null,
  branchName: string
): ThreeWayResult {
  const base = splitLines(baseText)
  const ours = splitLines(oursText)
  const theirs = splitLines(theirsText)

  const oursRegions = diffRegions(base, ours)
  const theirsRegions = diffRegions(base, theirs)

  const boundaries = new Set<number>()
  for (const r of [...oursRegions, ...theirsRegions]) {
    boundaries.add(r.baseStart)
    boundaries.add(r.baseEnd)
  }
  boundaries.add(base.length)
  const points = [...boundaries].sort((a, b) => a - b)

  const segments: [number, number][] = []
  for (let k = 0; k < points.length - 1; k++) {
    if (points[k] < points[k + 1]) segments.push([points[k], points[k + 1]])
  }

  const isInsert = (r: Region): boolean => r.baseStart === r.baseEnd
  const covers = (r: Region, s: number, e: number): boolean =>
    !isInsert(r) && r.baseStart <= s && r.baseEnd >= e
  const insertsAt = (r: Region, p: number): boolean => isInsert(r) && r.baseStart === p

  const blocks = (regions: Region[], target: string[], s: number, e: number): string[] =>
    regions.filter((r) => covers(r, s, e) || insertsAt(r, s)).flatMap((r) => regionLines(target, r))

  const result: string[] = []
  let conflicts = false
  for (const [s, e] of segments) {
    const oursLines = blocks(oursRegions, ours, s, e)
    const theirsLines = blocks(theirsRegions, theirs, s, e)
    const oursEdit = oursLines.length
    const theirsEdit = theirsLines.length
    if (!oursEdit && !theirsEdit) {
      result.push(...base.slice(s, e))
    } else if (!oursEdit) {
      result.push(...theirsLines)
    } else if (!theirsEdit) {
      result.push(...oursLines)
    } else if (oursLines.join('\n') === theirsLines.join('\n')) {
      result.push(...oursLines)
    } else {
      conflicts = true
      result.push('<<<<<<< HEAD', ...oursLines, '=======', ...theirsLines, `>>>>>>> ${branchName}`)
    }
  }
  const tailOurs = oursRegions.filter((r) => isInsert(r) && r.baseStart === base.length)
  const tailTheirs = theirsRegions.filter((r) => isInsert(r) && r.baseStart === base.length)
  if (tailOurs.length || tailTheirs.length) {
    const oursLines = tailOurs.map((r) => regionLines(ours, r)).flat()
    const theirsLines = tailTheirs.map((r) => regionLines(theirs, r)).flat()
    if (oursLines.join('\n') === theirsLines.join('\n') && oursLines.length) {
      result.push(...oursLines)
    } else if (!oursLines.length && !theirsLines.length) {
      result.push(...base)
    } else if (oursLines.length && theirsLines.length) {
      conflicts = true
      result.push('<<<<<<< HEAD', ...oursLines, '=======', ...theirsLines, `>>>>>>> ${branchName}`)
    } else {
      result.push(...(oursLines.length ? oursLines : theirsLines))
    }
  }
  return { text: result, conflicts }
}

export async function readTreeFiles(fs: MemoryFS, dir: string, treeOid: string): Promise<Map<string, string>> {
  const out = new Map<string, string>()
  const walk = async (oid: string, prefix: string): Promise<void> => {
    const tree = await git.readTree({ fs: fs as never, dir, oid })
    for (const entry of tree.tree) {
      const path = prefix ? `${prefix}/${entry.path}` : entry.path
      if (entry.type === 'tree') await walk(entry.oid, path)
      else {
        const blob = await git.readBlob({ fs: fs as never, dir, oid: entry.oid })
        out.set(path, new TextDecoder().decode(blob.blob))
      }
    }
  }
  await walk(treeOid, '')
  return out
}

async function buildTreeFromMap(
  fs: MemoryFS,
  dir: string,
  files: Map<string, string | null>
): Promise<string> {
  const group = new Map<string, Map<string, string | null>>()
  const leaves = new Map<string, string>()
  for (const [path, content] of files) {
    const slash = path.indexOf('/')
    if (slash === -1) leaves.set(path, content ?? '')
    else {
      const head = path.slice(0, slash)
      const rest = path.slice(slash + 1)
      if (!group.has(head)) group.set(head, new Map())
      group.get(head)!.set(rest, content)
    }
  }
  const tree: Awaited<ReturnType<typeof git.writeTree>> extends never
    ? unknown[]
    : { type: 'blob' | 'tree'; mode: '100644' | '40000'; path: string; oid: string }[] = []
  for (const [name, content] of leaves) {
    const oid = await git.writeBlob({ fs: fs as never, dir, blob: Buffer.from(content) })
    tree.push({ type: 'blob', mode: '100644', path: name, oid })
  }
  for (const [name, sub] of group) {
    const oid = await buildTreeFromMap(fs, dir, sub)
    tree.push({ type: 'tree', mode: '40000', path: name, oid })
  }
  return git.writeTree({ fs: fs as never, dir, tree: tree as never })
}

export async function syncIndex(fs: MemoryFS, dir: string): Promise<void> {
  const rows = (await git.statusMatrix({ fs: fs as never, dir })) as MatrixRow[]
  for (const [path, h, w, s] of rows) {
    if (h === 1 && w === 0) await git.remove({ fs: fs as never, dir, filepath: path })
    else if (w === 0 && s !== 0) await git.remove({ fs: fs as never, dir, filepath: path })
    else if (w !== 0 && s !== w && !(h === 0 && s === 0)) await git.add({ fs: fs as never, dir, filepath: path })
  }
}

export async function writeTreeFromFiles(
  fs: MemoryFS,
  dir: string,
  files: Map<string, string | null>
): Promise<string> {
  const present = new Map<string, string | null>()
  for (const [path, content] of files) {
    if (content !== null) present.set(path, content)
  }
  return buildTreeFromMap(fs, dir, present)
}

export async function applyMergedFiles(
  fs: MemoryFS,
  dir: string,
  files: Map<string, string | null>
): Promise<void> {
  const rows = (await git.statusMatrix({ fs: fs as never, dir })) as MatrixRow[]
  const stagedOrTracked = new Set(rows.filter(([, h, , s]) => h === 1 || s !== 0).map((r) => r[0]))
  for (const old of await listWorkdirFiles(fs, dir)) {
    if (!files.has(old) && stagedOrTracked.has(old)) await fs.unlink(`${dir}/${old}`)
  }
  for (const [path, content] of files) {
    if (content === null) {
      await fs.unlink(`${dir}/${path}`).catch(() => {})
    } else {
      await fs.writeFile(`${dir}/${path}`, content)
    }
  }
  await syncIndex(fs, dir)
}

export async function wouldBeOverwritten(
  session: { fs: MemoryFS; dir: string },
  paths: Map<string, string | null>,
  kind: 'untracked' | 'tracked'
): Promise<string[]> {
  const rows = (await git.statusMatrix({ fs: session.fs as never, dir: session.dir })) as MatrixRow[]
  const dirty = new Set((kind === 'untracked' ? untrackedRows(rows) : trackedDirtyRows(rows)).map((r) => r[0]))
  const out: string[] = []
  for (const path of paths.keys()) {
    if (!dirty.has(path)) continue
    const content = paths.get(path)
    if (content === null) {
      out.push(path)
      continue
    }
    const current = await session.fs.readFile(`${session.dir}/${path}`).catch(() => null)
    if (current && current.toString() !== content) out.push(path)
  }
  return out.sort()
}

export function fullIdentity(name: string, email: string): { name: string; email: string; timestamp: number; timezoneOffset: number } {
  return { name, email, timestamp: Math.floor(Date.now() / 1000), timezoneOffset: -new Date().getTimezoneOffset() }
}

export async function updateHeadRef(fs: MemoryFS, dir: string, oid: string, reflogMsg?: string): Promise<void> {
  const head = await fs.readFile(`${dir}/.git/HEAD`)
  const text = head.toString()
  const match = text.match(/^ref: (refs\/heads\/.+)$/m)
  if (match) {
    await fs.writeFile(`${dir}/.git/${match[1]}`, `${oid}\n`)
  } else {
    await fs.writeFile(`${dir}/.git/HEAD`, `${oid}\n`)
  }
  if (reflogMsg) await appendReflog(fs, dir, reflogMsg)
}

export async function createMergeCommit(
  fs: MemoryFS,
  dir: string,
  files: Map<string, string | null>,
  message: string,
  mergeHeadOid: string,
  reflogMsg?: string
): Promise<string> {
  const ours = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
  const tree = await writeTreeFromFiles(fs, dir, files)
  const identity = fullIdentity(AUTHOR.name, AUTHOR.email)
  const oid = await git.writeCommit({
    fs: fs as never,
    dir,
    commit: { tree, parent: [ours, mergeHeadOid], author: identity, committer: identity, message }
  })
  await updateHeadRef(fs, dir, oid, reflogMsg)
  return oid
}

export async function mergeSnapshot(session: { fs: MemoryFS; dir: string }): Promise<Map<string, string | null>> {
  const { fs, dir } = session
  const headOid = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
  const headTree = (await git.readCommit({ fs: fs as never, dir, oid: headOid })).commit.tree
  const files = new Map<string, string | null>(await readTreeFiles(fs, dir, headTree))
  const rows = (await git.statusMatrix({ fs: fs as never, dir })) as [string, number, number, number][]
  for (const [path, h, , s] of rows) {
    if (s === 0) {
      if (h === 1) files.set(path, null)
      continue
    }
    if (h === 1 && s === 1) continue
    if (s === 2) {
      const content = await fs.readFile(`${dir}/${path}`).catch(() => null)
      files.set(path, content ? content.toString() : null)
    } else {
      files.set(path, null)
    }
  }
  return files
}
