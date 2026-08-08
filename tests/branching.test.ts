import { describe, expect, it } from 'vitest'
import { Session, runChecks, runGit, commitGraph, type ScenarioName } from '../docs/.vitepress/theme/lib/playground'

async function exec(session: Session, input: string): Promise<string> {
  const result = await runGit(session, input)
  return result.out.join('\n')
}

async function commitAll(session: Session, message: string): Promise<void> {
  await runGit(session, 'git add .')
  await runGit(session, `git commit -m "${message}"`)
}

describe('git branch', () => {
  it('lists branches with the current one marked', async () => {
    const session = await Session.create('branching')
    const out = await exec(session, 'git branch')
    expect(out).toContain('* main')
    expect(out).not.toContain('* feature')
  })

  it('creates a branch and lists it', async () => {
    const session = await Session.create('branching')
    const out = await exec(session, 'git branch feature')
    expect(out).toBe('')
    const listed = await exec(session, 'git branch')
    expect(listed).toContain('feature')
    expect(listed).toContain('* main')
  })

  it('rejects duplicate branch names', async () => {
    const session = await Session.create('branching')
    await exec(session, 'git branch feature')
    const out = await exec(session, 'git branch feature')
    expect(out).toContain('fatal: a branch named')
  })

  it('creating a branch does not switch', async () => {
    const session = await Session.create('branching')
    await exec(session, 'git branch feature')
    const status = await exec(session, 'git status')
    expect(status).toContain('On branch main')
  })
})

describe('git switch', () => {
  it('switches to an existing branch', async () => {
    const session = await Session.create('branching')
    await exec(session, 'git branch feature')
    const out = await exec(session, 'git switch feature')
    expect(out).toContain("Switched to branch 'feature'")
    const status = await exec(session, 'git status')
    expect(status).toContain('On branch feature')
  })

  it('switch -c creates and switches', async () => {
    const session = await Session.create('branching')
    const out = await exec(session, 'git switch -c feature')
    expect(out).toContain("Switched to a new branch 'feature'")
    const branches = await exec(session, 'git branch')
    expect(branches).toContain('feature')
  })

  it('switching to a missing branch fails', async () => {
    const session = await Session.create('branching')
    const out = await exec(session, 'git switch nope')
    expect(out).toContain('fatal: invalid reference: nope')
  })

  it('refuses to switch with uncommitted changes', async () => {
    const session = await Session.create('branching')
    await session.fs.writeFile('/repo/hello.txt', 'dirty\n')
    await exec(session, 'git branch feature')
    const out = await exec(session, 'git switch feature')
    expect(out).toContain('would be overwritten')
    const status = await exec(session, 'git status')
    expect(status).toContain('On branch main')
  })

  it('commits land on the current branch only', async () => {
    const session = await Session.create('branching')
    await exec(session, 'git switch -c feature')
    await session.fs.writeFile('/repo/feat.txt', 'feature work\n')
    await commitAll(session, 'feat: feature work')
    const featureLog = await exec(session, 'git log --oneline')
    expect(featureLog.split('\n')[0]).toContain('feat: feature work')
    await exec(session, 'git switch main')
    const mainLog = await exec(session, 'git log --oneline')
    expect(mainLog).not.toContain('feat: feature work')
  })
})

