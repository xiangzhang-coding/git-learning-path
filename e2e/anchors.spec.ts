import { expect, test } from '@playwright/test'

const PAGES = [
  '/git-learning-path/zh/stage/4/4-5-worktree.html',
  '/git-learning-path/ja/stage/4/4-2-reset-reflog.html',
  '/git-learning-path/ru/stage/5/5-5-actions-pages.html',
  '/git-learning-path/stage/2/2-2-branch-workflow.html'
]

for (const page of PAGES) {
  test(`exercise anchors resolve to real heading ids on ${page}`, async ({ page: p }) => {
    await p.goto(page)
    const exercises = p.locator('.exercise')
    const count = await exercises.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      const ex = exercises.nth(i)
      await ex.getByRole('button').first().click()
      const href = await ex.locator('.feedback-anchor').getAttribute('href')
      expect(href, `exercise ${i} must have a review link`).toBeTruthy()
      const hash = href!.split('#')[1]
      const resolved = await p.evaluate((id) => document.getElementById(id) !== null, hash)
      expect(resolved, `anchor "#${hash}" must exist on ${page}`).toBe(true)
    }
  })
}
