import { test, expect } from '@playwright/test';

const flightList = [
  { id: 'FL-101', airline: 'SkyWings', flightNumber: 'SW101', origin: 'DEL', destination: 'BOM', departure: '2025-03-15T08:00:00', arrival: '2025-03-15T10:15:00', duration: 135, price: 4500, seatsAvailable: 12 },
  { id: 'FL-102', airline: 'JetFast', flightNumber: 'JF202', origin: 'DEL', destination: 'BOM', departure: '2025-03-15T14:30:00', arrival: '2025-03-15T16:45:00', duration: 135, price: 5200, seatsAvailable: 8 },
];
const flightDetail = flightList[0];

test.describe('Review page shows baggage from booking', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/auth/me', (route) =>
      route.fulfill({ status: 200, body: JSON.stringify({ user: { id: '1', name: 'Test', email: 'test@test.com' } }) })
    );
    await page.route('**/api/flights*', (route) => {
      const url = route.request().url();
      if (url.includes('FL-101') && !url.includes('?')) {
        return route.fulfill({ status: 200, body: JSON.stringify(flightDetail) });
      }
      return route.fulfill({ status: 200, body: JSON.stringify(flightList) });
    });
    await page.addInitScript(() => {
      localStorage.setItem('authToken', 'test-token');
      localStorage.setItem('authUser', JSON.stringify({ id: '1', name: 'Test', email: 'test@test.com' }));
    });
    await page.goto('/');
    await page.waitForResponse((r) => r.url().includes('api/auth/me') && r.status() === 200, { timeout: 15000 });
  });

  test('baggage added on Baggage page appears on Review page', async ({ page }) => {
    test.setTimeout(60000);
    await page.getByLabel('From').selectOption('DEL');
    await page.getByLabel('To').selectOption('BOM');
    await page.getByLabel('Date').fill('2025-12-01');
    await page.getByRole('button', { name: 'Search Flights' }).click();
    await expect(page.getByRole('heading', { name: /choose a flight/i })).toBeVisible({ timeout: 10000 });
    await page.getByRole('link', { name: 'Select' }).first().click();
    await expect(page).toHaveURL(/\/flight\/FL-101/);
    await expect(page.getByRole('button', { name: 'Continue to passenger details' })).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'Continue to passenger details' }).click();
    await expect(page).toHaveURL(/\/passengers/);

    await page.getByLabel(/full name/i).first().fill('Test User');
    await page.getByLabel(/email/i).first().fill('test@example.com');
    await page.getByLabel(/phone/i).first().fill('+1234567890');
    await page.getByRole('button', { name: 'Continue to seat selection' }).click();
    await expect(page).toHaveURL(/\/seats/);

    await page.getByRole('button', { name: 'Seat A1 available' }).click();
    await page.getByRole('button', { name: 'Continue to baggage' }).click();
    await expect(page).toHaveURL(/\/baggage/);
    await expect(page.getByRole('heading', { name: 'Baggage' })).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId('baggage-drop-zone')).toBeVisible({ timeout: 10000 });

    const dropZone = page.getByTestId('baggage-drop-zone');
    const availableSection = page.getByText('Available options').locator('..');
    const carryOn = availableSection.locator('.draggable-baggage').filter({ hasText: 'Carry-on (1 piece)' });
    await dropZone.scrollIntoViewIfNeeded();
    await carryOn.dragTo(dropZone, { timeout: 15000, steps: 10 });
    await page.getByRole('button', { name: /continue to review/i }).click();
    await expect(page).toHaveURL(/\/review/);

    await expect(page.getByRole('heading', { name: 'Baggage' })).toBeVisible();
    await expect(page.getByText('Carry-on (1 piece)')).toBeVisible();
  });
});
