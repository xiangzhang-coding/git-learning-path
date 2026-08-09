import { describe, expect, it } from 'vitest'
import { Session, runChecks, runGit, sessionSnapshot, type ScenarioName } from '../docs/.vitepress/theme/lib/playground'

async function exec(session: Session, input: string): Promise<string> {
  const result = await runGit(session, input)
  return result.out.join('\n')
}

async function commitAll(session: Session, message: string): Promise<void> {
  await runGit(session, 'git add .')
  await runGit(session, `git commit -m "${message}"`)
}

describe('playground command engine', () => {
  it('init creates a repository and status reports the branch', async () => {
    const session = await Session.create('init')
    const out = await exec(session, 'git init')
    expect(out).toContain('Initialized empty Git repository')
    const status = await exec(session, 'git status')
    expect(status).toContain('On branch main')
    expect(status).toContain('Untracked files')
  })

  it('status on a non-repo prints a fatal error', async () => {
    const session = await Session.create('init')
    await exec(session, 'git rm -r --cached .git')
    const fs = session.fs
    for (const key of fs.fileList()) {
      if (key.startsWith('.git/')) await fs.unlink(key)
    }
    const out = await exec(session, 'git status')
    expect(out).toContain('fatal: not a git repository')
  })

  it('add + commit + log produce a linear history', async () => {
    const session = await Session.create('init')
    await exec(session, 'git init')
    await session.fs.writeFile('/repo/hello.txt', 'hello\n')
    await exec(session, 'git add hello.txt')
    await exec(session, 'git commit -m "feat: hello"')
    await session.fs.writeFile('/repo/hello.txt', 'hello world\n')
    await exec(session, 'git add .')
    await exec(session, 'git commit -m "fix: greet world"')
    const log = await exec(session, 'git log --oneline')
    const lines = log.split('\n')
    expect(lines).toHaveLength(2)
    expect(lines[0]).toMatch(/fix: greet world$/)
    expect(lines[1]).toMatch(/feat: hello$/)
  })

  it('status reports staged, unstaged and untracked changes', async () => {
    const session = await Session.create('init')
    await exec(session, 'git init')
    await session.fs.writeFile('/repo/a.txt', 'a\n')
    await exec(session, 'git add a.txt')
    await session.fs.writeFile('/repo/b.txt', 'b\n')
    await session.fs.writeFile('/repo/c.txt', 'c\n')
    await exec(session, 'git add c.txt')
    await exec(session, 'git commit -m "first"')
    await session.fs.writeFile('/repo/a.txt', 'a2\n')
    await session.fs.writeFile('/repo/b.txt', 'b2\n')
    await session.fs.writeFile('/repo/d.txt', 'd\n')
    const status = await exec(session, 'git status')
    expect(status).toContain('Changes not staged for commit:')
    expect(status).toMatch(/modified:\s+a\.txt/)
    expect(status).toContain('Untracked files:')
    expect(status).toMatch(/b\.txt/)
    expect(status).toMatch(/d\.txt/)
    expect(status).not.toContain('Changes to be committed:')
  })

  it('commit with nothing staged reports clean', async () => {
    const session = await Session.create('init')
    await exec(session, 'git init')
    const out = await exec(session, 'git commit -m "nothing"')
    expect(out).toContain('nothing to commit')
  })

  it('diff shows content changes between HEAD and workdir', async () => {
    const session = await Session.create('add-commit')
    const out = await exec(session, 'git diff')
    expect(out).toContain('diff --git a/hello.txt b/hello.txt')
    expect(out).toContain('-world')
    expect(out).toContain('+world!')
  })

  it('diff --staged shows staged changes only', async () => {
    const session = await Session.create('add-commit')
    await exec(session, 'git add hello.txt')
    const staged = await exec(session, 'git diff --staged')
    expect(staged).toContain('diff --git a/hello.txt b/hello.txt')
    expect(staged.match(/diff --git/g)).toHaveLength(1)
    const unstaged = await exec(session, 'git diff')
    expect(unstaged).toBe('')
  })

  it('diff --staged shows the staged version, not the working tree', async () => {
    const session = await Session.create('add-commit')
    await exec(session, 'git add hello.txt')
    await session.fs.writeFile('/repo/hello.txt', 'edited after add\n')
    const staged = await exec(session, 'git diff --staged')
    expect(staged).toContain('+world!')
    expect(staged).not.toContain('edited after add')
    const unstaged = await exec(session, 'git diff')
    expect(unstaged).toContain('-world!')
    expect(unstaged).toContain('+edited after add')
  })

  it('config sets and reads values in the repo', async () => {
    const session = await Session.create('init')
    await exec(session, 'git init')
    await exec(session, 'git config user.name "Ada Lovelace"')
    const name = await exec(session, 'git config user.name')
    expect(name).toContain('Ada Lovelace')
    const missing = await exec(session, 'git config no.such.key')
    expect(missing).toBe('')
  })

  it('help lists the available playground commands', async () => {
    const session = await Session.create('init')
    const out = await exec(session, 'git help')
    expect(out).toContain('git status')
    expect(out).toContain('git commit -m')
    expect(out).toContain('git rebase')
    expect(out).toContain('git reflog')
  })

  it('restore discards working tree changes', async () => {
    const session = await Session.create('local')
    await exec(session, 'git restore hello.txt')
    const content = await session.fs.readFile('/repo/hello.txt')
    expect(content.toString()).toBe('hello world\n')
    const status = await exec(session, 'git status')
    expect(status).toContain('nothing to commit')
  })

  it('restore --staged only unstages without touching the working tree', async () => {
    const session = await Session.create('local')
    await exec(session, 'git add hello.txt')
    await exec(session, 'git restore --staged hello.txt')
    const content = await session.fs.readFile('/repo/hello.txt')
    expect(content.toString()).toBe('hello git\n')
    const status = await exec(session, 'git status')
    expect(status).toMatch(/modified:\s+hello\.txt/)
    expect(status).not.toContain('Changes to be committed:')
  })

  it('rm deletes the file and stages the deletion', async () => {
    const session = await Session.create('local')
    const out = await exec(session, 'git rm notes.txt')
    expect(out).toContain("rm 'notes.txt'")
    const status = await exec(session, 'git status')
    expect(status).toContain('deleted:')
  })

  it('mv renames and stages the change', async () => {
    const session = await Session.create('local')
    await exec(session, 'git mv notes.txt diary.txt')
    const exists = await session.fs
      .stat('/repo/diary.txt')
      .then(() => true)
      .catch(() => false)
    expect(exists).toBe(true)
    const status = await exec(session, 'git status')
    expect(status).toContain('diary.txt')
  })

  it('add with a directory path stages its contents', async () => {
    const session = await Session.create('init')
    await exec(session, 'git init')
    await session.fs.writeFile('/repo/src/a.js', 'const a = 1\n')
    await exec(session, 'git add src')
    const status = await exec(session, 'git status')
    expect(status).toContain('new file:')
  })

  it('unknown commands and bad flags produce git-style errors', async () => {
    const session = await Session.create('init')
    const out = await exec(session, 'git squash main')
    expect(out).toContain("is not a git command")
    const bad = await exec(session, 'git commit -m')
    expect(bad).toContain('fatal')
  })

  it('quoted arguments with spaces survive parsing', async () => {
    const session = await Session.create('init')
    await exec(session, 'git init')
    await session.fs.writeFile('/repo/f.txt', 'x\n')
    await exec(session, 'git add f.txt')
    await exec(session, 'git commit -m "feat: add file with spaces"')
    const log = await exec(session, 'git log --oneline')
    expect(log).toContain('feat: add file with spaces')
  })

  it('snapshot survives an unborn HEAD after git init', async () => {
    const session = await Session.create('init')
    await exec(session, 'git init')
    const snap = await sessionSnapshot(session)
    expect(snap.branch).toBe('main')
    expect(snap.commits).toEqual([])
    expect(Array.isArray(snap.graph)).toBe(true)
  })
})

