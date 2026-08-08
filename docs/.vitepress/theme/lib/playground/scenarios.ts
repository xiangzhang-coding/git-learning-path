import * as git from 'isomorphic-git'
import { Buffer } from 'buffer'
import { MemoryFS } from './fs'

globalThis.Buffer = Buffer

export const AUTHOR = { name: 'Learner', email: 'learner@example.com' }

export const NOT_A_REPO = 'fatal: not a git repository (or any of the parent directories): .git'

export type ScenarioName = 'init' | 'add-commit' | 'history' | 'local' | 'branching' | 'merge-ff' | 'merge' | 'conflict'

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

export async function buildScenario(fs: MemoryFS, name: ScenarioName): Promise<void> {
  const dir = '/repo'
  if (name === 'init') {
    await write(fs, dir, 'hello.txt', 'hello\n')
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

export class Session {
  fs: MemoryFS = new MemoryFS()
  dir = '/repo'

  private constructor() {}

  static async create(name: ScenarioName): Promise<Session> {
    const session = new Session()
    await session.reset(name)
    return session
  }

  async reset(name: ScenarioName): Promise<void> {
    this.fs = new MemoryFS()
    await buildScenario(this.fs, name)
  }
}
