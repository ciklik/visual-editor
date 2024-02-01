import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import analyze from 'rollup-plugin-analyzer'

// https://vitejs.dev/config/
export default defineConfig({
  // define: { 'process.env.NODE_ENV': '"production"' },
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
      '/preview': 'http://localhost:8000/index.php',
    },
  },
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
    },
  },
  build: {
    minify: false,
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
})
