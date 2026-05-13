import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {
    ignorePatterns: ['.agents/**', 'repos/**', '**/dist/**'],
    singleQuote: true,
    semi: true,
    sortPackageJson: true,
  },
  lint: {
    ignorePatterns: [
      '.agents/**',
      'repos/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      'test-results/**',
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  test: {
    passWithNoTests: true,
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['**/node_modules/**', 'repos/**', 'tests/e2e/**', '**/tests/e2e/**'],
  },
});
