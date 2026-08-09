import * as git from 'isomorphic-git'
import { Buffer } from 'buffer'
import { MemoryFS } from './fs'
import { readTreeFiles, syncIndex } from './merge'

globalThis.Buffer = Buffer

export const AUTHOR = { name: 'Learner', email: 'learner@example.com' }

export const NOT_A_REPO = 'fatal: not a git repository (or any of the parent directories): .git'

export function hasConflictMarkers(content: string): boolean {
  return content.includes('<<<<<<<') || content.includes('>>>>>>>')
}

export const STAGE3_SCENARIOS = ['remote', 'clone', 'push', 'pull-ff', 'pull'] as const
export const STAGE4_SCENARIOS = ['stash', 'tag', 'reset', 'revert', 'cherry-pick', 'rebase', 'rebase-conflict', 'clean', 'bisect'] as const

export type ScenarioName =
  | 'init'
  | 'add-commit'
  | 'history'
  | 'local'
  | 'branching'
  | 'merge-ff'
  | 'merge'
  | 'conflict'
  | 'remote'
  | 'clone'
  | 'push'
  | 'pull-ff'
  | 'pull'
  | 'stash'
  | 'tag'
  | 'reset'
  | 'revert'
  | 'cherry-pick'
  | 'rebase'
  | 'rebase-conflict'
  | 'clean'
  | 'bisect'

export async function mergeInProgress(fs: MemoryFS, dir: string): Promise<boolean> {
  return fs
    .readFile(`${dir}/.git/MERGE_HEAD`)
    .then(() => true)
    .catch(() => false)
}

export async function mergeHeadOid(fs: MemoryFS, dir: string): Promise<string | null> {
  try {
    const raw = await fs.readFile(`${dir}/.git/MERGE_HEAD`)
    return raw.toString().trim() || null
  } catch {
    return null
  }
}

export async function conflictFiles(fs: MemoryFS, dir: string): Promise<string[]> {
  try {
    const raw = await fs.readFile(`${dir}/.git/MERGE_CONFLICTS`)
    return raw
      .toString()
      .split('\n')
      .filter((p) => p.trim().length)
  } catch {
    return []
  }
}

export async function mergeMessage(fs: MemoryFS, dir: string): Promise<string | null> {
  try {
    const raw = await fs.readFile(`${dir}/.git/MERGE_MSG`)
    return raw.toString().trim() || null
  } catch {
    return null
  }
}

export async function startMerge(fs: MemoryFS, dir: string, theirsOid: string, message: string, conflicts: string[]): Promise<void> {
  await fs.writeFile(`${dir}/.git/MERGE_HEAD`, `${theirsOid}\n`)
  await fs.writeFile(`${dir}/.git/MERGE_MSG`, `${message}\n`)
  await fs.writeFile(`${dir}/.git/MERGE_CONFLICTS`, `${conflicts.join('\n')}\n`)
}

export async function endMerge(fs: MemoryFS, dir: string): Promise<void> {
  await fs.unlink(`${dir}/.git/MERGE_HEAD`).catch(() => {})
  await fs.unlink(`${dir}/.git/MERGE_MSG`).catch(() => {})
  await fs.unlink(`${dir}/.git/MERGE_CONFLICTS`).catch(() => {})
}

export function isRepo(fs: MemoryFS, dir: string): Promise<boolean> {
  return fs
    .stat(`${dir}/.git`)
    .then((s) => s.isDirectory())
    .catch(() => false)
}

export async function readFileFromRef(
  fs: MemoryFS,
  dir: string,
  ref: string,
  filepath: string
): Promise<string | null> {
  try {
    const oid = await git.resolveRef({ fs: fs as never, dir, ref })
    const commit = await git.readCommit({ fs: fs as never, dir, oid })
    const entryOid = await resolvePathInTree(fs, dir, commit.commit.tree, filepath)
    if (!entryOid) return null
    const blob = await git.readBlob({ fs: fs as never, dir, oid: entryOid })
    return new TextDecoder().decode(blob.blob)
  } catch {
    return null
  }
}

