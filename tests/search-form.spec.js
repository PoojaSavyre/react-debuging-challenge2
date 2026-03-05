import { test, expect } from '@playwright/test';

test.describe('Flight search and results', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('From').selectOption('DEL');
    await page.getByLabel('To').selectOption('BOM');
    await page.getByLabel('Date').fill('2025-12-01');
    await page.getByRole('button', { name: 'Search Flights' }).click();
  });

  test('clicking Select on first flight navigates to that flight detail', async ({ page }) => {
    await page.getByRole('button', { name: 'Select' }).first().click();
    const firstUrl = page.url();
    await page.goBack();
    await page.getByRole('button', { name: 'Select' }).nth(1).click();
    await expect(page).not.toHaveURL(firstUrl);
  });

  test('search returns results and user can navigate to a flight detail', async ({ page }) => {
    await page.getByRole('button', { name: 'Select' }).first().click();
    await expect(page).toHaveURL(/\/flight\//);
  });

  test('results show flight cards after search', async ({ page }) => {
    await expect(page.getByTestId('flight-card').first()).toBeVisible();
    const count = await page.getByTestId('flight-card').count();
    expect(count).toBeGreaterThan(0);
  });
});
