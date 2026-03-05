// @ts-check
const { test, expect } = require('@playwright/test');

const AUTH_USER = { id: '1', email: 'e2e@test.com', name: 'E2E User' };

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('authToken', 'stub-token');
    window.localStorage.setItem('authUser', JSON.stringify({ id: '1', email: 'e2e@test.com', name: 'E2E User' }));
  });
  await page.route('**/api/auth/me**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ user: AUTH_USER }),
    })
  );
});

test('baggage page: drag option to drop zone adds it to selected list', async ({ page }) => {
  await page.goto('/baggage');

  const dropZone = page.getByTestId('baggage-drop-zone');
  await expect(dropZone).toBeVisible();
  await dropZone.scrollIntoViewIfNeeded();

  const option = page.getByTestId('baggage-option-carry-1');
  await expect(option).toBeVisible();
  await option.scrollIntoViewIfNeeded();

  await option.dragTo(dropZone, { timeout: 10000, force: true });

  await expect(page.getByTestId('baggage-selected-carry-1')).toBeVisible({ timeout: 5000 });
  await expect(page.getByTestId('baggage-selected-list')).toContainText('Carry-on');
});
