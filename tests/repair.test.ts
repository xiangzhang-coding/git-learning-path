import { describe, expect, it } from 'vitest'
import { Session, runChecks, runGit, type ScenarioName } from '../docs/.vitepress/theme/lib/playground'

async function exec(session: Session, input: string): Promise<string> {
  const result = await runGit(session, input)
  return result.out.join('\n')
}

async function commitAll(session: Session, message: string): Promise<void> {
  await runGit(session, 'git add .')
  await runGit(session, `git commit -m "${message}"`)
}

describe('git tag', () => {
  it('creates a lightweight tag and lists it', async () => {
    const session = await Session.create('tag')
    const out = await exec(session, 'git tag v1.0')
    expect(out).toBe('')
    const listed = await exec(session, 'git tag')
    expect(listed).toContain('v1.0')
    const head = await session.fs.readFile('/repo/.git/refs/heads/main')
    const tag = await session.fs.readFile('/repo/.git/refs/tags/v1.0')
    expect(tag.toString().trim()).toBe(head.toString().trim())
  })

  it('creates an annotated tag with -a -m', async () => {
    const session = await Session.create('tag')
    await exec(session, 'git tag -a v1.1 -m "release notes"')
    const listed = await exec(session, 'git tag')
    expect(listed).toContain('v1.1')
  })

  it('rejects duplicate tags', async () => {
    const session = await Session.create('tag')
    await exec(session, 'git tag v1.0')
    const out = await exec(session, 'git tag v1.0')
    expect(out).toContain('fatal: tag \'v1.0\' already exists')
  })
})

describe('git stash', () => {
  it('stashes changes and restores a clean tree', async () => {
    const session = await Session.create('stash')
    const before = await exec(session, 'git status')
    expect(before).toMatch(/modified:\s+hello\.txt/)
    const out = await exec(session, 'git stash')
    expect(out).toContain('Saved working directory')
    const status = await exec(session, 'git status')
    expect(status).toContain('nothing to commit')
    const content = await session.fs.readFile('/repo/hello.txt')
    expect(content.toString()).toContain('hello world')
  })

  it('lists stashes and pops them back', async () => {
    const session = await Session.create('stash')
    await exec(session, 'git stash')
    const list = await exec(session, 'git stash list')
    expect(list).toContain('stash@{0}')
    const pop = await exec(session, 'git stash pop')
    expect(pop).toContain('Dropped stash@{0}')
    const status = await exec(session, 'git status')
    expect(status).toMatch(/modified:\s+hello\.txt/)
    const content = await session.fs.readFile('/repo/hello.txt')
    expect(content.toString()).toContain('hello git')
  })

  it('refuses to stash a clean tree', async () => {
    const session = await Session.create('tag')
    const out = await exec(session, 'git stash')
    expect(out).toContain('No local changes to save')
  })
})

describe('git reset', () => {
  it('reset --hard moves HEAD, worktree and index', async () => {
    const session = await Session.create('reset')
    const log = await exec(session, 'git log --oneline')
    const target = log.split('\n')[1].split(' ')[0]
    const out = await exec(session, `git reset --hard ${target}`)
    expect(out).toContain('HEAD is now at')
    const after = await exec(session, 'git log --oneline')
    expect(after.split('\n')).toHaveLength(2)
    const content = await session.fs.readFile('/repo/hello.txt')
    expect(content.toString()).toContain('hello world')
    const status = await exec(session, 'git status')
    expect(status).toContain('nothing to commit')
  })

  it('reset (mixed) keeps the working tree changes', async () => {
    const session = await Session.create('reset')
    const log = await exec(session, 'git log --oneline')
    const target = log.split('\n')[1].split(' ')[0]
    await exec(session, `git reset ${target}`)
    const status = await exec(session, 'git status')
    expect(status).toMatch(/modified:\s+hello\.txt/)
    const content = await session.fs.readFile('/repo/hello.txt')
    expect(content.toString()).toContain('hello broken')
  })

  it('reset --soft keeps the index', async () => {
    const session = await Session.create('reset')
    const log = await exec(session, 'git log --oneline')
    const target = log.split('\n')[1].split(' ')[0]
    await exec(session, `git reset --soft ${target}`)
    const status = await exec(session, 'git status')
    expect(status).toContain('Changes to be committed:')
  })

  it('accepts HEAD~n syntax', async () => {
    const session = await Session.create('reset')
    const out = await exec(session, 'git reset --hard HEAD~1')
    expect(out).toContain('HEAD is now at')
    const log = await exec(session, 'git log --oneline')
    expect(log.split('\n')).toHaveLength(2)
  })
})

