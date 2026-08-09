import * as git from 'isomorphic-git'
import type { MemoryFS } from './fs'
import type { Session } from './scenarios'
import {
    MatrixRow,
AUTHOR,
  NOT_A_REPO,
  conflictFiles,
  endMerge,
  isRepo,
  listWorkdirFiles,
  mergeHeadOid,
  mergeInProgress,
  mergeMessage,
  hasConflictMarkers,
  readFileFromRef,
  resolveAnyRef,
  startMerge
} from './scenarios'
import { applyMergedFiles, createMergeCommit, readTreeFiles, syncIndex, threeWayMerge, writeTreeFromFiles, updateHeadRef } from './merge'
import { runCd, runClone, runFetch, runPush, runRemote } from './remote'
import { runBisect, runBlame, runCherryPick, runClean, runRebase, runReflog, runReset, runRevert, runShow, runStash, runTag } from './repair'
import {
  appendReflog,
  rebaseConflicts,
  rebaseInProgress,
  rebaseOnto,
  readTrackingOid
} from './scenarios'

export interface CommandResult {
  out: string[]
  changed: boolean
}


function short(sha: string): string {
  return sha.slice(0, 7)
}

async function branchName(fs: MemoryFS, dir: string): Promise<string> {
  try {
    const branch = await git.currentBranch({ fs: fs as never, dir })
    if (branch) return branch
    const head = await fs.readFile(`${dir}/.git/HEAD`).catch(() => null)
    if (head) {
      const match = head.toString().match(/refs\/heads\/(.+)$/m)
      if (match) return match[1]
    }
    return 'HEAD'
  } catch {
    return 'HEAD'
  }
}

async function fileStatuses(fs: MemoryFS, dir: string): Promise<MatrixRow[]> {
  const rows = (await git.statusMatrix({ fs: fs as never, dir })) as MatrixRow[]
  return rows.filter(([, head, workdir, stage]) => !(head === 1 && workdir === 1 && stage === 1))
}

function statusLabels(row: MatrixRow): string[] {
  const [, head, workdir, stage] = row
  const labels: string[] = []
  if (head === 0 && workdir !== 0 && stage === 0) labels.push('untracked')
  if (head === 0 && stage !== 0) {
    labels.push('staged-added')
    if (workdir !== stage) labels.push('modified')
  }
  if (head === 1 && stage === 0) labels.push('staged-deleted')
  if (head === 1 && stage !== 0 && stage !== head) labels.push('staged-modified')
  if (head === 1 && workdir !== stage) {
    labels.push(workdir === 0 ? 'deleted' : 'modified')
  }
  return labels
}

function formatStatus(
  rows: MatrixRow[],
  branch: string,
  merging: string[] | null,
  rebasing: string[] | null,
  rebasingOnto: string
): string[] {
  const staged: string[] = []
  const unstaged: string[] = []
  const untracked: string[] = []
  for (const row of rows) {
    const path = row[0]
    const labels = statusLabels(row)
    if (labels.includes('untracked')) untracked.push(`\t${path}`)
    if (labels.includes('staged-added')) staged.push(`\tnew file:   ${path}`)
    if (labels.includes('staged-modified')) staged.push(`\tmodified:   ${path}`)
    if (labels.includes('staged-deleted')) staged.push(`\tdeleted:    ${path}`)
    if (labels.includes('modified')) unstaged.push(`\tmodified:   ${path}`)
    if (labels.includes('deleted')) unstaged.push(`\tdeleted:    ${path}`)
  }
  const out: string[] = [`On branch ${branch}`]
  if (merging) {
    if (merging.length) {
      out.push(
        'You have unmerged paths.',
        '\t(fix conflicts and run "git commit")',
        '\t(use "git merge --abort" to abort the merge)',
        '',
        'Unmerged paths:',
        '\t(use "git add <file>..." to mark resolution)',
        ...merging.map((p) => `\t\tboth modified:   ${p}`)
      )
    } else {
      out.push('All conflicts fixed but you are still merging.', '\t(use "git commit" to conclude merge)')
    }
  }
  if (rebasing !== null) {
    if (rebasing.length) {
      out.push(
        `You are currently rebasing branch '${branch}' on '${short(rebasingOnto)}'.`,
        '\t(fix conflicts and then run "git rebase --continue")',
        '\t(use "git rebase --abort" to check out the original branch)',
        '',
        'Unmerged paths:',
        '\t(use "git add <file>..." to mark resolution)',
        ...rebasing.map((p) => `\t\tboth modified:   ${p}`)
      )
    } else {
      out.push(
        `You are currently rebasing branch '${branch}' on '${short(rebasingOnto)}'.`,
        '\t(all conflicts fixed: run "git rebase --continue")'
      )
    }
  }
  if (staged.length) {
    out.push('', 'Changes to be committed:', '\t(use "git restore --staged <file>..." to unstage)')
    out.push(...staged)
  }
  if (unstaged.length) {
    out.push('', 'Changes not staged for commit:', '\t(use "git add <file>..." to update what will be committed)')
    out.push(...unstaged)
  }
  if (untracked.length) {
    out.push('', 'Untracked files:', '\t(use "git add <file>..." to include in what will be committed)')
    out.push(...untracked)
  }
  if (!staged.length && !unstaged.length && !untracked.length) {
    out.push('nothing to commit, working tree clean')
  }
  return out
}

