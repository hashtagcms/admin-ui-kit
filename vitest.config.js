import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

// Dynamic Theme Discovery
const themesDir = path.resolve(__dirname, 'packages/themes');
const discoveredThemes = fs.readdirSync(themesDir).filter(f => 
    fs.statSync(path.join(themesDir, f)).isDirectory()
);

// Generate test projects for each theme
const testProjects = discoveredThemes.map(theme => ({
  plugins: [vue()],
  test: {
    name: theme,
    environment: 'jsdom',
    globals: true,
    include: [`packages/themes/${theme}/tests/**/*.spec.js`],
    alias: {
      [`@hashtagcms/theme/${theme}`]: path.resolve(__dirname, `packages/themes/${theme}/src`),
      '@hashtagcms/helpers': path.resolve(__dirname, 'packages/helpers/src'),
      '@hashtagcms/testing': path.resolve(__dirname, 'tests/shared'),
    },
  }
}));

console.log('Vitest - Discovered themes:', discoveredThemes);
console.log('Vitest - Test projects:', testProjects.map(p => p.test.name));

export default defineConfig({
  test: {
    projects: testProjects
  }
})
