import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
    await page.goto('/');
  });

  test('should default to dark theme', async ({ page }) => {
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('should switch to light theme when toggle is clicked', async ({ page }) => {
    const themeToggle = page.locator('#theme-toggle');
    const html = page.locator('html');

    // Initially dark
    await expect(html).toHaveAttribute('data-theme', 'dark');

    // Click to switch to light
    await themeToggle.click();
    await expect(html).toHaveAttribute('data-theme', 'light');
  });

  test('should switch back to dark theme on second click', async ({ page }) => {
    const themeToggle = page.locator('#theme-toggle');
    const html = page.locator('html');

    // Click to light
    await themeToggle.click();
    await expect(html).toHaveAttribute('data-theme', 'light');

    // Click to dark
    await themeToggle.click();
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('should persist theme preference in localStorage', async ({ page }) => {
    const themeToggle = page.locator('#theme-toggle');

    // Switch to light
    await themeToggle.click();

    // Check localStorage
    const savedTheme = await page.evaluate(() => {
      return window.localStorage.getItem('theme');
    });
    expect(savedTheme).toBe('light');
  });

  test('should load saved theme preference on page reload', async ({ page }) => {
    const themeToggle = page.locator('#theme-toggle');
    const html = page.locator('html');

    // Switch to light
    await themeToggle.click();
    await expect(html).toHaveAttribute('data-theme', 'light');

    // Reload page
    await page.reload();

    // Should still be light
    await expect(html).toHaveAttribute('data-theme', 'light');
  });

  test('should update toggle button text based on theme', async ({ page }) => {
    const themeToggle = page.locator('#theme-toggle');

    // Dark theme should show sun icon (switch to light)
    await expect(themeToggle).toContainText('Light');

    // Switch to light
    await themeToggle.click();

    // Light theme should show moon icon (switch to dark)
    await expect(themeToggle).toContainText('Dark');
  });
});
