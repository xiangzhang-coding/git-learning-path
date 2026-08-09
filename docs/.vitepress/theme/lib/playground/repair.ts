import * as git from 'isomorphic-git'
import type { MemoryFS } from './fs'
import type { Session } from './scenarios'
import {
  AUTHOR,
  NOT_A_REPO,
  appendReflog,
  endRebase,
  hasConflictMarkers,
  isRepo,
  listWorkdirFiles,
  readFileFromRef,
  readReflog,
  rebaseConflicts,
  rebaseHeadOid,
  rebaseInProgress,
  rebaseOnto,
  rebaseOrigHead,
  rebaseQueue,
  resolveAnyRef,
  writeRebaseConflicts,
  writeRebaseState,
  MatrixRow} from './scenarios'
import { short } from './fs'
import { clearStagedSnapshot, diffLines, type CommandResult } from './commands'
import { applyMergedFiles, fullIdentity, mergeSnapshot, readTreeFiles, splitLines, syncIndex, threeWayMerge, updateHeadRef, writeTreeFromFiles } from './merge'


export async function runTag(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const { fs, dir } = session
  if (argv.includes('-a') || argv.includes('--annotate') || argv.includes('-m')) {
    const name = argv.find((a) => !a.startsWith('-'))
    const msgIdx = argv.indexOf('-m')
    const message = msgIdx > -1 && argv[msgIdx + 1] ? argv[msgIdx + 1] : name ?? ''
    if (!name) return { out: ['fatal: tag name missing'], changed: false }
    const existing = await git.listTags({ fs: fs as never, dir })
    if (existing.includes(name)) return { out: [`fatal: tag '${name}' already exists`], changed: false }
    await git.annotatedTag({ fs: fs as never, dir, ref: name, message, tagger: AUTHOR })
    return { out: [], changed: true }
  }
  const name = argv.find((a) => !a.startsWith('-'))
  if (!name) {
    const tags = await git.listTags({ fs: fs as never, dir })
    tags.sort()
    return { out: tags, changed: false }
  }
  const existing = await git.listTags({ fs: fs as never, dir })
  if (existing.includes(name)) return { out: [`fatal: tag '${name}' already exists`], changed: false }
  const oid = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
  await git.writeRef({ fs: fs as never, dir, ref: `refs/tags/${name}`, value: oid })
  return { out: [], changed: true }
}

export async function runStash(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const { fs, dir } = session
  const op = argv.find((a) => !a.startsWith('-'))
  if (op === 'list') {
    const listed = await git.stash({ fs: fs as never, dir, op: 'list' })
    const entries = Array.isArray(listed) ? listed.map(String) : []
    return { out: entries, changed: false }
  }
  if (op === 'pop' || op === 'apply') {
    const listed = await git.stash({ fs: fs as never, dir, op: 'list' })
    const before = Array.isArray(listed) ? listed.map(String) : []
    if (!before.length) {
      return { out: ['No stash entries found.'], changed: false }
    }
    const idxArg = argv.find((a) => /^stash@\{\d+\}$/.test(a))
    const refIdx = idxArg ? Number(idxArg.match(/^stash@\{(\d+)\}$/)![1]) : undefined
    await git.stash({ fs: fs as never, dir, op: op === 'apply' ? 'apply' : 'pop', refIdx })
    await syncIndex(fs, dir)
    if (op === 'pop') return { out: [`Dropped stash@{${refIdx ?? 0}}`], changed: true }
    return { out: [], changed: true }
  }
  if (op === 'drop' || op === 'clear') {
    await git.stash({ fs: fs as never, dir, op })
    return { out: [], changed: true }
  }
  const rows = (await git.statusMatrix({ fs: fs as never, dir })) as MatrixRow[]
  const dirty = rows.filter(([, h, w, s]) => h === 1 && !(w === 1 && s === 1))
  if (!dirty.length) return { out: ['No local changes to save'], changed: false }
  const branch = ((await git.currentBranch({ fs: fs as never, dir })) as string | null) ?? 'HEAD'
  const headOid = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
  const stashOid = (await git.stash({ fs: fs as never, dir, message: 'WIP on ' + branch })) as string
  const head = await git.readCommit({ fs: fs as never, dir, oid: headOid })
  await syncIndex(fs, dir)
  return {
    out: [
      `Saved working directory and index state WIP on ${branch}: ${short(headOid)} ${head.commit.message.split('\n')[0]}`,
      `stash@{0} created (${short(stashOid)})`
    ],
    changed: true
  }
}