async function resolvePathInTree(fs: MemoryFS, dir: string, treeOid: string, path: string): Promise<string | null> {
  const parts = path.split('/')
  let current = treeOid
  for (let i = 0; i < parts.length; i++) {
    const tree = await git.readTree({ fs: fs as never, dir, oid: current })
    const entry = tree.tree.find((e: { path: string }) => e.path === parts[i])
    if (!entry) return null
    if (i === parts.length - 1) return entry.type === 'blob' ? entry.oid : null
    current = entry.oid
  }
  return null
}

async function write(fs: MemoryFS, dir: string, path: string, content: string): Promise<void> {
  await fs.writeFile(`${dir}/${path}`, content)
}

async function commitAll(fs: MemoryFS, dir: string, message: string): Promise<void> {
  const files = await listWorkdirFiles(fs, dir)
  for (const file of files) {
    await git.add({ fs: fs as never, dir, filepath: file })
  }
  await git.commit({ fs: fs as never, dir, author: AUTHOR, message })
  await appendReflog(fs, dir, `commit: ${message}`)
}

export async function listWorkdirFiles(fs: MemoryFS, dir: string): Promise<string[]> {
  const out: string[] = []
  const walk = async (sub: string): Promise<void> => {
    const entries = await fs.readdir(sub)
    for (const entry of entries) {
      if (sub === dir && entry === '.git') continue
      const full = sub === dir ? `${dir}/${entry}` : `${sub}/${entry}`
      const stat = await fs.stat(full)
      if (stat.isDirectory()) await walk(full)
      else out.push(full.slice(dir.length + 1))
    }
  }
  await walk(dir)
  return out
}

