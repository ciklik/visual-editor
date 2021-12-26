import { defineConfig } from 'vite'
import path from 'path'
import analyze from 'rollup-plugin-analyzer'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
  build: {
    minify: false,
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom'],
      plugins: [
        analyze({
          summaryOnly: true,
          filter: ({ size }) => size > 5000,
          filterSummary: true,
        }),
      ],
    },
    lib: {
      formats: ['es'],
      entry: path.resolve('src/VisualEditor.tsx'),
      name: 'VisualEditor',
    },
  },
})
