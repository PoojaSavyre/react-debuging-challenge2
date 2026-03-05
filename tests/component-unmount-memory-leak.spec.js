// @ts-check
import { test, expect } from '@playwright/test';

const AUTH_USER = { name: 'Test User', email: 'test@example.com', id: 'user-1' };

test.describe('Layout nav shows correct auth state (React Component Architecture)', () => {
  test('when user is logged in, nav shows user name and Logout, not Log in', async ({
    page,
    context,
  }) => {
    await context.route('**/api/auth/me', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ user: AUTH_USER }),
      });
    });

    await page.addInitScript(() => {
      window.localStorage.setItem('authToken', 'e2e-stub-token');
    });

    await page.goto('/');

    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(AUTH_USER.name, { exact: false })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log in' })).not.toBeVisible();
  });
});
