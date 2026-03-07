# API Reference

This document provides a technical overview of the exports and internal architecture of the `@hashtagcms/admin-ui-kit` library.

---

## 🏗 Package Architecture

The library is distributed as a unified bundle but is logically organized into focused modules:

- **`@hashtagcms/components`**: Direct access to Vue 3 UI components.
- **`@hashtagcms/helpers`**: Logic and state management classes.
- **`@hashtagcms/styles`**: Theme-specific SCSS and Tailwind source files.

---

## 📦 Core Exports

All primary features are re-exported from the package root for ease of use.

```javascript
import { 
  // UI Components
  ActionBar, TabularView, TopNav, LeftNav, TabView, ... 
  
  // Helpers
  AdminConfig, Toast, Loader, Modal, Form, ...
  
  // Utility Functions
  SafeJsonParse, SafeErrorData, QueryBuilder, EventBus, ...
} from "@hashtagcms/admin-ui-kit";
```

### 🧰 Utility Functions

#### `SafeJsonParse(input, defaultValue = null)`
Safely handles data hydration from props. It can parse JSON strings, handle pre-parsed objects, and gracefully fail back to a default value.
- **`input`**: The raw data (String, Object, or null).
- **`defaultValue`**: The fallback value returned if parsing fails.

#### `SafeErrorData(error)`
Standardized error extraction for Axios requests. It ensures that connectivity issues, 4xx/5xx responses, and validation payloads are returned in a consistent object format.

---

## 🛠 Class Reference

### `AdminConfig`
The single source of truth for the admin environment.
- `get(key)`: Retrieve a configuration value.
- `admin_path(relativeUrl)`: Returns an absolute URL prefixed with the local admin path.

### `Form`
- `post(url)`: Submits the current state via POST.
- `put(url)`: Submits via PUT.
- `reset()`: Reverts fields to their initial state and clears validation errors.
- `data()`: Returns a plain object of current field values.

### `EventBus`
Global message broker based on `mitt`. Use this for inter-component communication that doesn't follow a parent-child prop pattern.
- `on(event, callback)`
- `emit(event, payload)`

---

## 🔗 Next Steps

Interested in extending the library or contributing a new theme?

- **[Theme Guide](./05-theme-guide.md)**: Architectural documentation for themes and styling.
- **[Component Catalog](./02-components.md)**: Explore the visual interface components.
