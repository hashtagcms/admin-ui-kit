import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  root: './playground',
  define: {
    '__VERSION__': JSON.stringify('1.4.0'), // Matches package.json or desired version
  },
  resolve: {
    alias: {
        '@hashtagcms/helpers': path.resolve(__dirname, 'packages/helpers/src'),
        '@hashtagcms/theme-neo': path.resolve(__dirname, 'packages/themes/neo/src'),
        '@hashtagcms/theme-modern': path.resolve(__dirname, 'packages/themes/modern/src'),
        'bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  css: {
    postcss: {
      plugins: [
        require('@tailwindcss/postcss'),
        require('autoprefixer')
      ]
    },
    preprocessorOptions: {
      scss: {
        includePaths: [path.resolve(__dirname, 'node_modules')]
      }
    }
  },
  server: {
      port: 3000
  }
})
