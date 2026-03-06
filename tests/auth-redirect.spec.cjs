// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Login modal redirect after auth', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure unauthenticated state
    await page.addInitScript(() => {
      window.localStorage.removeItem('authToken');
      window.localStorage.removeItem('authUser');
    });

    // Stub auth APIs so flow works without real backend
    await page.route('**/api/auth/me', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ user: null }),
      });
    });
    await page.route('**/api/auth/login', async (route) => {
      if (route.request().method() !== 'POST') return route.continue();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: { name: 'E2E User', email: 'e2e@example.com' },
          token: 'stub-token',
        }),
      });
    });
  });

  test('when user hits protected page, login modal appears; after login user is redirected to that page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'SkyBook' })).toBeVisible();

    // Go to protected page (e.g. continuing booking); app redirects to / and shows login modal
    await page.goto('/passengers');
    await page.waitForURL((url) => new URL(url).pathname === '/');
    await expect(page.getByTestId('login-modal')).toBeVisible();

    // Log in; with correct memoization, onLoginSuccess runs and navigates to /passengers (scope to modal so we click submit, not nav button)
    const loginModal = page.getByTestId('login-modal');
    await loginModal.getByLabel('Name').fill('E2E User');
    await loginModal.getByLabel('Email').fill('e2e@example.com');
    await loginModal.getByRole('button', { name: 'Log in' }).click();

    // Should land on passengers page (no booking state in this test, so page may render empty; URL confirms redirect)
    await expect(page).toHaveURL(/\/passengers/);
  });
});