describe('git revert', () => {
  it('reverts a commit with a new commit', async () => {
    const session = await Session.create('revert')
    const log = await exec(session, 'git log --oneline')
    const bad = log.split('\n')[0].split(' ')[0]
    const out = await exec(session, `git revert ${bad}`)
    expect(out).toContain('[main')
    expect(out).toContain('Revert')
    const content = await session.fs.readFile('/repo/hello.txt')
    expect(content.toString()).toContain('hello world')
    const status = await exec(session, 'git status')
    expect(status).toContain('nothing to commit')
  })
})

describe('git cherry-pick', () => {
  it('copies a commit onto the current branch', async () => {
    const session = await Session.create('cherry-pick')
    await exec(session, 'git switch main')
    const log = await exec(session, 'git log feature --oneline')
    const target = log.split('\n')[0].split(' ')[0]
    const out = await exec(session, `git cherry-pick ${target}`)
    expect(out).toContain('[main')
    const content = await session.fs.readFile('/repo/feature.txt')
    expect(content.toString()).toContain('feature work')
    const status = await exec(session, 'git status')
    expect(status).toContain('nothing to commit')
  })
})

describe('git rebase', () => {
  it('replays commits onto the target branch', async () => {
    const session = await Session.create('rebase')
    await exec(session, 'git switch feature')
    const out = await exec(session, 'git rebase main')
    expect(out).toContain('Successfully rebased')
    const log = await exec(session, 'git log --oneline')
    const lines = log.split('\n')
    expect(lines).toHaveLength(3)
    expect(lines[0]).toContain('feat: feature work')
    const result = await runChecks(session, [
      { type: 'mergeDone', branch: 'main' },
      { type: 'noMergeCommit' },
      { type: 'hasCommit', messageContains: 'feature' }
    ])
    expect(result.pass).toBe(true)
    const content = await session.fs.readFile('/repo/feature.txt')
    expect(content.toString()).toContain('feature work')
  })

  it('aborts on conflict and restores the original state', async () => {
    const session = await Session.create('rebase-conflict')
    await exec(session, 'git switch feature')
    const out = await exec(session, 'git rebase main')
    expect(out).toContain('CONFLICT')
    const aborted = await exec(session, 'git rebase --abort')
    expect(aborted).toContain('Successfully aborted')
    const log = await exec(session, 'git log --oneline')
    expect(log.split('\n')).toHaveLength(2)
    const content = await session.fs.readFile('/repo/hello.txt')
    expect(content.toString()).toContain('hello feature')
  })
})

describe('git reflog', () => {
  it('records HEAD moves and allows recovery', async () => {
    const session = await Session.create('reset')
    const log = await exec(session, 'git log --oneline')
    const target = log.split('\n')[1].split(' ')[0]
    await exec(session, `git reset --hard ${target}`)
    const reflog = await exec(session, 'git reflog')
    expect(reflog).toContain('HEAD@{0}')
    expect(reflog).toContain('reset:')
    const lines = reflog.split('\n')
    const recovered = lines.find((l) => l.includes('fix: break hello')) ?? ''
    const sha = recovered.split(' ')[0]
    await exec(session, `git reset --hard ${sha}`)
    const content = await session.fs.readFile('/repo/hello.txt')
    expect(content.toString()).toContain('hello broken')
  })
})

describe('stage-4 checks', () => {
  it('tagExists passes after creating a tag', async () => {
    const session = await Session.create('tag')
    const before = await runChecks(session, [{ type: 'tagExists', name: 'v1.0' }])
    expect(before.pass).toBe(false)
    await exec(session, 'git tag v1.0')
    const after = await runChecks(session, [{ type: 'tagExists', name: 'v1.0' }])
    expect(after.pass).toBe(true)
  })

  it('headAt passes after reset --hard', async () => {
    const session = await Session.create('reset')
    const log = await exec(session, 'git log --oneline')
    const target = log.split('\n')[1].split(' ')[0]
    const before = await runChecks(session, [{ type: 'headAt', ref: target }])
    expect(before.pass).toBe(false)
    await exec(session, `git reset --hard ${target}`)
    const after = await runChecks(session, [{ type: 'headAt', ref: target }])
    expect(after.pass).toBe(true)
  })
})

describe('stage-4 scenarios', () => {
  const names: ScenarioName[] = ['stash', 'tag', 'reset', 'revert', 'cherry-pick', 'rebase', 'rebase-conflict']
  for (const name of names) {
    it(`${name} builds without error`, async () => {
      const session = await Session.create(name)
      expect(session.fs.fileList().length).toBeGreaterThanOrEqual(1)
      const status = await exec(session, 'git status')
      expect(status.length).toBeGreaterThan(0)
    })
  }
})
