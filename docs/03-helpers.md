# Helpers

The `@hashtagcms/admin-ui-kit` includes a suite of specialized classes and utility functions designed to streamline form management, asynchronous operations, and UI animations.

## 📋 Form Management

### The `Form` Class
The `Form` class simplifies state management and backend synchronization. It automatically tracks field values and handles validation errors returned from the server.

```javascript
import { Form } from "@hashtagcms/admin-ui-kit";

// Initialize with default values
const userForm = new Form({ 
  name: "John Doe", 
  email: "john@example.com" 
});

// Perform AJAX POST request
userForm.post("/admin/api/users")
  .then(response => console.log("Success:", response))
  .catch(errors => console.error("Validation Errors:", errors));
```

### `ErrorMessage` Utility
This helper automatically scans the DOM for input fields and injects validation messages when a `Form` operation fails. It is typically initialized globally in your application's entry point.

---

## 🔔 UI Notifications & Interaction

Our helpers provide a programmatic API to control common UI components from shared logic.

- **[Toast](./components/ui-kit/27-hc-toast.md)**: Display non-blocking notifications.
  `Toast.show(this, "Record Deleted", 2000, "danger");`
- **[Loader](./components/library/04-loader.md)**: Manage global loading states.
  `Loader.show(this, "Processing Request...");`
- **[Modal](./components/ui-kit/15-hc-modal.md)**: Programmatic control for standard dialogs.
  `Modal.open(this, "confirmDialog");`

---

## ⚙️ Configuration & Data

### `AdminConfig`
Centralized provider for system-wide settings, themes, and dynamic path generation.

```javascript
import { AdminConfig } from "@hashtagcms/admin-ui-kit";

const config = new AdminConfig();
// Generates a correctly scoped path for the current admin environment
const editPath = config.admin_path("users/edit/1"); 
```

### `Dashboard`
Handles the initialization and lifecycle of chart-based widgets.

---

## 🔧 Core Utilities

- **[EventBus](./04-api-reference.md#eventbus)**: A global event emitter (powered by `mitt`) for inter-component communication.
- **Fx**: A collection of micro-animations (fade, slide, highlight) built on top of the `motion` library.
- **Humanize**: utility for turning snake_case keys into readable titles.
- **[ACTION_MAP](./04-api-reference.md#action-map)**: Constant mapping that links UI actions (e.g. 'delete') to backend permission keys.

---

## 🔗 Next Steps

For a deep dive into the technical implementation and available function parameters, see the full reference:

- **[API Reference](./04-api-reference.md)**: Full list of exported functions and their signatures.
- **[Theme Guide](./05-theme-guide.md)**: Learn how to contribute styles and components to the library.