export async function copyObjects(from: MemoryFS, fromDir: string, to: MemoryFS, toDir: string): Promise<void> {
  const base = fromDir.replace(/^\//, '')
  const prefix = `${base}/.git/objects/`
  for (const key of from.fileList()) {
    if (key.startsWith(prefix)) {
      await to.writeFile(`${toDir}/${key.slice(base.length)}`, await from.readFile(key))
    }
  }
}

export type MatrixRow = [string, number, number, number]

export function dirtyRows(rows: MatrixRow[]): MatrixRow[] {
  return rows.filter(([, h, w, s]) => !(h === 1 && w === 1 && s === 1))
}

export function trackedDirtyRows(rows: MatrixRow[]): MatrixRow[] {
  return rows.filter(([, h, w, s]) => h !== 0 && !(w === 1 && s === 1))
}

export function untrackedRows(rows: MatrixRow[]): MatrixRow[] {
  return rows.filter(([, h, , s]) => h === 0 && s === 0)
}

export async function headBranchOf(fs: MemoryFS, dir: string): Promise<string | null> {
  try {
    const raw = await fs.readFile(`${dir}/.git/HEAD`)
    const match = raw.toString().match(/^ref: refs\/heads\/(.+)$/m)
    return match ? match[1].trim() : null
  } catch {
    return null
  }
}

export async function resolveAnyRef(fs: MemoryFS, dir: string, ref: string): Promise<string | null> {
  const headN = ref.match(/^HEAD~(\d+)$/)
  if (headN) {
    const index = Number(headN[1])
    try {
      const log = await git.log({ fs: fs as never, dir, depth: index + 2 })
      return log[index]?.oid ?? null
    } catch {
      return null
    }
  }
  for (const candidate of [`refs/heads/${ref}`, `refs/tags/${ref}`, ref]) {
    try {
      return await git.resolveRef({ fs: fs as never, dir, ref: candidate })
    } catch {
      continue
    }
  }
  if (/^[0-9a-f]{4,40}$/.test(ref)) {
    try {
      return await git.expandOid({ fs: fs as never, dir, oid: ref })
    } catch {
      return null
    }
  }
  return null
}

export async function branchOids(fs: MemoryFS, dir: string): Promise<Map<string, string>> {
  const out = new Map<string, string>()
  const branches = await git.listBranches({ fs: fs as never, dir })
  for (const name of branches) {
    try {
      const oid = await git.resolveRef({ fs: fs as never, dir, ref: `refs/heads/${name}` })
      out.set(name, oid)
    } catch {
      continue
    }
  }
  return out
}

export async function writeBranchRef(fs: MemoryFS, dir: string, branch: string, oid: string): Promise<void> {
  await fs.writeFile(`${dir}/.git/refs/heads/${branch}`, `${oid}\n`)
}

export async function writeTrackingRef(
  fs: MemoryFS,
  dir: string,
  remote: string,
  branch: string,
  oid: string
): Promise<void> {
  await fs.writeFile(`${dir}/.git/refs/remotes/${remote}/${branch}`, `${oid}\n`)
}

export async function readTrackingOid(
  fs: MemoryFS,
  dir: string,
  remote: string,
  branch: string
): Promise<string | null> {
  try {
    const raw = await fs.readFile(`${dir}/.git/refs/remotes/${remote}/${branch}`)
    return raw.toString().trim() || null
  } catch {
    return null
  }
}

const REFLOG_PATH = (dir: string): string => `${dir}/.git/logs/HEAD`

export function reflogEntry(oldOid: string, newOid: string, msg: string): string {
  const ts = Math.floor(Date.now() / 1000)
  const tz = -new Date().getTimezoneOffset()
  return `${oldOid} ${newOid} ${AUTHOR.name} <${AUTHOR.email}> ${ts} ${tz}\t${msg}\n`
}

export async function initReflog(fs: MemoryFS, dir: string): Promise<void> {
  try {
    await fs.readFile(REFLOG_PATH(dir))
    return
  } catch {
    // no reflog yet
  }
  try {
    const headOid = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
    const head = await git.readCommit({ fs: fs as never, dir, oid: headOid })
    const headMsg = head.commit.message.split('\n')[0]
    await fs.writeFile(REFLOG_PATH(dir), reflogEntry('0'.repeat(40), headOid, `commit (initial): ${headMsg}`))
  } catch {
    // no commits yet
  }
}

export async function appendReflog(fs: MemoryFS, dir: string, msg: string): Promise<void> {
  let existing = ''
  try {
    existing = (await fs.readFile(REFLOG_PATH(dir))).toString()
  } catch {
    existing = ''
  }
  const newOid = await git.resolveRef({ fs: fs as never, dir, ref: 'HEAD' })
  if (!existing) {
    try {
      const head = await git.readCommit({ fs: fs as never, dir, oid: newOid })
      const headMsg = head.commit.message.split('\n')[0]
      existing = reflogEntry('0'.repeat(40), newOid, `commit (initial): ${headMsg}`)
    } catch {
      existing = ''
    }
  }
  const lines = existing.split('\n').filter(Boolean)
  const last = lines[lines.length - 1]
  const oldOid = last ? last.split(' ')[1] : '0'.repeat(40)
  await fs.writeFile(REFLOG_PATH(dir), `${existing}${reflogEntry(oldOid, newOid, msg)}`)
}

export interface ReflogEntry {
  oldOid: string
  newOid: string
  msg: string
}

export async function readReflog(fs: MemoryFS, dir: string): Promise<ReflogEntry[]> {
  try {
    const raw = await fs.readFile(REFLOG_PATH(dir))
    return raw
      .toString()
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const parts = line.split('\t')
        const [oldOid, newOid] = parts[0].split(' ')
        return { oldOid, newOid, msg: parts[1] ?? '' }
      })
  } catch {
    return []
  }
}

export async function rebaseInProgress(fs: MemoryFS, dir: string): Promise<boolean> {
  return fs
    .readFile(`${dir}/.git/REBASE_HEAD`)
    .then(() => true)
    .catch(() => false)
}

async function rebaseField(fs: MemoryFS, dir: string, name: string): Promise<string | null> {
  try {
    const raw = await fs.readFile(`${dir}/.git/${name}`)
    return raw.toString().trim() || null
  } catch {
    return null
  }
}

export async function rebaseHeadOid(fs: MemoryFS, dir: string): Promise<string | null> {
  return rebaseField(fs, dir, 'REBASE_HEAD')
}

export async function rebaseQueue(fs: MemoryFS, dir: string): Promise<string[]> {
  try {
    const raw = await fs.readFile(`${dir}/.git/REBASE_QUEUE`)
    return raw
      .toString()
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
  } catch {
    return []
  }
}

