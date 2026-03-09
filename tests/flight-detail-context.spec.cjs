// @ts-check
const { test, expect } = require('@playwright/test');

const FLIGHT_101 = {
  id: 'FL-101',
  airline: 'SkyWings',
  flightNumber: 'SW101',
  origin: 'DEL',
  destination: 'BOM',
  departure: '2025-03-15T08:00:00',
  arrival: '2025-03-15T10:15:00',
  duration: 135,
  price: 4500,
  seatsAvailable: 12,
};
const FLIGHT_201 = {
  id: 'FL-201',
  airline: 'SkyWings',
  flightNumber: 'SW201',
  origin: 'DEL',
  destination: 'BLR',
  departure: '2025-03-15T07:00:00',
  arrival: '2025-03-15T09:30:00',
  duration: 150,
  price: 6200,
  seatsAvailable: 18,
};

test.describe('Flight detail page fetches by route (not context)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('authToken', 'stub-token');
    });
  });

  test('shows the flight user just selected after they had previously continued with another flight', async ({
    page,
  }) => {
    await page.route('**/api/auth/me', (route) => {
      if (route.request().method() !== 'GET') return route.continue();
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ user: { id: 'u1', email: 'e@e.com', name: 'Test User' } }),
      });
    });

    await page.route('**/api/flights/FL-101', (route) => {
      if (route.request().method() !== 'GET') return route.continue();
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(FLIGHT_101),
      });
    });

    await page.route('**/api/flights/FL-201', (route) => {
      if (route.request().method() !== 'GET') return route.continue();
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(FLIGHT_201),
      });
    });

    await page.goto('/flight/FL-101');
    await expect(page.getByTestId('flight-detail-page')).toBeVisible({ timeout: 10000 });
    await expect(page.getByTestId('flight-detail-route')).toContainText('BOM');

    await page.getByTestId('flight-detail-continue').click();
    await expect(page).toHaveURL(/\/passengers/, { timeout: 5000 });

    // Simulate user going back and selecting a different flight (e.g. Back to results → click another flight)
    await page.goto('/flight/FL-201');
    await expect(page.getByTestId('flight-detail-page')).toBeVisible({ timeout: 10000 });
    await expect(page.getByTestId('flight-detail-route')).toContainText('BLR');
  });
});
