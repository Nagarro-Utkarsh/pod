import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
import { resolve } from 'path'
import { readdirSync, existsSync } from 'fs'

const srcDir = resolve(__dirname, 'src')
const exposes = readdirSync(srcDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .reduce<Record<string, string>>((acc, dir) => {
    const tsx = resolve(srcDir, dir.name, `${dir.name}.tsx`)
    if (existsSync(tsx)) acc[`./${dir.name}`] = `./src/${dir.name}/${dir.name}.tsx`
    return acc
  }, {})

export default defineConfig({
  plugins: [
    react(),
    ...federation({
      name: 'pod',
      filename: 'remoteEntry.js',
      exposes,
      shared: {
        react: { singleton: true, requiredVersion: '^19.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
      },
      dts: false,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
  },
  server: {
    port: 3001,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 3001,
    strictPort: true,
    cors: true,
  },
})
