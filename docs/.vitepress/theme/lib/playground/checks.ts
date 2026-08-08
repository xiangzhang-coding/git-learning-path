import * as git from 'isomorphic-git'
import type { MemoryFS } from './fs'
import type { Session } from './scenarios'
import { listWorkdirFiles } from './scenarios'

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

export interface CheckResult {
  pass: boolean
  detail: string
}

async function headFileContent(fs: MemoryFS, dir: string, filepath: string): Promise<string | null> {
  try {
    const oid = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
    const commit = await git.readCommit({ fs: fs as never, dir, oid })
    const tree = await git.readTree({ fs: fs as never, dir, oid: commit.commit.tree })
    const entry = tree.tree.find((e: { path: string }) => e.path === filepath)
    if (!entry) return null
    const blob = await git.readBlob({ fs: fs as never, dir, oid: entry.oid })
    return new TextDecoder().decode(blob.blob)
  } catch {
    return null
  }
}

async function isRepo(fs: MemoryFS, dir: string): Promise<boolean> {
  return fs
    .stat(`${dir}/.git`)
    .then((s) => s.isDirectory())
    .catch(() => false)
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
        const content = await headFileContent(fs, dir, check.path)
        if (content === null) return { pass: false, detail: `"${check.path}" is not committed` }
        if (check.contentContains && !content.includes(check.contentContains)) {
          return { pass: false, detail: `committed "${check.path}" lacks "${check.contentContains}"` }
        }
        break
      }
      case 'fileStaged': {
        const rows = (await git.statusMatrix({ fs: fs as never, dir })) as [string, number, number, number][]
        const row = rows.find((r) => r[0] === check.path)
        if (!row || row[3] === 0) return { pass: false, detail: `"${check.path}" is not staged` }
        break
      }
      case 'fileDeleted': {
        const headHas = (await headFileContent(fs, dir, check.path)) !== null
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
        break
      }
      case 'statusClean': {
        const rows = (await git.statusMatrix({ fs: fs as never, dir })) as [string, number, number, number][]
        const dirty = rows.filter(([, h, w, s]) => !(h === 1 && w === 1 && s === 1))
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
    }
  }
  return { pass: true, detail: 'ok' }
}

export async function sessionSnapshot(session: Session): Promise<{
  branch: string | null
  commits: { short: string; message: string }[]
  files: string[]
  dirty: number
}> {
  const { fs, dir } = session
  const isGit = await isRepo(fs, dir)
  if (!isGit) return { branch: null, commits: [], files: await listWorkdirFiles(fs, dir), dirty: 0 }
  const branch = ((await git.currentBranch({ fs: fs as never, dir })) as string | null) ?? null
  const commits = (await git.log({ fs: fs as never, dir, depth: 30 })).map((c) => ({
    short: c.oid.slice(0, 7),
    message: c.commit.message.split('\n')[0]
  }))
  const files = await listWorkdirFiles(fs, dir)
  const rows = (await git.statusMatrix({ fs: fs as never, dir })) as [string, number, number, number][]
  return { branch, commits, files, dirty: rows.filter(([, h, w, s]) => !(h === 1 && w === 1 && s === 1)).length }
}
