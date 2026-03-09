// @ts-check
const path = require('path');

module.exports = {
  testDir: path.join(__dirname, 'tests'),
  testMatch: /\.spec\.(js|ts|mjs|cjs)$/,
  testIgnore: ['**/src/**', '**/node_modules/**'],
  use: {
    baseURL: 'http://127.0.0.1:5173',
  },
  webServer: {
    command: 'npm run dev:e2e',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
  },
};

