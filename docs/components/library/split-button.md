# SplitButton Component

**Package:** `@hashtagcms/admin-ui-kit`
**Source:** `themes/modern/components/library/split-button.vue`

A dropdown button component (often used for filtering or selecting an option from a list). despite the name "SplitButton", it acts more like a styled Select/Dropdown.

## 🚀 Import

```javascript
import { SplitButton } from "@hashtagcms/admin-ui-kit";
```

## 🛠 Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data-options` | `JSON String` | `[]` | Array of options (strings or objects). |
| `data-selected` | `Number` | `0` | Index of the initially selected option. |
| `data-parser` | `Function` | `null` | Optional function to format options into `{label, value}` objects. |
| `data-btn-css` | `String` | `""` | Additional CSS classes for the button. |

## 📝 Usage Example

```html
<split-button
  data-options='["Option 1", "Option 2"]'
  @change="handleSelection"
></split-button>
```

## ✨ Features

1. **Custom Rendering**: Supports custom label formatting.
2. **Selection State**: Tracks selected index and shows a checkmark.
3. **Events**: Emits `change` event with selection details.
