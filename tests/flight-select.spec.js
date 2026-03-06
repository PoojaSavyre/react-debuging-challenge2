import { test, expect } from '@playwright/test';

const stubFlight = {
  id: 'FL-101',
  airline: 'SkyWings',
  flightNumber: 'SW101',
  origin: 'DEL',
  destination: 'BOM',
  departure: '2025-06-01T08:00:00',
  arrival: '2025-06-01T10:15:00',
  duration: 135,
  price: 4500,
  seatsAvailable: 12,
};

test.beforeEach(async ({ page }) => {
  await page.route('**/api/auth/me', (route) =>
    route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Not authenticated' }),
    })
  );
  await page.route('**/api/flights*', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([stubFlight]),
    })
  );
});

test('clicking Select on a flight navigates to flight detail page', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel(/from/i).selectOption('DEL');
  await page.getByLabel(/to/i).selectOption('BOM');
  await page.getByLabel(/date/i).fill('2025-06-01');
  await page.getByRole('button', { name: /search flights/i }).click();
  await expect(page.getByTestId('flight-card-select').first()).toBeVisible({ timeout: 10000 });
  await page.getByTestId('flight-card-select').first().click();
  await expect(page).toHaveURL(/\/flight\/.+/);
});