async function unresolvedConflicts(fs: MemoryFS, dir: string, listed: string[]): Promise<string[]> {
  const rows = (await git.statusMatrix({ fs: fs as never, dir })) as MatrixRow[]
  const out: string[] = []
  for (const path of listed) {
    const row = rows.find((r) => r[0] === path)
    if (!row || row[3] === 0 || row[3] === row[1]) out.push(path)
  }
  return out
}

const MAX_DIFF_CELLS = 4_000_000

export function diffLines(oldContent: string, newContent: string): string[] {
  const oldLines = oldContent.split('\n')
  const newLines = newContent.split('\n')
  const n = oldLines.length
  const m = newLines.length
  if (n * m > MAX_DIFF_CELLS) {
    return [...oldLines.map((l) => `-${l}`), ...newLines.map((l) => `+${l}`)]
  }
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = oldLines[i] === newLines[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }
  const out: string[] = []
  let i = 0
  let j = 0
  while (i < n && j < m) {
    if (oldLines[i] === newLines[j]) {
      out.push(` ${oldLines[i]}`)
      i++
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      out.push(`-${oldLines[i]}`)
      i++
    } else {
      out.push(`+${newLines[j]}`)
      j++
    }
  }
  while (i < n) {
    out.push(`-${oldLines[i]}`)
    i++
  }
  while (j < m) {
    out.push(`+${newLines[j]}`)
    j++
  }
  return out
}

async function runInit(session: Session, argv: string[]): Promise<CommandResult> {
  if ((await isRepo(session.fs, session.dir)) && argv.length === 0) {
    return { out: [`Reinitialized existing Git repository in ${session.dir}/.git/`], changed: false }
  }
  await git.init({ fs: session.fs as never, dir: session.dir, defaultBranch: 'main' })
  await git.setConfig({ fs: session.fs as never, dir: session.dir, path: 'user.name', value: AUTHOR.name })
  await git.setConfig({ fs: session.fs as never, dir: session.dir, path: 'user.email', value: AUTHOR.email })
  return { out: [`Initialized empty Git repository in ${session.dir}/.git/`], changed: true }
}

async function runStatus(session: Session): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const rows = await fileStatuses(session.fs, session.dir)
  const branch = await branchName(session.fs, session.dir)
  let branchLabel = branch
  if (branch === 'HEAD') {
    const oid = await git.resolveRef({ fs: session.fs as never, dir: session.dir, ref: 'HEAD' })
    branchLabel = `HEAD detached at ${oid.slice(0, 7)}`
  }
  let merging: string[] | null = null
  let rebasing: string[] | null = null
  let rebasingOnto = ''
  if (await mergeInProgress(session.fs, session.dir)) {
    const listed = await conflictFiles(session.fs, session.dir)
    merging = await unresolvedConflicts(session.fs, session.dir, listed)
  } else if (await rebaseInProgress(session.fs, session.dir)) {
    const listed = await rebaseConflicts(session.fs, session.dir)
    rebasing = await unresolvedConflicts(session.fs, session.dir, listed)
    rebasingOnto = (await rebaseOnto(session.fs, session.dir)) ?? ''
  }
  return { out: formatStatus(rows, branchLabel, merging, rebasing, rebasingOnto), changed: false }
}

