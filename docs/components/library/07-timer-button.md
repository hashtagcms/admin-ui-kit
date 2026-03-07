# TimerButton

A specialized "Back" button with a built-in countdown. Once the timer expires, it automatically redirects the user to the specified URL.

## 🚀 Import

```javascript
import { TimerButton } from "@hashtagcms/admin-ui-kit/themes/modern/components/library";
```

## 🛠 Props

| Prop             | Type             | Default | Description                                                     |
| :--------------- | :--------------- | :------ | :-------------------------------------------------------------- |
| `dataBackUrl`    | `String`         | -       | Redirect target after timeout.                                  |
| `dataTimeout`    | `Number\|String` | `5`     | Countdown duration in seconds.                                  |

## ⚙️ Logic
- **Immediate Navigation**: Clicking the button redirects immediately and clears the timer.
- **Auto-Suffix**: Smartly switches between "Seconds" and "Second" (singular) based on the remaining time.
- **Lifecycle Safety**: Automatically clears the interval when the component is unmounted to prevent memory leaks.

## 📝 Usage Example

```html
<timer-button 
  data-back-url="/admin/dashboard" 
  data-timeout="10" 
/>
```
