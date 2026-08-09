import * as git from 'isomorphic-git'
import { short } from './fs'
import type { Session } from './scenarios'
import { isRepo, listWorkdirFiles, mergeInProgress, readBranchOid, readFileFromRef, readReflog, resolveAnyRef, dirtyRows,
  MatrixRow} from './scenarios'
import type { GraphCommit } from './graph'
import { commitGraph } from './graph'

export const CHECK_TYPES = [
  'hasCommit',
  'fileCommitted',
  'fileStaged',
  'fileDeleted',
  'fileRenamed',
  'statusClean',
  'branchIs',
  'configIs',
  'fileExists',
  'branchExists',
  'mergeDone',
  'mergeCommit',
  'noMergeCommit',
  'pushedTo',
  'tagExists',
  'headAt',
  'workdirModified',
  'rebaseAborted',
  'workdirClean',
  'bisectDone'
] as const

export type CheckType = (typeof CHECK_TYPES)[number]

export type Check =
  | { type: 'hasCommit'; messageContains?: string }
  | { type: 'fileCommitted'; path: string; contentContains?: string }
  | { type: 'fileStaged'; path: string }
  | { type: 'fileDeleted'; path: string }
  | { type: 'fileRenamed'; from: string; to: string }
  | { type: 'statusClean' }
  | { type: 'branchIs'; name: string }
  | { type: 'configIs'; key: string; value: string }
  | { type: 'fileExists'; path: string }
  | { type: 'branchExists'; name: string }
  | { type: 'mergeDone'; branch?: string }
  | { type: 'mergeCommit' }
  | { type: 'noMergeCommit' }
  | { type: 'pushedTo'; branch?: string }
  | { type: 'tagExists'; name: string }
  | { type: 'headAt'; ref: string }
  | { type: 'workdirModified'; path: string }
  | { type: 'rebaseAborted' }
  | { type: 'workdirClean' }
  | { type: 'bisectDone' }

export interface CheckResult {
  pass: boolean
  detail: string
}

