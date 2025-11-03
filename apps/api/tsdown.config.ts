import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/index.ts',
  format: 'esm',
  outDir: 'dist',
  target: 'es2024',
  platform: 'node',
  unbundle: true,
  skipNodeModulesBundle: true,
})
