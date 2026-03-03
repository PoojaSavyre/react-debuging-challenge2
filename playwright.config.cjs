/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:3099',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev:e2e',
    url: 'http://127.0.0.1:3099',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
};

module.exports = config;