export async function runReset(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const { fs, dir } = session
  const hard = argv.includes('--hard')
  const soft = argv.includes('--soft')
  const target = argv.find((a) => !a.startsWith('-')) ?? 'HEAD'
  const newOid = await resolveAnyRef(fs, dir, target)
  if (!newOid) return { out: [`fatal: ambiguous argument '${target}': unknown revision`], changed: false }
  const oldOid = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
  if (oldOid === newOid && hard) {
    const commit = await git.readCommit({ fs: fs as never, dir, oid: newOid })
    return {
      out: [`HEAD is now at ${short(newOid)} ${commit.commit.message.split('\n')[0]}`],
      changed: false
    }
  }
  await updateHeadRef(fs, dir, newOid, `reset: moving to ${target}`)
  clearStagedSnapshot(session)
  if (soft) {
    return { out: [], changed: true }
  }
  const tree = (await git.readCommit({ fs: fs as never, dir, oid: newOid })).commit.tree
  if (hard) {
    await applyMergedFiles(fs, dir, await readTreeFiles(fs, dir, tree))
    const commit = await git.readCommit({ fs: fs as never, dir, oid: newOid })
    return {
      out: [`HEAD is now at ${short(newOid)} ${commit.commit.message.split('\n')[0]}`],
      changed: true
    }
  }
  const treeFiles = await readTreeFiles(fs, dir, tree)
  for (const path of treeFiles.keys()) {
    await git.resetIndex({ fs: fs as never, dir, filepath: path, ref: newOid })
  }
  const rows = (await git.statusMatrix({ fs: fs as never, dir })) as MatrixRow[]
  for (const [path] of rows) {
    if (!treeFiles.has(path)) await git.remove({ fs: fs as never, dir, filepath: path })
  }
  return { out: [], changed: true }
}

interface DiffResult {
  out: string[]
  changed: boolean
}

async function applyDiffCommit(
  session: Session,
  baseOid: string,
  targetOid: string,
  message: string,
  reflogMsg: string
): Promise<DiffResult | { conflicts: string[] }> {
  const { fs, dir } = session
  const baseFiles = await readTreeFiles(fs, dir, (await git.readCommit({ fs: fs as never, dir, oid: baseOid })).commit.tree)
  const targetFiles = await readTreeFiles(fs, dir, (await git.readCommit({ fs: fs as never, dir, oid: targetOid })).commit.tree)
  const headOid = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
  const headFiles = await readTreeFiles(fs, dir, (await git.readCommit({ fs: fs as never, dir, oid: headOid })).commit.tree)

  const paths = new Set([...baseFiles.keys(), ...targetFiles.keys(), ...headFiles.keys()])
  const merged = new Map<string, string | null>(headFiles)
  const conflicts: string[] = []
  for (const path of paths) {
    const baseC = baseFiles.get(path) ?? null
    const targetC = targetFiles.get(path) ?? null
    const oursC = headFiles.get(path) ?? null
    if (oursC === targetC) continue
    if (baseC === oursC || baseC === targetC) {
      merged.set(path, targetC)
      continue
    }
    const result = threeWayMerge(baseC, oursC, targetC, 'HEAD')
    if (result.conflicts) conflicts.push(path)
    merged.set(path, result.text.length ? result.text.join('\n') + '\n' : null)
  }
  if (conflicts.length) {
    for (const [path, content] of merged) {
      if (content === null) await fs.unlink(`${dir}/${path}`).catch(() => {})
      else await fs.writeFile(`${dir}/${path}`, content)
      if (!conflicts.includes(path)) {
        await git.add({ fs: fs as never, dir, filepath: path })
      }
    }
    return { conflicts }
  }
  const treeOid = await writeTreeFromFiles(fs, dir, merged)
  const identity = fullIdentity(AUTHOR.name, AUTHOR.email)
  const oid = await git.writeCommit({ fs: fs as never, dir, commit: { tree: treeOid, parent: [headOid], author: identity, committer: identity, message } })
  await updateHeadRef(fs, dir, oid, reflogMsg)
  await applyMergedFiles(fs, dir, merged)
  const branch = ((await git.currentBranch({ fs: fs as never, dir })) as string | null) ?? 'HEAD'
  return { out: [`[${branch} ${short(oid)}] ${message.split('\n')[0]}`], changed: true }
}

