// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import pagefind from 'astro-pagefind';

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
        pagefind({
            excludeSelectors: ['aside', 'nav', 'header', 'footer'],
            indexerPath: 'pagefind',
            buildOutputDir: 'dist',
            indexerOptions: {
                bundleDirectory: "pagefind",
            },
        })
    ],
});