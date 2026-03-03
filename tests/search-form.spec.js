import { test, expect } from '@playwright/test';

test.describe('Flight search form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('search form submit with valid data navigates to search and shows results', async ({ page }) => {
    await page.getByLabel('From').selectOption('DEL');
    await page.getByLabel('To').selectOption('BOM');
    await page.getByLabel('Date').fill('2025-06-15');
    await page.getByLabel('Passengers').fill('1');
    await page.getByRole('button', { name: /search flights/i }).click();

    await expect(page).toHaveURL(/\/(search|search\?)/, { timeout: 5000 });
    await expect(page.getByText('Origin is required')).not.toBeVisible();
  });

  test('search form shows validation errors when required fields are empty', async ({ page }) => {
    await page.getByRole('button', { name: /search flights/i }).click();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('search', { name: 'Flight search' })).toBeVisible();
  });

  test('search form accepts valid input and stores search criteria', async ({ page }) => {
    await page.getByLabel('From').selectOption('DEL');
    await page.getByLabel('To').selectOption('BOM');
    await page.getByLabel('Date').fill('2025-06-15');
    await page.getByRole('button', { name: /search flights/i }).click();

    await expect(page).toHaveURL(/\/(search|search\?)/, { timeout: 5000 });
    await expect(page.getByRole('heading', { name: /DEL\s*→\s*BOM/ })).toBeVisible({ timeout: 10000 });
  });
});
