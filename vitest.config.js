import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    alias: {
        '@hashtagcms/helpers': path.resolve(__dirname, 'packages/helpers/src'),
        '@hashtagcms/components': path.resolve(__dirname, 'packages/components/src'),
        '@hashtagcms/styles': path.resolve(__dirname, 'packages/styles'),
    }
  },
})
