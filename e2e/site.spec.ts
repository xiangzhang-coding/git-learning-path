import { expect, test } from '@playwright/test'

const PAGE = '/git-learning-path/zh/stage/2/2-3-merge.html'

test('exercise gives instant correct/wrong feedback', async ({ page }) => {
  await page.goto(PAGE)
  const first = page.locator('.exercise').first()
  await first.getByRole('button', { name: /A / }).click()
  await expect(first.locator('.exercise-feedback')).toContainText(/正确|错误/)
  const firstFb = await first.locator('.exercise-feedback').textContent()
  if (firstFb!.includes('错误')) {
    await first.getByRole('button', { name: /B / }).click()
    await expect(first.locator('.exercise-feedback')).toContainText('正确')
  }
})

test('theme switcher persists a translated theme', async ({ page }) => {
  await page.goto(PAGE)
  await page.locator('.theme-switcher').click()
  await page.getByRole('option', { name: '深色' }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await expect(page.locator('.theme-switcher-label')).toHaveText('深色')
  const saved = await page.evaluate(() => localStorage.getItem('gitpath-theme'))
  expect(saved).toBe('dark')
})

test('curriculum dropdown lists chapters and navigates', async ({ page }) => {
  await page.goto(PAGE)
  await page.locator('.VPNavBar').getByRole('button', { name: /课程/ }).click()
  const menu = page.locator('.VPNavBar .VPMenu')
  await expect(menu.getByRole('link', { name: '章节 5 — GitHub 生态' })).toBeVisible()
  await menu.getByRole('link', { name: '章节 5 — GitHub 生态' }).click()
  await expect(page).toHaveURL(/\/zh\/stage\/5\//)
})

test('back-to-top appears after scrolling and returns to top', async ({ page }) => {
  await page.goto(PAGE)
  const btn = page.locator('.back-to-top')
  await expect(btn).toHaveCount(0)
  await page.evaluate(() => window.scrollTo(0, 900))
  await expect(btn).toBeVisible()
  await btn.click()
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeLessThan(50)
})

test('language follow: an en cookie stays on the root locale', async ({ page }) => {
  await page.context().addCookies([{ name: 'gitpath_lang', value: 'en', url: 'http://localhost:4173' }])
  await page.goto('/git-learning-path/')
  await expect(page.locator('h1').first()).toBeVisible()
  await expect(page).not.toHaveURL(/\/zh\//)
  await expect(page.getByText('Master Git and GitHub, chapter by chapter').first()).toBeVisible()
})

test('mobile viewport has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 })
  await page.goto(PAGE)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
  expect(overflow).toBe(false)
  await expect(page.locator('.theme-switcher')).toBeVisible()
})

test('stage 5 checklist persists ticks and clears', async ({ page }) => {
  await page.goto('/git-learning-path/zh/stage/5/')
  const list = page.locator('.checklist-list')
  await expect(list.locator('li')).toHaveCount(10)
  await list.locator('li').first().locator('input[type=checkbox]').check()
  await expect(list.locator('li').first()).toHaveClass(/done/)
  const saved = await page.evaluate(() => localStorage.getItem('gitpath-checklist-stage5'))
  expect(saved).toContain('true')
  await page.reload()
  await expect(page.locator('.checklist-list li').first()).toHaveClass(/done/)
  await page.locator('.checklist-reset').click()
  await expect(page.locator('.checklist-list li').first()).not.toHaveClass(/done/)
})
