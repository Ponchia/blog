// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import pagefind from 'astro-pagefind';
import { remarkReadingTime } from './remark-reading-time.mjs';
import { remarkGitDates } from './remark-git-dates.mjs';

// Determine if we're in production or dev
const isProduction = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  // For GitHub Pages deployment
  site: 'https://ponchia.github.io',

  // Use /blog base in production, empty in dev
  base: isProduction ? '/blog' : '',

  integrations: [
      mdx(), 
      sitemap({
        changefreq: 'weekly',
        priority: 0.7,
        serialize(item) {
          // Customize priority based on URL pattern
          if (item.url.includes('/blog/')) {
            // Blog posts get higher priority
            item.priority = 0.9;
          } else if (item.url === 'https://ponchia.github.io/blog') {
            // Homepage gets highest priority
            item.priority = 1.0;
          }
          
          return item;
        },
      }),
      react(),
      tailwind({
        // Disable injecting a basic `base.css` import
        applyBaseStyles: false,
      }),
      pagefind()
  ],

  markdown: {
      remarkPlugins: [remarkReadingTime, remarkGitDates],
  },
});