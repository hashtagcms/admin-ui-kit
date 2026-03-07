# HcButton

A highly versatile button component that supports various styles, sizes, loading states, and can also act as an anchor link.

## 🚀 Import

```javascript
import { HcButton } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop           | Type      | Default   | Description                                                           |
| :------------- | :-------- | :-------- | :-------------------------------------------------------------------- |
| `as`           | `String`  | `button`  | The HTML tag to use (`button` or `a`).                                |
| `variant`      | `String`  | `primary` | Color variant (e.g., `primary`, `secondary`, `success`, `danger`).   |
| `size`         | `String`  | `md`      | Button size (`xs`, `sm`, `md`, `lg`, `xl`).                           |
| `icon`         | `String`  | `''`      | Leading icon class (e.g., `fa fa-plus`).                              |
| `iconRight`    | `String`  | `''`      | Trailing icon class (e.g., `fa fa-chevron-right`).                  |
| `loading`      | `Boolean` | `false`   | Shows a spinner and disables the button.                             |
| `disabled`     | `Boolean` | `false`   | Disables interaction.                                                 |
| `fullWidth`    | `Boolean` | `false`   | Makes the button take up 100% of the container width.                |
| `outline`      | `Boolean` | `false`   | Displays the outlined version of the chosen variant.                 |
| `isSquare`     | `Boolean` | `false`   | Makes the button square (ideal for icon-only buttons).               |
| `rounded`      | `String`  | `lg`      | Corner radius (`none`, `sm`, `md`, `lg`, `xl`, `full`).               |
| `active`       | `Boolean` | `false`   | Forces an active/pressed state styling.                              |
| `ui`           | `Object`  | See API   | Theme-specific configuration for Tailwind classes.                    |

## 📦 Slots

| Slot Name    | Description                                       |
| :----------- | :------------------------------------------------ |
| `default`    | The button label text.                            |
| `icon-left`  | Custom leading icon content.                      |
| `icon-right` | Custom trailing icon content.                     |

## ⚡ Events

| Event   | Payload | Description                         |
| :------ | :------ | :---------------------------------- |
| `click` | `Event` | Fired when the button is clicked. |

## 📝 Usage Example

```html
<!-- Primary Button -->
<hc-button variant="primary" icon="fa fa-save">
  Save Changes
</hc-button>

<!-- Icon Only Square Button -->
<hc-button variant="secondary" icon="fa fa-trash" isSquare />

<!-- Loading State -->
<hc-button :loading="isProcessing" variant="success">
  Submit
</hc-button>
```

## 🎨 Customization (UI Object)

Supported keys: `base`, `variants`, `sizes`, `squareSizes`, `rounded`, `active`, `fullWidth`.
