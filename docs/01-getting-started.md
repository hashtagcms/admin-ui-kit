# Getting Started

This guide explains how to integrate `@hashtagcms/admin-ui-kit` into your project. There are two primary ways to use this library:

1.  **Source Imports**: Import individual components into your own Vue build (Webpack/Vite).
2.  **Standalone Bundle**: Use the pre-compiled JS/CSS files directly in the browser (e.g., in Laravel Blade templates).

---

## 📦 Installation

```bash
npm install @hashtagcms/admin-ui-kit
```

---

## 🚀 Method 1: Source Imports (Recommended)

If you have a modern build step (Laravel Vite, Laravel Mix, or a Vue CLI project), it is best to import only the components you need.

### 1. Configuration (CRITICAL)

The package expects `vue` and `axios` to be provided by the host application. It does **not** bundle them.

**Webpack Config (for Linked/Local Development):**
If you are `npm link`-ing the package locally, you **must** alias `vue` to a single absolute path to avoid duplicate Vue instances.

```javascript
// webpack.config.js
module.exports = {
  // ...
  resolve: {
    alias: {
      vue: path.resolve(__dirname, "node_modules/vue/dist/vue.esm-bundler.js"),
    },
    symlinks: false,
  },
};
```

### 2. Usage in Vue Components

You can import components and helpers from the unified package.

```javascript
/* src/app.js */
import { createApp } from "vue";
import {
  ActionBar,
  TabularView,
  AdminConfig,
  Toast,
} from "@hashtagcms/admin-ui-kit";

const app = createApp({});

// Register globally
app.component("action-bar", ActionBar);
app.component("tabular-view", TabularView);

// Initialize Helpers
window.AdminConfig = new AdminConfig();

app.mount("#app");
```

---

## 🌐 Method 2: Standalone Bundle (Direct Script / CDN)

If you want to use the components without a build step, use the pre-built files found in the `dist/` folder.

### 1. Include in HTML / Blade Template

**Requirement**: You must load **Vue 3** and **Axios** before loading HashtagCmsAdminUI.

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="/assets/vendor/hashtagcms/admin-ui-kit.min.css" />
  </head>
  <body>
    <div id="app">
      <action-bar
        data-controller-name="users"
        data-action-fields='["edit", "delete"]'
      >
      </action-bar>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="/assets/vendor/hashtagcms/admin-ui-kit.min.js"></script>

    <script>
      const { createApp } = Vue;
      const { ActionBar, TabularView } = HashtagCmsAdminUI;

      const app = createApp({
        components: {
          "action-bar": ActionBar,
          "tabular-view": TabularView,
        }
      });

      app.mount("#app");
    </script>
  </body>
</html>
```

### 🧠 Global Object Structure

When using the standalone bundle, all components and helpers are available under `window.HashtagCmsAdminUI`.

- `window.HashtagCmsAdminUI.ActionBar`
- `window.HashtagCmsAdminUI.AdminConfig`
- `window.HashtagCmsAdminUI.Fetcher`
