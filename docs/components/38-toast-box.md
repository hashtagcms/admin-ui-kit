# ToastBox

A global notification manager that handles multiple stacked toast alerts. It manages their lifecycle, offsets, and removal animations.

## 🚀 Import

```javascript
import { ToastBox } from "@hashtagcms/admin-ui-kit/themes/modern/components/library";
```

## ⚙️ Exposed Methods

- `show(message, timeout = 5000, options = {})`: Adds a new toast. `options` can include `title` and `variant` (e.g., 'success', 'danger').
- `hide()`: Clears all current toasts immediately.

## 🛠 Toast Logic
- **Stacking**: Automatically calculates vertical `offset` so toasts appear one above the other in the top-right corner.
- **Auto-Closing**: Uses the `duration` prop of `HcToast` to self-destruct.
- **Legacy Support**: Accepts both object-based options or a simple variant string as the third parameter.

## 📝 Usage Example

```javascript
// Accessing via ref
toastRef.value.show("Settings saved!", 3000, { variant: 'success' });
```
