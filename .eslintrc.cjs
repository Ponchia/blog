module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'jsx-a11y'],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        // Specific rules for Astro files
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // TypeScript specific rules
      },
    },
  ],
  rules: {
    // Common rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
    ],
  },
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: [
    'dist',
    'node_modules',
    '.astro',
    '*.cjs',
    'vite.config.*',
    'vitest.config.*',
    'playwright.config.*',
    'tailwind.config.*',
    'postcss.config.*',
    'copy-images.js',
  ],
};
