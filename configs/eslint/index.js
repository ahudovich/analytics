import jsEslint from '@eslint/js'
import turboConfig from 'eslint-config-turbo/flat'
import { defineConfig, globalIgnores } from 'eslint/config'
import tsEslint from 'typescript-eslint'

export const baseConfig = defineConfig([
  globalIgnores(['**/*.js', '**/*.cjs', '**/*.mjs']),
  {
    name: '@repo/config-eslint/base',
    files: ['**/*.ts'],
    plugins: {
      jsEslint,
      tsEslint,
    },
    extends: [
      jsEslint.configs.recommended,
      tsEslint.configs.recommended,
      turboConfig,
    ],
  },
])
