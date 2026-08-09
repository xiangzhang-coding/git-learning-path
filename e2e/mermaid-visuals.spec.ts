import { expect, test } from '@playwright/test'

const MERMAID_PAGE = '/git-learning-path/stage/5/5-2-pull-request.html'
const VISUAL_PAGE = '/git-learning-path/zh/stage/2/2-3-merge.html'

test('mermaid diagrams render with node labels', async ({ page }) => {
  await page.goto(MERMAID_PAGE)
  const svg = page.locator('.mermaid svg')
  await expect(svg).toHaveCount(1)
  await expect(svg.locator('foreignObject')).toHaveCount(5)
  await expect(svg.locator('foreignObject span').filter({ hasText: 'push' })).toHaveCount(1)
})

test('mermaid re-renders for the dark theme', async ({ page }) => {
  await page.goto(MERMAID_PAGE)
  const svg = page.locator('.mermaid svg')
  await expect(svg).toHaveCount(1)
  const lightFill = await svg.locator('g.node rect').first().evaluate((el) => getComputedStyle(el).fill)
  await page.locator('html').evaluate((el) => el.classList.add('dark'))
  await expect
    .poll(async () => svg.locator('g.node rect').first().evaluate((el) => getComputedStyle(el).fill))
    .not.toBe(lightFill)
})

test('teaching visual switches between outcomes', async ({ page }) => {
  await page.goto(VISUAL_PAGE)
  const stage = page.locator('.merge-stage')
  const mode = (name: RegExp) => page.locator('.teach-visual-mode').filter({ hasText: name })
  await mode(/快进合并/).click()
  await expect(stage.locator('.main-line .merge-node')).toHaveText(['A', 'B', 'C', 'D'])
  await mode(/合并提交/).click()
  await expect(stage.locator('.main-line .merge-node')).toHaveText(['A', 'B', 'C', 'M'])
  await expect(stage.locator('.feature-line .merge-node')).toHaveText(['A', 'B', 'D', 'E'])
  await mode(/冲突/).click()
  await expect(stage.locator('.main-line .merge-node')).toHaveText(['A', 'B', 'C', '✕'])
  await expect(stage.locator('.merge-conflict-mark')).toBeVisible()
})
