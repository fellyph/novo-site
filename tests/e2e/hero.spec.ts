import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hero section', async ({ page }) => {
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();
  });

  test('should display main title', async ({ page }) => {
    const title = page.locator('#hero h1');
    await expect(title).toBeVisible();
    await expect(title).toContainText('Fellyph Cintra');
  });

  test('should display subtitle', async ({ page }) => {
    const subtitle = page.locator('#hero .subtitle');
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toContainText('Senior Front-end Developer');
  });

  test('should display CTA buttons', async ({ page }) => {
    const ctaButtons = page.locator('#hero .cta-buttons .btn');
    await expect(ctaButtons).toHaveCount(2);
  });

  test('View My Work button should scroll to projects', async ({ page }) => {
    const viewWorkBtn = page.locator('#hero .btn-primary');
    await expect(viewWorkBtn).toBeVisible();
    await expect(viewWorkBtn).toHaveText('View My Work');

    await viewWorkBtn.click();

    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeInViewport();
  });

  test('Read My Blog button should scroll to blog', async ({ page }) => {
    const readBlogBtn = page.locator('#hero .btn-secondary');
    await expect(readBlogBtn).toBeVisible();
    await expect(readBlogBtn).toHaveText('Read My Blog');

    await readBlogBtn.click();

    const blogSection = page.locator('#blog');
    await expect(blogSection).toBeInViewport();
  });

  test('should display profile glow effect', async ({ page }) => {
    const profileGlow = page.locator('.profile-glow');
    await expect(profileGlow).toBeVisible();
  });
});
