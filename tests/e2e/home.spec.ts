import { test, expect } from '@playwright/test';

const BASE_URL = process.env.FRONTEND_BASE_URL ?? 'http://localhost:3000';

test('homepage should load', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle(/run buddy/i);
  await expect(page.locator('text=Login')).toBeVisible();
});
