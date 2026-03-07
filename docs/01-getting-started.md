# Getting Started

Welcome to the **HashtagCMS Admin UI Kit**. This guide will help you integrate our suite of professional Vue 3 components into your administrative dashboard.

## Overview

There are two primary integration patterns:
1. **Source Integration**: Import individual components directly into your build pipeline (Vite, Webpack).
2. **Standalone Bundle**: Utilize pre-compiled JS and CSS files for quick prototyping or legacy environments.

---

## 📦 Installation

Add the library to your project via npm:

```bash
npm install @hashtagcms/admin-ui-kit
```

---

## 🚀 Method 1: Source Integration (Recommended)

For projects with a modern build step, importing source components allows for optimal bundle sizing via tree-shaking.

### 1. Host Requirements

The package expects **Vue 3** and **Axios** to be provided by your application.

> [!IMPORTANT]
> If you are using `npm link` for local development, you must alias `vue` in your bundler configuration to ensure only one instance of Vue is loaded.

```javascript
// Example Vite Config
export default defineConfig({
  resolve: {
    alias: {
      'vue': path.resolve(__dirname, 'node_modules/vue')
    }
  }
});
```

### 2. Implementation

Import components and helpers directly from the package root.

```javascript
import { createApp } from "vue";
import { 
  ActionBar, 
  TabularView, 
  AdminConfig 
} from "@hashtagcms/admin-ui-kit";

const app = createApp({});

// Register globally
app.component("action-bar", ActionBar);
app.component("tabular-view", TabularView);

// Initialize configuration helper
window.AdminConfig = new AdminConfig();

app.mount("#app");
```

---

## 🏗️ Method 2: Standalone Bundle

For environments without a build step, use the pre-compiled assets located in the `dist/` directory. We provide specialized builds for different themes:

### 1. Distribution Paths
- **Modern Theme**: `dist/modern/admin-ui-kit.min.js` (Tailwind-based)
- **Neo Theme**: `dist/neo/admin-ui-kit.min.js` (Bootstrap-based)

### 2. Browser Integration

Ensure **Vue 3** and **Axios** are loaded before the UI Kit.

```html
<!-- Include Styles -->
<link rel="stylesheet" href="/vendor/modern/admin-ui-kit.min.css" />

<!-- Dependencies -->
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<!-- UI Kit Bundle -->
<script src="/vendor/modern/admin-ui-kit.min.js"></script>

<script>
  const { createApp } = Vue;
  // Components are available under the HashtagCmsAdminUI global
  const { ActionBar, TabularView } = HashtagCmsAdminUI;

  const app = createApp({
    components: {
      "action-bar": ActionBar,
      "tabular-view": TabularView,
    }
  });
  app.mount("#app");
</script>
```

---

## 🔗 Next Steps

Now that you have the library installed, explore the available components and helpers:

- **[Component Catalog](./02-components.md)**: Explore the full list of layout and functional components.
- **[UI Kit Library](./components/ui-kit/README.md)**: Browse our collection of atomic components like [HcButton](./components/ui-kit/07-hc-button.md).
- **[Helper Utilities](./03-helpers.md)**: Learn how to manage form state and API requests.
