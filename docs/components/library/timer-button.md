# TimerButton Component

**Package:** `@hashtagcms/admin-ui-kit`
**Source:** `themes/modern/components/library/timer-button.vue`

A button that shows a countdown and then automatically triggers a navigation action (e.g., "Back in 5 seconds").

## 🚀 Import

```javascript
import { TimerButton } from "@hashtagcms/admin-ui-kit";
```

## 🛠 Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data-timeout` | `Number` | `5` | Countdown duration in seconds. |
| `data-back-url` | `String` | required | URL to navigate to when timer hits zero. |

## 📝 Usage Example

```html
<timer-button
  data-timeout="10"
  data-back-url="/admin/dashboard"
>
  Auto-redirecting...
</timer-button>
```

## ✨ Features

1. **Visual Countdown**: Updates every second.
2. **Auto-Redirect**: Changes `window.location.href` when timer finishes.
3. **Cancelable**: Clicking the button triggers the redirect immediately.
