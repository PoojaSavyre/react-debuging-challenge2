import { test, expect } from '@playwright/test';

test.describe('Baggage page Remove button', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/auth/me', (route) =>
      route.fulfill({ status: 200, body: JSON.stringify({ user: { id: '1', name: 'Test', email: 'test@test.com' } }) })
    );
    await page.addInitScript(() => {
      localStorage.setItem('authToken', 'test-token');
      localStorage.setItem('authUser', JSON.stringify({ id: '1', name: 'Test', email: 'test@test.com' }));
    });
    await page.goto('/');
    await page.waitForResponse((resp) => resp.url().includes('api/auth/me') && resp.status() === 200, { timeout: 15000 });
    await page.goto('/baggage');
    await expect(page.getByTestId('baggage-drop-zone')).toBeVisible({ timeout: 15000 });
  });

  test('clicking Remove on first item removes that item (not the last)', async ({ page }) => {
    const dropZone = page.getByTestId('baggage-drop-zone');
    const availableSection = page.getByText('Available options').locator('..');
    const carryOn = availableSection.locator('.draggable-baggage').filter({ hasText: 'Carry-on (1 piece)' });
    const checkedBag = availableSection.locator('.draggable-baggage').filter({ hasText: 'Checked bag (1 piece)' });

    await carryOn.dragTo(dropZone);
    await checkedBag.dragTo(dropZone);

    await expect(dropZone.getByText('Carry-on (1 piece)')).toBeVisible();
    await expect(dropZone.getByText('Checked bag (1 piece)')).toBeVisible();

    const firstRemove = dropZone.getByRole('button', { name: 'Remove' }).first();
    await firstRemove.click();

    await expect(dropZone.getByText('Checked bag (1 piece)')).toBeVisible();
    await expect(dropZone.getByText('Carry-on (1 piece)')).not.toBeVisible();
  });
});
