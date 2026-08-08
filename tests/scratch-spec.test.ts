import { describe, expect, it } from 'vitest'
import { Session, runGit } from '../docs/.vitepress/theme/lib/playground'

describe('scratch spec checks', () => {
  it('diff --staged with staged file', async () => {
    const session = await Session.create('add-commit')
    await runGit(session, 'git add todo.txt')
    await runGit(session, 'git add hello.txt')
    const r = await runGit(session, 'git diff --staged')
    console.log('DIFF_STAGED:\n' + r.out.join('\n'))
    expect(r.out.join('\n')).toContain('diff --git a/hello.txt')
  })

  it('restore --staged semantics', async () => {
    const session = await Session.create('add-commit')
    await runGit(session, 'git add hello.txt')
    const before = await runGit(session, 'git status')
    console.log('BEFORE:\n' + before.out.join('\n'))
    const r = await runGit(session, 'git restore --staged hello.txt')
    console.log('RESTORE_STAGED:\n' + r.out.join('\n'))
    const s = await runGit(session, 'git status')
    console.log('STATUS_AFTER:\n' + s.out.join('\n'))
  })
})
