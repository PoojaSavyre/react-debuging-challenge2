// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Booking context (missing provider bug)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.__authStub = { user: null };
    });
  });

  test('home page shows search form when booking context is provided', async ({ page }) => {
    await page.route('**/api/auth/me', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ user: null }),
      });
    });

    await page.goto('/');
    await expect(page.getByTestId('landing-page')).toBeVisible({ timeout: 10000 });
    await expect(page.getByTestId('search-form')).toBeVisible();
  });

  test('search flow reaches results when booking context is provided', async ({ page }) => {
    await page.route('**/api/auth/me', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ user: null }),
      });
    });

    await page.route('**/api/flights*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'fl-1',
            origin: 'DEL',
            destination: 'BOM',
            departure: '2025-06-01T10:00:00Z',
            arrival: '2025-06-01T12:00:00Z',
            price: 4999,
            airline: 'Test Air',
          },
        ]),
      });
    });

    await page.goto('/');
    await expect(page.getByTestId('search-form')).toBeVisible({ timeout: 10000 });

    await page.getByLabel(/from/i).selectOption('DEL');
    await page.getByLabel(/to/i).selectOption('BOM');
    await page.getByLabel(/date/i).fill('2025-06-01');
    await page.getByRole('button', { name: /search flights/i }).click();

    await expect(page).toHaveURL(/\/search/, { timeout: 5000 });
    await expect(page.getByTestId('search-results-page')).toBeVisible({ timeout: 10000 });
  });
});
