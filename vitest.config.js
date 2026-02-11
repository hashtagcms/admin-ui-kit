import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  test: {
    // Vitest 3.2+ alternative to defineWorkspace
    // Consolidated projects configuration
    projects: [
      {
        plugins: [vue()],
        test: {
          name: 'neo',
          environment: 'jsdom',
          globals: true,
          include: ['packages/themes/neo/tests/**/*.spec.js'],
          alias: {
            '@hashtagcms/helpers': path.resolve(__dirname, 'packages/helpers/src'),
            '@hashtagcms/components': path.resolve(__dirname, 'packages/themes/neo/src/components'),
            '@hashtagcms/styles': path.resolve(__dirname, 'packages/themes/neo/src/scss'),
            '@hashtagcms/testing': path.resolve(__dirname, 'tests/shared'),
          },
        }
      },
      {
        plugins: [vue()],
        test: {
          name: 'modern',
          environment: 'jsdom',
          globals: true,
          include: ['packages/themes/modern/tests/**/*.spec.js'],
          alias: {
            '@hashtagcms/helpers': path.resolve(__dirname, 'packages/helpers/src'),
            '@hashtagcms/components': path.resolve(__dirname, 'packages/themes/modern/src/components'),
            '@hashtagcms/styles': path.resolve(__dirname, 'packages/themes/modern/src/scss'),
            '@hashtagcms/testing': path.resolve(__dirname, 'tests/shared'),
          },
        }
      }
    ]
  }
})
