# MenuSorter

The `MenuSorter` component provides a visual, drag-and-drop interface for organizing menu items and their children. It uses `SortableJS` for interactions and supports grouping menus for easier management.

## 🚀 Import

```javascript
import { MenuSorter } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                       | Type             | Description                                                                 |
| :------------------------- | :--------------- | :-------------------------------------------------------------------------- |
| `dataAllData`              | `Array\|String`  | Hierarchical JSON of menu items to be sorted.                               |
| `dataFields`               | `Object\|String` | Mapping for `id` and `label` (default: `{id: 'id', label: 'name'}`).        |
| `dataControllerName`       | `String`         | The name of the primary controller handling the sequence update.             |
| `dataShowGroups`           | `String`         | Whether to show a dropdown to switch between different menu groups.          |
| `dataGroups`               | `Array\|String`  | List of available menu groups for the split button.                         |

## ⚙️ Logic
- **Hierarchical Sorting**: Handles both parent-level and child-level sorting independently.
- **Auto-Sync**: When a group is switched via the `SplitButton`, the component reloads the page with the new group context.
- **Batch Save**: On clicking "Save New Sequence", it collects the DOM order of all items and sends a single flat array to `{controller}/updateIndex`.

## 📝 Usage Example

```html
<menu-sorter 
  :data-all-data="menuItems" 
  data-controller-name="frontend-menu" 
  data-show-groups="true"
  :data-groups="['Header', 'Footer', 'Sidebar']"
/>
```
