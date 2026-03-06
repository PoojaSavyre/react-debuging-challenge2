// @ts-check
import { test, expect } from '@playwright/test';

const AUTH_ME_PATH = '**/api/auth/me';
const AUTH_LOGIN_PATH = '**/api/auth/login';

test.describe('Login flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(AUTH_ME_PATH, (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ user: null }),
      });
    });
  });

  test('login modal shows form and user can log in', async ({ page }) => {
    let loginBody = null;
    await page.route(AUTH_LOGIN_PATH, (route) => {
      const request = route.request();
      loginBody = request.postDataJSON?.();
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: { name: loginBody?.name ?? 'John', email: loginBody?.email ?? 'john@gmail.com' },
          token: 'stub-token',
        }),
      });
    });

    await page.goto('/');
    await page.getByTestId('nav-login-btn').click();

    await expect(page.getByTestId('login-modal')).toBeVisible();
    await expect(page.getByTestId('login-form')).toBeVisible();
    await expect(page.getByTestId('login-submit-btn')).toBeVisible();

    await page.getByLabel('Name').fill('john');
    await page.getByLabel('Email').fill('john@gmail.com');
    await page.getByTestId('login-submit-btn').click();

    await expect(page.getByRole('button', { name: /logout/i })).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.user-name')).toContainText('john');
  });
});