export async function writeRebaseState(
  fs: MemoryFS,
  dir: string,
  state: { current?: string; queue: string[]; onto: string; origHead: string }
): Promise<void> {
  const gitdir = `${dir}/.git`
  if (state.current) await fs.writeFile(`${gitdir}/REBASE_HEAD`, `${state.current}\n`)
  await fs.writeFile(`${gitdir}/REBASE_QUEUE`, `${state.queue.join('\n')}\n`)
  await fs.writeFile(`${gitdir}/REBASE_ONTO`, `${state.onto}\n`)
  await fs.writeFile(`${gitdir}/REBASE_ORIG_HEAD`, `${state.origHead}\n`)
}

export async function rebaseOnto(fs: MemoryFS, dir: string): Promise<string | null> {
  return rebaseField(fs, dir, 'REBASE_ONTO')
}

export async function rebaseOrigHead(fs: MemoryFS, dir: string): Promise<string | null> {
  return rebaseField(fs, dir, 'REBASE_ORIG_HEAD')
}

export async function endRebase(fs: MemoryFS, dir: string): Promise<void> {
  const gitdir = `${dir}/.git`
  for (const file of ['REBASE_HEAD', 'REBASE_QUEUE', 'REBASE_ONTO', 'REBASE_ORIG_HEAD', 'REBASE_CONFLICTS']) {
    await fs.unlink(`${gitdir}/${file}`).catch(() => {})
  }
}

export async function rebaseConflicts(fs: MemoryFS, dir: string): Promise<string[]> {
  try {
    const raw = await fs.readFile(`${dir}/.git/REBASE_CONFLICTS`)
    return raw
      .toString()
      .split('\n')
      .filter((p) => p.trim().length)
  } catch {
    return []
  }
}

export async function writeRebaseConflicts(fs: MemoryFS, dir: string, paths: string[]): Promise<void> {
  await fs.writeFile(`${dir}/.git/REBASE_CONFLICTS`, `${paths.join('\n')}\n`)
}

export async function readBranchOid(fs: MemoryFS, dir: string, branch: string): Promise<string | null> {
  try {
    const raw = await fs.readFile(`${dir}/.git/refs/heads/${branch}`)
    return raw.toString().trim() || null
  } catch {
    return null
  }
}

export async function cloneRepo(
  fs: MemoryFS,
  fromFs: MemoryFS,
  fromDir: string,
  toDir: string
): Promise<void> {
  await git.init({ fs: fs as never, dir: toDir, defaultBranch: 'main' })
  await git.setConfig({ fs: fs as never, dir: toDir, path: 'user.name', value: AUTHOR.name })
  await git.setConfig({ fs: fs as never, dir: toDir, path: 'user.email', value: AUTHOR.email })
  await copyObjects(fromFs, fromDir, fs, toDir)
  const branches = await branchOids(fromFs, fromDir)
  for (const [name, oid] of branches) {
    await writeBranchRef(fs, toDir, name, oid)
    await writeTrackingRef(fs, toDir, 'origin', name, oid)
  }
  const head = await headBranchOf(fromFs, fromDir)
  if (head) {
    const oid = branches.get(head)
    if (oid) {
      await writeBranchRef(fs, toDir, head, oid)
      const tree = (await git.readCommit({ fs: fromFs as never, dir: fromDir, oid })).commit.tree
      const files = await readTreeFiles(fromFs, fromDir, tree)
      await writeWorkdirFiles(fs, toDir, files)
      await syncIndex(fs, toDir)
    }
  }
  await git.addRemote({ fs: fs as never, dir: toDir, remote: 'origin', url: fromDir })
}

async function writeWorkdirFiles(fs: MemoryFS, dir: string, files: Map<string, string>): Promise<void> {
  for (const [path, content] of files) {
    await fs.writeFile(`${dir}/${path}`, content)
  }
}

