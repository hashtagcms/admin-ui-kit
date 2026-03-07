# HcBadge

A small, lightweight component used for highlighting status, counts, or categories. Supports various shapes, variants, and optional icons.

## 🚀 Import

```javascript
import { HcBadge } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop        | Type      | Default   | Description                                                |
| :---------- | :-------- | :-------- | :--------------------------------------------------------- |
| `variant`   | `String`  | `primary` | Color variant (e.g., `primary`, `success`, `danger`, `warning`). |
| `size`      | `String`  | `md`      | Badge size (e.g., `sm`, `md`, `lg`).                       |
| `isPill`    | `Boolean` | `false`   | If true, the badge has fully rounded corners (pill style).  |
| `isOutline` | `Boolean` | `false`   | If true, displays an outlined version of the badge.        |
| `ui`        | `Object`  | See API   | Theme-specific configuration for Tailwind classes.          |

## 📦 Slots

| Slot Name    | Description                       |
| :----------- | :-------------------------------- |
| `default`    | The label text of the badge.      |
| `icon-left`  | Optional slot for a leading icon. |
| `icon-right` | Optional slot for a trailing icon.|

## 📝 Usage Example

```html
<!-- Default Badge -->
<hc-badge variant="success">Active</hc-badge>

<!-- Outline Pill Badge with Icon -->
<hc-badge variant="danger" isPill isOutline>
  <template #icon-left><i class="fa fa-fire mr-1"></i></template>
  Hot
</hc-badge>
```

## 🎨 Customization (UI Object)

Supported keys in the `ui` configuration:
- `base`: Base styling for the badge.
- `pill`: Fully rounded corner classes.
- `rounded`: Default rounded corner classes.
- `variants`: Object mapping variants to `base` and `outline` class strings.
- `sizes`: Object mapping size keys to class strings.
