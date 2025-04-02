# Testing Documentation for Astro Blog

This document describes the testing setup for the Astro blog project. We've implemented a comprehensive testing strategy that covers multiple aspects of the application, from code quality to user experience.

## Testing Overview

The project includes the following types of tests:

1. **Linting & Code Quality** - Using ESLint and Prettier
2. **Type Checking** - Using TypeScript
3. **Unit Tests** - Using Vitest
4. **End-to-End Tests** - Using Playwright
5. **Accessibility Tests** - Using Playwright with Axe

## Running Tests Locally

### Prerequisites

Make sure you have installed all dependencies:

```bash
npm install
```

### Running Individual Test Types

```bash
# Run linting
npm run lint

# Run code formatting check
npm run format:check

# Format code
npm run format

# Run type checking
npm run type-check

# Run unit tests
npm run test

# Run unit tests in watch mode
npm run test:watch

# Run end-to-end tests
npm run test:e2e

# Run accessibility tests
npm run test:a11y
```

### Running All Tests

There's no single command to run all tests, but you can run them in sequence:

```bash
npm run lint && npm run type-check && npm run test && npm run test:e2e && npm run test:a11y
```

## GitHub Actions

We have a GitHub Actions workflow that runs all tests. This workflow can be triggered manually from the GitHub Actions tab.

### Workflow Details

The workflow (`test.yml`) performs the following steps:

1. Checks out the code
2. Sets up Node.js
3. Installs dependencies
4. Runs linting
5. Performs type checking
6. Runs unit tests
7. Builds the Astro site
8. Installs Playwright browsers
9. Runs end-to-end tests
10. Runs accessibility tests
11. Uploads test results as artifacts

## Test Structure

### Unit Tests

Unit tests are located in `src/components/__tests__/` and focus on testing utility functions and components in isolation.

### End-to-End Tests

End-to-end tests are located in the `e2e/` directory and test the application as a whole, simulating user interactions in a browser environment.

### Accessibility Tests

Accessibility tests are located in the `e2e/a11y/` directory and use Axe to check for common accessibility issues on different pages of the site.

## Adding New Tests

### Adding Unit Tests

1. Create a new file in `src/components/__tests__/` with a `.test.ts` or `.spec.ts` extension
2. Import Vitest functions (`describe`, `it`, `expect`, etc.)
3. Write your tests

Example:

```typescript
import { describe, it, expect } from 'vitest';
import { yourFunction } from '../../path/to/module';

describe('Your Module', () => {
  it('should do something', () => {
    expect(yourFunction()).toBe(expectedValue);
  });
});
```

### Adding End-to-End Tests

1. Create a new file in `e2e/` with a `.spec.ts` extension
2. Import Playwright test functions
3. Write your tests

Example:

```typescript
import { test, expect } from '@playwright/test';

test('page should load', async ({ page }) => {
  await page.goto('/your-page');
  await expect(page.getByText('Expected Content')).toBeVisible();
});
```

### Adding Accessibility Tests

1. Create a new file in `e2e/a11y/` with a `.spec.ts` extension
2. Import Playwright and AxeBuilder
3. Write your tests

Example:

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('page should be accessible', async ({ page }) => {
  await page.goto('/your-page');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

## Test Configuration

- ESLint: `.eslintrc.cjs`
- Prettier: `.prettierrc`
- Vitest: `vitest.config.ts`
- Playwright: `playwright.config.ts`
- Playwright A11y: `playwright-a11y.config.ts`

## Future Improvements

- Add visual regression testing with Playwright
- Implement testing coverage thresholds
- Add performance testing with Lighthouse CI
- Integrate tests with deployment workflow for CI/CD 