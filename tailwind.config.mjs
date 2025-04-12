/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme colors
        light: {
          primary: '#FFFFFF',
          secondary: '#F5F5F5',
          text: {
            primary: '#111111',
            secondary: '#444444',
          },
          accent: {
            DEFAULT: '#333333',
            light: '#666666',
            dark: '#000000',
          },
          border: 'rgba(0, 0, 0, 0.1)',
        },
        // Dark theme colors
        dark: {
          primary: '#111111',
          secondary: '#222222',
          text: {
            primary: '#FFFFFF',
            secondary: '#CCCCCC',
          },
          accent: {
            DEFAULT: '#666666',
            light: '#999999',
            dark: '#333333',
          },
          border: 'rgba(150, 150, 150, 0.1)',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '700px',
            '--content-width': '700px',
            '--space-between': '2.5rem',
            color: 'var(--text-primary)',
            h1: {
              color: 'var(--text-primary)',
              fontFamily: '"Playfair Display", serif',
            },
            h2: {
              color: 'var(--text-primary)',
              fontFamily: '"Playfair Display", serif',
            },
            h3: {
              color: 'var(--text-primary)',
              fontFamily: '"Playfair Display", serif',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
