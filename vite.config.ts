import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { resolve } from 'path'
import { readdirSync, statSync } from 'fs'

const srcDir = resolve(__dirname, 'src')

const components = readdirSync(srcDir).filter((name) =>
  statSync(resolve(srcDir, name)).isDirectory()
)

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin({ suppressUnusedCssWarning: true }),
    {
      name: 'multi-build',
      enforce: 'post',
      async closeBundle() {
        const { build } = await import('vite')
        for (const name of components.slice(1)) {
          await build({
            configFile: false,
            plugins: [
              react(),
              cssInjectedByJsPlugin({ suppressUnusedCssWarning: true }),
            ],
            resolve: { alias: { '@': srcDir } },
            build: {
              cssCodeSplit: true,
              emptyOutDir: false,
              lib: {
                entry: resolve(srcDir, name, `${name}.tsx`),
                formats: ['cjs'],
                fileName: name,
              },
              rolldownOptions: {
                external: ['react', 'react-dom', 'react/jsx-runtime'],
                output: { format: 'cjs', dir: 'dist' },
              },
            },
          })
        }
      },
    },
  ],
  resolve: { alias: { '@': srcDir } },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: resolve(srcDir, components[0], `${components[0]}.tsx`),
      formats: ['cjs'],
      fileName: components[0],
    },
    rolldownOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: { format: 'cjs', dir: 'dist' },
    },
  },
})
