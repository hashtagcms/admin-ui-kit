# SplitButton

A dropdown button component with a "Split" visual style. It allows users to select from a list of options with active state indicators.

## 🚀 Import

```javascript
import { SplitButton } from "@hashtagcms/admin-ui-kit/themes/modern/components/library";
```

## 🛠 Props

| Prop             | Type             | Description                                                     |
| :--------------- | :--------------- | :-------------------------------------------------------------- |
| `dataOptions`    | `Array\|String`  | List of options (can be strings or {label, value} objects).     |
| `dataSelected`   | `Number\|String` | Index of the initially selected item.                           |
| `dataOnChange`   | `Function`       | Callback triggered upon selection.                              |
| `btnCss`         | `String`         | Extra Tailwind classes for the button trigger.                  |

## ⚡ Events

- `@change`: Emitted when an option is selected. Passes the selected item object.

## 📝 Usage Example

```html
<split-button 
  :data-options="['Ascending', 'Descending']" 
  @change="handleSortChange" 
/>
```