async function runAdd(session: Session, paths: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  if (!paths.length) return { out: ['Nothing specified, nothing added.'], changed: false }
  let targets: string[]
  if (paths.includes('.') || paths.includes('-A') || paths.includes('--all')) {
    targets = await listWorkdirFiles(session.fs, session.dir)
  } else {
    targets = []
    for (const p of paths) {
      if (p.startsWith('-')) continue
      const stat = await session.fs.stat(`${session.dir}/${p}`)
      if (stat.isDirectory()) {
        const sub = await listWorkdirFiles(session.fs, session.dir)
        targets.push(...sub.filter((f) => f.startsWith(p + '/')))
      } else {
        targets.push(p)
      }
    }
  }
  for (const target of targets) {
    await git.add({ fs: session.fs as never, dir: session.dir, filepath: target })
  }
  return { out: [], changed: true }
}

async function runCommit(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const msgIdx = argv.indexOf('-m')
  const message = msgIdx > -1 && argv[msgIdx + 1] ? argv[msgIdx + 1] : null

  if (await mergeInProgress(session.fs, session.dir)) {
    const listed = await conflictFiles(session.fs, session.dir)
    const rows = (await git.statusMatrix({ fs: session.fs as never, dir: session.dir })) as MatrixRow[]
    const unresolved: string[] = []
    for (const path of listed) {
      const row = rows.find((r) => r[0] === path)
      const staged = row ? row[3] !== 0 && row[3] !== row[1] : false
      if (!staged) {
        unresolved.push(path)
        continue
      }
      const content = await session.fs.readFile(`${session.dir}/${path}`).catch(() => null)
      if (content && hasConflictMarkers(content.toString())) unresolved.push(path)
    }
    if (unresolved.length) {
      return {
        out: [
          'fatal: you have not concluded your merge (MERGE_HEAD exists).',
          'Please, commit your changes before you merge.',
          ...unresolved.map((p) => `\t${p}`)
        ],
        changed: false
      }
    }
    const mergeHead = await mergeHeadOid(session.fs, session.dir)
    if (!mergeHead) {
      return { out: ['fatal: MERGE_HEAD is missing'], changed: false }
    }
    const files = await mergeSnapshot(session)
    const finalMessage = message ?? (await mergeMessage(session.fs, session.dir)) ?? `Merge commit '${short(mergeHead)}'`
    const oid = await createMergeCommit(session.fs, session.dir, files, finalMessage, mergeHead)
    await endMerge(session.fs, session.dir)
    await syncIndex(session.fs, session.dir)
    await appendReflog(session.fs, session.dir, `merge ${finalMessage.split('\n')[0]}: Merge made by the 'ort' strategy`)
    const branch = await branchName(session.fs, session.dir)
    return {
      out: [`[${branch} ${short(oid)}] ${finalMessage.split('\n')[0]}`, ` ${files.size} file(s) changed`],
      changed: true
    }
  }

  if (await rebaseInProgress(session.fs, session.dir)) {
    return {
      out: [
        'fatal: You are in the middle of a rebase -- cannot commit.',
        'Fix conflicts and then run "git rebase --continue".',
        'Or run "git rebase --abort" to cancel the rebase.'
      ],
      changed: false
    }
  }

  if (!message) {
    return { out: ['fatal: please enter a commit message with -m'], changed: false }
  }
  const rows = (await git.statusMatrix({ fs: session.fs as never, dir: session.dir })) as MatrixRow[]
  const staged = rows.filter(([, h, w, s]) => !(h === 1 && w === 1 && s === 1) && h !== s)
  if (!staged.length) {
    return { out: ['nothing to commit, working tree clean'], changed: false }
  }
  const sha = await git.commit({ fs: session.fs as never, dir: session.dir, author: AUTHOR, message })
  const branch = await branchName(session.fs, session.dir)
  await appendReflog(session.fs, session.dir, `commit: ${message}`)
  return {
    out: [`[${branch} ${short(sha)}] ${message}`, ` ${staged.length} file(s) changed`],
    changed: true
  }
}

