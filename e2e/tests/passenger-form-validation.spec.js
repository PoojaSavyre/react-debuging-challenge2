// @ts-check
import { test, expect } from '@playwright/test';

const authUser = { user: { id: 'u1', email: 'u@test.com', name: 'Test User' } };
const flightList = [
  {
    id: 'fl-1',
    airline: 'Test Air',
    flightNumber: 'T101',
    origin: 'DEL',
    destination: 'BOM',
    departure: '2025-06-01T10:00:00Z',
    arrival: '2025-06-01T12:00:00Z',
    duration: 120,
    price: 4999,
    seatsAvailable: 10,
  },
];

test.describe('Passenger form validation (React Hook Form)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('authToken', 'stub-token');
    });

    await page.route('**/api/auth/me', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(authUser),
      });
    });

    await page.route(/\/api\/flights\?.*/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(flightList),
      });
    });

    await page.route('**/api/flights/fl-1', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(flightList[0]),
      });
    });
  });

  test('passenger form blocks submission when required fields are empty', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('search-form')).toBeVisible({ timeout: 10000 });

    await page.getByLabel(/from/i).selectOption('DEL');
    await page.getByLabel(/to/i).selectOption('BOM');
    await page.getByLabel(/date/i).fill('2025-06-01');
    await page.getByRole('button', { name: /search flights/i }).click();

    await expect(page.getByTestId('search-results-page')).toBeVisible({ timeout: 10000 });
    await page.getByTestId('flight-card').getByRole('link', { name: /select/i }).click();

    await expect(page).toHaveURL(/\/flight\/fl-1/, { timeout: 5000 });
    await page.getByRole('button', { name: /continue to passenger details/i }).click();

    await expect(page).toHaveURL(/\/passengers/, { timeout: 5000 });
    await expect(page.getByTestId('passenger-form-page')).toBeVisible();

    // Submit without filling required name/email - validation should block navigation
    await page.getByTestId('passenger-form-submit').click();

    // When fixed: user stays on passenger page; when bug present they are navigated to /seats
    await expect(page).toHaveURL(/\/passengers\/?/, { timeout: 3000 });
    await expect(page.getByTestId('passenger-form-page')).toBeVisible();
    // Validation messages should appear when form is invalid (at least one)
    await expect(
      page.getByRole('alert').or(page.getByText(/name is required|email is required|enter a valid email/i)).first()
    ).toBeVisible();
  });
});
