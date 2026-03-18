import type { Plugin } from 'vite'

export function cssInlinePlugin(): Plugin {
  return {
    name: 'css-inline',
    apply: 'build',
    enforce: 'post',

    generateBundle(_, bundle) {
      // Collect CSS assets keyed by base name
      const cssAssets = new Map<string, { css: string; fileName: string }>()
      for (const [fileName, asset] of Object.entries(bundle)) {
        if (asset.type === 'asset' && fileName.endsWith('.css')) {
          cssAssets.set(fileName, {
            css: typeof asset.source === 'string' ? asset.source : '',
            fileName,
          })
        }
      }

      // For each JS chunk, find its associated CSS and inline it
      for (const [, chunk] of Object.entries(bundle)) {
        if (chunk.type !== 'chunk' || !chunk.isEntry) continue

        // Match CSS to chunk by checking viteMetadata or module ids
        const meta = (chunk as any).viteMetadata
        const importedCss: Set<string> = meta?.importedCss ?? new Set()

        let combinedCss = ''
        for (const cssFile of importedCss) {
          const asset = cssAssets.get(cssFile)
          if (asset) {
            combinedCss += asset.css
            delete bundle[asset.fileName]
          }
        }

        if (!combinedCss) continue

        const escaped = JSON.stringify(combinedCss)
        chunk.code = `exports.__css = ${escaped};\n` + chunk.code
      }
    },
  }
}