async function mergeSnapshot(session: Session): Promise<Map<string, string | null>> {
  const { fs, dir } = session
  const headOid = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
  const headTree = (await git.readCommit({ fs: fs as never, dir, oid: headOid })).commit.tree
  const files = new Map<string, string | null>(await readTreeFiles(fs, dir, headTree))
  const rows = (await git.statusMatrix({ fs: fs as never, dir })) as MatrixRow[]
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

async function runPull(session: Session, argv: string[]): Promise<CommandResult> {
  const args = argv.filter((a) => !a.startsWith('-'))
  const remoteName = args[0] ?? 'origin'
  const branch = args[1] ?? ((await git.currentBranch({ fs: session.fs as never, dir: session.dir })) as string | null) ?? 'main'
  const fetchResult = await runFetch(session, [remoteName])
  const ref = `refs/remotes/${remoteName}/${branch}`
  const theirsOid = await resolveAnyRef(session.fs, session.dir, ref)
  if (!theirsOid) {
    return { out: [...fetchResult.out, `fatal: couldn't find remote ref ${ref}`], changed: false }
  }
  const oursOid = await git.resolveRef({ fs: session.fs as never, dir: session.dir, ref: 'HEAD' })
  if (oursOid === theirsOid) {
    return { out: [...fetchResult.out, 'Already up to date.'], changed: false }
  }
  const mergeResult = await runMerge(session, [`${remoteName}/${branch}`])
  return { out: [...fetchResult.out, ...mergeResult.out], changed: fetchResult.changed || mergeResult.changed }
}

async function runBranch(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const name = argv.find((a) => !a.startsWith('-'))
  if (!name) {
    const branches = await git.listBranches({ fs: session.fs as never, dir: session.dir })
    const current = await branchName(session.fs, session.dir)
    branches.sort()
    return { out: branches.map((b) => (b === current ? `* ${b}` : `  ${b}`)), changed: false }
  }
  const existing = await git
    .resolveRef({ fs: session.fs as never, dir: session.dir, ref: `refs/heads/${name}` })
    .then(() => true)
    .catch(() => false)
  if (existing) {
    return { out: [`fatal: a branch named '${name}' already exists`], changed: false }
  }
  if (!/^[\w.\-/]+$/.test(name)) {
    return { out: [`fatal: '${name}' is not a valid branch name`], changed: false }
  }
  await git.branch({ fs: session.fs as never, dir: session.dir, ref: name })
  return { out: [], changed: false }
}

async function runSwitch(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const create = argv.includes('-c') || argv.includes('--create') || argv.includes('-b')
  const name = argv.filter((a) => !a.startsWith('-') && a !== 'switch' && a !== 'checkout')[0]
  if (!name) return { out: ['fatal: missing branch name'], changed: false }
  const rows = (await git.statusMatrix({ fs: session.fs as never, dir: session.dir })) as MatrixRow[]
  const dirty = rows.filter(([, h, w, s]) => !(h === 1 && w === 1 && s === 1))
  if (dirty.length) {
    return {
      out: [
        'error: Your local changes to the following files would be overwritten by checkout:',
        ...dirty.map((row) => '\t' + row[0]),
        'Please commit your changes or stash them before you switch branches.',
        'Aborting'
      ],
      changed: false
    }
  }
  if (create) {
    const existing = await git
      .resolveRef({ fs: session.fs as never, dir: session.dir, ref: `refs/heads/${name}` })
      .then(() => true)
      .catch(() => false)
    if (existing) return { out: [`fatal: a branch named '${name}' already exists`], changed: false }
    await git.branch({ fs: session.fs as never, dir: session.dir, ref: name, checkout: true })
    await syncIndex(session.fs, session.dir)
    await appendReflog(session.fs, session.dir, `checkout: moving from HEAD to ${name}`)
    return { out: [`Switched to a new branch '${name}'`], changed: true }
  }
  let isBranch = false
  try {
    await git.resolveRef({ fs: session.fs as never, dir: session.dir, ref: `refs/heads/${name}` })
    isBranch = true
  } catch {
    try {
      await git.resolveRef({ fs: session.fs as never, dir: session.dir, ref: `refs/tags/${name}` })
    } catch {
      return { out: [`fatal: invalid reference: ${name}`], changed: false }
    }
  }
  try {
    await git.checkout({ fs: session.fs as never, dir: session.dir, ref: name })
  } catch (e) {
    const message = e instanceof Error ? e.message.split('\n')[0] : String(e)
    return { out: [`error: ${message}`], changed: false }
  }
  await syncIndex(session.fs, session.dir)
  await appendReflog(session.fs, session.dir, `checkout: moving to ${name}`)
  if (!isBranch) {
    const oid = await git.resolveRef({ fs: session.fs as never, dir: session.dir, ref: 'HEAD' })
    const commit = await git.readCommit({ fs: session.fs as never, dir: session.dir, oid })
    return {
      out: [
        `Note: switching to '${name}'.`,
        `HEAD is now at ${short(oid)} ${commit.commit.message.split('\n')[0]}`,
        "You are in 'detached HEAD' state."
      ],
      changed: true
    }
  }
  return { out: [`Switched to branch '${name}'`], changed: true }
}

export async function runMerge(session: Session, argv: string[]): Promise<CommandResult> {
  const { fs, dir } = session
  if (!(await isRepo(fs, dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  if (argv.includes('--abort')) {
    if (!(await mergeInProgress(fs, dir))) {
      return { out: ['fatal: There is no merge to abort (MERGE_HEAD missing).'], changed: false }
    }
    const oursOid = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
    const oursTree = (await git.readCommit({ fs: fs as never, dir, oid: oursOid })).commit.tree
    await applyMergedFiles(fs, dir, await readTreeFiles(fs, dir, oursTree))
    await endMerge(fs, dir)
    return { out: [], changed: true }
  }
  const target = argv.find((a) => !a.startsWith('-'))
  if (!target) return { out: ['fatal: no branch specified to merge'], changed: false }
  if (await mergeInProgress(fs, dir)) {
    return { out: ['fatal: you have not concluded your merge (MERGE_HEAD exists)'], changed: false }
  }
  const theirsOid = await resolveAnyRef(fs, dir, target)
  if (!theirsOid) {
    return {
      out: [`fatal: '${target}' is not a commit and a branch '${target}' cannot be created from it`],
      changed: false
    }
  }
  const oursOid = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
  if (oursOid === theirsOid) return { out: ['Already up to date.'], changed: false }
  const bases = await git.findMergeBase({ fs: fs as never, dir, oids: [oursOid, theirsOid] })
  const base = bases[0]
  if (!base) return { out: ['fatal: refusing to merge unrelated histories'], changed: false }

  const branch = await branchName(fs, dir)

  if (base === oursOid) {
    const theirsTree = (await git.readCommit({ fs: fs as never, dir, oid: theirsOid })).commit.tree
    const theirsFiles = await readTreeFiles(fs, dir, theirsTree)
    const oursFiles = await readTreeFiles(fs, dir, (await git.readCommit({ fs: fs as never, dir, oid: oursOid })).commit.tree)
    const changed = new Map<string, string | null>()
    for (const [path, content] of theirsFiles) {
      if (oursFiles.get(path) !== content) changed.set(path, content)
    }
    for (const path of oursFiles.keys()) {
      if (!theirsFiles.has(path)) changed.set(path, null)
    }
    const blocked = await untrackedWouldBeHit(session, changed)
    if (blocked.length) {
      return {
        out: [
          'error: The following untracked working tree files would be overwritten by merge:',
          ...blocked.map((p) => `\t${p}`),
          'Please move or remove them before you merge.'
        ],
        changed: false
      }
    }
    await applyMergedFiles(fs, dir, theirsFiles)
    await updateHeadRef(session.fs, session.dir, theirsOid, `merge ${target}: Fast-forward`)
    await syncIndex(fs, dir)
    return {
      out: [`Updating ${short(oursOid)}..${short(theirsOid)}`, 'Fast-forward'],
      changed: true
    }
  }

  if (base === theirsOid) {
    return { out: ['Already up to date.'], changed: false }
  }

  const oursTree = (await git.readCommit({ fs: fs as never, dir, oid: oursOid })).commit.tree
  const merged = new Map<string, string | null>(await readTreeFiles(fs, dir, oursTree))
  const conflicts: string[] = []
  const affected = await affectedFiles(fs, dir, base, oursOid, theirsOid)
  const blocked = await untrackedWouldBeHit(session, new Map(affected.map((p) => [p, null])))
  if (blocked.length) {
    return {
      out: [
        'error: The following untracked working tree files would be overwritten by merge:',
        ...blocked.map((p) => `\t${p}`),
        'Please move or remove them before you merge.'
      ],
      changed: false
    }
  }
  for (const path of affected) {
    const baseC = await readFileFromRef(fs, dir, base, path)
    const oursC = await readFileFromRef(fs, dir, oursOid, path)
    const theirsC = await readFileFromRef(fs, dir, theirsOid, path)
    if (oursC === theirsC) {
      merged.set(path, oursC)
      continue
    }
    const result = threeWayMerge(baseC, oursC, theirsC, target)
    if (result.conflicts) conflicts.push(path)
    merged.set(path, result.text.length ? result.text.join('\n') + '\n' : null)
  }

  if (!conflicts.length) {
    await applyMergedFiles(fs, dir, merged)
    await createMergeCommit(fs, dir, merged, `Merge branch '${target}'`, theirsOid)
    await syncIndex(fs, dir)
    return {
      out: [`Merge made by the 'ort' strategy.`, ` ${affected.length} file(s) changed`],
      changed: true
    }
  }

  for (const [path, content] of merged) {
    if (content === null) {
      await fs.unlink(`${dir}/${path}`).catch(() => {})
    } else {
      await fs.writeFile(`${dir}/${path}`, content)
    }
    if (!conflicts.includes(path)) {
      await git.add({ fs: fs as never, dir, filepath: path })
    }
  }
  await startMerge(fs, dir, theirsOid, `Merge branch '${target}'`, conflicts)
  return {
    out: [
      ...conflicts.flatMap((p) => [`Auto-merging ${p}`, `CONFLICT (content): Merge conflict in ${p}`]),
      'Automatic merge failed; fix conflicts and then commit the result.'
    ],
    changed: true
  }
}

async function untrackedWouldBeHit(session: Session, paths: Map<string, string | null>): Promise<string[]> {
  const rows = (await git.statusMatrix({ fs: session.fs as never, dir: session.dir })) as MatrixRow[]
  const untracked = new Set(rows.filter(([, h, , s]) => h === 0 && s === 0).map((r) => r[0]))
  const out: string[] = []
  for (const path of paths.keys()) {
    if (!untracked.has(path)) continue
    const exists = await session.fs
      .stat(`${session.dir}/${path}`)
      .then(() => true)
      .catch(() => false)
    if (!exists) continue
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

async function affectedFiles(
  fs: MemoryFS,
  dir: string,
  base: string,
  ours: string,
  theirs: string
): Promise<string[]> {
  const baseFiles = await readTreeFiles(fs, dir, (await git.readCommit({ fs: fs as never, dir, oid: base })).commit.tree)
  const oursFiles = await readTreeFiles(fs, dir, (await git.readCommit({ fs: fs as never, dir, oid: ours })).commit.tree)
  const theirsFiles = await readTreeFiles(fs, dir, (await git.readCommit({ fs: fs as never, dir, oid: theirs })).commit.tree)
  const paths = new Set([...baseFiles.keys(), ...oursFiles.keys(), ...theirsFiles.keys()])
  const out: string[] = []
  for (const path of paths) {
    if (baseFiles.get(path) !== oursFiles.get(path) || baseFiles.get(path) !== theirsFiles.get(path)) {
      out.push(path)
    }
  }
  return out.sort()
}

async function runLog(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const refArg = argv.find((a) => !a.startsWith('-'))
  let commits: Awaited<ReturnType<typeof git.log>>
  let exclude = new Set<string>()
  if (refArg && refArg.includes('..')) {
    const [from, to] = refArg.split('..')
    const fromOid = from ? await resolveAnyRef(session.fs, session.dir, from) : null
    const toOid = await resolveAnyRef(session.fs, session.dir, to)
    if (!toOid) {
      return { out: [`fatal: ambiguous argument '${refArg}': unknown revision`], changed: false }
    }
    commits = await git.log({ fs: session.fs as never, dir: session.dir, depth: 30, ref: toOid })
    if (fromOid) {
      const excluded = await git.log({ fs: session.fs as never, dir: session.dir, depth: 30, ref: fromOid })
      exclude = new Set(excluded.map((c) => c.oid))
      commits = commits.filter((c) => !exclude.has(c.oid))
    }
  } else if (refArg) {
    const oid = await resolveAnyRef(session.fs, session.dir, refArg)
    if (!oid) {
      return { out: [`fatal: ambiguous argument '${refArg}': unknown revision`], changed: false }
    }
    commits = await git.log({ fs: session.fs as never, dir: session.dir, depth: 30, ref: oid })
  } else {
    commits = await git.log({ fs: session.fs as never, dir: session.dir, depth: 30 })
  }
  if (!commits.length) return { out: ['fatal: your current branch does not have any commits yet'], changed: false }
  const oneline = argv.includes('--oneline')
  return {
    out: commits.flatMap((c) => {
      if (oneline) return [`${short(c.oid)} ${c.commit.message.split('\n')[0]}`]
      const date = new Date(c.commit.committer.timestamp * 1000).toLocaleString()
      return [
        `commit ${c.oid}`,
        `Author: ${c.commit.author.name} <${c.commit.author.email}>`,
        `Date:   ${date}`,
        '',
        `    ${c.commit.message.split('\n')[0]}`,
        ''
      ]
    }),
    changed: false
  }
}

async function runDiff(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const staged = argv.includes('--staged') || argv.includes('--cached')
  const rows = (await git.statusMatrix({ fs: session.fs as never, dir: session.dir })) as MatrixRow[]
  const out: string[] = []
  for (const row of rows) {
    const labels = statusLabels(row)
    const isStagedRow = labels.some((l) => l.startsWith('staged'))
    const isUnstagedRow = labels.includes('modified') || labels.includes('deleted')
    if (staged ? !isStagedRow : !isUnstagedRow) continue
    const path = row[0]
    const headContent = await readFileFromRef(session.fs, session.dir, 'HEAD', path)
    const workContent =
      row[2] === 0 ? null : await session.fs.readFile(`${session.dir}/${path}`).then((b) => b.toString()).catch(() => null)
    const oldContent = headContent ?? ''
    const newContent = staged ? (row[2] === 0 ? '' : (workContent ?? '')) : (workContent ?? '')
    out.push(`diff --git a/${path} b/${path}`, `--- a/${path}`, `+++ b/${path}`)
    const lines = diffLines(oldContent, newContent)
    const adds = lines.filter((l) => l.startsWith('+')).length
    const dels = lines.filter((l) => l.startsWith('-')).length
    if (adds || dels) {
      const oldLabel = headContent === null ? '/dev/null' : `a/${path}`
      const newLabel = workContent === null ? '/dev/null' : `b/${path}`
      out.push(`diff --git a/${path} b/${path}`, `--- ${oldLabel}`, `+++ ${newLabel}`)
      out.push(...lines)
      out.push('')
    }
  }
  if (!out.length) return { out: [], changed: false }
  return { out, changed: false }
}

async function runRestore(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const stagedOnly = argv.includes('--staged') || argv.includes('--cached')
  const targets = argv.filter((a) => !a.startsWith('-') && a !== 'restore')
  if (!targets.length) return { out: ['fatal: you must specify path(s) to restore'], changed: false }
  for (const target of targets) {
    if (stagedOnly) {
      await git.resetIndex({ fs: session.fs as never, dir: session.dir, filepath: target })
      continue
    }
    const content = await readFileFromRef(session.fs, session.dir, 'HEAD', target)
    if (content === null) {
      return { out: [`fatal: pathspec '${target}' did not match any file(s) known to git`], changed: false }
    }
    await session.fs.writeFile(`${session.dir}/${target}`, content)
    await git.resetIndex({ fs: session.fs as never, dir: session.dir, filepath: target })
  }
  return { out: [], changed: true }
}

async function runRm(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const targets = argv.filter((a) => !a.startsWith('-') && a !== 'rm')
  if (!targets.length) return { out: ['fatal: no pathspec was given'], changed: false }
  const out: string[] = []
  for (const target of targets) {
    await session.fs.unlink(`${session.dir}/${target}`)
    await git.remove({ fs: session.fs as never, dir: session.dir, filepath: target })
    out.push(`rm '${target}'`)
  }
  return { out, changed: true }
}

async function runMv(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const targets = argv.filter((a) => !a.startsWith('-') && a !== 'mv')
  if (targets.length !== 2) return { out: ['fatal: bad source, source=destination'], changed: false }
  const [from, to] = targets
  await session.fs.rename(`${session.dir}/${from}`, `${session.dir}/${to}`)
  await git.remove({ fs: session.fs as never, dir: session.dir, filepath: from })
  await git.add({ fs: session.fs as never, dir: session.dir, filepath: to })
  return { out: [`renamed: ${from} -> ${to}`], changed: true }
}

async function runConfig(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const keyIdx = argv.findIndex((a) => /^\w+\.\w+$/.test(a) || /^\w+\.\w+\.\w+$/.test(a))
  if (keyIdx === -1) return { out: ['fatal: missing config key'], changed: false }
  const key = argv[keyIdx]
  const value = argv[keyIdx + 1]
  if (value) {
    await git.setConfig({ fs: session.fs as never, dir: session.dir, path: key, value })
    return { out: [], changed: true }
  }
  try {
    const existing = await git.getConfig({ fs: session.fs as never, dir: session.dir, path: key })
    return { out: [existing ?? ''], changed: false }
  } catch {
    return { out: [], changed: false }
  }
}

function parseArgs(input: string): string[] {
  const out: string[] = []
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(input)) !== null) {
    out.push(m[1] ?? m[2] ?? m[3])
  }
  return out
}

export async function runGit(session: Session, input: string): Promise<CommandResult> {
  const argv = parseArgs(input.trim())
  if (!argv.length) return { out: [], changed: false }
  if (argv[0] === 'cd') {
    return runCd(session, argv.slice(1))
  }
  if (argv[0] !== 'git') {
    return { out: [`git: '${argv[0]}' is not a git command. Type 'git help' for a list.`], changed: false }
  }
  const [, cmd, ...rest] = argv
  try {
    switch (cmd) {
      case 'init':
        return await runInit(session, rest)
      case 'status':
        return await runStatus(session)
      case 'add':
        return await runAdd(session, rest)
      case 'commit':
        return await runCommit(session, rest)
      case 'log':
        return await runLog(session, rest)
      case 'diff':
        return await runDiff(session, rest)
      case 'restore':
        return await runRestore(session, rest)
      case 'rm':
        return await runRm(session, rest)
      case 'mv':
        return await runMv(session, rest)
      case 'config':
        return await runConfig(session, rest)
      case 'branch':
        return await runBranch(session, rest)
      case 'switch':
        return await runSwitch(session, rest)
      case 'checkout':
        return await runSwitch(session, rest)
      case 'merge':
        return await runMerge(session, rest)
      case 'remote':
        return await runRemote(session, rest)
      case 'clone':
        return await runClone(session, rest)
      case 'fetch':
        return await runFetch(session, rest)
      case 'push':
        return await runPush(session, rest)
      case 'pull':
        return await runPull(session, rest)
      case 'tag':
        return await runTag(session, rest)
      case 'stash':
        return await runStash(session, rest)
      case 'reset':
        return await runReset(session, rest)
      case 'revert':
        return await runRevert(session, rest)
      case 'cherry-pick':
        return await runCherryPick(session, rest)
      case 'rebase':
        return await runRebase(session, rest)
      case 'reflog':
        return await runReflog(session, rest)
      case 'show':
        return await runShow(session, rest)
      case 'blame':
        return await runBlame(session, rest)
      case 'clean':
        return await runClean(session, rest)
      case 'bisect':
        return await runBisect(session, rest)
      case 'help':
        return {
          out: [
            'Available commands in the playground:',
            '  git init',
            '  git status',
            '  git add <file> | .',
            '  git commit -m "<message>"',
            '  git log [--oneline] [<ref>]',
            '  git diff [--staged]',
            '  git restore <file>',
            '  git rm <file>',
            '  git mv <from> <to>',
            '  git config <key> [value]',
            '  git branch [<name>]',
            '  git switch [-c] <branch> | git checkout [-b] <branch>',
            '  git merge <branch> | --abort',
            '  git remote add <name> <url> | git remote -v',
            '  git clone <url> [<dir>]',
            '  git fetch [<remote>]',
            '  git push [<remote>] [<branch>]',
            '  git pull',
            '  git tag [<name>] | -a <name> -m <msg>',
            '  git stash [list|pop]',
            '  git reset [--hard|--soft] <ref>',
            '  git revert <ref>',
            '  git cherry-pick <ref>',
            '  git rebase <branch> | --continue | --abort',
            '  git reflog',
            '  git show [<ref>]',
            '  git blame <file>',
            '  git clean [-n | -f]',
            '  git bisect start|good <ref>|bad [<ref>]|reset',
            '  cd <dir>'
          ],
          changed: false
        }
      case '--version':
        return { out: [`git version 2.55.0 (playground, isomorphic-git ${await git.version()})`], changed: false }
      default:
        return { out: [`git: '${cmd}' is not a git command. See 'git help'.`], changed: false }
    }
  } catch (e) {
    const message = e instanceof Error ? e.message.split('\n')[0] : String(e)
    return { out: [message.startsWith('fatal') ? message : `fatal: ${message}`], changed: false }
  }
}
