// @ts-check
import { test, expect } from '@playwright/test';
test.describe('Landing page search form', () => {
  test('landing page shows search form', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('search', { name: /flight search/i })).toBeVisible();
    await expect(page.getByLabel(/from/i)).toBeVisible();
    await expect(page.getByLabel(/to/i)).toBeVisible();
    await expect(page.getByLabel(/date/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /search flights/i })).toBeVisible();
  });

  test('search form retains origin after selecting it', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel(/from/i).selectOption('DEL');
    await expect(page.getByLabel(/from/i)).toHaveValue('DEL');
  });

  test('user can submit search from landing and see results', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel(/from/i).selectOption('DEL');
    await page.getByLabel(/to/i).selectOption('BOM');
    await page.getByLabel(/date/i).fill('2025-06-15');
    await page.getByRole('button', { name: /search flights/i }).click();
    await expect(page).toHaveURL(/\/search/);
    await expect(page.getByRole('heading', { name: /DEL\s*→\s*BOM|Searching/ })).toBeVisible({ timeout: 10000 });
  });
});
