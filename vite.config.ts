import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    proxy: {
      '/preview': 'http://localhost:8000/index.php',
    }
  },
  build: {
    minify: false,
    lib: {
      entry: path.resolve('src/VisualEditor.tsx'),
      name: 'VisualEditor'
    }
  }
})