export async function runRevert(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const target = argv.find((a) => !a.startsWith('-'))
  if (!target) return { out: ['fatal: no commit specified'], changed: false }
  const oid = await resolveAnyRef(session.fs, session.dir, target)
  if (!oid) return { out: [`fatal: bad revision '${target}'`], changed: false }
  const commit = await git.readCommit({ fs: session.fs as never, dir: session.dir, oid })
  const parent = commit.commit.parent[0]
  if (!parent) return { out: ['fatal: cannot revert a root commit'], changed: false }
  const message = commit.commit.message.split('\n')[0]
  const result = await applyDiffCommit(session, oid, parent, `Revert "${message}"`, `revert: ${target}`)
  if ('conflicts' in result) {
    return {
      out: [
        `error: could not revert ${short(oid)}... ${message}`,
        'Automatic revert failed; fix conflicts and then commit the result.'
      ],
      changed: false
    }
  }
  return result
}

export async function runCherryPick(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const target = argv.find((a) => !a.startsWith('-'))
  if (!target) return { out: ['fatal: no commit specified'], changed: false }
  const oid = await resolveAnyRef(session.fs, session.dir, target)
  if (!oid) return { out: [`fatal: bad revision '${target}'`], changed: false }
  const commit = await git.readCommit({ fs: session.fs as never, dir: session.dir, oid })
  const parent = commit.commit.parent[0]
  if (!parent) return { out: ['fatal: cannot cherry-pick a root commit'], changed: false }
  const message = commit.commit.message.split('\n')[0]
  const result = await applyDiffCommit(session, parent, oid, message, `cherry-pick: ${target}`)
  if ('conflicts' in result) {
    return {
      out: [
        `error: could not apply ${short(oid)}... ${message}`,
        'Automatic cherry-pick failed; fix conflicts and then commit the result.'
      ],
      changed: false
    }
  }
  return result
}

