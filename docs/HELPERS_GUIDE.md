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
