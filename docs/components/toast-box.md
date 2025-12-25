# ToastBox Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/library/toast-box.vue`

A container for displaying non-blocking notification messages (toasts).

## 🚀 Import

```javascript
import { ToastBox } from "@hashtagcms/components/library";
```

## 🛠 Usage

Place `<toast-box></toast-box>` once in your main `App.vue`. Then use the helper to trigger messages.

```javascript
import { Toast } from "@hashtagcms/helpers/common";

// Show success
Toast.show(this, "Saved successfully!", 3000);

// Show error
Toast.show(this, "Something went wrong.", 5000, "error");
```
