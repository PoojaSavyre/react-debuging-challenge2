import { test, expect } from '@playwright/test';

test.describe('Flight booking flow', () => {
  test.beforeEach(async ({ page }) => {
    // Auth stub: ensure app restores a valid session
    await page.addInitScript(() => {
      window.localStorage.setItem('authToken', 'e2e-token');
    });

    await page.route('**/api/auth/me', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: { id: 'u-1', name: 'E2E User', email: 'e2e.user@example.com' },
        }),
      });
    });

    await page.route('**/api/flights?*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'f-100',
            airline: 'SkyJet',
            flightNumber: 'SJ 101',
            origin: 'DEL',
            destination: 'BOM',
            departure: '2026-04-01T08:00:00.000Z',
            arrival: '2026-04-01T10:10:00.000Z',
            duration: 130,
            price: 5499,
            seatsAvailable: 6,
          },
        ]),
      });
    });

    await page.route('**/api/flights/*', async (route) => {
      const url = new URL(route.request().url());
      const flightId = url.pathname.split('/').pop() || 'unknown';
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: flightId,
          airline: 'SkyJet',
          flightNumber: 'SJ 101',
          origin: 'DEL',
          destination: 'BOM',
          departure: '2026-04-01T08:00:00.000Z',
          arrival: '2026-04-01T10:10:00.000Z',
          duration: 130,
          price: 5499,
          seatsAvailable: 6,
        }),
      });
    });
  });

  test('can continue from flight details to passenger details', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel(/From/i).selectOption('DEL');
    await page.getByLabel(/To/i).selectOption('BOM');
    await page.getByLabel(/Date/i).fill('2026-04-01');
    await page.getByLabel(/Passengers/i).fill('1');
    await page.getByRole('button', { name: /search flights/i }).click();

    const flightCard = page.getByTestId('flight-card').first();
    await flightCard.getByRole('link', { name: /select/i }).click();

    await expect(page.getByTestId('continue-to-passengers')).toBeVisible();
    await page.getByTestId('continue-to-passengers').click();

    await expect(page).toHaveURL(/\/passengers$/);
    await expect(page.getByRole('heading', { name: /passenger details/i })).toBeVisible();
    await expect(page.getByTestId('passenger-details-page')).toBeVisible();
  });
});

