import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import analyze from 'rollup-plugin-analyzer'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
  /*
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
   */
})
