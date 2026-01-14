# Integration Guide

This guide explains how to integrate `@hashtagcms/components` into your project. There are two primary ways to use this library:

1.  **Source Imports**: Import individual components into your own Vue build (Webpack/Vite).
2.  **Standalone Bundle**: Use the pre-compiled JS/CSS files directly in the browser (e.g., in Laravel Blade templates).

---

## Method 1: Source Imports (Recommended)

If you have a modern build step (Laravel Vite, Laravel Mix, or a Vue CLI project), it is best to import only the components you need.

### 1. Installation

```bash
npm install @hashtagcms/jskit
```

### 2. Configuration (CRITICAL)

The package expects `vue` and `axios` to be provided by the host application. It does **not** bundle them.

**Webpack Config (for Linked/Local Development):**
If you are `npm link`-ing the package locally, you **must** alias `vue` to a single absolute path to avoid duplicate Vue instances (which causes `null reading 'ce'` errors).

```javascript
// webpack.config.js
module.exports = {
  // ...
  resolve: {
    alias: {
      // Force all vue imports to resolve to your app's node_modules
      vue: path.resolve(__dirname, "node_modules/vue/dist/vue.esm-bundler.js"),
    },
    symlinks: false, // Prevent webpack from looking inside the linked package's node_modules
  },
};
```

### 3. Usage in Vue Components

You can import components and helpers from the unified package.

```javascript
/* src/app.js */
import { createApp } from "vue";
import {
  ActionBar,
  TabularView, // Components
  AdminConfig,
  Toast, // Helpers
} from "@hashtagcms/jskit";

// 1. Import Styles (SCSS Source is recommended for variables)
// @import "~@hashtagcms/jskit/packages/styles/src/app";

const app = createApp({});

// Register globally
app.component("action-bar", ActionBar);
app.component("tabular-view", TabularView);

// Initialize Helpers
window.AdminConfig = new AdminConfig();

app.mount("#app");
```

**Benefits:**

- **Smaller Size**: Only bundle what you use.
- **Type Support**: Better IDE autocomplete.

---

## Method 2: Standalone Bundle (Legacy / CDN)

If you want to use the components without a build step, or simply want to drop them into a legacy Blade template, use the pre-built files found in the `dist/` folder.

### 1. Build the Distribution Files

If you haven't already, run the build command in the package root:

```bash
# Production build (minified)
npm run prod

# Development build (source maps)
npm run dev
```

This generates:

- `cms-js-kit/dist/hashtagcms.min.js`
- `cms-js-kit/dist/hashtagcms.min.css`

### 2. Include in HTML / Blade Template

Copy the `dist` files to your public directory (e.g., `public/assets/vendor/hashtagcms/`) or reference them directly.

**Requirement**: You must load **Vue 3** before loading HashtagCMS.

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- 1. Load Styles -->
    <link
      rel="stylesheet"
      href="/assets/vendor/hashtagcms/hashtagcms.min.css"
    />
  </head>
  <body>
    <div id="app">
      <!-- 3. Use Components directly -->
      <action-bar
        data-controller-name="users"
        data-action-fields='["edit", "delete"]'
      >
      </action-bar>
    </div>

    <!-- 2. Load Dependencies -->
    <!-- Vue 3 (Global Build) -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>

    <!-- HashtagCMS Bundle (UMD) -->
    <script src="/assets/vendor/hashtagcms/hashtagcms.min.js"></script>

    <!-- 4. Initialize Vue -->
    <script>
      const { createApp } = Vue;

      // The library exposes itself as "HashtagCMS" on the window object
      const { ActionBar, TabularView } = HashtagCMS;

      const app = createApp({
        components: {
          "action-bar": ActionBar, // Register components you want to use
          "tabular-view": TabularView,
        },
        // Or register all: ...HashtagCMS
      });

      app.mount("#app");
    </script>
  </body>
</html>
```

**Global Object Structure:**
When using the standalone bundle, all components are available under `window.HashtagCMS`.

- `window.HashtagCMS.ActionBar`
- `window.HashtagCMS.TopNav`
- `window.HashtagCMS.TabularView`
- ...and so on.
