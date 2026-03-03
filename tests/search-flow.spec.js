import { test, expect } from '@playwright/test';

test.describe('Search flow', () => {
  test('submitting search form navigates to search page', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel(/from/i).selectOption('DEL');
    await page.getByLabel(/to/i).selectOption('BOM');
    await page.getByLabel(/date/i).fill('2025-06-15');
    await page.getByRole('button', { name: /search flights/i }).click();
    await expect(page).toHaveURL(/\/search/);
    await expect(
      page.getByRole('heading', { name: /search flights|searching|→/i })
    ).toBeVisible({ timeout: 10000 });
  });

  test('search page shows search flights heading when visited directly', async ({ page }) => {
    await page.goto('/search');
    await expect(page.getByRole('heading', { name: /search flights/i })).toBeVisible();
  });

  test('home shows landing page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /fly with confidence/i })).toBeVisible();
  });
});
