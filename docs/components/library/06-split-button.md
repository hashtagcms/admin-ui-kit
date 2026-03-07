# SplitButton

A dropdown button component with a "Split" visual style. It allows users to select from a list of options with active state indicators and custom formatting.

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
| `dataBtnCss`     | `String`         | Extra Tailwind classes for the button trigger.                  |
| `dataParser`     | `Function`       | Optional formatter for raw option data.                         |

## ⚡ Events

- `@change`: Emitted when an option is selected. Passes the selected item object.

## ⚙️ Behavior
- **URL Binding**: Can be configured via `dataOnChange` to trigger page reloads with new query parameters (common in sorting).
- **Auto-Formatting**: Uses `dataParser` to transform raw arrays into labeled option objects.

## 📝 Usage Example

```html
<split-button 
  :data-options="['Ascending', 'Descending']" 
  @change="handleSortChange" 
/>
```
