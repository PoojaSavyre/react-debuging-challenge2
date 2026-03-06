import { test, expect } from '@playwright/test';

test.describe('Flight search form', () => {
  test('search form accepts destination and submits to results', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('From').selectOption('DEL');
    await page.getByLabel('To').selectOption('BOM');
    await page.getByLabel('Date').fill('2025-12-01');
    await page.getByRole('button', { name: 'Search Flights' }).click();
    await expect(page).toHaveURL(/\/(search|flight)/);
    await expect(page.getByRole('heading', { name: 'Choose a flight' })).toBeVisible({ timeout: 5000 });
  });

  test('validation shows error when destination is empty', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('From').selectOption('DEL');
    await page.getByLabel('To').selectOption({ value: '' });
    await page.getByLabel('Date').fill('2025-12-01');
    await page.getByRole('button', { name: 'Search Flights' }).click();
    await expect(page.getByTestId('search-form').getByText(/destination is required/i)).toBeVisible({ timeout: 5000 });
  });

  test('search results show route when origin and destination are selected', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('From').selectOption('DEL');
    await page.getByLabel('To').selectOption('BOM');
    await page.getByLabel('Date').fill('2025-12-01');
    await page.getByRole('button', { name: 'Search Flights' }).click();
    await expect(page).toHaveURL(/\/(search|flight)/);
    await expect(page.getByRole('heading', { name: /choose a flight/i })).toBeVisible();
  });
});
