/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: 'tests',
  use: {
    baseURL: 'http://127.0.0.1:3099',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev:e2e',
    port: 3099,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
};

module.exports = config;
