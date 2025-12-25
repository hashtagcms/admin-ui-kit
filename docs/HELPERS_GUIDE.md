# Helper Library Guide

**Package:** `@hashtagcms/helpers`
**Doc Location:** `packages-pro/docs/helpers` (for future expansion)

The helper library provides essential utilities that power the components.

## 🛠 `Form` Class
**File:** `packages/helpers/src/form.js`

A dedicated class to manage form state, validation errors, and API submission.

```javascript
import Form from "@hashtagcms/helpers/form";

let form = new Form({
    name: '',
    email: ''
});

// Auto-handles validation errors (response 422)
form.post('/api/users')
    .then(data => alert('Created!'))
    .catch(errors => console.error(errors));
```

## 🛠 `AdminConfig` Singleton
**File:** `packages/helpers/src/admin-config.js`

Provides centralized access to configuration injected via `window.Laravel`.

*   `AdminConfig.admin_path(path)`: Returns `https://domain.com/admin/{path}`
*   `AdminConfig.get('base_path')`: Returns the root URL.

## 🛠 `EventBus`
**File:** `packages/helpers/src/event-bus.js`

A simplified wrapper around `mitt` for cross-component communication.

*   `EventBus.emit(event, data)`
*   `EventBus.on(event, callback)`
*   `EventBus.off(event, callback)`

## 🛠 Common Utilities
**File:** `packages/helpers/src/common.js`

*   **`Toast`**: `Toast.show(vm, message, timeout)`
*   **`Loader`**: `Loader.show(vm, msg)` / `Loader.hide(vm)`
*   **`Modal`**: `Modal.open(vm, id)` / `Modal.close(vm, id)`

## 🛠 `Dashboard`
**File:** `packages/helpers/src/dashboard.js`

Manages the admin dashboard charts (Bar charts for categories and content).

```javascript
import { Dashboard } from "@hashtagcms/jskit";

// Initialize with chart data
Dashboard.init({
    categories: [...],
    ...
});
```

## 🛠 `EditorHelper`
**File:** `packages/helpers/src/editor.js`

Wrapper around TinyMCE to initialize rich text editors with HashtagCMS configurations.

```javascript
import { EditorHelper } from "@hashtagcms/jskit";

EditorHelper.makeRichEditor("#my-editor-id", {
    height: 400
});
```

## 🛠 `PageManager`
**File:** `packages/helpers/src/editor.js`

Handles logic for Page Module forms (auto-generating aliases, link rewrites, handling parent categories).

```javascript
import { PageManager } from "@hashtagcms/jskit";

// Initialize on page load for Add/Edit actions
PageManager.init("add", "page", 1);
```

## 🛠 `MapAPI`
**File:** `packages/helpers/src/map.js`

Wrapper for MapQuest API interactions (Geocoding).

```javascript
import { MapAPI } from "@hashtagcms/jskit";
const mapApi = new MapAPI();

mapApi.getLatLong("New York", (res) => {
    console.log(res);
});
```

## 🛠 `ErrorMessage`
**File:** `packages/helpers/src/error-message-handler.js`

Automatically highlights form fields with validation errors based on a global `error_messages` variable (injected by Laravel).

```javascript
import { ErrorMessage } from "@hashtagcms/jskit";
new ErrorMessage();
```
