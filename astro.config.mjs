// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    // For GitHub Pages deployment
    site: 'https://ponchia.github.io',
    base: '/blog',
    integrations: [mdx(), sitemap(), react()],
});