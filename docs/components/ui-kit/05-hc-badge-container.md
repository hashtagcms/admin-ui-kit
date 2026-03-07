# HcBadgeContainer

A utility wrapper component used to overlay a badge (usually a notification count) onto an existing element like an icon or button.

## 🚀 Import

```javascript
import { HcBadgeContainer } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop       | Type             | Default | Description                                                |
| :--------- | :--------------- | :------ | :--------------------------------------------------------- |
| `count`    | `Number\|String` | `null`  | The value to display in the badge.                        |
| `maxCount` | `Number`         | `99`    | Maximum number to show. If exceeded, displays `maxCount+`. |
| `offset`   | `Array`          | `[0,0]` | Optional positioning offset `[x, y]`.                     |
| `ui`       | `Object`         | See API | Theme-specific configuration for Tailwind classes.          |

## 📦 Slots

| Slot Name | Description                                                  |
| :-------- | :----------------------------------------------------------- |
| `default` | The content that the badge will be attached to.              |
| `badge`   | Custom badge content. Overrides the default count rendering. |

## 📝 Usage Example

```html
<!-- Simple Notification Count -->
<hc-badge-container :count="5">
  <hc-button icon="fa fa-envelope" isSquare />
</hc-badge-container>

<!-- Custom Badge Content -->
<hc-badge-container>
  <hc-avatar src="user.jpg" />
  <template #badge>
    <div class="h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
  </template>
</hc-badge-container>
```

## 🎨 Customization (UI Object)

Supported keys in the `ui` configuration:
- `base`: Wrapper container classes.
- `badgeWrapper`: Absolute container for the badge.
- `badge`: Styling for the count indicator.
