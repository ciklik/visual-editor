import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: '@emotion/react',
    }),
  ],
  esbuild: {
    jsxFactory: 'jsx',
    jsxFragment: 'Fragment',
  },
  server: {
    proxy: {
      '/preview': 'http://localhost:8000/index.php',
    },
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
})
