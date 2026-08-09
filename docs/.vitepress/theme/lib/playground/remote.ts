import * as git from 'isomorphic-git'
import { short, type MemoryFS } from './fs'
import type { Session } from './scenarios'
import {
  NOT_A_REPO,
  branchOids,
  cloneRepo,
  copyObjects,
  isRepo,
  readBranchOid,
  readTrackingOid,
  writeBranchRef,
  writeTrackingRef
} from './scenarios'
import type { CommandResult } from './commands'


async function remoteLocation(session: Session): Promise<{ fs: MemoryFS; dir: string } | null> {
  const hasRemote = await session.remoteFs
    .stat(`${session.remoteDir}/.git`)
    .then((s) => s.isDirectory())
    .catch(() => false)
  if (!hasRemote) return null
  return { fs: session.remoteFs, dir: session.remoteDir }
}

async function requireRemote(session: Session): Promise<{ fs: MemoryFS; dir: string } | CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const remote = await remoteLocation(session)
  if (!remote) {
    return { out: ["fatal: '/origin' does not appear to be a git repository"], changed: false }
  }
  return remote
}

export async function runCd(session: Session, argv: string[]): Promise<CommandResult> {
  const target = argv[0]
  if (!target) return { out: [], changed: false }
  const resolved = target.startsWith('/') ? target : `${session.dir}/${target}`
  const isDir = await session.fs
    .stat(resolved)
    .then((s) => s.isDirectory())
    .catch(() => false)
  if (!isDir) {
    return { out: [`cd: no such file or directory: ${target}`], changed: false }
  }
  session.dir = resolved
  return { out: [], changed: true }
}

export async function runRemote(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const sub = argv[0]
  if (sub === 'add') {
    const name = argv[1]
    const url = argv[2]
    if (!name || !url) return { out: ['fatal: remote add requires a name and url'], changed: false }
    const existing = await git.listRemotes({ fs: session.fs as never, dir: session.dir })
    if (existing.some((r) => r.remote === name)) {
      return { out: [`fatal: remote ${name} already exists.`], changed: false }
    }
    await git.addRemote({ fs: session.fs as never, dir: session.dir, remote: name, url })
    return { out: [], changed: true }
  }
  const remotes = await git.listRemotes({ fs: session.fs as never, dir: session.dir })
  if (sub === '-v' || sub === '--verbose') {
    return {
      out: remotes.flatMap((r) => [`${r.remote}\t${r.url} (fetch)`, `${r.remote}\t${r.url} (push)`]),
      changed: false
    }
  }
  return { out: remotes.map((r) => r.remote), changed: false }
}

export async function runClone(session: Session, argv: string[]): Promise<CommandResult> {
  const url = argv.find((a) => !a.startsWith('-'))
  if (!url) return { out: ['fatal: you must specify a repository to clone'], changed: false }
  const remote = await remoteLocation(session)
  if (!remote || url !== session.remoteDir) {
    return { out: [`fatal: repository '${url}' does not exist`], changed: false }
  }
  const urlArg = argv.find((a) => !a.startsWith('-') && a !== url)
  const defaultName = url.split('/').filter(Boolean).pop() ?? 'repo'
  const target = urlArg ?? `${session.dir}/${defaultName}`
  const targetName = target.split('/').filter(Boolean).pop() ?? 'repo'
  const exists = await session.fs
    .stat(target)
    .then(() => true)
    .catch(() => false)
  if (exists) {
    const base = target.replace(/^\//, '')
    const files = session.fs.fileList().filter((k) => k.startsWith(`${base}/`))
    if (files.length > 0) {
      return {
        out: [`fatal: destination path '${targetName}' already exists and is not an empty directory.`],
        changed: false
      }
    }
  }
  await cloneRepo(session.fs, remote.fs, remote.dir, target)
  return { out: [`Cloning into '${target}'...`], changed: true }
}

export async function runFetch(session: Session, argv: string[]): Promise<CommandResult> {
  const guard = await requireRemote(session)
  if ('out' in guard) return guard
  const remote = guard
  const remoteName = argv.find((a) => !a.startsWith('-')) ?? 'origin'
  await copyObjects(remote.fs, remote.dir, session.fs, session.dir)
  const branches = await branchOids(remote.fs, remote.dir)
  const lines: string[] = []
  for (const [name, oid] of branches) {
    const old = await readTrackingOid(session.fs, session.dir, remoteName, name)
    await writeTrackingRef(session.fs, session.dir, remoteName, name, oid)
    if (old === oid) continue
    if (old === null) lines.push(` * [new branch]      ${name} -> ${remoteName}/${name}`)
    else lines.push(`   ${short(old)}..${short(oid)}  ${name} -> ${remoteName}/${name}`)
  }
  const out = [`From ${remote.dir}`]
  if (lines.length) out.push(...lines)
  return { out, changed: lines.length > 0 }
}

export async function runPush(session: Session, argv: string[]): Promise<CommandResult> {
  const guard = await requireRemote(session)
  if ('out' in guard) return guard
  const remote = guard
  const args = argv.filter((a) => !a.startsWith('-'))
  const remoteName = args[0] ?? 'origin'
  const branch = args[1] ?? ((await git.currentBranch({ fs: session.fs as never, dir: session.dir })) as string | null) ?? 'main'
  const localOid = await readBranchOid(session.fs, session.dir, branch)
  if (!localOid) {
    return { out: [`error: src refspec ${branch} does not match any`], changed: false }
  }
  const remoteOid = await readBranchOid(remote.fs, remote.dir, branch)
  if (remoteOid) {
    let base: string | undefined
    try {
      const bases = await git.findMergeBase({ fs: session.fs as never, dir: session.dir, oids: [localOid, remoteOid] })
      base = bases[0]
    } catch {
      base = undefined
    }
    if (!base || base !== remoteOid) {
      return {
        out: [
          ` ! [rejected]        ${branch} -> ${branch} (non-fast-forward)`,
          `error: failed to push some refs to '${remote.dir}'`,
          'hint: Updates were rejected because the tip of your current branch is behind',
          "hint: its remote counterpart. Integrate the remote changes (e.g. 'git pull ...')",
          'hint: before pushing again.'
        ],
        changed: false
      }
    }
  }
  if (remoteOid === localOid) {
    return { out: ['Everything up-to-date'], changed: false }
  }
  await copyObjects(session.fs, session.dir, remote.fs, remote.dir)
  await writeBranchRef(remote.fs, remote.dir, branch, localOid)
  await writeTrackingRef(session.fs, session.dir, remoteName, branch, localOid)
  const line = remoteOid
    ? `   ${short(remoteOid)}..${short(localOid)}  ${branch} -> ${branch}`
    : ` * [new branch]      ${branch} -> ${branch}`
  return { out: [`To ${remote.dir}`, line], changed: true }
}
