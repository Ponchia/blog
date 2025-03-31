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
- `ci`: Changes to CI configuration files and scripts

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

The site is deployed to GitHub Pages when changes are tagged for release.

1. **Tagging for Deployment**
   - Deployment is triggered only when commits are tagged with:
     - Version tags: `v*` (e.g., `v1.0.0`)
     - Release tags: `release-*` (e.g., `release-2023-05-01`)
   - To create and push a tag:
     ```bash
     git tag v1.0.0
     git push origin v1.0.0
     ```

2. **Preview Changes**
   - Use `npm run build` followed by `npm run preview` to preview the production build locally
   - Make sure all assets are loaded correctly with the `/blog` base path

3. **Check GitHub Actions**
   - Monitor the deployment process in GitHub Actions
   - Verify the deployment succeeded by checking the live site

### Features & Components

1. **Graph Data**
   - The blog generates a visualization graph with nodes and links
   - Changes to content may affect the graph structure

2. **PyScript Integration**
   - The blog includes PyScript components for interactive Python code
   - Test PyScript components thoroughly when making changes

## Common Issues and Solutions

- **Base URL Issues**: Always use relative URLs or ensure the `/blog` path is included
- **Asset Loading**: Place assets in the `public` directory and reference them with the base path
- **Slug Issues**: Be aware of potential slug conflicts in blog posts, check console during development

## Additional Resources

- [Astro Documentation](https://docs.astro.build/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Conventional Commits](https://www.conventionalcommits.org/)

### Dependency Management

1. **Tailwind CSS Setup**
   - Use the official Astro integration:
     ```bash
     npm install -D @astrojs/tailwind@^6.0.2 tailwindcss@^3.0.24 @tailwindcss/typography postcss autoprefixer
     ```
   - Ensure proper configuration in `astro.config.mjs`:
     ```js
     tailwind({
       applyBaseStyles: false,
     })
     ```
   - Create `postcss.config.mjs`:
     ```js
     export default {
       plugins: {
         tailwindcss: {},
         autoprefixer: {},
       },
     }
     ```

2. **Version Compatibility**
   - When encountering dependency conflicts:
     - First try uninstalling conflicting packages
     - Reinstall with specific versions
     - Use `--legacy-peer-deps` only as a last resort
   - Monitor console for version mismatch warnings

### Testing and Verification

1. **Development Server**
   ```bash
   npm run dev -- --port 4322 --host
   ```
   - Watch the console for:
     - Compilation errors
     - CSS processing issues
     - Asset loading problems
     - Slug conflicts

2. **Component Testing**
   - Test components in both light and dark modes
   - Verify Tailwind classes are applied correctly
   - Check responsive behavior across breakpoints
   - Ensure proper hydration of interactive components

3. **Build Testing**
   ```bash
   npm run build
   npm run preview
   ```
   - Verify production build:
     - Check console for warnings/errors
     - Test all interactive features
     - Confirm proper asset loading with base path
     - Validate SSR/CSR behavior

4. **MCP Services Integration**
   - Test Jira integration if applicable:
     - Verify issue creation/updates
     - Check comment synchronization
     - Validate worklog entries
   - Monitor browser integration:
     - Test file uploads
     - Verify navigation actions
     - Check screenshot capabilities

### Troubleshooting Guide

1. **Dependency Issues**
   - Clear npm cache:
     ```bash
     npm cache clean --force
     ```
   - Remove and reinstall dependencies:
     ```bash
     rm -rf node_modules package-lock.json
     npm install
     ```
   - Check for conflicting peer dependencies in package.json

2. **Build Problems**
   - Verify Astro configuration:
     - Check base URL settings
     - Confirm integration settings
     - Validate output options
   - Clear build cache:
     ```bash
     rm -rf dist .astro
     ```

3. **CSS/Styling Issues**
   - Confirm Tailwind directives in global CSS
   - Check PostCSS configuration
   - Verify theme configuration
   - Test dark mode implementation

4. **Component Errors**
   - Check import paths (use relative paths from root)
   - Verify client directives (client:load, client:visible)
   - Test hydration behavior
   - Monitor console for component-specific errors 