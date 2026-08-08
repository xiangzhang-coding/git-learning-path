import * as git from 'isomorphic-git'
import { Buffer } from 'buffer'
import { MemoryFS } from './fs'
import { readTreeFiles, syncIndex } from './merge'

globalThis.Buffer = Buffer

export const AUTHOR = { name: 'Learner', email: 'learner@example.com' }

export const NOT_A_REPO = 'fatal: not a git repository (or any of the parent directories): .git'

export const STAGE3_SCENARIOS = ['remote', 'clone', 'push', 'pull-ff', 'pull'] as const

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
    const tree = await git.readTree({ fs: fs as never, dir, oid: commit.commit.tree })
    const entry = tree.tree.find((e: { path: string }) => e.path === filepath)
    if (!entry) return null
    const blob = await git.readBlob({ fs: fs as never, dir, oid: entry.oid })
    return new TextDecoder().decode(blob.blob)
  } catch {
    return null
  }
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
  for (const candidate of [`refs/heads/${ref}`, ref]) {
    try {
      return await git.resolveRef({ fs: fs as never, dir, ref: candidate })
    } catch {
      continue
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
  if ((STAGE3_SCENARIOS as readonly string[]).includes(name)) {
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
    await buildRemoteScenario(this.fs, this.remoteFs, name)
  }
}
