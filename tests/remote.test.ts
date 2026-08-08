import { describe, expect, it } from 'vitest'
import { Session, runChecks, runGit, type ScenarioName } from '../docs/.vitepress/theme/lib/playground'

async function exec(session: Session, input: string): Promise<string> {
  const result = await runGit(session, input)
  return result.out.join('\n')
}

async function remoteBranchOid(session: Session, branch: string): Promise<string | null> {
  const { remoteFs, remoteDir } = session
  try {
    const raw = await remoteFs.readFile(`${remoteDir}/.git/refs/heads/${branch}`)
    return raw.toString().trim()
  } catch {
    return null
  }
}

describe('git remote', () => {
  it('adds a remote and lists it with -v', async () => {
    const session = await Session.create('remote')
    const out = await exec(session, 'git remote add origin /origin')
    expect(out).toBe('')
    const listed = await exec(session, 'git remote -v')
    expect(listed).toContain('origin')
    expect(listed).toContain('/origin')
    expect(listed).toContain('(fetch)')
    expect(listed).toContain('(push)')
  })

  it('refuses to re-add an existing remote', async () => {
    const session = await Session.create('remote')
    await exec(session, 'git remote add origin /origin')
    const out = await exec(session, 'git remote add origin /other')
    expect(out).toContain('fatal: remote origin already exists')
  })

  it('lists remotes without arguments', async () => {
    const session = await Session.create('remote')
    await exec(session, 'git remote add origin /origin')
    const out = await exec(session, 'git remote')
    expect(out).toBe('origin')
  })
})

describe('git clone', () => {
  it('clones into a subdirectory with working tree and origin', async () => {
    const session = await Session.create('clone')
    const out = await exec(session, 'git clone /origin')
    expect(out).toContain("Cloning into '/repo/origin'")
    await exec(session, 'cd origin')
    const status = await exec(session, 'git status')
    expect(status).toContain('On branch main')
    expect(status).toContain('nothing to commit')
    const content = await session.fs.readFile('/repo/origin/README.md')
    expect(content.toString()).toContain('# Hello')
    const log = await exec(session, 'git log --oneline')
    expect(log.split('\n')).toHaveLength(2)
    const remotes = await exec(session, 'git remote -v')
    expect(remotes).toContain('/origin')
  })

  it('rejects cloning into a non-empty directory', async () => {
    const session = await Session.create('clone')
    await session.fs.writeFile('/repo/existing.txt', 'x\n')
    const out = await exec(session, 'git clone /origin /repo')
    expect(out).toContain('already exists and is not an empty directory')
  })

  it('clone keeps the local repository separate', async () => {
    const session = await Session.create('clone')
    await exec(session, 'git clone /origin')
    const exists = await session.fs
      .stat('/repo/origin/.git')
      .then(() => true)
      .catch(() => false)
    expect(exists).toBe(true)
  })
})

describe('git push', () => {
  it('pushes a new branch to the remote', async () => {
    const session = await Session.create('push')
    const before = await remoteBranchOid(session, 'main')
    expect(before).not.toBeNull()
    const local = await session.fs.readFile('/repo/.git/refs/heads/main')
    const localOid = local.toString().trim()
    const out = await exec(session, 'git push')
    expect(out).toContain('To /origin')
    expect(out).toMatch(/main -> main/)
    expect(await remoteBranchOid(session, 'main')).toBe(localOid)
  })

  it('rejects a non-fast-forward push', async () => {
    const session = await Session.create('push')
    await exec(session, 'git push')
    const { remoteFs, remoteDir } = session
    await remoteFs.writeFile(`${remoteDir}/remote.txt`, 'remote change\n')
    const r = await import('../docs/.vitepress/theme/lib/playground')
    void r
    const git = (await import('isomorphic-git')) as typeof import('isomorphic-git')
    await git.add({ fs: remoteFs as never, dir: remoteDir, filepath: 'remote.txt' })
    await git.commit({ fs: remoteFs as never, dir: remoteDir, author: { name: 'Learner', email: 'learner@example.com' }, message: 'feat: remote change' })
    const out = await exec(session, 'git push')
    expect(out).toContain('non-fast-forward')
    expect(out).toContain('[rejected]')
  })

  it('updates the local tracking ref after push', async () => {
    const session = await Session.create('push')
    await exec(session, 'git push')
    const tracking = await session.fs.readFile('/repo/.git/refs/remotes/origin/main')
    const local = await session.fs.readFile('/repo/.git/refs/heads/main')
    expect(tracking.toString().trim()).toBe(local.toString().trim())
  })
})

