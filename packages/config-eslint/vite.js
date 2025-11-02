import globals from 'globals'
import { defineConfig } from 'eslint/config'
import { baseConfig } from './index.js'

export const viteConfig = defineConfig([
  ...baseConfig,
  {
    name: '@repo/config-eslint/vite',
    files: ['**/*.ts'],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
