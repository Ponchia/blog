# Contributing to the Astro Blog

This document outlines the rules and best practices for contributing to this Astro blog project.

## Project Overview

This is an Astro-based blog deployed on GitHub Pages at:
- Base URL: [https://ponchia.github.io/blog/](https://ponchia.github.io/blog/)

## Development Workflow

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev -- --port 4322 --host
   ```

### Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) standards:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, indentation)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or modifying tests
- `chore`: Changes to the build process, tooling, etc.

**When to Commit:**
- Commit after completing logical units of work
- Commit when you've made significant progress
- Commit before switching to a different task
- Always ensure your commits pass all tests before pushing

### Code Standards

1. **Avoid Hardcoded Solutions**
   - Consider the general context of the application
   - Make solutions reusable when possible
   - Use configuration files for environment-specific settings

2. **Use TypeScript** when adding new components or functionality

3. **Follow Astro's best practices** for component design and routing

### Testing Requirements

Always test your changes before submitting them:

1. **Local Testing**
   - Use `npm run dev` to test locally
   - Verify your changes work across different screen sizes

2. **Automated Testing**
   - Use Playwright for end-to-end testing:
     ```bash
     npx playwright test
     ```
   - Test on multiple browsers when applicable

3. **URL Testing**
   - Always test with the correct base URL: `https://ponchia.github.io/blog/`
   - Ensure all links and assets work properly with this base path

### Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

1. **Preview Changes**
   - Use `npm run build` followed by `npm run preview` to preview the production build locally
   - Make sure all assets are loaded correctly with the `/blog` base path

2. **Check GitHub Actions**
   - Monitor the deployment process in GitHub Actions
   - Verify the deployment succeeded by checking the live site

## Common Issues and Solutions

- **Base URL Issues**: Always use relative URLs or ensure the `/blog` path is included
- **Asset Loading**: Place assets in the `public` directory and reference them with the base path

## Additional Resources

- [Astro Documentation](https://docs.astro.build/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Conventional Commits](https://www.conventionalcommits.org/) 