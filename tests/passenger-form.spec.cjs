// @ts-check
const { test, expect } = require('@playwright/test');

const STUB_USER = { id: 'u1', email: 'e2e@test.com', name: 'E2E Test User' };
const STUB_FLIGHTS = [
  {
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
  },
];
const STUB_FLIGHT = STUB_FLIGHTS[0];

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('authToken', 'stub-auth-token');
    window.localStorage.setItem('authUser', JSON.stringify({ id: 'u1', email: 'e2e@test.com', name: 'E2E Test User' }));
  });

  // Matcher receives (url: URL); handler receives (route, request)
  await page.route((url) => url.href.includes('/api/'), async (route, request) => {
    const u = request.url();

    if (u.includes('api/auth/me')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ user: STUB_USER }),
      });
    }
    if (u.includes('api/flights?') || u.includes('api/flights&')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(STUB_FLIGHTS),
      });
    }
    if (u.includes('api/flights/')) {
      const id = u.split('/api/flights/')[1]?.split('?')[0]?.split('/')[0];
      const flight = id === STUB_FLIGHT.id ? STUB_FLIGHT : { ...STUB_FLIGHT, id };
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(flight),
      });
    }
    return route.continue();
  });
});

test('passenger form state updates when passenger count changes and submit sends correct count', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel(/^From/).selectOption('DEL');
  await page.getByLabel(/^To/).selectOption('BOM');
  await page.getByLabel(/^Date/).fill('2025-06-01');
  await page.getByLabel(/^Passengers/).fill('2');
  await page.getByRole('button', { name: /search flights/i }).click();

  await expect(page.getByTestId('flight-card').first()).toBeVisible({ timeout: 5000 });
  await page.getByRole('link', { name: /select/i }).first().click();

  await expect(page.getByRole('button', { name: /continue to passenger details/i })).toBeVisible({ timeout: 5000 });
  await page.getByRole('button', { name: /continue to passenger details/i }).click();

  await expect(page.getByTestId('passenger-form')).toBeVisible({ timeout: 5000 });

  const countSelect = page.getByTestId('passenger-count-select');
  await countSelect.scrollIntoViewIfNeeded();
  await countSelect.selectOption('3');

  await page.getByTestId('passenger-0-name').fill('Alice One');
  await page.getByTestId('passenger-0-email').fill('alice1@test.com');
  await page.getByTestId('passenger-1-name').fill('Bob Two');
  await page.getByTestId('passenger-1-email').fill('bob2@test.com');
  await page.getByTestId('passenger-2-name').fill('Carol Three');
  await page.getByTestId('passenger-2-email').fill('carol3@test.com');

  await page.getByTestId('passenger-form-submit').click();

  await expect(page.getByTestId('seat-selection-page')).toBeVisible({ timeout: 5000 });
  await expect(page.getByTestId('passenger-count-label')).toContainText('of 3');
});
