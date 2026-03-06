// @ts-check
import { test, expect } from '@playwright/test';

const AUTH_ME_PATH = '**/api/auth/me';
const FLIGHT_DETAIL_PATH = '**/api/flights/*';

const stubFlight = {
  id: '1',
  airline: 'SkyBook',
  flightNumber: 'SB101',
  origin: 'DEL',
  destination: 'BOM',
  departure: new Date(Date.now() + 86400000).toISOString(),
  arrival: new Date(Date.now() + 86400000 + 7200000).toISOString(),
  duration: 120,
  price: 5000,
  seatsAvailable: 10,
};

test.describe('Flight detail data fetching', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(AUTH_ME_PATH, (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ user: null }),
      });
    });
  });

  test('flight detail fetches once and shows continue button', async ({ page }) => {
    let flightDetailRequestCount = 0;
    await page.route(FLIGHT_DETAIL_PATH, (route) => {
      const url = route.request().url();
      if (url.includes('/api/flights/') && !url.includes('?')) {
        flightDetailRequestCount++;
      }
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(stubFlight),
      });
    });

    await page.goto('/flight/1');

    await expect(page.getByTestId('flight-detail-continue-btn')).toBeVisible({ timeout: 15000 });

    // With correct deps: 1 request; with React Strict Mode double-invoke in dev: 2. Bug causes many more.
    expect(flightDetailRequestCount).toBeLessThanOrEqual(2);
    expect(flightDetailRequestCount).toBeGreaterThanOrEqual(1);
  });
});
