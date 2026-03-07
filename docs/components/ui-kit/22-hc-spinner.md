# HcSpinner

A simple, animated loading indicator used to show that a process is running in the background.

## 🚀 Import

```javascript
import { HcSpinner } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop    | Type     | Default   | Description                                       |
| :------ | :------- | :-------- | :------------------------------------------------ |
| `size`  | `String` | `md`      | Spinner size (`xs`, `sm`, `md`, `lg`, `xl`).      |
| `color` | `String` | `primary` | Color variant (`primary`, `white`, `gray`, etc.). |
| `ui`    | `Object` | See API   | Theme-specific configuration for Tailwind classes.|

## 📝 Usage Example

```html
<!-- Default Primary Spinner -->
<hc-spinner size="md" />

<!-- Large White Spinner for buttons -->
<hc-spinner size="lg" color="white" />
```

## 🎨 Customization (UI Object)

Supported keys:
- `base`: Root container classes.
- `svg`: Classes for the `<svg>` element (usually includes `animate-spin`).
- `circle`: Classes for the background circle track.
- `path`: Classes for the animated foreground path.
- `sizes`: Mapping for different size scales.
- `colors`: Mapping for text color variants.
