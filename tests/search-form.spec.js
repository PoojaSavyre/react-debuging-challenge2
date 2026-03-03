import { test, expect } from '@playwright/test';

test.describe('Flight search form', () => {
  test('landing page shows search form and user can select origin without breaking', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.getByRole('search', { name: 'Flight search' })).toBeVisible();
    await page.getByLabel('From').selectOption('DEL');
    await expect(page.getByRole('button', { name: /search flights/i })).toBeVisible();
    await expect(page.getByLabel('From')).toHaveValue('DEL');
  });

  test('search form submits and navigates to search results when origin, destination and date are filled', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByLabel('From').selectOption('DEL');
    await page.getByLabel('To').selectOption('BOM');
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const dateStr = futureDate.toISOString().slice(0, 10);
    await page.getByLabel('Date').fill(dateStr);
    await page.getByRole('button', { name: /search flights/i }).click();
    await expect(page).toHaveURL(/\/search/);
    await expect(
      page.getByRole('heading', { name: /DEL\s*→\s*BOM/ })
    ).toBeVisible({ timeout: 10000 });
  });

  test('search results page shows route and results after successful form submit', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByLabel('From').selectOption('BLR');
    await page.getByLabel('To').selectOption('MAA');
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 14);
    await page.getByLabel('Date').fill(futureDate.toISOString().slice(0, 10));
    await page.getByRole('button', { name: /search flights/i }).click();
    await expect(page).toHaveURL(/\/search/);
    await expect(
      page.getByRole('heading', { name: /BLR\s*→\s*MAA/ })
    ).toBeVisible({ timeout: 10000 });
  });
});
