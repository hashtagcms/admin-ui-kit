# Helpers

The `@hashtagcms/admin-ui-kit` includes several helpers to manage form state, API calls, and common UI tasks.

---

## 📋 Form Management

### `Form` Class
Manages form state and validation errors.

```javascript
import { Form } from "@hashtagcms/admin-ui-kit";

const form = new Form({ name: "", email: "" });

form.post("/api/users")
  .then(data => console.log(data))
  .catch(errors => console.error(errors));
```

### `ErrorMessage`
Highlights form fields with validation errors automatically.

```javascript
import { ErrorMessage } from "@hashtagcms/admin-ui-kit";
new ErrorMessage();
```

---

## 🔔 UI Notifications & Modals

### `Toast`
```javascript
import { Toast } from "@hashtagcms/admin-ui-kit";
Toast.show(this, "Success!", 2000);
```

### `Loader`
```javascript
import { Loader } from "@hashtagcms/admin-ui-kit";
Loader.show(this, "Loading...");
Loader.hide(this);
```

### `Modal`
```javascript
import { Modal } from "@hashtagcms/admin-ui-kit";
Modal.open(this, "modalRefId");
Modal.close(this, "modalRefId");
```

---

## ⚙️ Configuration & Data

### `AdminConfig`
Centralized configuration access.

```javascript
import { AdminConfig } from "@hashtagcms/admin-ui-kit";
const config = new AdminConfig();
const path = config.admin_path("users");
```

### `Dashboard`
Chart initialization logic.

```javascript
import { Dashboard } from "@hashtagcms/admin-ui-kit";
Dashboard.init(data);
```

---

## 📝 Editor & Page Management

### `EditorHelper`
Rich text editor (TinyMCE) wrapper.

```javascript
import { EditorHelper } from "@hashtagcms/admin-ui-kit";
EditorHelper.makeRichEditor("#editor-id");
```

### `PageManager`
Handles logic for Page Module forms (alias generation, etc.).

```javascript
import { PageManager } from "@hashtagcms/admin-ui-kit";
PageManager.init("add", "page");
```
