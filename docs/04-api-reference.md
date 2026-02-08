# API Reference

This document provides a technical overview of the exports and architecture of `@hashtagcms/admin-ui-kit`.

---

## 🏗 Package Structure

The package is organized into several internal packages:

- `@hashtagcms/components`: Vue UI components.
- `@hashtagcms/helpers`: Logic and utility classes.
- `@hashtagcms/styles`: Global SCSS and theme styles.
- `@hashtagcms/admin-sdk`: Base logic (internal dependency).

---

## 📦 Unified Exports

All major features are re-exported from the package root:

```javascript
import { 
  // UI Components
  ActionBar, TabularView, TopNav, ... 
  
  // Helpers
  AdminConfig, Toast, Loader, Modal, Form, ...
  
  // Utils
  Storage, Fetcher, queryBuilder, ...
} from "@hashtagcms/admin-ui-kit";
```

---

## 🛠 Helper Methods

### `AdminConfig`
- `get(key, defaultVal)`
- `has(key)`
- `admin_path(path, params)`
- `admin_asset(path)`

### `Form`
- `post(url, resetAfterSubmit)`
- `put(url, resetAfterSubmit)`
- `delete(url, resetAfterSubmit)`
- `reset()`
- `data()`

### `Toast`, `Loader`, `Modal`
- `show(vm, ...)`
- `hide(vm, ...)`
- `open(vm, id)`
- `close(vm, id)`

---

## 🎨 Styles

The package contains the SCSS source files used to style the admin interface. You can import the source to override variables or use the pre-compiled version.

### Source Import
```scss
// Your overrides
$primary-color: #3498db;

@import "@hashtagcms/admin-ui-kit/packages/styles/src/app";
```

### Key Files
- `_variables.scss`: Global SASS variables for colors, spacing, and typography.
- `_admin.scss`: Core layout styles for the dashboard shell.
- `_table-grid.scss`: Styles for the `TabularView` component.
