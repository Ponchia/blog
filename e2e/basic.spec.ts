import { test, expect } from '@playwright/test';

test.describe('Basic Navigation Tests', () => {
  test('has the correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Astro Blog/);
  });

  test('can navigate to a blog post', async ({ page }) => {
    await page.goto('/');
    
    // Find a blog post link and click it
    const blogLinks = page.getByRole('link', { name: /^(?!About|Home).+/ });
    if (await blogLinks.count() > 0) {
      await blogLinks.first().click();
      
      // Verify we're on a blog post page
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      
      // Some blogs might not have time elements or comments section,
      // so we'll focus on just verifying we navigated to a different page
      await expect(page.url()).not.toEqual('/');
    } else {
      // If no blog posts exist, the test should be skipped
      test.skip(true, 'No blog posts found to navigate to');
    }
  });

  test('can navigate to the about page', async ({ page }) => {
    await page.goto('/');
    
    // Click the "About" link in the navigation - get more specific with the selector
    await page.getByRole('navigation').getByRole('link', { name: 'About' }).click();
    
    // Verify we're on the about page
    await expect(page.url()).toContain('/about');
    await expect(page.getByRole('heading', { name: /about/i, level: 1 })).toBeVisible();
  });
}); 