export async function buildScenario(fs: MemoryFS, name: ScenarioName): Promise<void> {
  const dir = '/repo'
  if (name === 'init') {
    await write(fs, dir, 'hello.txt', 'hello\n')
    return
  }
  if (
    (STAGE3_SCENARIOS as readonly string[]).includes(name) ||
    (STAGE4_SCENARIOS as readonly string[]).includes(name)
  ) {
    return
  }
  await git.init({ fs: fs as never, dir, defaultBranch: 'main' })
  await git.setConfig({ fs: fs as never, dir, path: 'user.name', value: AUTHOR.name })
  await git.setConfig({ fs: fs as never, dir, path: 'user.email', value: AUTHOR.email })

  if (name === 'add-commit') {
    await write(fs, dir, 'README.md', '# Hello Git\n')
    await commitAll(fs, dir, 'docs: init readme')
    await write(fs, dir, 'hello.txt', 'world\n')
    await commitAll(fs, dir, 'feat: add hello.txt')
    await write(fs, dir, 'hello.txt', 'world!\n')
    await write(fs, dir, 'todo.txt', '- learn git add\n')
    return
  }

  if (name === 'history') {
    await write(fs, dir, 'README.md', '# Project\n')
    await commitAll(fs, dir, 'init: project readme')
    await write(fs, dir, 'src/a.js', 'const a = 1\n')
    await commitAll(fs, dir, 'feat: add module a')
    await write(fs, dir, 'src/a.js', 'const a = 2\n')
    await commitAll(fs, dir, 'fix: correct the value')
    await write(fs, dir, 'src/b.js', 'const b = 3\n')
    await commitAll(fs, dir, 'feat: add module b')
    return
  }

  if (name === 'local') {
    await write(fs, dir, 'hello.txt', 'hello world\n')
    await write(fs, dir, 'notes.txt', 'some notes\n')
    await commitAll(fs, dir, 'chore: add notes')
    await write(fs, dir, 'hello.txt', 'hello git\n')
    return
  }

  if (name === 'branching') {
    await write(fs, dir, 'README.md', '# Project\n')
    await commitAll(fs, dir, 'docs: init readme')
    await write(fs, dir, 'hello.txt', 'hello\n')
    await commitAll(fs, dir, 'feat: add hello')
    await write(fs, dir, 'hello.txt', 'hello world\n')
    await commitAll(fs, dir, 'fix: greet the world')
    return
  }

  if (name === 'merge-ff') {
    await write(fs, dir, 'README.md', '# Project\n')
    await commitAll(fs, dir, 'docs: init readme')
    await write(fs, dir, 'hello.txt', 'hello\n')
    await commitAll(fs, dir, 'feat: add hello')
    await git.branch({ fs: fs as never, dir, ref: 'feature', checkout: true })
    await write(fs, dir, 'feature.txt', 'feature work\n')
    await commitAll(fs, dir, 'feat: feature work')
    await git.checkout({ fs: fs as never, dir, ref: 'main' })
    return
  }

  if (name === 'merge') {
    await write(fs, dir, 'README.md', '# Project\n')
    await commitAll(fs, dir, 'docs: init readme')
    await git.branch({ fs: fs as never, dir, ref: 'feature', checkout: true })
    await write(fs, dir, 'feature.txt', 'feature work\n')
    await commitAll(fs, dir, 'feat: feature work')
    await git.checkout({ fs: fs as never, dir, ref: 'main' })
    await write(fs, dir, 'main.txt', 'main work\n')
    await commitAll(fs, dir, 'feat: main work')
    return
  }

  await write(fs, dir, 'README.md', '# Project\n')
  await commitAll(fs, dir, 'docs: init readme')
  await write(fs, dir, 'hello.txt', 'hello world\n')
  await commitAll(fs, dir, 'feat: add hello')
  await git.branch({ fs: fs as never, dir, ref: 'feature', checkout: true })
  await write(fs, dir, 'hello.txt', 'hello feature\n')
  await write(fs, dir, 'notes.txt', 'notes from feature\n')
  await commitAll(fs, dir, 'feat: feature version')
  await git.checkout({ fs: fs as never, dir, ref: 'main' })
  await write(fs, dir, 'hello.txt', 'hello main\n')
  await commitAll(fs, dir, 'fix: main version')
}

