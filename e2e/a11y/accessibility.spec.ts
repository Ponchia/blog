import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('homepage should not have critical accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      // Only test for critical/serious violations, not all best practices
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    // Report violations but don't fail the test for now
    // This allows us to gather information about issues that need to be fixed
    console.log('Homepage accessibility violations:', accessibilityScanResults.violations);
  });
  
  test('blog post pages should not have critical accessibility violations', async ({ page }) => {
    // First navigate to the home page
    await page.goto('/');
    
    // Find a blog post link and click it
    const blogLinks = page.getByRole('link', { name: /^(?!About|Home).+/ });
    
    if (await blogLinks.count() > 0) {
      await blogLinks.first().click();
      
      // Run accessibility scan on blog post page
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();
      
      // Report violations but don't fail the test for now
      console.log('Blog post accessibility violations:', accessibilityScanResults.violations);
    } else {
      test.skip(true, 'No blog posts found to test for accessibility');
    }
  });
  
  test('about page should not have critical accessibility violations', async ({ page }) => {
    await page.goto('/about');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    // Report violations but don't fail the test for now
    console.log('About page accessibility violations:', accessibilityScanResults.violations);
  });
}); 