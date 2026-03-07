# HcButtonGroup

Groups multiple `HcButton` components together into a single cohesive unit, automatically handling border radii and spacing between adjacent buttons.

## 🚀 Import

```javascript
import { HcButtonGroup } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop         | Type      | Default | Description                                          |
| :----------- | :-------- | :------ | :--------------------------------------------------- |
| `isVertical` | `Boolean` | `false` | If true, stacks buttons vertically instead of in a row. |
| `ui`         | `Object`  | See API | Theme-specific configuration for Tailwind classes.   |

## 📦 Slots

| Slot Name | Description                                           |
| :-------- | :---------------------------------------------------- |
| `default` | The collection of buttons to be grouped together.     |

## 📝 Usage Example

```html
<hc-button-group>
  <hc-button variant="secondary">View</hc-button>
  <hc-button variant="secondary">Edit</hc-button>
  <hc-button variant="danger">Delete</hc-button>
</hc-button-group>
```

## 🎨 Customization (UI Object)

Supported keys:
- `base`: Wrapper container classes.
- `vertical`: Extra classes applied when in vertical mode.

**Note**: The component uses scoped CSS with `:deep()` to manage the rounded corners of child buttons, ensuring the internal buttons have straight edges while the outer corners remain rounded.
