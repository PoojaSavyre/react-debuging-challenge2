import { test, expect } from '@playwright/test';

test.describe('Flight search form', () => {
  test('should display the flight search form on the landing page', async ({ page }) => {
    await page.goto('/');
    const searchForm = page.getByRole('search', { name: /flight search/i });
    await expect(searchForm).toBeVisible();
    await expect(page.getByRole('button', { name: /search flights/i })).toBeVisible();
  });

  test('should submit valid search and navigate to search results', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel(/from/i).selectOption({ value: 'DEL' });
    await page.getByLabel(/to/i).selectOption({ value: 'BOM' });
    await page.getByLabel(/date/i).fill('2026-12-15');
    await page.getByRole('button', { name: /search flights/i }).click();
    await expect(page).toHaveURL(/\/(search|search\/?)$/);
    await expect(
      page.getByText(/searching|loading flights|flight\(s\) found|choose a flight|no flights/i).first()
    ).toBeVisible({ timeout: 8000 });
  });

  test('should show validation errors when submitting empty form', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /search flights/i }).click();
    await expect(page.getByText(/required|origin|destination|date/i).first()).toBeVisible({ timeout: 3000 });
    await expect(page).toHaveURL('/');
  });
});
