import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: 'e2e',
  timeout: 60_000,
  retries: 0,
  workers: 1,
  use: {
    baseURL: 'http://localhost:4173',
    locale: 'zh-CN'
  },
  webServer: {
    command: 'npx vitepress preview docs --port 4173',
    url: 'http://localhost:4173/git-learning-path/',
    reuseExistingServer: true,
    timeout: 60_000
  }
})
