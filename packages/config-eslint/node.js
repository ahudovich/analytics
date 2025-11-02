import globals from 'globals'
import { defineConfig } from 'eslint/config'
import { baseConfig } from './index.js'

export const nodeConfig = defineConfig([
  ...baseConfig,
  {
    name: '@repo/config-eslint/node',
    files: ['**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
])
