import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { resolve } from 'path'


const assetNameCleaning = (assetInfo:any) => {
  try {
    const names = assetInfo?.names;
    let raw =
        (typeof assetInfo?.name === 'string' && assetInfo.name) ||
        (Array.isArray(names) && names[0]) ||
        (names && typeof names[Symbol.iterator] === 'function' && [...names][0]) ||
        'asset';

    // 2) Normalize: drop ?query/#hash; collapse *.module.css -> *.css
    raw = String(raw)
        .replace(/[?#].*$/, '')
        .replace(/\.module(?=\.css$)/i, '');

    const slash = raw.lastIndexOf('/');
    const filename = slash >= 0 ? raw.slice(slash + 1) : raw;
    const dot = filename.lastIndexOf('.');
    const ext = dot > 0 ? filename.slice(dot) : '';
    const base = (dot > 0 ? filename.slice(0, dot) : filename) || 'asset';

    return `assets/${base}${ext}`;
  } catch {
    return 'assets/[name][extname]';
  }
};
export default defineConfig({
  plugins: [react(), libInjectCss()],
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
          preserveModulesRoot: resolve(__dirname, 'src'),
          entryFileNames: '[name].js',
          assetFileNames: assetNameCleaning,
        },
      ]
    },
  },
})
