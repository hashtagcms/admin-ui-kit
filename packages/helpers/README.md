# @hashtagcms/helpers

A utility toolbelt for HashtagCms development. This package provides essential classes for API communication, form handling, configuration management, and event management.

## 📦 Installation

```bash
npm install @hashtagcms/helpers
```

## 🚀 Usage

```javascript
import { Toast, Loader } from "@hashtagcms/helpers/common";
import Form from "@hashtagcms/helpers/form";
import AdminConfig from "@hashtagcms/helpers/admin-config";
```

## 🛠 API Reference

### `Form`

A robust class for handling form state, validation, and submission via Axios.

**Usage:**

```javascript
let myForm = new Form({ name: "", email: "" });

// Submit
myForm
  .post("/api/user/create")
  .then((data) => console.log("Saved!"))
  .catch((errors) => console.log(myForm.errors.get("email")));
```

**Features:**

- **`post(url)`, `put(url)`, `delete(url)`**: wrappers for API calls.
- **`reset()`**: Clears fields and errors.
- **`errors.get('field')`**: Retrieve validation error for a field.
- **`data()`**: Returns the clean data object for submission.

### `AdminConfig` (Default Export)

A singleton that manages application-wide settings passed from the server (usually via `window.Laravel`).

**Methods:**

- **`admin_path(path)`**: Generates a full URL for the admin panel.
- **`admin_asset(path)`**: Generates a URL for theme assets.
- **`get_media(path)`**: Generates a URL for media files.

### `EventBus`

A lightweight wrapper around `mitt` to handle cross-component communication.

```javascript
import { EventBus } from "@hashtagcms/helpers/event-bus";

// Send
EventBus.emit("my-event", { id: 1 });

// Listen
EventBus.on("my-event", (data) => {
  console.log(data.id);
});
```

### `Common` Utilities

Exported from `@hashtagcms/helpers/common`:

- **`Toast`**: Displays global toast notifications.
  - `Toast.show(vm, message, timeout, position)`
- **`Loader`**: Controls the global loading spinner.
  - `Loader.show(vm, msg)`, `Loader.hide(vm)`
- **`Modal`**: Controls the global modal dialog.
- **`queryBuilder`**: Helper to parse URL query parameters.
- **`CopyToClipboard(text)`**: Async helper to copy text to clipboard.
- **`PasteFromClipboard()`**: Async helper to read from clipboard.

## ⚠️ Dependencies

This package depends on:

- `axios`: For HTTP requests.
- `mitt`: For event handling.
