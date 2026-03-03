import { test, expect } from '@playwright/test';

test.describe('Offers page (SSR data pre-fetching)', () => {
  test('direct visit to /offers shows offers content without staying on loading', async ({ page }) => {
    await page.goto('/offers');
    await expect(page.getByRole('heading', { name: /offers & deals/i })).toBeVisible();
    await expect(page.getByText(/first booking discount/i)).toBeVisible({ timeout: 10000 });
  });

  test('offers page shows at least one offer card when data is pre-fetched', async ({ page }) => {
    await page.goto('/offers');
    await expect(
      page.getByText(/first booking discount|weekend getaway|no hidden fees/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('home route still shows landing page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /fly with confidence/i })).toBeVisible();
  });
});
