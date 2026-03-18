import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { resolve } from 'path'
import { readdirSync, statSync } from 'fs'

function getComponentEntries(srcDir: string) {
  const entries: Record<string, string> = {}
  for (const name of readdirSync(srcDir)) {
    const dir = resolve(srcDir, name)
    if (statSync(dir).isDirectory()) {
      entries[name] = resolve(dir, `${name}.tsx`)
    }
  }
  return entries
}

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin({ relativeCSSInjection: true, suppressUnusedCssWarning: true })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: getComponentEntries(resolve(__dirname, 'src')),
      formats: ['cjs'],
    },
    rolldownOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        format: 'cjs',
        dir: 'dist',
        entryFileNames: '[name].js',
      },
    },
  },
})
