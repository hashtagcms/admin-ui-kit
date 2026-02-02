import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  root: './playground',
  resolve: {
    alias: {
        '@hashtagcms/helpers': path.resolve(__dirname, 'packages/helpers/src'),
        '@hashtagcms/components': path.resolve(__dirname, 'packages/components/src'),
        '@hashtagcms/styles': path.resolve(__dirname, 'packages/styles'),
    }
  },
  server: {
      port: 3000
  }
})
