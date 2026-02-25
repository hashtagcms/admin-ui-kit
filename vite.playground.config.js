import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

// Dynamic Theme Discovery (matching webpack.config.js pattern)
const themesDir = path.resolve(__dirname, 'themes');
const discoveredThemes = fs.readdirSync(themesDir).filter(f => 
    fs.statSync(path.join(themesDir, f)).isDirectory()
);

const THEME_ALIASES = {};
discoveredThemes.forEach(theme => {
    THEME_ALIASES[`@hashtagcms/theme/${theme}`] = path.resolve(themesDir, theme);
});

console.log('Playground - Discovered themes:', discoveredThemes);
console.log('Playground - Theme aliases:', Object.keys(THEME_ALIASES));

export default defineConfig({
  plugins: [vue()],
  root: './playground',
  define: {
    '__VERSION__': JSON.stringify('1.4.0'), // Matches package.json or desired version
  },
  resolve: {
    alias: {
        ...THEME_ALIASES,
        '@hashtagcms/helpers': path.resolve(__dirname, 'helpers'),
        'bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),

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
