# Bug reference (for your reference)

## Where is the bug?

**File:** `src/components/SearchForm/SearchForm.jsx`

**Location:** A `useEffect` that depends on `[formData.origin]` and resets the entire form (sets `formData` to initial state and clears `errors`).

Whenever the user selects an origin (From), `formData.origin` changes, so the effect runs and clears the form. The user can never keep an origin selection.

## How to recreate (broken flow)

1. Start the app: `npm run dev` (or `npm run dev:e2e` for e2e).
2. Open the landing page (home).
3. In the flight search form, select **From** (e.g. "DEL - Delhi").
4. **Observe:** The form immediately clears. The origin field (and everything else) is reset. You cannot proceed to select destination or date without the form resetting again when you change origin.

So the broken flow is: **select origin → form clears**. No modal or navigation needed; it happens as soon as they pick From.

## How to fix

In **`src/components/SearchForm/SearchForm.jsx`**, **remove the `useEffect`** that has `[formData.origin]` as dependency and that calls `setFormData(initialFormState)` and `setErrors({})`. The form must not reset when the user edits the origin field. Keep `useState(initialFormState)` for the initial state only.

After the fix, selecting origin keeps the value and the user can complete and submit the search. The e2e tests **"search form retains origin after selecting it"** and **"user can submit search from landing and see results"** pass.

## E2E tests

- Run: `npm run e2e`.
- With the bug: **"search form retains origin after selecting it"** and **"user can submit search from landing and see results"** fail.
- After the fix: all three tests in `tests/landing-search.spec.js` pass.
