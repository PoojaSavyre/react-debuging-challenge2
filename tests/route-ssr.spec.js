import { test, expect } from '@playwright/test';

test.describe('Route SSR', () => {
  test('direct visit to /search shows search page content', async ({ page }) => {
    await page.goto('/search');
    await expect(page.getByRole('heading', { name: /search flights/i })).toBeVisible();
  });

  test('direct visit to /about shows about page content', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: /about skybook/i })).toBeVisible();
  });

  test('home route shows landing page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /fly with confidence/i })).toBeVisible();
  });
});
