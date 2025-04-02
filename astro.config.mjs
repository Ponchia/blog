// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import pagefind from 'astro-pagefind';
import { remarkReadingTime } from './remark-reading-time.mjs';
import { remarkGitDates } from './remark-git-dates.mjs';

// https://astro.build/config
export default defineConfig({
  // For custom domain
  site: 'https://brontolotto.observer',

  // No base path needed with custom domain
  base: '',

  // Add build configuration for optimizations
  build: {
    inlineStylesheets: 'auto', // Inline small stylesheets
    assets: 'assets', // Custom directory for optimized assets
  },
  
  // Image optimization settings
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // Image optimization settings
        quality: 80, // 0-100, lower means smaller file size but lower quality
        format: ['webp', 'avif', 'png', 'jpeg'], // Formats to generate, in order of preference
        gif: { lossless: false }, // Compress GIFs
        svg: { optimization: true } // Optimize SVGs
      }
    },
  },

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
          } else if (item.url === 'https://brontolotto.observer') {
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