# Bug reference: Missing server-side data pre-fetching for Offers page

## Where is the bug?

**File:** `ssr-dev-server.js`  
**Location:** In the `app.get('*', ...)` handler, the server always passes an empty `initialData = {}` to `render(url, initialData)`. It never loads offers data for the `/offers` route before rendering, so the server-rendered HTML shows the loading state and the client receives no preloaded data.

The bug: the block that would load offers when `pathname === '/offers'` (e.g. `const { offers } = await import('./offers-data.js'); initialData = { offers };`) is missing. So every request gets `initialData = {}`, and the serialized `window.__PRELOADED__` is empty. The Offers page expects pre-fetched data and does not fetch on the client when it receives an empty preload payload (to avoid double fetch when data was supposed to be pre-fetched), so the page stays on "Loading offers...".

---

## How to recreate

1. **Start the SSR dev server:**
   ```bash
   npm run dev:e2e
   ```
   Server runs at `http://127.0.0.1:3099`.

2. **Open the Offers page directly** (e.g. new tab or address bar):
   - `http://127.0.0.1:3099/offers`

3. **Observe:** The page shows "Offers & deals" and then **"Loading offers..."** and never shows the list of offers. The loading state never finishes.

4. **E2E:** Run `npx playwright install` then `npm run e2e`. The tests that expect offer content on `/offers` **fail** when the bug is present. After the fix, they pass.

---

## How to fix

**Root cause:** The server does not pre-fetch route-specific data for `/offers` before calling `render()`. So the initial HTML and the serialized `window.__PRELOADED__` contain no offers, and the client-side Offers page (which relies on preloaded data for this route) never receives them and stays in the loading state.

**Fix:** In `ssr-dev-server.js`, before calling `render()`, when the request pathname is `/offers`, load the offers data and set `initialData` so it can be passed to the React tree and serialized into the page.

1. After `let initialData = {};`, add a conditional that checks the pathname and, for `/offers`, imports the shared offers data and sets `initialData = { offers }` (from `./offers-data.js`).
2. The rest of the handler (calling `render(url, initialData)`, replacing placeholders, sending HTML) already serializes `initialData` into `window.__PRELOADED__`, so no other changes are needed.

After this change, a direct visit to `/offers` returns server-rendered HTML that includes the offers, and the client hydrates with the same data so the page shows the list of offers and the e2e tests pass.

---

## E2E tests (Playwright)

Tests live in `tests/*.spec.js`. This project has `"type": "module"` in package.json, so **use ESM in spec files**: `import { test, expect } from '@playwright/test';` — do not use `require('@playwright/test')`.
