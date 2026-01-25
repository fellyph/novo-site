import { test, expect } from '@playwright/test';

test.describe('Blog Section', () => {
  test.beforeEach(async ({ page }) => {
    // Mock successful API response
    await page.route('**/wp-json/wp/v2/posts?per_page=6', async (route) => {
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
          },
          {
            id: 2,
            title: { rendered: 'Test Post 2' },
            excerpt: { rendered: '<p>This is a test excerpt for post 2.</p>' },
            link: 'https://example.com/post2',
            date: '2025-01-02T12:00:00'
          }
        ])
      });
    });
    await page.goto('/');
  });

  test('should display blog section', async ({ page }) => {
    const blogSection = page.locator('#blog');
    await expect(blogSection).toBeVisible();
  });

  test('should display blog section title', async ({ page }) => {
    const blogTitle = page.locator('#blog h2');
    await expect(blogTitle).toBeVisible();
    await expect(blogTitle).toHaveText('Latest Blog Posts');
  });

  test('should load blog posts from API', async ({ page }) => {
    // Wait for blog posts to load
    const blogCards = page.locator('.blog-card');

    // Should have at least one blog post (or error message)
    await expect(blogCards.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display blog cards with correct structure', async ({ page }) => {
    // Wait for blog posts to load
    await page.waitForSelector('.blog-card', { timeout: 10000 });

    const firstBlogCard = page.locator('.blog-card').first();

    // Check card has date
    const date = firstBlogCard.locator('.blog-date');
    await expect(date).toBeVisible();

    // Check card has title
    const title = firstBlogCard.locator('h3');
    await expect(title).toBeVisible();

    // Check card has excerpt
    const excerpt = firstBlogCard.locator('.blog-excerpt');
    await expect(excerpt).toBeVisible();

    // Check card has read more link
    const readMore = firstBlogCard.locator('a.read-more');
    await expect(readMore).toBeVisible();
    await expect(readMore).toHaveText('Read More →');
  });

  test('should have read more links with target blank', async ({ page }) => {
    await page.waitForSelector('.blog-card', { timeout: 10000 });

    const readMoreLinks = page.locator('.blog-card a.read-more');
    const firstLink = readMoreLinks.first();

    await expect(firstLink).toHaveAttribute('target', '_blank');
    await expect(firstLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should display multiple blog posts', async ({ page }) => {
    await page.waitForSelector('.blog-card', { timeout: 10000 });

    const blogCards = page.locator('.blog-card');
    const count = await blogCards.count();

    // Should display up to 6 posts based on the API call
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(6);
  });
});

test.describe('Blog Section - Error Handling', () => {
  test('should show error message when API fails', async ({ page }) => {
    // Mock failed API response
    await page.route('**/wp-json/wp/v2/posts**', async (route) => {
      await route.abort('failed');
    });

    await page.goto('/');

    // Should show error message in blog grid
    const blogGrid = page.locator('.blog-grid');
    await expect(blogGrid).toContainText('Unable to load blog posts');
  });
});
