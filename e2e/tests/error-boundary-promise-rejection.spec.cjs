// @ts-check
const { test, expect } = require('@playwright/test');

const stubFlight = {
  id: '1',
  airline: 'TestAir',
  flightNumber: 'TA101',
  origin: 'DEL',
  destination: 'BOM',
  departure: new Date(Date.now() + 86400000).toISOString(),
  arrival: new Date(Date.now() + 86400000 + 7200000).toISOString(),
  duration: 120,
  price: 5000,
  seatsAvailable: 10,
};

test.describe('Error boundary and promise rejections', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/auth/me', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ user: { email: 'e2e@test.com', name: 'E2E User' } }) })
    );
  });

  test('when flight add-ons API rejects, user can still see flight and continue (no full-page crash)', async ({ page }) => {
    await page.route('**/api/flights/1', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(stubFlight) })
    );
    await page.route('**/api/flights/1/extras', (route) =>
      route.fulfill({ status: 500, body: 'Internal Server Error' })
    );

    await page.goto('/flight/1');

    // With the bug fixed: page should not crash; user sees flight details and can continue.
    await expect(page.getByRole('button', { name: /continue to passenger details/i })).toBeVisible({ timeout: 10000 });
    // Error boundary should not take over the page.
    await expect(page.getByTestId('error-boundary-fallback')).not.toBeVisible();
  });
});
