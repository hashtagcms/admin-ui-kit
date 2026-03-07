# Sorter

The `Sorter` component is a simplified version of `MenuSorter`, designed for vertical sorting of modules. It supports one level of nesting and uses `SortableJS` for drag-and-drop.

## 🚀 Import

```javascript
import { Sorter } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                       | Type             | Description                                                                 |
| :------------------------- | :--------------- | :-------------------------------------------------------------------------- |
| `dataAllModules`           | `Array\|String`  | Hierarchical list of modules.                                               |
| `dataControllerName`       | `String`         | The controller used to save the new order.                                  |

## ⚙️ Features
- **Hierarchical Reordering**: Parents and children have independent sequence counters.
- **Batch Update**: Onทุกๆ drag end event, it recalculates the entire DOM order and syncs it to the server.
- **Smooth Animations**: Uses 300ms transitions for a premium feel.

## 📝 Usage Example

```html
<sorter 
  :data-all-modules="moduleList" 
  data-controller-name="cms-modules" 
/>
```
