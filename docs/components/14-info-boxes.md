# InfoBoxes

A layout component that renders a grid of `InfoBox` components based on a set of modules. It automatically handles permission checks to ensure only accessible modules are displayed.

## 🚀 Import

```javascript
import { InfoBoxes } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                   | Type             | Description                                                     |
| :--------------------- | :--------------- | :-------------------------------------------------------------- |
| `dataModules`          | `Object\|String` | The parent module object containing a `child` array of modules. |
| `dataModulesAllowed`   | `Array\|String`  | IDs of modules the current user is permitted to view.           |
| `dataIsAdmin`          | `Number\|String` | Set to '1' to bypass permission checks.                         |

## 📝 Usage Example

```html
<info-boxes 
  :data-modules="dashboardModules" 
  :data-modules-allowed="[1, 5, 12]" 
  data-is-admin="0"
/>
```