export async function runRebase(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const { fs, dir } = session
  if (argv.includes('--abort')) {
    if (!(await rebaseInProgress(fs, dir))) {
      return { out: ['fatal: No rebase in progress?'], changed: false }
    }
    const orig = await rebaseOrigHead(fs, dir)
    if (orig) {
      await updateHeadRef(fs, dir, orig, `rebase (abort): returning to ${short(orig)}`)
      const tree = (await git.readCommit({ fs: fs as never, dir, oid: orig })).commit.tree
      await applyMergedFiles(fs, dir, await readTreeFiles(fs, dir, tree))
    }
    await endRebase(fs, dir)
    return { out: ['Successfully aborted.'], changed: true }
  }
  if (argv.includes('--continue')) {
    return continueRebase(session)
  }
  const target = argv.find((a) => !a.startsWith('-'))
  if (!target) return { out: ['fatal: no upstream specified'], changed: false }
  const rows = (await git.statusMatrix({ fs: fs as never, dir })) as MatrixRow[]
  const dirty = rows.filter(([, h, w, s]) => h === 1 && !(w === 1 && s === 1))
  if (dirty.length) {
    return {
      out: [
        'error: cannot rebase: You have unstaged changes.',
        'Please commit or stash them.',
        ...dirty.map((row) => `\t${row[0]}`)
      ],
      changed: false
    }
  }
  const ontoOid = await resolveAnyRef(fs, dir, target)
  if (!ontoOid) return { out: [`fatal: invalid upstream '${target}'`], changed: false }
  const branch = ((await git.currentBranch({ fs: fs as never, dir })) as string | null) ?? 'HEAD'
  const origOid = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
  if (origOid === ontoOid) {
    return { out: [`Current branch ${branch} is up to date.`], changed: false }
  }
  const ontoSet = new Set((await git.log({ fs: fs as never, dir, ref: ontoOid, depth: 50 })).map((c) => c.oid))
  const history = await git.log({ fs: fs as never, dir, depth: 50 })
  const toReplay = history.filter((c) => !ontoSet.has(c.oid)).reverse()
  if (!toReplay.length) {
    return { out: [`Current branch ${branch} is up to date.`], changed: false }
  }
  const state = { queue: toReplay.map((c) => c.oid), onto: ontoOid, origHead: origOid }
  await updateHeadRef(fs, dir, ontoOid, `rebase (start): checkout ${short(ontoOid)}`)
  const ontoTree = (await git.readCommit({ fs: fs as never, dir, oid: ontoOid })).commit.tree
  await applyMergedFiles(fs, dir, await readTreeFiles(fs, dir, ontoTree))
  return replayRebase(session, branch, state, toReplay)
}

async function replayRebase(
  session: Session,
  branch: string,
  state: { onto: string; origHead: string },
  queue: Awaited<ReturnType<typeof git.log>>
): Promise<CommandResult> {
  const { fs, dir } = session
  const current = queue[0]
  const commit = await git.readCommit({ fs: fs as never, dir, oid: current.oid })
  const parent = commit.commit.parent[0]
  const message = commit.commit.message.split('\n')[0]
  const result = await applyDiffCommit(session, parent, current.oid, message, `rebase: ${message}`)
  if ('conflicts' in result) {
    const rest = queue.slice(1).map((c) => c.oid)
    await writeRebaseState(session.fs, session.dir, {
      current: current.oid,
      queue: rest,
      onto: state.onto,
      origHead: state.origHead
    })
    await writeRebaseConflicts(session.fs, session.dir, result.conflicts)
    return {
      out: [
        ...result.conflicts.map((p) => `CONFLICT (content): Merge conflict in ${p}`),
        `error: could not apply ${short(current.oid)}... ${message}`,
        'Automatic rebase failed; fix conflicts and then commit the result.',
        'Run "git rebase --continue" to continue, or "git rebase --abort" to cancel.'
      ],
      changed: true
    }
  }
  const rest = queue.slice(1)
  if (!rest.length) {
    await endRebase(fs, dir)
    await appendReflog(fs, dir, `rebase (finished): refs/heads/${branch} onto ${short(state.onto)}`)
    return { out: [`Successfully rebased and updated refs/heads/${branch}.`], changed: true }
  }
  return replayRebase(session, branch, state, rest)
}

