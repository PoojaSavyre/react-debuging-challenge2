import { test, expect } from '@playwright/test';

test.describe('Flight detail page lifecycle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByLabel('Name').fill('E2E User');
    await page.getByLabel('Email').fill('e2e@example.com');
    await page.getByRole('button', { name: 'Log in' }).last().click();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    await page.getByLabel('From').selectOption('DEL');
    await page.getByLabel('To').selectOption('BOM');
    await page.getByLabel('Date').fill('2025-12-01');
    await page.getByRole('button', { name: 'Search Flights' }).click();
    await expect(page.getByTestId('flight-card').first()).toBeVisible();
  });

  test('viewing time starts from zero when opening a flight detail', async ({ page }) => {
    await page.getByRole('link', { name: 'Select' }).first().click();
    await expect(page).toHaveURL(/\/flight\//);
    await expect(page.getByText(/Viewing for/)).toBeVisible();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Back to results' }).click();
    await expect(page).toHaveURL(/\/search/);
    await page.getByRole('link', { name: 'Select' }).first().click();
    await expect(page).toHaveURL(/\/flight\//);
    await page.waitForTimeout(2000);
    await expect(page.getByText(/Viewing for [0-2]s/)).toBeVisible();
  });

  test('flight detail page loads and user can navigate back to results', async ({ page }) => {
    await page.getByRole('link', { name: 'Select' }).first().click();
    await expect(page).toHaveURL(/\/flight\//);
    await expect(page.getByText(/Viewing for/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Back to results' })).toBeVisible();
    await page.getByRole('button', { name: 'Back to results' }).click();
    await expect(page).toHaveURL(/\/search/);
  });

  test('user can open flight detail and continue to passenger details', async ({ page }) => {
    await page.getByRole('link', { name: 'Select' }).first().click();
    await expect(page).toHaveURL(/\/flight\//);
    await page.getByRole('button', { name: 'Continue to passenger details' }).click();
    await expect(page).toHaveURL(/\/passengers/);
  });
});