describe('git merge', () => {
  it('reports already up to date', async () => {
    const session = await Session.create('branching')
    const out = await exec(session, 'git merge main')
    expect(out).toContain('Already up to date.')
  })

  it('merging a missing branch fails', async () => {
    const session = await Session.create('branching')
    const out = await exec(session, 'git merge nope')
    expect(out).toContain("fatal: 'nope' is not a commit")
  })

  it('fast-forwards when the current branch is an ancestor', async () => {
    const session = await Session.create('merge-ff')
    const before = await exec(session, 'git log --oneline')
    const out = await exec(session, 'git merge feature')
    expect(out).toContain('Fast-forward')
    const content = await session.fs.readFile('/repo/feature.txt')
    expect(content.toString()).toContain('feature work')
    const after = await exec(session, 'git log --oneline')
    expect(after.split('\n').length).toBe(before.split('\n').length + 1)
    expect(after.split('\n')[0]).toContain('feat: feature work')
  })

  it('creates a merge commit for diverged branches', async () => {
    const session = await Session.create('merge')
    const out = await exec(session, 'git merge feature')
    expect(out).toContain('Merge made by')
    const log = await exec(session, 'git log --oneline')
    expect(log.split('\n')[0]).toContain("Merge branch 'feature'")
    const mainContent = await session.fs.readFile('/repo/main.txt')
    expect(mainContent.toString()).toContain('main work')
    const featureContent = await session.fs.readFile('/repo/feature.txt')
    expect(featureContent.toString()).toContain('feature work')
  })

  it('a completed merge commit has two parents', async () => {
    const session = await Session.create('merge')
    await exec(session, 'git merge feature')
    const graph = await commitGraph(session.fs, session.dir)
    const mergeCommit = graph.find((c) => c.parents.length === 2)
    expect(mergeCommit).toBeDefined()
  })

  it('merge keeps files untouched by either branch', async () => {
    const session = await Session.create('merge')
    await exec(session, 'git merge feature')
    const content = await session.fs.readFile('/repo/README.md')
    expect(content.toString()).toBe('# Project\n')
    const status = await exec(session, 'git status')
    expect(status).toContain('nothing to commit')
  })

  it('merging an ancestor reports already up to date', async () => {
    const session = await Session.create('merge-ff')
    await exec(session, 'git switch feature')
    const out = await exec(session, 'git merge main')
    expect(out).toContain('Already up to date.')
  })

  it('merge --abort restores the pre-merge state', async () => {
    const session = await Session.create('conflict')
    await exec(session, 'git merge feature')
    const out = await exec(session, 'git merge --abort')
    expect(out).toBe('')
    const content = await session.fs.readFile('/repo/hello.txt')
    expect(content.toString()).toBe('hello main\n')
    const status = await exec(session, 'git status')
    expect(status).toContain('nothing to commit')
    const aborted = await exec(session, 'git merge --abort')
    expect(aborted).toContain('There is no merge to abort')
  })
})

describe('merge conflicts', () => {
  it('merge with overlapping changes reports a conflict', async () => {
    const session = await Session.create('conflict')
    const out = await exec(session, 'git merge feature')
    expect(out).toContain('CONFLICT (content): Merge conflict in hello.txt')
    expect(out).toContain('Automatic merge failed')
    const content = await session.fs.readFile('/repo/hello.txt')
    const text = content.toString()
    expect(text).toContain('<<<<<<< HEAD')
    expect(text).toContain('=======')
    expect(text).toContain('>>>>>>> feature')
    expect(text).toContain('hello main')
    expect(text).toContain('hello feature')
  })

  it('status reports unmerged paths during a conflict', async () => {
    const session = await Session.create('conflict')
    await exec(session, 'git merge feature')
    const status = await exec(session, 'git status')
    expect(status).toContain('You have unmerged paths.')
    expect(status).toMatch(/both modified:\s+hello\.txt/)
  })

  it('status stays unmerged after editing but before add', async () => {
    const session = await Session.create('conflict')
    await exec(session, 'git merge feature')
    await session.fs.writeFile('/repo/hello.txt', 'hello resolved\n')
    const status = await exec(session, 'git status')
    expect(status).toContain('You have unmerged paths.')
    expect(status).toMatch(/both modified:\s+hello\.txt/)
  })

  it('committing without staging a conflicted file is refused', async () => {
    const session = await Session.create('conflict')
    await exec(session, 'git merge feature')
    await session.fs.writeFile('/repo/hello.txt', 'hello resolved\n')
    const out = await exec(session, 'git commit -m "try"')
    expect(out).toContain('fatal: you have not concluded your merge')
  })

  it('resolving the conflict and committing concludes the merge', async () => {
    const session = await Session.create('conflict')
    await exec(session, 'git merge feature')
    await session.fs.writeFile('/repo/hello.txt', 'hello resolved\n')
    await exec(session, 'git add hello.txt')
    const status = await exec(session, 'git status')
    expect(status).toContain('All conflicts fixed but you are still merging.')
    const out = await exec(session, 'git commit -m "merge: resolve hello"')
    expect(out).toContain('[main')
    expect(out).toContain('merge: resolve hello')
    const graph = await commitGraph(session.fs, session.dir)
    const mergeCommit = graph.find((c) => c.parents.length === 2)
    expect(mergeCommit).toBeDefined()
    const content = await session.fs.readFile('/repo/hello.txt')
    expect(content.toString()).toBe('hello resolved\n')
    const after = await exec(session, 'git status')
    expect(after).toContain('nothing to commit')
  })

  it('committing while a merge is pending refuses (needs resolution)', async () => {
    const session = await Session.create('conflict')
    await exec(session, 'git merge feature')
    await exec(session, 'git add hello.txt')
    const out = await exec(session, 'git commit -m "try"')
    expect(out).toContain('fatal: you have not concluded your merge')
  })

  it('conflict markers appear exactly once in the conflicted file', async () => {
    const session = await Session.create('conflict')
    await exec(session, 'git merge feature')
    const content = (await session.fs.readFile('/repo/hello.txt')).toString()
    expect(content.split('<<<<<<< HEAD')).toHaveLength(2)
    expect(content.split('>>>>>>> feature')).toHaveLength(2)
    expect(content.split('=======')).toHaveLength(2)
  })

  it('files without overlapping edits merge cleanly during a conflict scenario', async () => {
    const session = await Session.create('conflict')
    await exec(session, 'git merge feature')
    const content = await session.fs.readFile('/repo/notes.txt')
    expect(content.toString()).toContain('notes from feature')
  })
})

