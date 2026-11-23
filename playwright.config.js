import { defineConfig, devices } from '@playwright/test';

/**
 * @type {import('@playwright/test').Config}
 */
export default defineConfig({
  testDir: './tests',
  receivers: [],
  outputDir: 'test-results/',
  
  // Base URL для тестов (предполагаем, что Vite запущен на 5173)
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Configure projects to run tests in multiple browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run tests in serialized mode to avoid resource contention in dev env */
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
});