export async function runChecks(session: Session, checks: Check[]): Promise<CheckResult> {
  const { fs, dir } = session
  if (!(await isRepo(fs, dir))) {
    return { pass: false, detail: 'not a git repository yet' }
  }
  for (const check of checks) {
    switch (check.type) {
      case 'hasCommit': {
        let commits: Awaited<ReturnType<typeof git.log>> = []
        try {
          commits = await git.log({ fs: fs as never, dir, depth: 30 })
        } catch {
          commits = []
        }
        if (!commits.length) return { pass: false, detail: 'no commit found' }
        if (check.messageContains) {
          const match = commits.some((c) => c.commit.message.includes(check.messageContains ?? ''))
          if (!match) return { pass: false, detail: `no commit message containing "${check.messageContains}"` }
        }
        break
      }
      case 'fileCommitted': {
        const content = await readFileFromRef(fs, dir, 'HEAD', check.path)
        if (content === null) return { pass: false, detail: `"${check.path}" is not committed` }
        if (check.contentContains && !content.includes(check.contentContains)) {
          return { pass: false, detail: `committed "${check.path}" lacks "${check.contentContains}"` }
        }
        break
      }
      case 'fileStaged': {
        const rows = (await git.statusMatrix({ fs: fs as never, dir })) as MatrixRow[]
        const row = rows.find((r) => r[0] === check.path)
        if (!row || row[3] === 0) return { pass: false, detail: `"${check.path}" is not staged` }
        break
      }
      case 'fileDeleted': {
        const headHas = (await readFileFromRef(fs, dir, 'HEAD', check.path)) !== null
        const workExists = await fs
          .stat(`${dir}/${check.path}`)
          .then(() => true)
          .catch(() => false)
        if (!headHas) return { pass: false, detail: `"${check.path}" was not tracked` }
        if (workExists) return { pass: false, detail: `"${check.path}" still exists in the working tree` }
        break
      }
      case 'fileRenamed': {
        const oldExists = await fs
          .stat(`${dir}/${check.from}`)
          .then(() => true)
          .catch(() => false)
        const newExists = await fs
          .stat(`${dir}/${check.to}`)
          .then(() => true)
          .catch(() => false)
        if (oldExists) return { pass: false, detail: `"${check.from}" still exists` }
        if (!newExists) return { pass: false, detail: `"${check.to}" is missing` }
        const rows = (await git.statusMatrix({ fs: fs as never, dir })) as MatrixRow[]
        const newRow = rows.find((r) => r[0] === check.to)
        if (!newRow || newRow[3] === 0) return { pass: false, detail: `"${check.to}" is not staged` }
        break
      }
      case 'statusClean': {
        const rows = (await git.statusMatrix({ fs: fs as never, dir })) as MatrixRow[]
        const dirty = dirtyRows(rows)
        if (dirty.length) return { pass: false, detail: 'working tree is not clean' }
        break
      }
      case 'branchIs': {
        const branch = ((await git.currentBranch({ fs: fs as never, dir })) as string | null) ?? null
        if (branch !== check.name) return { pass: false, detail: `branch is ${branch ?? 'none'}, expected ${check.name}` }
        break
      }
      case 'configIs': {
        const existing = await git.getConfig({ fs: fs as never, dir, path: check.key })
        if (existing !== check.value) return { pass: false, detail: `config ${check.key} is ${existing ?? '(unset)'}` }
        break
      }
      case 'fileExists': {
        const exists = await fs
          .stat(`${dir}/${check.path}`)
          .then(() => true)
          .catch(() => false)
        if (!exists) return { pass: false, detail: `"${check.path}" is missing` }
        break
      }
      case 'branchExists': {
        const branches = await git.listBranches({ fs: fs as never, dir })
        if (!branches.includes(check.name)) return { pass: false, detail: `branch "${check.name}" does not exist` }
        break
      }
      case 'mergeDone': {
        if (await mergeInProgress(fs, dir)) {
          return { pass: false, detail: 'a merge is still in progress' }
        }
        if (check.branch) {
          const merged = await branchMerged(fs, dir, check.branch)
          if (!merged) return { pass: false, detail: `branch "${check.branch}" is not merged into HEAD` }
        }
        const rows = (await git.statusMatrix({ fs: fs as never, dir })) as MatrixRow[]
        const dirty = dirtyRows(rows)
        if (dirty.length) return { pass: false, detail: 'working tree is not clean' }
        break
      }
      case 'mergeCommit': {
        const commits = await git.log({ fs: fs as never, dir, depth: 10 })
        const tip = commits[0]
        if (!tip) return { pass: false, detail: 'no commits found' }
        if (tip.commit.parent.length !== 2) {
          return { pass: false, detail: 'HEAD is not a merge commit (expected two parents)' }
        }
        break
      }
      case 'noMergeCommit': {
        const commits = await git.log({ fs: fs as never, dir, depth: 10 })
        const tip = commits[0]
        if (!tip) return { pass: false, detail: 'no commits found' }
        if (tip.commit.parent.length === 2) {
          return { pass: false, detail: 'HEAD is a merge commit; fast-forward should not create one' }
        }
        break
      }
      case 'pushedTo': {
        const branch = check.branch ?? ((await git.currentBranch({ fs: fs as never, dir })) as string | null) ?? 'main'
        let localOid: string
        try {
          localOid = await git.resolveRef({ fs: fs as never, dir, ref: `refs/heads/${branch}` })
        } catch {
          return { pass: false, detail: `branch "${branch}" has no commits` }
        }
        const remoteOid = await readBranchOid(session.remoteFs, session.remoteDir, branch)
        if (remoteOid !== localOid) {
          return { pass: false, detail: `remote "${session.remoteDir}" is not at the local ${branch}` }
        }
        break
      }
      case 'tagExists': {
        const tags = await git.listTags({ fs: fs as never, dir })
        if (!tags.includes(check.name)) return { pass: false, detail: `tag "${check.name}" does not exist` }
        break
      }
      case 'headAt': {
        const target = await resolveAnyRef(fs, dir, check.ref)
        const head = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
        if (target !== head) return { pass: false, detail: `HEAD is not at ${check.ref}` }
        break
      }
      case 'workdirModified': {
        const rows = (await git.statusMatrix({ fs: fs as never, dir })) as MatrixRow[]
        const row = rows.find((r) => r[0] === check.path)
        if (!row || row[2] === row[3]) {
          return { pass: false, detail: `"${check.path}" is not modified in the working tree` }
        }
        break
      }
      case 'workdirClean': {
        const rows = (await git.statusMatrix({ fs: fs as never, dir })) as MatrixRow[]
        const leftover = dirtyRows(rows)
        if (leftover.length) return { pass: false, detail: 'working tree still has untracked or modified files' }
        break
      }
      case 'bisectDone': {
        const done = await fs
          .readFile(`${dir}/.git/BISECT_DONE`)
          .then((buf) => buf.toString().trim())
          .catch(() => '')
        if (!done) return { pass: false, detail: 'bisect has not located the first bad commit' }
        break
      }
      case 'rebaseAborted': {
        const entries = await readReflog(fs, dir)
        const last = entries[entries.length - 1]
        if (!last || !last.msg.startsWith('rebase (abort)')) {
          return { pass: false, detail: 'no rebase was aborted' }
        }
        break
      }
      default: {
        const type = (check as { type: string }).type
        return { pass: false, detail: `unknown check type "${type}"` }
      }
    }
  }
  return { pass: true, detail: 'ok' }
}

async function branchMerged(fs: Session['fs'], dir: string, name: string): Promise<boolean> {
  const tip = await resolveAnyRef(fs, dir, name)
  if (!tip) return false
  const head = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
  const bases = await git.findMergeBase({ fs: fs as never, dir, oids: [head, tip] })
  return bases[0] === tip
}

export async function sessionSnapshot(session: Session): Promise<{
  branch: string | null
  commits: { short: string; message: string }[]
  files: string[]
  dirty: number
  graph: GraphCommit[]
}> {
  const { fs, dir } = session
  const isGit = await isRepo(fs, dir)
  if (!isGit) {
    return { branch: null, commits: [], files: await listWorkdirFiles(fs, dir), dirty: 0, graph: [] }
  }
  const branch = ((await git.currentBranch({ fs: fs as never, dir })) as string | null) ?? null
  let commits: Awaited<ReturnType<typeof git.log>> = []
  try {
    commits = await git.log({ fs: fs as never, dir, depth: 30 })
  } catch {
    commits = []
  }
  const files = await listWorkdirFiles(fs, dir)
  const rows = (await git.statusMatrix({ fs: fs as never, dir })) as MatrixRow[]
  const graph = await commitGraph(fs, dir)
  return {
    branch,
    commits: commits.map((c) => ({
      short: short(c.oid),
      message: c.commit.message.split('\n')[0]
    })),
    files,
    dirty: dirtyRows(rows).length,
    graph
  }
}
