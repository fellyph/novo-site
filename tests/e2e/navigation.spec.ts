import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the navigation bar', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should display logo with correct text', async ({ page }) => {
    const logo = page.locator('.logo');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveText('FC');
  });

  test('should have all navigation links', async ({ page }) => {
    const navLinks = page.locator('.nav-links a');
    await expect(navLinks).toHaveCount(3);

    await expect(navLinks.nth(0)).toHaveText('About');
    await expect(navLinks.nth(1)).toHaveText('Projects');
    await expect(navLinks.nth(2)).toHaveText('Blog');
  });

  test('should scroll to hero section when clicking About link', async ({ page }) => {
    await page.click('.nav-links a[href="#hero"]');

    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeInViewport();
  });

  test('should scroll to projects section when clicking Projects link', async ({ page }) => {
    await page.click('.nav-links a[href="#projects"]');

    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeInViewport();
  });

  test('should scroll to blog section when clicking Blog link', async ({ page }) => {
    await page.click('.nav-links a[href="#blog"]');

    const blogSection = page.locator('#blog');
    await expect(blogSection).toBeInViewport();
  });

  test('should have theme toggle button', async ({ page }) => {
    const themeToggle = page.locator('#theme-toggle');
    await expect(themeToggle).toBeVisible();
  });
});
