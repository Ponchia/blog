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
      sitemap(), 
      react(),
      tailwind({
        // Disable injecting a basic `base.css` import
        applyBaseStyles: false,
      }),
      pagefind({
          excludeSelectors: ['aside', 'nav', 'header', 'footer'],
          indexerPath: 'pagefind',
          buildOutputDir: 'dist',
          indexerOptions: {
              bundleDirectory: "pagefind",
          },
      })
  ],

  markdown: {
      remarkPlugins: [remarkReadingTime, remarkGitDates],
  },
});