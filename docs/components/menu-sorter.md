# MenuSorter Component

**Package:** `@hashtagcms/admin-ui-kit`
**Source:** `themes/modern/components/menu-sorter.vue`

The `MenuSorter` component provides a drag-and-drop interface for arranging hierarchical menu structures or any list data.

## 🚀 Import

```javascript
import { MenuSorter } from "@hashtagcms/admin-ui-kit";
```

## 🛠 Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data-all-data` | `JSON String` | `[]` | The flat list of items to sort. |
| `data-fields` | `JSON String` | `{id:'id', label:'name'}` | Field mapping configuration. |
| `data-controller-name` | `String` | `""` | The controller name for API calls (e.g. `menu`). |
| `data-controller-child-name` | `String` | `""` | Optional override for child item controller. |
| `data-groups` | `JSON String` | `[]` | List of groups (e.g. specific menus) to switch between. |
| `data-group-name` | `String` | `""` | Current group being sorted. |
| `data-show-groups` | `String` | `"false"` | Whether to show group switcher. |

## 📝 Usage Example

```html
<menu-sorter
  data-all-data='[{"id":1, "name":"Home"}, {"id":2, "name":"About"}]'
  data-controller-name="menu"
></menu-sorter>
```

## ✨ Features

1. **Nested Sorting**: Supports sorting of parent items and their children.
2. **Groups Support**: Switch between different menu groups via a dropdown.
3. **Persistence**: Saves the new order via AJAX (`updateIndex` endpoint).
