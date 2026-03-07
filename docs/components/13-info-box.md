# InfoBox

A modern, card-based display component for individual items, often used for dashboard metrics or module navigation. It features dynamic color assignment and sleek hover animations.

## 🚀 Import

```javascript
import { InfoBox } from "@hashtagcms/admin-ui-kit/themes/modern/components/library";
```

## 🛠 Props

| Prop                   | Type             | Description                                                     |
| :--------------------- | :--------------- | :-------------------------------------------------------------- |
| `dataInfo`             | `String\|Object` | JSON string or object containing `name`, `title`, or `icon_css`.|
| `dataTitle`            | `String`         | Fallback title if `dataInfo` is not provided.                   |
| `dataSubTitle`         | `String`         | Optional description text below the title.                      |
| `dataIconCss`          | `String`         | Custom CSS class for the icon area.                             |
| `dataLink`             | `String`         | If provided, clicks will navigate to this URL.                  |
| `dataColorIndex`       | `Number\|String` | 1-10 index to select a predefined theme color.                  |

## 🎨 Visuals
If no `dataColorIndex` is provided, the component automatically generates a consistent color based on the title's hash, ensuring a varied but stable palette across the UI.

## 📝 Usage Example

```html
<info-box 
  data-title="Total Users" 
  data-sub-title="Active in last 30 days" 
  data-color-index="2"
  data-icon-css="fa fa-users"
/>
```