describe('scenarios', () => {
  it('add-commit scenario is dirty with staged, modified and untracked files', async () => {
    const session = await Session.create('add-commit')
    const status = await exec(session, 'git status')
    expect(status).toContain('Changes not staged for commit:')
    expect(status).toContain('Untracked files:')
    expect(status).toMatch(/modified:\s+hello\.txt/)
  })

  it('history scenario has four commits', async () => {
    const session = await Session.create('history')
    const log = await exec(session, 'git log --oneline')
    expect(log.split('\n')).toHaveLength(4)
  })

  it('local scenario has one commit and a dirty file', async () => {
    const session = await Session.create('local')
    const log = await exec(session, 'git log --oneline')
    expect(log.split('\n')).toHaveLength(1)
    const status = await exec(session, 'git status')
    expect(status).toMatch(/modified:\s+hello\.txt/)
  })
})

describe('task checks', () => {
  it('passes a complete commit task', async () => {
    const session = await Session.create('init')
    await exec(session, 'git init')
    await session.fs.writeFile('/repo/hello.txt', 'hello\n')
    await commitAll(session, 'feat: add hello')
    const result = await runChecks(session, [
      { type: 'hasCommit', messageContains: 'hello' },
      { type: 'fileCommitted', path: 'hello.txt' }
    ])
    expect(result.pass).toBe(true)
  })

  it('fails when the commit is missing', async () => {
    const session = await Session.create('init')
    await exec(session, 'git init')
    const result = await runChecks(session, [{ type: 'hasCommit', messageContains: 'hello' }])
    expect(result.pass).toBe(false)
  })

  it('statusClean fails on a dirty tree', async () => {
    const session = await Session.create('local')
    const result = await runChecks(session, [{ type: 'statusClean' }])
    expect(result.pass).toBe(false)
  })

  it('fileStaged passes after git add', async () => {
    const session = await Session.create('init')
    await exec(session, 'git init')
    await exec(session, 'git add hello.txt')
    const result = await runChecks(session, [{ type: 'fileStaged', path: 'hello.txt' }])
    expect(result.pass).toBe(true)
    await exec(session, 'git restore --staged hello.txt')
  })

  it('fileDeleted passes after git rm', async () => {
    const session = await Session.create('local')
    await exec(session, 'git rm notes.txt')
    const result = await runChecks(session, [{ type: 'fileDeleted', path: 'notes.txt' }])
    expect(result.pass).toBe(true)
  })

  it('fileRenamed passes after git mv', async () => {
    const session = await Session.create('local')
    await exec(session, 'git mv notes.txt diary.txt')
    const result = await runChecks(session, [{ type: 'fileRenamed', from: 'notes.txt', to: 'diary.txt' }])
    expect(result.pass).toBe(true)
  })

  it('reset restores a fresh scenario', async () => {
    const session = await Session.create('local')
    await exec(session, 'git rm notes.txt')
    await session.reset('local')
    const exists = await session.fs
      .stat('/repo/notes.txt')
      .then(() => true)
      .catch(() => false)
    expect(exists).toBe(true)
  })

  it('configIs check reads local config', async () => {
    const session = await Session.create('init')
    await exec(session, 'git init')
    await exec(session, 'git config user.name "Tester"')
    const result = await runChecks(session, [{ type: 'configIs', key: 'user.name', value: 'Tester' }])
    expect(result.pass).toBe(true)
  })
})

describe('scenario names used by lessons exist', () => {
  const names: ScenarioName[] = ['init', 'add-commit', 'history', 'local']
  for (const name of names) {
    it(`${name} builds without error`, async () => {
      const session = await Session.create(name)
      expect(session.fs.fileList().length).toBeGreaterThanOrEqual(1)
    })
  }
})