describe('commit graph', () => {
  it('shows branch tips and diverged history', async () => {
    const session = await Session.create('merge')
    const graph = await commitGraph(session.fs, session.dir)
    expect(graph.length).toBeGreaterThanOrEqual(3)
    const featureTip = graph.find((c) => c.branches.includes('feature'))
    expect(featureTip).toBeDefined()
    expect(featureTip!.message).toContain('feature work')
  })

  it('lanes are assigned consistently across commits', async () => {
    const session = await Session.create('merge')
    await exec(session, 'git merge feature')
    const graph = await commitGraph(session.fs, session.dir)
    for (const commit of graph) {
      expect(commit.lane).toBeGreaterThanOrEqual(0)
      expect(commit.lane).toBeLessThan(commit.laneCount)
    }
  })

  it('assigns each branch tip its own lane', async () => {
    const session = await Session.create('merge')
    const graph = await commitGraph(session.fs, session.dir)
    const mainTip = graph.find((c) => c.branches.includes('main'))
    const featureTip = graph.find((c) => c.branches.includes('feature'))
    expect(mainTip!.lane).not.toBe(featureTip!.lane)
  })
})

describe('stage-2 checks', () => {
  it('branchExists passes for created branches', async () => {
    const session = await Session.create('branching')
    await exec(session, 'git branch feature')
    const result = await runChecks(session, [{ type: 'branchExists', name: 'feature' }])
    expect(result.pass).toBe(true)
  })

  it('branchExists fails for missing branches', async () => {
    const session = await Session.create('branching')
    const result = await runChecks(session, [{ type: 'branchExists', name: 'nope' }])
    expect(result.pass).toBe(false)
  })

  it('mergeDone passes after a completed merge with a clean tree', async () => {
    const session = await Session.create('merge')
    await exec(session, 'git merge feature')
    const result = await runChecks(session, [{ type: 'mergeDone' }])
    expect(result.pass).toBe(true)
  })

  it('mergeDone fails while a conflict is unresolved', async () => {
    const session = await Session.create('conflict')
    await exec(session, 'git merge feature')
    const result = await runChecks(session, [{ type: 'mergeDone' }])
    expect(result.pass).toBe(false)
  })

  it('mergeDone with a branch requires that branch to be merged', async () => {
    const session = await Session.create('merge-ff')
    await exec(session, 'git merge feature')
    const ok = await runChecks(session, [{ type: 'mergeDone', branch: 'feature' }])
    expect(ok.pass).toBe(true)
    const session2 = await Session.create('merge-ff')
    const notYet = await runChecks(session2, [{ type: 'mergeDone', branch: 'feature' }])
    expect(notYet.pass).toBe(false)
  })

  it('mergeCommit requires a commit with two parents', async () => {
    const session = await Session.create('merge')
    await exec(session, 'git merge feature')
    const result = await runChecks(session, [{ type: 'mergeCommit' }])
    expect(result.pass).toBe(true)
  })

  it('mergeCommit fails for fast-forward merges', async () => {
    const session = await Session.create('merge-ff')
    await exec(session, 'git merge feature')
    const result = await runChecks(session, [{ type: 'mergeCommit' }])
    expect(result.pass).toBe(false)
  })
})

describe('stage-2 scenarios', () => {
  const names: ScenarioName[] = ['branching', 'merge-ff', 'merge', 'conflict']
  for (const name of names) {
    it(`${name} builds without error`, async () => {
      const session = await Session.create(name)
      expect(session.fs.fileList().length).toBeGreaterThanOrEqual(1)
      const status = await exec(session, 'git status')
      expect(status).toContain('On branch main')
    })
  }
})