export async function buildRepairScenario(fs: MemoryFS, name: ScenarioName): Promise<void> {
  const dir = '/repo'
  if (!(STAGE4_SCENARIOS as readonly string[]).includes(name)) {
    return
  }
  await git.init({ fs: fs as never, dir, defaultBranch: 'main' })
  await git.setConfig({ fs: fs as never, dir, path: 'user.name', value: AUTHOR.name })
  await git.setConfig({ fs: fs as never, dir, path: 'user.email', value: AUTHOR.email })

  if (name === 'stash') {
    await write(fs, dir, 'hello.txt', 'hello world\n')
    await commitAll(fs, dir, 'chore: add notes')
    await write(fs, dir, 'hello.txt', 'hello git\n')
    return
  }

  if (name === 'tag') {
    await write(fs, dir, 'README.md', '# Project\n')
    await commitAll(fs, dir, 'docs: init readme')
    await write(fs, dir, 'hello.txt', 'hello\n')
    await commitAll(fs, dir, 'feat: add hello')
    return
  }

  if (name === 'reset' || name === 'revert') {
    await write(fs, dir, 'README.md', '# Project\n')
    await commitAll(fs, dir, 'docs: init readme')
    await write(fs, dir, 'hello.txt', 'hello world\n')
    await commitAll(fs, dir, 'feat: add hello')
    await write(fs, dir, 'hello.txt', 'hello broken\n')
    await commitAll(fs, dir, 'fix: break hello')
    return
  }

  if (name === 'cherry-pick') {
    await write(fs, dir, 'README.md', '# Project\n')
    await commitAll(fs, dir, 'docs: init readme')
    await write(fs, dir, 'main.txt', 'main work\n')
    await commitAll(fs, dir, 'feat: main work')
    await git.branch({ fs: fs as never, dir, ref: 'feature' })
    await git.checkout({ fs: fs as never, dir, ref: 'feature' })
    await write(fs, dir, 'feature.txt', 'feature work\n')
    await commitAll(fs, dir, 'feat: feature work')
    await git.checkout({ fs: fs as never, dir, ref: 'main' })
    return
  }

  if (name === 'rebase') {
    await write(fs, dir, 'README.md', '# Project\n')
    await commitAll(fs, dir, 'docs: init readme')
    await git.branch({ fs: fs as never, dir, ref: 'feature', checkout: true })
    await write(fs, dir, 'feature.txt', 'feature work\n')
    await commitAll(fs, dir, 'feat: feature work')
    await git.checkout({ fs: fs as never, dir, ref: 'main' })
    await write(fs, dir, 'main.txt', 'main work\n')
    await commitAll(fs, dir, 'feat: main work')
    return
  }

  if (name === 'clean') {
    await write(fs, dir, 'README.md', '# Project\n')
    await commitAll(fs, dir, 'docs: init readme')
    await write(fs, dir, 'hello.txt', 'hello world\n')
    await commitAll(fs, dir, 'feat: add hello')
    await write(fs, dir, 'scratch.txt', 'temporary notes\n')
    await write(fs, dir, 'todo.tmp', 'leftover file\n')
    return
  }

  if (name === 'bisect') {
    await write(fs, dir, 'calc.js', 'function add(a, b) { return a + b; }\n')
    await commitAll(fs, dir, 'feat: add function')
    await write(fs, dir, 'calc.js', 'function add(a, b) { return a + b; }\nfunction sub(a, b) { return a - b; }\n')
    await commitAll(fs, dir, 'feat: add subtract')
    await write(fs, dir, 'calc.js', 'function add(a, b) { return a - b; }\nfunction sub(a, b) { return a - b; }\n')
    await commitAll(fs, dir, 'fix: typo in add')
    await write(fs, dir, 'calc.js', 'function add(a, b) { return a - b; }\nfunction sub(a, b) { return a - b; }\nfunction mul(a, b) { return a * b; }\n')
    await commitAll(fs, dir, 'feat: add multiply')
    await write(fs, dir, 'calc.js', 'function add(a, b) { return a - b; }\nfunction sub(a, b) { return a - b; }\nfunction mul(a, b) { return a * b; }\nfunction div(a, b) { return a / b; }\n')
    await commitAll(fs, dir, 'feat: add divide')
    return
  }

  await write(fs, dir, 'README.md', '# Project\n')
  await commitAll(fs, dir, 'docs: init readme')
  await git.branch({ fs: fs as never, dir, ref: 'feature', checkout: true })
  await write(fs, dir, 'hello.txt', 'hello feature\n')
  await write(fs, dir, 'notes.txt', 'notes from feature\n')
  await commitAll(fs, dir, 'feat: feature version')
  await git.checkout({ fs: fs as never, dir, ref: 'main' })
  await write(fs, dir, 'hello.txt', 'hello main\n')
  await commitAll(fs, dir, 'fix: main version')
}

