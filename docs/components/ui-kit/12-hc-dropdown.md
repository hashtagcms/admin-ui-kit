# HcDropdown

A toggleable overlay menu for displaying a list of actions or options. It supports icons, dividers, and various positioning options.

## 🚀 Import

```javascript
import { HcDropdown } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop       | Type     | Default      | Description                                                 |
| :--------- | :------- | :----------- | :---------------------------------------------------------- |
| `label`    | `String` | `''`         | Default trigger button label if the `trigger` slot is empty.|
| `items`    | `Array`  | -            | **Required.** Array of objects: `[{ label, icon, onClick, divider, variant }]`. |
| `position` | `String` | `bottom-end` | Menu alignment (e.g., `bottom-start`, `bottom-end`, `top-start`).|
| `ui`       | `Object` | See API      | Theme-specific configuration for Tailwind classes.          |

## 📦 Slots

| Slot Name | Description                                           |
| :-------- | :---------------------------------------------------- |
| `trigger` | Custom element to trigger the dropdown on click.      |

## ⚡ Events

| Event    | Payload  | Description                                        |
| :------- | :------- | :------------------------------------------------- |
| `select` | `Object` | Fired when a menu item is clicked. Passing the item object. |

## 📝 Usage Example

```html
<!-- Simple Dropdown -->
<hc-dropdown 
  label="Options"
  :items="[
    { label: 'Edit', icon: 'fa fa-pencil' },
    { label: 'Duplicate' },
    { divider: true },
    { label: 'Delete', variant: 'danger', icon: 'fa fa-trash' }
  ]"
  @select="onItemClick"
/>

<!-- Custom Trigger -->
<hc-dropdown :items="userActions">
  <template #trigger>
    <hc-avatar name="John Doe" size="sm" class="cursor-pointer" />
  </template>
</hc-dropdown>
```

## 🎨 Customization (UI Object)

Supported keys: `wrapper`, `triggerWrapper`, `trigger`, `arrow`, `menu`, `divider`, `item`, `itemPrimary`, `itemDanger`, `positions`.
