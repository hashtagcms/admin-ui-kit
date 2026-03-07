# HcProgress

A visual status bar used to indicate the completion progress of a task or process. Supports labels, animation, and various sizes.

## 🚀 Import

```javascript
import { HcProgress } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop             | Type              | Default   | Description                                           |
| :--------------- | :---------------- | :-------- | :---------------------------------------------------- |
| `percentage`     | `Number\|String`  | `0`       | Value between 0 and 100 representing the progress.   |
| `variant`        | `String`          | `primary` | Color variant (`primary`, `success`, `warning`, `danger`). |
| `size`           | `String`          | `md`      | Thickness of the bar (`xs`, `sm`, `md`, `lg`).       |
| `rounded`        | `Boolean`         | `true`    | If true, the bar has a pill-like radius.             |
| `isAnimated`     | `Boolean`         | `false`   | Enables a shimmer/stripes animation on the bar.      |
| `label`          | `String`          | `''`      | Custom label text. Defaults to percentage if empty.  |
| `showLabel`      | `Boolean`         | `false`   | Whether to show the label above the bar.             |
| `showPercentage` | `Boolean`         | `false`   | Whether to explicitly show the percentage number.    |
| `ui`             | `Object`          | See API   | Theme-specific configuration for Tailwind classes.   |

## 📝 Usage Example

```html
<!-- Simple Animated Bar -->
<hc-progress :percentage="65" isAnimated showLabel />

<!-- Success Variant with custom label -->
<hc-progress 
  :percentage="100" 
  variant="success" 
  label="Upload Complete!" 
  showLabel 
/>
```

## 🎨 Customization (UI Object)

Supported keys: `wrapper`, `labelContainer`, `label`, `percentage`, `track`, `barBase`, `animated`, `colors`, `sizes`, `roundedFull`, `roundedNone`.
