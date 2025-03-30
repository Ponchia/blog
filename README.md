# Modern Astro Blog

A modern, responsive blog built with Astro, React, and MDX, featuring Giscus comments powered by GitHub Discussions.

## Features

- ✨ Modern and minimalist design
- 📱 Fully responsive layout
- ⚡ Blazing fast performance with Astro
- 💻 Interactive React components in MDX
- 💬 Comment system using Giscus (GitHub Discussions)
- 📊 SEO optimized
- 🔄 RSS feed support
- 🌙 Light/dark mode support (via preferred color scheme)
- 📈 Privacy-friendly analytics with GoatCounter

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/blog.git
cd blog

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:4321` to see your blog.

## Adding Content

### Blog Posts

Blog posts are stored in `src/content/blog/` as Markdown (.md) or MDX (.mdx) files.

Each post should include frontmatter:

```yaml
---
title: 'Your Post Title'
description: 'A brief description of your post'
pubDate: 'Apr 01 2024'
heroImage: '/path/to/image.jpg'
---
```

### MDX and React Components

You can use React components in your MDX files:

```mdx
---
title: 'Using React in MDX'
description: 'A post with interactive components'
pubDate: 'Apr 01 2024'
---

import Counter from '../../components/Counter';

# My MDX Post with Interactive Components

<Counter client:visible />
```

Note: React components for MDX should be created in separate files (e.g., `src/components/`) and then imported into your MDX files. Client directives like `client:visible` make the components interactive on the client side.

## Comments Setup

This blog uses Giscus for comments. To configure:

1. Set up Giscus for your repository: https://giscus.app/
2. Update the Giscus parameters in `src/components/Comments.tsx` with your repository details:

```tsx
<Giscus
  id="comments"
  repo="your-username/your-repo"
  repoId="R_xxx"
  category="Blog Post Comments"
  categoryId="DIC_xxx"
  mapping="pathname"
  reactionsEnabled="1"
  emitMetadata="0"
  inputPosition="top"
  theme="preferred_color_scheme"
  lang="en"
  loading="lazy"
/>
```

## Analytics Setup

This blog uses [GoatCounter](https://www.goatcounter.com/) for privacy-friendly analytics. GoatCounter is:

- Free for personal use
- Privacy-friendly (GDPR compliant)
- Doesn't require cookies
- Provides basic visitor stats without tracking personal information

The script is already added to the layout files. If you need to update the configuration:

1. Sign up for a free account at [GoatCounter](https://www.goatcounter.com/)
2. Update the script in the layout files with your site code:

```html
<script data-goatcounter="https://YOUR-SITE-CODE.goatcounter.com/count" 
        async src="//gc.zgo.at/count.js"></script>
```

Your analytics dashboard will be available at `https://YOUR-SITE-CODE.goatcounter.com/`.

## Deployment

### GitHub Pages

The blog is pre-configured for GitHub Pages deployment:

1. Update `site` and `base` in `astro.config.mjs` with your GitHub username:
```js
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/blog',
  // ...
});
```

2. Push to GitHub
3. Enable GitHub Pages in your repository settings

```bash
npm run build
```

### Other Platforms

You can deploy this blog to any static hosting service like Netlify, Vercel, or Cloudflare Pages.

## Customization

- Styling: Update styles in `src/styles/global.css`
- Layout: Edit components in `src/components/` and layouts in `src/layouts/`
- Config: Modify site settings in `src/consts.ts` and `astro.config.mjs`

## Project Structure

```text
├── public/           # Static assets
├── src/
│   ├── components/   # React and Astro components
│   ├── content/      # Blog posts and content collections
│   ├── layouts/      # Page layouts
│   └── pages/        # Page routes
├── astro.config.mjs  # Astro configuration
├── README.md
└── package.json
```

## Contributing

Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to work on this project, including:
- Conventional commit standards
- Testing requirements
- Deployment considerations
- Base URL configuration

## Commands

| Command                | Action                                       |
| :--------------------- | :------------------------------------------- |
| `npm install`          | Installs dependencies                        |
| `npm run dev`          | Starts local dev server at `localhost:4321`  |
| `npm run build`        | Build your production site to `./dist/`      |
| `npm run preview`      | Preview your build locally                   |

## License

MIT

```sh
npm create astro@latest -- --template blog
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/blog)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/blog)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/blog/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![blog](https://github.com/withastro/astro/assets/2244813/ff10799f-a816-4703-b967-c78997e8323d)

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
