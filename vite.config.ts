import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    cssCodeSplit:true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rolldownOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output:[
        {
          format: 'es',
          dir: 'dist',
          preserveModules: true,
          preserveModulesRoot: __dirname, // 👈 mirror from this folder
          entryFileNames: '[name].js',
        },
      ]
    },
  },
})
