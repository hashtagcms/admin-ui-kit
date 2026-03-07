# HcBreadcrumbs

A navigation aid that allows users to keep track of their location within the application. It displays a hierarchical link-path from the root to the current page.

## 🚀 Import

```javascript
import { HcBreadcrumbs } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop    | Type    | Default | Description                                                                 |
| :------ | :------ | :------ | :-------------------------------------------------------------------------- |
| `items` | `Array` | -       | **Required.** Array of objects: `[{ label, href, icon }]`.                  |
| `ui`    | `Object`| See API | Theme-specific configuration for Tailwind classes.                         |

## 📦 Slots

| Slot Name   | Description                                           |
| :---------- | :---------------------------------------------------- |
| `separator` | Custom separator content between breadcrumb items.    |

## 📝 Usage Example

```html
<hc-breadcrumbs 
  :items="[
    { label: 'Dashboard', href: '/admin', icon: 'fa fa-home' },
    { label: 'Settings', href: '/admin/settings' },
    { label: 'Profile' }
  ]" 
/>
```

## 🎨 Customization (UI Object)

Supported keys in the `ui` configuration:
- `base`: Root `<nav>` element.
- `list`: The `<ol>` container.
- `item`: Individual list items.
- `separatorIcon`: Default class for the separator (e.g., arrow).
- `link`: Base styling for clickable items.
- `activeLink` / `inactiveLink`: State-specific link styles.
- `text`: Base styling for non-clickable items (current page).
- `icon`: Shared styling for item icons.
