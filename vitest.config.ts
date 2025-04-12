import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

// Create a simple Vitest configuration
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.astro', 'e2e'],
    root: fileURLToPath(new URL('./', import.meta.url)),
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/node_modules/**',
        '**/.astro/**',
        '**/dist/**',
        'e2e/**',
        '**/*.d.ts',
        '**/*.test.{js,ts,jsx,tsx}',
      ],
    },
  },
});