export async function buildRemoteScenario(
  fs: MemoryFS,
  remoteFs: MemoryFS,
  name: ScenarioName
): Promise<void> {
  const dir = '/repo'
  const remoteDir = '/origin'
  if (!(STAGE3_SCENARIOS as readonly string[]).includes(name)) {
    return
  }

  if (name === 'remote') {
    await git.init({ fs: fs as never, dir, defaultBranch: 'main' })
    await git.setConfig({ fs: fs as never, dir, path: 'user.name', value: AUTHOR.name })
    await git.setConfig({ fs: fs as never, dir, path: 'user.email', value: AUTHOR.email })
    await write(fs, dir, 'README.md', '# Project\n')
    await commitAll(fs, dir, 'docs: init readme')
    await write(fs, dir, 'hello.txt', 'hello\n')
    await commitAll(fs, dir, 'feat: add hello')
    return
  }

  await git.init({ fs: remoteFs as never, dir: remoteDir, defaultBranch: 'main' })
  await git.setConfig({ fs: remoteFs as never, dir: remoteDir, path: 'user.name', value: AUTHOR.name })
  await git.setConfig({ fs: remoteFs as never, dir: remoteDir, path: 'user.email', value: AUTHOR.email })

  if (name === 'clone') {
    await write(remoteFs, remoteDir, 'README.md', '# Hello\n')
    await commitAll(remoteFs, remoteDir, 'docs: init readme')
    await write(remoteFs, remoteDir, 'hello.txt', 'hello remote\n')
    await commitAll(remoteFs, remoteDir, 'feat: add hello')
    return
  }

  if (name === 'push') {
    await write(remoteFs, remoteDir, 'README.md', '# Hello\n')
    await commitAll(remoteFs, remoteDir, 'docs: init readme')
    await cloneRepo(fs, remoteFs, remoteDir, dir)
    await write(fs, dir, 'local.txt', 'local work\n')
    await commitAll(fs, dir, 'feat: local work')
    return
  }

  if (name === 'pull-ff') {
    await write(remoteFs, remoteDir, 'README.md', '# Hello\n')
    await commitAll(remoteFs, remoteDir, 'docs: init readme')
    await write(remoteFs, remoteDir, 'hello.txt', 'hello\n')
    await commitAll(remoteFs, remoteDir, 'feat: add hello')
    await cloneRepo(fs, remoteFs, remoteDir, dir)
    await write(remoteFs, remoteDir, 'remote.txt', 'remote work\n')
    await commitAll(remoteFs, remoteDir, 'feat: remote work')
    return
  }

  await write(remoteFs, remoteDir, 'README.md', '# Hello\n')
  await commitAll(remoteFs, remoteDir, 'docs: init readme')
  await write(remoteFs, remoteDir, 'hello.txt', 'hello\n')
  await commitAll(remoteFs, remoteDir, 'feat: add hello')
  await cloneRepo(fs, remoteFs, remoteDir, dir)
  await write(remoteFs, remoteDir, 'remote.txt', 'remote work\n')
  await commitAll(remoteFs, remoteDir, 'feat: remote work')
  await write(fs, dir, 'local.txt', 'local work\n')
  await commitAll(fs, dir, 'feat: local work')
}

export class Session {
  fs: MemoryFS = new MemoryFS()
  remoteFs: MemoryFS = new MemoryFS()
  dir = '/repo'
  remoteDir = '/origin'

  private constructor() {}

  static async create(name: ScenarioName): Promise<Session> {
    const session = new Session()
    await session.reset(name)
    return session
  }

  async reset(name: ScenarioName): Promise<void> {
    this.fs = new MemoryFS()
    this.remoteFs = new MemoryFS()
    this.dir = '/repo'
    await buildScenario(this.fs, name)
    await buildRepairScenario(this.fs, name)
    await buildRemoteScenario(this.fs, this.remoteFs, name)
    await initReflog(this.fs, this.dir)
  }
}
