import * as git from 'isomorphic-git'
import type { MemoryFS } from './fs'
import type { Session } from './scenarios'
import { AUTHOR, listWorkdirFiles } from './scenarios'

export interface CommandResult {
  out: string[]
  changed: boolean
}

type MatrixRow = [string, number, number, number]

function short(sha: string): string {
  return sha.slice(0, 7)
}

function isRepo(fs: MemoryFS, dir: string): Promise<boolean> {
  return fs
    .stat(`${dir}/.git`)
    .then((s) => s.isDirectory())
    .catch(() => false)
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

function formatStatus(fs: MemoryFS, dir: string, rows: MatrixRow[], branch: string): string[] {
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

function diffLines(oldContent: string, newContent: string): string[] {
  const oldLines = oldContent.split('\n')
  const newLines = newContent.split('\n')
  const n = oldLines.length
  const m = newLines.length
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

async function readFileFromRef(fs: MemoryFS, dir: string, ref: string, filepath: string): Promise<string | null> {
  try {
    const oid = await git.resolveRef({ fs: fs as never, dir, ref })
    const commit = await git.readCommit({ fs: fs as never, dir, oid })
    const treeOid = commit.commit.tree
    const tree = await git.readTree({ fs: fs as never, dir, oid: treeOid })
    const entry = tree.tree.find((e: { path: string }) => e.path === filepath)
    if (!entry) return null
    const blob = await git.readBlob({ fs: fs as never, dir, oid: entry.oid })
    return new TextDecoder().decode(blob.blob)
  } catch {
    return null
  }
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
    return { out: ['fatal: not a git repository (or any of the parent directories): .git'], changed: false }
  }
  const rows = await fileStatuses(session.fs, session.dir)
  const branch = await branchName(session.fs, session.dir)
  return { out: formatStatus(session.fs, session.dir, rows, branch), changed: false }
}

async function runAdd(session: Session, paths: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: ['fatal: not a git repository (or any of the parent directories): .git'], changed: false }
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
    return { out: ['fatal: not a git repository (or any of the parent directories): .git'], changed: false }
  }
  const msgIdx = argv.indexOf('-m')
  const message = msgIdx > -1 && argv[msgIdx + 1] ? argv[msgIdx + 1] : null
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
  return {
    out: [`[${branch} ${short(sha)}] ${message}`, ` ${staged.length} file(s) changed`],
    changed: true
  }
}

async function runLog(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: ['fatal: not a git repository (or any of the parent directories): .git'], changed: false }
  }
  const commits = await git.log({ fs: session.fs as never, dir: session.dir, depth: 30 })
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
    return { out: ['fatal: not a git repository (or any of the parent directories): .git'], changed: false }
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
    out.push(`@@ -1,${oldContent.split('\n').length} +1,${newContent.split('\n').length} @@`, ...lines)
    if (!adds && !dels) out.splice(out.length - lines.length - 3)
    out.push('')
  }
  if (!out.length) return { out: [], changed: false }
  return { out, changed: false }
}

async function runRestore(session: Session, argv: string[]): Promise<CommandResult> {
  if (!(await isRepo(session.fs, session.dir))) {
    return { out: ['fatal: not a git repository (or any of the parent directories): .git'], changed: false }
  }
  const targets = argv.filter((a) => !a.startsWith('-') && a !== 'restore')
  if (!targets.length) return { out: ['fatal: you must specify path(s) to restore'], changed: false }
  for (const target of targets) {
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
    return { out: ['fatal: not a git repository (or any of the parent directories): .git'], changed: false }
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
    return { out: ['fatal: not a git repository (or any of the parent directories): .git'], changed: false }
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
    return { out: ['fatal: not a git repository (or any of the parent directories): .git'], changed: false }
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
      case 'help':
        return {
          out: [
            'Available commands in the playground:',
            '  git init',
            '  git status',
            '  git add <file> | .',
            '  git commit -m "<message>"',
            '  git log [--oneline]',
            '  git diff [--staged]',
            '  git restore <file>',
            '  git rm <file>',
            '  git mv <from> <to>',
            '  git config <key> [value]'
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
