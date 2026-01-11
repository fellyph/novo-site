import { test, expect } from '@playwright/test';

test.describe('Footer Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should display copyright notice', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toContainText('Fellyph Cintra');
    await expect(footer).toContainText('All rights reserved');
  });

  test('should display social media links', async ({ page }) => {
    const socialLinks = page.locator('.social-links a');
    const count = await socialLinks.count();

    expect(count).toBeGreaterThan(0);
  });

  test('should have LinkedIn link', async ({ page }) => {
    const linkedinLink = page.locator('.social-links a[href*="linkedin"]');
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveAttribute('target', '_blank');
    await expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should have GitHub link', async ({ page }) => {
    const githubLink = page.locator('.social-links a[href*="github"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should have Twitter/X link', async ({ page }) => {
    const twitterLink = page.locator('.social-links a[href*="twitter"], .social-links a[href*="x.com"]');
    await expect(twitterLink).toBeVisible();
    await expect(twitterLink).toHaveAttribute('target', '_blank');
    await expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
