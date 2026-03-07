# HcPopover

A small overlay for displaying secondary information or simple interactive menus. Unlike a tooltip, popovers are triggered by clicks and can contain structured content.

## 🚀 Import

```javascript
import { HcPopover } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop       | Type     | Default  | Description                                         |
| :--------- | :------- | :------- | :-------------------------------------------------- |
| `title`    | `String` | `''`     | Header text for the popover.                        |
| `position` | `String` | `bottom` | Pivot point (`top`, `bottom`, `left`, `right`).     |
| `ui`       | `Object` | See API  | Theme-specific configuration for Tailwind classes.  |

## 📦 Slots

| Slot Name | Description                                           |
| :-------- | :---------------------------------------------------- |
| `default` | The trigger element that users click to open the popover. |
| `content` | The main content displayed inside the popover bubble.  |

## ⚡ Methods (Exposed)

The following methods can be called if a `ref` is attached to the component:
- `open()`: Opens the popover.
- `close()`: Closes the popover.
- `toggle()`: Toggles the visibility.

## 📝 Usage Example

```html
<hc-popover title="User Settings" position="bottom">
  <hc-button variant="ghost" icon="fa fa-cog" isSquare />

  <template #content>
    <div class="p-2 w-48">
      <p class="text-xs text-gray-500 mb-2">Quick actions:</p>
      <hc-button variant="secondary" fullWidth size="sm" class="mb-2">Profile</hc-button>
      <hc-button variant="danger" fullWidth size="sm">Logout</hc-button>
    </div>
  </template>
</hc-popover>
```

## 🎨 Customization (UI Object)

Supported keys: `wrapper`, `trigger`, `popover`, `header`, `title`, `content`, `positions`, `transitionName`.
