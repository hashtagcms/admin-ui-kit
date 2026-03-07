# ToastBox

A global notification manager that handles multiple stacked toast alerts. It manages their positioning, lifecycle, and removal animations.

## 🚀 Import

```javascript
import { ToastBox } from "@hashtagcms/admin-ui-kit/themes/modern/components/library";
```

## ⚙️ Exposed Methods

- `show(message, timeout = 5000, options = {})`: Adds a new toast. `options` can include `title` and `variant` (e.g., `'success'`, `'danger'`, `'info'`).
- `hide()`: Clears all current toasts immediately.

## 🛠 Toast Logic
- **Stacking Mechanism**: Automatically calculates the vertical `offset` for each new toast so they appear stacked in the top-right corner.
- **Auto-Closing**: Each toast self-destructs after its specified `timeout`.
- **Dynamic Offset**: When a toast is closed, remaining toasts smoothly shift their position to fill the gap.

## 📝 Usage Example

```javascript
// Accessing via ref in a setup script
toastRef.value.show("Settings saved!", 3000, { variant: 'success' });
```
