# Bug reference: Search form does not navigate (hook timing bug)

## Where is the bug?

**File:** `src/hooks/useSearchSubmit.js`  
**Location:** In the `useEffect` that is supposed to navigate to `/search` when there is pending form data and the booking context has been updated.

The hook sets `pendingFormData` when the user submits the form (and there is no custom `onSubmit`). An effect runs when `pendingFormData` or `searchParams` (from context) change. It should navigate to `/search` when both are set, then clear pending state. The bug: the effect **never calls `navigate()`**—it only clears `pendingFormData` in both branches. So the user is never taken to the search page after submitting the form.

Buggy code:

```js
  useEffect(() => {
    if (!pendingFormData) return;
    if (searchParams?.origin && searchParams?.destination) {
      setPendingFormData(null);   // ← missing: navigate('/search')
    } else {
      setPendingFormData(null);
    }
  }, [pendingFormData, searchParams, navigate]);
```

---

## How to recreate

1. Start the app (`npm run dev` or `npm run dev:e2e`).
2. Open the home page.
3. Fill the search form (From, To, Date) and click **Search Flights**.
4. **Observe:** You stay on the same page; the app does not navigate to `/search`.

---

## How to fix

**Root cause:** The effect is supposed to call `navigate('/search')` when `pendingFormData` and `searchParams` are set, but the `navigate()` call is missing. The effect only clears `pendingFormData`, so the user never gets navigated.

**Fix:** In the branch where `searchParams?.origin` and `searchParams?.destination` are set, call `navigate('/search')` before clearing the pending state.

In `src/hooks/useSearchSubmit.js`, add the missing line in the effect:

```js
  useEffect(() => {
    if (!pendingFormData) return;
    if (searchParams?.origin && searchParams?.destination) {
      navigate('/search');
      setPendingFormData(null);
    } else {
      setPendingFormData(null);
    }
  }, [pendingFormData, searchParams, navigate]);
```

So: add `navigate('/search');` before `setPendingFormData(null);` in the first branch.

---

## E2E tests (Playwright)

Tests live in `tests/*.spec.js`. This project has `"type": "module"` in package.json, so **use ESM in spec files**: `import { test, expect } from '@playwright/test';` — do not use `require('@playwright/test')`.
