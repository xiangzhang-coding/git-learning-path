import * as git from 'isomorphic-git'
import { MemoryFS } from './fs'

export const AUTHOR = { name: 'Learner', email: 'learner@example.com' }

export type ScenarioName = 'init' | 'add-commit' | 'history' | 'local'

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

  await write(fs, dir, 'hello.txt', 'hello world\n')
  await write(fs, dir, 'notes.txt', 'some notes\n')
  await commitAll(fs, dir, 'chore: add notes')
  await write(fs, dir, 'hello.txt', 'hello git\n')
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