async function continueRebase(session: Session): Promise<CommandResult> {
  const { fs, dir } = session
  if (!(await rebaseInProgress(fs, dir))) {
    return { out: ['fatal: No rebase in progress?'], changed: false }
  }
  const conflicts = await rebaseConflicts(fs, dir)
  const rows = (await git.statusMatrix({ fs: fs as never, dir })) as MatrixRow[]
  const unresolved: string[] = []
  for (const path of conflicts) {
    const row = rows.find((r) => r[0] === path)
    const staged = row ? row[3] !== 0 && row[3] !== row[1] : false
    if (!staged) {
      unresolved.push(path)
      continue
    }
    const content = await fs.readFile(`${dir}/${path}`).catch(() => null)
    if (content && hasConflictMarkers(content.toString())) unresolved.push(path)
  }
  if (unresolved.length) {
    return {
      out: ['fatal: you have unstaged or unresolved changes; resolve conflicts first', ...unresolved.map((p) => `\t${p}`)],
      changed: false
    }
  }
  const currentOid = await rebaseHeadOid(fs, dir)
  const rest = await rebaseQueue(fs, dir)
  const onto = await rebaseOnto(fs, dir)
  const origHead = await rebaseOrigHead(fs, dir)
  if (!currentOid || !onto || !origHead) {
    return { out: ['fatal: rebase state is incomplete'], changed: false }
  }
  const current = await git.readCommit({ fs: fs as never, dir, oid: currentOid })
  const message = current.commit.message.split('\n')[0]
  const snapshot = await mergeSnapshot(session)
  const treeOid = await writeTreeFromFiles(fs, dir, snapshot)
  const headOid = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
  const identity = fullIdentity(AUTHOR.name, AUTHOR.email)
  const oid = await git.writeCommit({ fs: fs as never, dir, commit: { tree: treeOid, parent: [headOid], author: identity, committer: identity, message } })
  await updateHeadRef(fs, dir, oid, `rebase: ${message}`)
  await applyMergedFiles(fs, dir, snapshot)
  if (!rest.length) {
    const branch = ((await git.currentBranch({ fs: fs as never, dir })) as string | null) ?? 'HEAD'
    await endRebase(fs, dir)
    await appendReflog(fs, dir, `rebase (finished): refs/heads/${branch} onto ${short(onto)}`)
    return { out: [`Successfully rebased and updated refs/heads/${branch}.`], changed: true }
  }
  const queue = await Promise.all(rest.map(async (oid) => (await git.readCommit({ fs: fs as never, dir, oid })) as never))
  return replayRebase(session, ((await git.currentBranch({ fs: fs as never, dir })) as string | null) ?? 'HEAD', { onto, origHead }, queue as Awaited<ReturnType<typeof git.log>>)
}


export async function runReflog(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const { fs, dir } = session
  let entries = await readReflog(fs, dir)
  if (!entries.length) {
    const headOid = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
    const head = await git.readCommit({ fs: fs as never, dir, oid: headOid })
    const message = head.commit.message.split('\n')[0]
    await appendReflog(fs, dir, `commit (initial): ${message}`)
    entries = await readReflog(fs, dir)
  }
  const reversed = [...entries].reverse()
  return {
    out: reversed.map((e, i) => `${short(e.newOid)} HEAD@{${i}}: ${e.msg}`),
    changed: false
  }
}


export async function runShow(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const { fs, dir } = session
  const target = argv.find((a) => !a.startsWith('-'))
  const oid = await resolveAnyRef(fs, dir, target ?? 'HEAD')
  if (!oid) return { out: [`fatal: bad revision '${target ?? 'HEAD'}'`], changed: false }
  const commit = await git.readCommit({ fs: fs as never, dir, oid })
  const date = new Date(commit.commit.author.timestamp * 1000).toISOString().replace('T', ' ').slice(0, 19)
  const lines: string[] = [
    `commit ${oid}`,
    `Author: ${commit.commit.author.name} <${commit.commit.author.email}>`,
    `Date:   ${date}`,
    '',
    `    ${commit.commit.message.split('\n')[0]}`
  ]
  const parent = commit.commit.parent[0]
  if (!parent) {
    lines.push('', 'root commit')
    return { out: lines, changed: false }
  }
  const parentFiles = await readTreeFiles(fs, dir, (await git.readCommit({ fs: fs as never, dir, oid: parent })).commit.tree)
  const files = await readTreeFiles(fs, dir, commit.commit.tree)
  const paths = [...new Set([...parentFiles.keys(), ...files.keys()])].filter(
    (p) => parentFiles.get(p) !== files.get(p)
  )
  if (!paths.length) {
    lines.push('', 'no changes')
  } else {
    for (const path of paths.sort()) {
      lines.push('', `diff --git a/${path} b/${path}`)
      lines.push(...diffLines(parentFiles.get(path) ?? '', files.get(path) ?? ''))
    }
  }
  return { out: lines, changed: false }
}

