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

// Show info (message only, default variant 'info')
Toast.show(this, "System update in progress...", 3000);

// Show success with title
Toast.show(this, "Saved successfully!", 3000, { variant: "success", title: "Success" });

// Show error with custom title
Toast.show(this, "Something went wrong.", 5000, { variant: "error", title: "Critical Error" });

// Infinite Toast (Close manually)
Toast.show(this, "Operation in progress...", 0, { variant: "warning", title: "Please Wait" });
```
