# HcToast

A transient notification component that appears at the top of the interface to provide immediate feedback on user actions. Features a countdown progress line and auto-dismiss functionality.

## 🚀 Import

```javascript
import { HcToast } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop       | Type     | Default | Description                                                 |
| :--------- | :------- | :------ | :---------------------------------------------------------- |
| `message`  | `String` | -       | **Required.** The main body text of the notification.       |
| `title`    | `String` | `''`    | Optional bold heading for the toast.                       |
| `variant`  | `String` | `info`  | Toast style (`info`, `success`, `warning`, `danger`).      |
| `duration` | `Number` | `5000`  | Time in milliseconds before auto-dismissal.                 |
| `offset`   | `Number` | `32`    | Vertical distance from the top of the screen in pixels.     |
| `ui`       | `Object` | See API | Theme-specific configuration for Tailwind classes.          |

## ⚡ Events

| Event   | Payload | Description                                |
| :------ | :------ | :----------------------------------------- |
| `close` | -       | Fired when the toast is closed or expires. |

## 📝 Usage Example

```html
<hc-toast 
  variant="success" 
  title="Saved!" 
  message="Your profile has been updated successfully." 
  :duration="3000"
/>
```

## 🎨 Customization (UI Object)

Supported keys: `toast`, `iconWrapper`, `content`, `title`, `message`, `messageWithTitle`, `closeButton`, `closeIcon`, `progressLine`, `borderColors`, `iconBgs`, `iconColors`, `progressColors`, `icons`.
