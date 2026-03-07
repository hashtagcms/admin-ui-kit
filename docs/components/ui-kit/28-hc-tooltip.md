# HcTooltip

A lightweight informational overlay that appears when the user hovers over an element, providing helpful context without cluttering the UI.

## 🚀 Import

```javascript
import { HcTooltip } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop       | Type     | Default | Description                                       |
| :--------- | :------- | :------ | :------------------------------------------------ |
| `text`     | `String` | `''`    | The plain text message to display.                |
| `position` | `String` | `top`   | Placement (`top`, `bottom`, `left`, `right`).     |
| `ui`       | `Object` | See API | Theme-specific configuration for Tailwind classes.|

## 📦 Slots

| Slot Name | Description                                           |
| :-------- | :---------------------------------------------------- |
| `default` | The target element that triggers the tooltip on hover. |
| `content` | Custom HTML content for the tooltip bubble. Overrides `text`. |

## 📝 Usage Example

```html
<!-- Simple Text Tooltip -->
<hc-tooltip text="Click to delete this item" position="bottom">
  <hc-button icon="fa fa-trash" variant="danger" isSquare />
</hc-tooltip>

<!-- Custom HTML Content Tooltip -->
<hc-tooltip position="right">
  <hc-button variant="ghost" isSquare icon="fa fa-info-circle" />
  <template #content>
    <div class="text-xs">
      <p class="font-bold">Pro Tip:</p>
      <p>Use keyboard shortcuts for faster navigation.</p>
    </div>
  </template>
</hc-tooltip>
```

## 🎨 Customization (UI Object)

Supported keys: `wrapper`, `tooltip`, `arrow`, `positions`, `arrowPositions`.
