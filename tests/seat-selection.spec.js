import { test, expect } from '@playwright/test';

test.describe('Seat selection encapsulation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByLabel('Name').fill('E2E User');
    await page.getByLabel('Email').fill('e2e@example.com');
    await page.getByRole('button', { name: 'Log in' }).last().click();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    await page.getByLabel('From').selectOption('DEL');
    await page.getByLabel('To').selectOption('BOM');
    await page.getByLabel('Date').fill('2025-12-01');
    await page.getByLabel('Passengers').fill('2');
    await page.getByRole('button', { name: 'Search Flights' }).click();
    await expect(page.getByTestId('flight-card').first()).toBeVisible();
    await page.getByRole('link', { name: 'Select' }).first().click();
    await expect(page).toHaveURL(/\/flight\//);
    await page.getByRole('button', { name: 'Continue to passenger details' }).click();
    await expect(page).toHaveURL(/\/passengers/);
    await page.getByLabel('Full name').first().fill('Passenger One');
    await page.getByLabel('Email').first().fill('one@test.com');
    await page.getByLabel('Full name').nth(1).fill('Passenger Two');
    await page.getByLabel('Email').nth(1).fill('two@test.com');
    await page.getByRole('button', { name: 'Continue to seat selection' }).click();
    await expect(page).toHaveURL(/\/seats/);
  });

  test('going back to previous passenger shows that passenger\'s selected seat', async ({ page }) => {
    await page.getByRole('button', { name: 'Seat A1 available' }).click();
    await page.getByRole('button', { name: 'Next passenger' }).click();
    await page.getByRole('button', { name: 'Seat B2 available' }).click();
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.getByRole('button', { name: 'Seat A1 selected' })).toBeVisible();
  });

  test('seat selection page allows selecting a seat and continuing', async ({ page }) => {
    await page.getByRole('button', { name: 'Seat A1 available' }).click();
    await page.getByRole('button', { name: 'Next passenger' }).click();
    await page.getByRole('button', { name: 'Seat B2 available' }).click();
    await page.getByRole('button', { name: 'Continue to baggage' }).click();
    await expect(page).toHaveURL(/\/baggage/);
  });

  test('seat map shows selected state for current passenger', async ({ page }) => {
    await page.getByRole('button', { name: 'Seat A1 available' }).click();
    await expect(page.getByRole('button', { name: 'Seat A1 selected' })).toBeVisible();
  });
});