export async function runBlame(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const { fs, dir } = session
  const file = argv.find((a) => !a.startsWith('-'))
  if (!file) return { out: ['fatal: no file specified'], changed: false }
  const headOid = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
  const lines = splitLines(await readFileFromRef(fs, dir, headOid, file))
  if (!lines.length) return { out: [`fatal: no such path '${file}' in HEAD`], changed: false }
  const info: ({ oid: string; author: string } | null)[] = new Array(lines.length).fill(null)
  const history = await git.log({ fs: fs as never, dir, depth: 50 })
  for (const entry of [...history].reverse()) {
    const version = splitLines(await readFileFromRef(fs, dir, entry.oid, file))
    const present = new Set(version)
    for (let i = 0; i < lines.length; i++) {
      if (present.has(lines[i])) {
        info[i] = { oid: entry.oid, author: entry.commit.author.name }
      }
    }
  }
  const fallback = { oid: headOid, author: 'unknown' }
  return {
    out: lines.map((line, i) => {
      const hit = info[i] ?? fallback
      return `${short(hit.oid)} (${hit.author}) ${line}`
    }),
    changed: false
  }
}

export async function runClean(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const { fs, dir } = session
  const dryRun = argv.includes('-n') || argv.includes('--dry-run')
  const force = argv.includes('-f') || argv.includes('--force')
  const rows = (await git.statusMatrix({ fs: fs as never, dir })) as MatrixRow[]
  const untracked = rows.filter(([, h, , s]) => h === 0 && s === 0).map((r) => r[0]).sort()
  if (!untracked.length) return { out: ['nothing to clean'], changed: false }
  if (dryRun) {
    return { out: untracked.map((p) => `Would remove ${p}`), changed: false }
  }
  if (!force) {
    return { out: ['fatal: clean.requireForce is true and -f was not given'], changed: false }
  }
  for (const p of untracked) {
    await fs.unlink(`${dir}/${p}`).catch(() => {})
  }
  return { out: untracked.map((p) => `Removing ${p}`), changed: true }
}

const BISECT_START = '.git/BISECT_START'
const BISECT_GOOD = '.git/BISECT_GOOD'
const BISECT_BAD = '.git/BISECT_BAD'
const BISECT_ORIG = '.git/BISECT_ORIG'
const BISECT_DONE = '.git/BISECT_DONE'

async function bisectRead(fs: MemoryFS, dir: string, path: string): Promise<string[]> {
  return fs
    .readFile(`${dir}/${path}`)
    .then((buf) => buf.toString().split('\n').filter(Boolean))
    .catch(() => [])
}

async function bisectWrite(fs: MemoryFS, dir: string, path: string, values: string[]): Promise<void> {
  if (!values.length) {
    await fs.unlink(`${dir}/${path}`).catch(() => {})
  } else {
    await fs.writeFile(`${dir}/${path}`, values.join('\n') + '\n')
  }
}

export async function bisectInProgress(fs: MemoryFS, dir: string): Promise<boolean> {
  return (await bisectRead(fs, dir, BISECT_START)).length > 0
}

