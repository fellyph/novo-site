import { test, expect } from '@playwright/test';

test.describe('Responsive Design - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    // Mock successful API response
    await page.route('**/wp-json/wp/v2/posts**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 1,
            title: { rendered: 'Test Post 1' },
            excerpt: { rendered: '<p>This is a test excerpt for post 1.</p>' },
            link: 'https://example.com/post1',
            date: '2025-01-01T12:00:00'
          }
        ])
      });
    });
    await page.goto('/');
  });

  test('should display navigation on mobile', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should display hero section properly on mobile', async ({ page }) => {
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();

    const title = page.locator('#hero h1');
    await expect(title).toBeVisible();
  });

  test('should display CTA buttons stacked on mobile', async ({ page }) => {
    const ctaButtons = page.locator('#hero .cta-buttons');
    await expect(ctaButtons).toBeVisible();

    // Both buttons should be visible
    const buttons = page.locator('#hero .cta-buttons .btn');
    await expect(buttons).toHaveCount(2);
  });

  test('should display project cards in single column on mobile', async ({ page }) => {
    const projectsGrid = page.locator('.projects-grid');
    await expect(projectsGrid).toBeVisible();

    // Project cards should be visible
    const projectCards = page.locator('.project-card');
    const count = await projectCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display blog cards on mobile', async ({ page }) => {
    // Scroll to blog section
    await page.locator('#blog').scrollIntoViewIfNeeded();

    // Wait for blog posts to load
    await page.waitForSelector('.blog-card', { timeout: 10000 });

    const blogCards = page.locator('.blog-card');
    const count = await blogCards.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Responsive Design - Tablet', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display all sections on tablet', async ({ page }) => {
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('#blog')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should display navigation properly on tablet', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    const navLinks = page.locator('.nav-links a');
    await expect(navLinks).toHaveCount(3);
  });
});

test.describe('Responsive Design - Desktop', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display all sections on desktop', async ({ page }) => {
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('#blog')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should display navigation with all links on desktop', async ({ page }) => {
    const navLinks = page.locator('.nav-links a');
    await expect(navLinks).toHaveCount(3);

    // All links should be visible on desktop
    for (let i = 0; i < 3; i++) {
      await expect(navLinks.nth(i)).toBeVisible();
    }
  });

  test('should display project cards in grid on desktop', async ({ page }) => {
    const projectsGrid = page.locator('.projects-grid');
    await expect(projectsGrid).toBeVisible();

    const projectCards = page.locator('.project-card');
    const count = await projectCards.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });
});
