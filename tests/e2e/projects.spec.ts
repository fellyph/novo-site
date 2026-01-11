import { test, expect } from '@playwright/test';

test.describe('Projects Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display projects section', async ({ page }) => {
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeVisible();
  });

  test('should display projects section title', async ({ page }) => {
    const projectsTitle = page.locator('#projects h2');
    await expect(projectsTitle).toBeVisible();
    await expect(projectsTitle).toHaveText('Featured Projects');
  });

  test('should display project cards', async ({ page }) => {
    const projectCards = page.locator('.project-card');
    const count = await projectCards.count();

    expect(count).toBeGreaterThan(0);
  });

  test('should display WordPress Playground project', async ({ page }) => {
    const projectCards = page.locator('.project-card');

    // Find the WordPress Playground project
    const wpPlayground = projectCards.filter({ hasText: 'WordPress Playground' });
    await expect(wpPlayground).toBeVisible();

    // Check it has description
    const description = wpPlayground.locator('p');
    await expect(description).toContainText('WebAssembly');
  });

  test('should display Gutenberg Blocks project', async ({ page }) => {
    const projectCards = page.locator('.project-card');

    // Find the Gutenberg Blocks project
    const gutenberg = projectCards.filter({ hasText: 'Gutenberg Blocks' });
    await expect(gutenberg).toBeVisible();

    // Check it has description
    const description = gutenberg.locator('p');
    await expect(description).toContainText('React');
  });

  test('should display project tags', async ({ page }) => {
    const firstProjectCard = page.locator('.project-card').first();
    const tags = firstProjectCard.locator('.tag');

    const tagCount = await tags.count();
    expect(tagCount).toBeGreaterThan(0);
  });

  test('project cards should have proper structure', async ({ page }) => {
    const firstProjectCard = page.locator('.project-card').first();

    // Check for title (h3)
    const title = firstProjectCard.locator('h3');
    await expect(title).toBeVisible();

    // Check for description (p)
    const description = firstProjectCard.locator('p');
    await expect(description).toBeVisible();

    // Check for tags container
    const tagsContainer = firstProjectCard.locator('.tags');
    await expect(tagsContainer).toBeVisible();
  });
});
