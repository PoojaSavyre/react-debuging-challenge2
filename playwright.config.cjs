/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: 'tests',
  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev:e2e',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
  },
};

module.exports = config;
