# E2E tests (Playwright)

## First-time setup

Run these **in order** (only once per machine):

1. **Install dependencies**  
   ```bash
   npm install
   ```

2. **Install Playwright browsers**  
   ```bash
   npx playwright install
   ```  
   Do this **after** `npm install`. Running it before can trigger a warning and missing scripts.

3. **Run e2e tests**  
   ```bash
   npm run e2e
   ```

## Why "Missing script: e2e" or the warning appears

- **Missing script: e2e** – `package.json` must include the `e2e` script and the `@playwright/test` devDependency. If you cloned a branch that doesn’t have them, run `npm install` again after pulling the version that has Playwright (see `package.json` scripts and devDependencies).
- **"Run npm install first"** – Playwright’s install step should run **after** `npm install`. Always run `npm install` first, then `npx playwright install`, then `npm run e2e`.

## Quick reference

| Step              | Command                    |
|-------------------|----------------------------|
| Install deps      | `npm install`              |
| Install browsers  | `npx playwright install`    |
| Run all e2e      | `npm run e2e`              |
| Run one file     | `npx playwright test tests/<file>` |
| Show last report | `npx playwright show-report` |
