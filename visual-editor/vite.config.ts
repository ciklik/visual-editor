import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import analyze from 'rollup-plugin-analyzer'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  define: { 'process.env.NODE_ENV': '"production"' },
  // The playground icons are not part of the library
  publicDir: command === 'build' ? false : 'public',
  plugins: [
    react({
      babel: {
        babelrc: true,
      },
      jsxRuntime: 'automatic',
      jsxImportSource: '@emotion/react',
    }),
  ],
  esbuild: {
    jsxFactory: 'jsx',
    jsxFragment: 'Fragment',
  },
  server: {
    port: 3000,
    proxy: {
      '/preview': 'http://127.0.0.1:8000/index.php',
    },
  },
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
      // Lets the tests import host fixtures written against the npm package
      '@boxraiser/visual-editor': resolve(__dirname, './src/VisualEditor.tsx'),
    },
  },
  build: {
    minify: true,
    rollupOptions: {
      plugins: [
        analyze({
          summaryOnly: true,
          filter: ({ size }) => size > 5000,
          filterSummary: true,
        }),
      ],
    },
    lib: {
      entry: resolve('src/VisualEditor.tsx'),
      name: 'VisualEditor',
      formats: ['es'],
      fileName: () => 'VisualEditor.standalone.js',
    },
  },
}))
