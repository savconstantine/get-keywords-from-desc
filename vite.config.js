import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production'
    ? '/get-keywords-from-desc/' // prod
    : '/', // dev
  plugins: process.env.NODE_ENV === 'production' ? [vue({ reactivityTransform: true }), svgLoader()] : [vue(), svgLoader()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
