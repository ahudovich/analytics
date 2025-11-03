import { defineConfig } from 'eslint/config'
import { baseConfig } from './index.js'

export const viteConfig = defineConfig([...baseConfig])
