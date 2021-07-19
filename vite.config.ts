import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path from 'path'
import analyze from 'rollup-plugin-analyzer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact.default()],
  server: {
    proxy: {
      '/preview': 'http://localhost:8000/index.php',
    }
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src')
    }
  },
  build: {
    minify: false,
    rollupOptions: {
      plugins: [analyze({
        summaryOnly: true,
        filter: ({ size }) => size > 5000,
        filterSummary: true,
      })],
    },
    lib: {
      entry: path.resolve('src/VisualEditor.tsx'),
      name: 'VisualEditor'
    }
  }
})
