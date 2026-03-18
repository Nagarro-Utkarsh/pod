import type { Plugin } from 'vite'
import * as sass from 'sass'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'

export function cssModuleInlinePlugin(): Plugin {
  // Store compiled CSS per module id
  const cssStore = new Map<string, string>()

  return {
    name: 'css-module-inline',
    enforce: 'pre',

    resolveId(source, importer) {
      if (source.endsWith('?inline-css')) {
        return source
      }
      return null
    },

    load(id) {
      if (id.endsWith('?inline-css')) {
        const realId = id.replace('?inline-css', '')
        const css = cssStore.get(realId) ?? ''
        return `export default ${JSON.stringify(css)};`
      }
      return null
    },

    transform(code, id) {
      // Only transform .tsx/.jsx files that import .module.scss/css
      if (!/\.(tsx|jsx)$/.test(id)) return null

      const importRegex = /import\s+(\w+)\s+from\s+["']([^"']*\.module\.(scss|css|sass|less))["'];?/g
      const match = importRegex.exec(code)
      if (!match) return null

      const stylesVar = match[1]
      const scssRelPath = match[2]

      // Resolve the scss file path
      let scssPath: string
      if (scssRelPath.startsWith('@/')) {
        scssPath = resolve(dirname(id), '..', scssRelPath.replace('@/', ''))
      } else {
        scssPath = resolve(dirname(id), scssRelPath)
      }

      // Compile SCSS to CSS
      let cssResult: string
      try {
        const result = sass.compile(scssPath, { style: 'compressed' })
        cssResult = result.css
      } catch (e) {
        console.error(`Failed to compile ${scssPath}:`, e)
        return null
      }

      // Extract CSS module class mappings (simple regex-based for .module files)
      const classMap: Record<string, string> = {}
      const scssSource = readFileSync(scssPath, 'utf-8')
      const classRegex = /\.([a-zA-Z_][\w-]*)\s*\{/g
      let classMatch
      let counter = 0
      while ((classMatch = classRegex.exec(scssSource)) !== null) {
        const original = classMatch[1]
        // Generate a stable hash-like class name
        const hash = `_${original}_${Buffer.from(scssPath).toString('base64url').slice(0, 5)}_${counter++}`
        classMap[original] = hash
        // Replace in CSS
        cssResult = cssResult.replaceAll(`.${original}`, `.${hash}`)
      }

      const escapedCss = JSON.stringify(cssResult)
      const classMapStr = JSON.stringify(classMap)

      // Rewrite: replace the scss import with inline css + classmap
      const newImport = `const __css_${stylesVar} = ${escapedCss};\nconst ${stylesVar} = ${classMapStr};`
      let newCode = code.replace(match[0], newImport)

      // Wrap the JSX return to include <style> tag
      // Find the component's JSX and wrap with fragment + style
      newCode = newCode.replace(
        /\(\s*<(\w+)\s/,
        `(<><style dangerouslySetInnerHTML={{__html: __css_${stylesVar}}} /><$1 `
      )

      // Close the fragment - find the last closing of the root element
      // This is tricky with regex, let's use a simpler approach:
      // Add </> before the final );
      newCode = newCode.replace(/\/>\s*\)\s*;?\s*$/, '/></>);')

      return { code: newCode, map: null }
    },
  }
}
