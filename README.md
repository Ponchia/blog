# Modern Astro Blog

A modern, responsive blog built with Astro, React, and MDX, featuring Giscus comments powered by GitHub Discussions and interactive visualization tools.

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
- 🔍 Interactive content visualization with PyScript
- 🖼️ Automatic image optimization (WebP, AVIF)

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

## Image Optimization

This blog automatically optimizes images using Astro's built-in image optimization:

### Using the OptimizedImage Component

```jsx
import OptimizedImage from '../components/OptimizedImage.astro';

<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description of image"
  width={800}
  height={600}
  format="webp"
/>;
```

### Batch Image Conversion

Convert existing images to modern formats:

```bash
npm run optimize-images
```

For detailed information about image optimization, see [IMAGE_OPTIMIZATION.md](./IMAGE_OPTIMIZATION.md).

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
<script
  data-goatcounter="https://YOUR-SITE-CODE.goatcounter.com/count"
  async
  src="//gc.zgo.at/count.js"
></script>
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
- Layout: Edit components in `src/components/`

## Project Structure

```text
├── public/           # Static assets
├── src/
│   ├── assets/       # Optimized images
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

| Command                   | Action                                      |
| :------------------------ | :------------------------------------------ |
| `npm install`             | Installs dependencies                       |
| `npm run dev`             | Starts local dev server at `localhost:4321` |
| `npm run build`           | Build your production site to `./dist/`     |
| `npm run preview`         | Preview your build locally                  |
| `npm run optimize-images` | Convert images to WebP and AVIF formats     |

## License

MIT