describe('git fetch', () => {
  it('fetches remote commits and updates origin/main', async () => {
    const session = await Session.create('pull-ff')
    await session.remoteFs.writeFile('/origin/new.txt', 'from remote\n')
    const r = await runGit(session, 'git fetch')
    expect(r.changed).toBe(true)
    const log = await exec(session, 'git log origin/main --oneline')
    expect(log).toContain('feat: remote work')
    const tracking = await session.fs.readFile('/repo/.git/refs/remotes/origin/main')
    const remoteHead = await session.remoteFs.readFile('/origin/.git/refs/heads/main')
    expect(tracking.toString().trim()).toBe(remoteHead.toString().trim())
  })
})

describe('git pull', () => {
  it('fast-forwards when the remote is ahead', async () => {
    const session = await Session.create('pull-ff')
    const out = await exec(session, 'git pull')
    expect(out).toContain('Fast-forward')
    const content = await session.fs.readFile('/repo/remote.txt')
    expect(content.toString()).toContain('remote work')
    const status = await exec(session, 'git status')
    expect(status).toContain('nothing to commit')
  })

  it('creates a merge commit when both sides diverged', async () => {
    const session = await Session.create('pull')
    const out = await exec(session, 'git pull')
    expect(out).toContain('Merge made by')
    const localContent = await session.fs.readFile('/repo/local.txt')
    expect(localContent.toString()).toContain('local work')
    const remoteContent = await session.fs.readFile('/repo/remote.txt')
    expect(remoteContent.toString()).toContain('remote work')
    const result = await runChecks(session, [{ type: 'mergeDone', branch: 'origin/main' }])
    expect(result.pass).toBe(true)
  })
})

describe('cd', () => {
  it('changes the working directory', async () => {
    const session = await Session.create('clone')
    await exec(session, 'git clone /origin')
    await exec(session, 'cd origin')
    expect(session.dir).toBe('/repo/origin')
  })

  it('rejects missing directories', async () => {
    const session = await Session.create('remote')
    const out = await exec(session, 'cd nope')
    expect(out).toContain('no such file or directory')
  })
})

describe('stage-3 checks', () => {
  it('pushedTo passes after pushing', async () => {
    const session = await Session.create('push')
    const before = await runChecks(session, [{ type: 'pushedTo' }])
    expect(before.pass).toBe(false)
    await exec(session, 'git push')
    const after = await runChecks(session, [{ type: 'pushedTo' }])
    expect(after.pass).toBe(true)
  })

  it('remote.origin.url config passes after remote add', async () => {
    const session = await Session.create('remote')
    const result = await runChecks(session, [{ type: 'configIs', key: 'remote.origin.url', value: '/origin' }])
    expect(result.pass).toBe(false)
    await exec(session, 'git remote add origin /origin')
    const ok = await runChecks(session, [{ type: 'configIs', key: 'remote.origin.url', value: '/origin' }])
    expect(ok.pass).toBe(true)
  })
})

describe('stage-3 scenarios', () => {
  const names: ScenarioName[] = ['remote', 'clone', 'push', 'pull-ff', 'pull']
  for (const name of names) {
    it(`${name} builds without error`, async () => {
      const session = await Session.create(name)
      if (name !== 'clone') {
        expect(session.fs.fileList().length).toBeGreaterThanOrEqual(1)
      }
      if (name !== 'remote') {
        expect(session.remoteFs.fileList().length).toBeGreaterThanOrEqual(1)
      }
    })
  }
})
