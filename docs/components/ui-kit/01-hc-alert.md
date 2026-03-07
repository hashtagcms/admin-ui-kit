# HcAlert

A customizable alert component for displaying important messages, feedback, or status updates to the user. It supports different variants, custom icons, and dismissible functionality.

## 🚀 Import

```javascript
import { HcAlert } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop          | Type      | Default | Description                                                                 |
| :------------ | :-------- | :------ | :-------------------------------------------------------------------------- |
| `variant`     | `String`  | `info`  | The alert style variant (e.g., `info`, `success`, `warning`, `danger`).      |
| `title`       | `String`  | `''`    | Optional title for the alert. Supports HTML.                               |
| `dismissible` | `Boolean` | `false` | If true, shows a close button to dismiss the alert.                       |
| `ui`          | `Object`  | See API | Theme-specific configuration for Tailwind classes.                         |

## 📦 Slots

| Slot Name | Description                                           |
| :-------- | :---------------------------------------------------- |
| `default` | The main message content of the alert.              |
| `icon`    | Custom icon slot. Overrides the default variant icon. |

## ⚡ Events

| Event       | Payload | Description                                    |
| :---------- | :------ | :--------------------------------------------- |
| `dismissed` | -       | Fired when the alert is dismissed by the user. |

## 📝 Usage Example

```html
<hc-alert 
  variant="success" 
  title="Success!" 
  dismissible 
  @dismissed="onAlertClosed"
>
  Your changes have been saved successfully.
</hc-alert>
```

## 🎨 Customization (UI Object)

The `ui` prop accepts the following structure to inject Tailwind classes:

```javascript
{
  base: "...",            // Root element classes
  container: "...",       // Inner flex container
  iconWrapper: "...",    // Wrapper for the icon
  icon: "...",           // Default icon classes
  contentWrapper: "...", // Wrapper for title and message
  title: "...",          // Title styling
  message: "...",        // Message styling
  dismissButton: "...",  // Close button styling
  dismissIcon: "...",    // Close icon class
  variants: {
    success: { base: "...", icon: "..." },
    // ...other variants
  }
}
```
