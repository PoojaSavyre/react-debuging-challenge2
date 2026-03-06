// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Redirect after login from protected route', () => {
  test.beforeEach(async ({ page }) => {
    // Stub auth API: unauthenticated on /api/auth/me so user is logged out on load
    await page.route('**/api/auth/me', (route) => {
      route.fulfill({ status: 401, body: '{}' });
    });
    // Stub login to succeed and return user + token
    await page.route('**/api/auth/login', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            user: { name: 'Test User', email: 'test@example.com' },
            token: 'stub-token',
          }),
        });
      } else {
        await route.continue();
      }
    });
  });

  test('after login from modal, user is redirected to the protected page they requested', async ({
    page,
    baseURL,
  }) => {
    const root = baseURL || 'http://127.0.0.1:5173';

    // Load home first so Layout mounts with no redirectTo; then navigating to /passengers
    // will set redirectTo in state and open the login modal.
    await page.goto(root + '/');
    await page.waitForLoadState('networkidle');

    // Try to open a protected route; app redirects to / with login modal
    await page.goto(root + '/passengers');
    await expect(page.getByTestId('login-modal')).toBeVisible({ timeout: 10000 });

    // Fill and submit login (scope to modal so we click the submit button, not the nav "Log in" button)
    const modal = page.getByTestId('login-modal');
    await modal.getByLabel(/name/i).fill('Test User');
    await modal.getByLabel(/email/i).fill('test@example.com');
    await modal.getByRole('button', { name: /^log in$/i }).click();

    // With correct memoization: callback has current redirectTo, so we navigate to /passengers
    // (then PassengerFormPage may redirect to /search if no booking; either is correct).
    // With bug: callback has stale redirectTo (undefined), so we stay on /.
    await expect(page).toHaveURL(/\/(passengers|search)/, { timeout: 10000 });
  });
});