export async function runBisect(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: [NOT_A_REPO], changed: false }
  }
  const { fs, dir } = session
  const op = argv.find((a) => !a.startsWith('-'))
  const ref = argv.find((a) => !a.startsWith('-') && a !== op)
  const resolve = async (): Promise<string | null> =>
    ref ? await resolveAnyRef(fs, dir, ref) : await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })

  if (op === 'reset') {
    if (!(await bisectInProgress(fs, dir)) && !(await bisectRead(fs, dir, BISECT_DONE)).length) {
      return { out: ['fatal: Bisect not in progress?'], changed: false }
    }
    const orig = (await bisectRead(fs, dir, BISECT_ORIG))[0]
    if (orig) {
      await updateHeadRef(fs, dir, orig, 'bisect (reset): returning to HEAD')
      await applyMergedFiles(fs, dir, await readTreeFiles(fs, dir, (await git.readCommit({ fs: fs as never, dir, oid: orig })).commit.tree))
    }
    await bisectWrite(fs, dir, BISECT_START, [])
    await bisectWrite(fs, dir, BISECT_GOOD, [])
    await bisectWrite(fs, dir, BISECT_BAD, [])
    await bisectWrite(fs, dir, BISECT_ORIG, [])
    await bisectWrite(fs, dir, BISECT_DONE, [])
    return { out: [], changed: true }
  }

  if (!op) return { out: ["fatal: missing 'start', 'bad', 'good' or 'reset'"], changed: false }

  if (op === 'start') {
    if (await bisectInProgress(fs, dir)) {
      return { out: ['fatal: bisect is already in progress; use "git bisect reset" first'], changed: false }
    }
    const bad = await resolve()
    if (!bad) return { out: [`fatal: bad revision '${ref ?? 'HEAD'}'`], changed: false }
    await bisectWrite(fs, dir, BISECT_BAD, [bad])
    await bisectWrite(fs, dir, BISECT_ORIG, [await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })])
    await bisectWrite(fs, dir, BISECT_START, [bad])
    await bisectWrite(fs, dir, BISECT_DONE, [])
    return { out: ['status: waiting for both good and bad commits'], changed: false }
  }

  if (!(await bisectInProgress(fs, dir))) {
    return { out: ['fatal: Bisect not in progress? Try "git bisect start"'], changed: false }
  }

  const target = await resolve()
  if (!target) return { out: [`fatal: bad revision '${ref ?? 'HEAD'}'`], changed: false }

  if (op === 'good') {
    await bisectWrite(fs, dir, BISECT_GOOD, [...(await bisectRead(fs, dir, BISECT_GOOD)), target])
  } else if (op === 'bad') {
    await bisectWrite(fs, dir, BISECT_BAD, [...(await bisectRead(fs, dir, BISECT_BAD)), target])
  } else {
    return { out: ["fatal: unknown 'bisect' op; use start, good, bad or reset"], changed: false }
  }

  const goodOids = await bisectRead(fs, dir, BISECT_GOOD)
  const badOids = await bisectRead(fs, dir, BISECT_BAD)
  if (!goodOids.length) {
    return { out: ['status: waiting for good commit(s), bad commit known'], changed: false }
  }
  const bad = badOids[badOids.length - 1]
  const goodSet = new Set<string>()
  for (const g of goodOids) {
    for (const c of await git.log({ fs: fs as never, dir, ref: g, depth: 100 })) goodSet.add(c.oid)
  }
  const badHistory = await git.log({ fs: fs as never, dir, ref: bad, depth: 100 })
  const candidates = badHistory.map((c) => c.oid).filter((oid) => !goodSet.has(oid))

  if (candidates.length <= 1) {
    await bisectWrite(fs, dir, BISECT_DONE, candidates.length ? [candidates[0]] : [bad])
    const first = candidates[0] ?? bad
    return {
      out: [`${first} is the first bad commit`, 'bisect run complete; run "git bisect reset" to finish'],
      changed: true
    }
  }

  const mid = candidates[Math.floor(candidates.length / 2)]
  await updateHeadRef(fs, dir, mid, `bisect: checkout ${short(mid)}`)
  await applyMergedFiles(fs, dir, await readTreeFiles(fs, dir, (await git.readCommit({ fs: fs as never, dir, oid: mid })).commit.tree))
  const left = candidates.length - 1
  const steps = Math.max(1, Math.ceil(Math.log2(left + 1)))
  return {
    out: [`Bisecting: ${left} revisions left to test after this (roughly ${steps} steps)`],
    changed: true
  }
}
