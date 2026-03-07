# SitewiseData

A dual-column data manager used for "Attached" vs "Available" resource management. It supports multi-selection, searching, and batch actions (Add/Remove) via AJAX.

## 🚀 Import

```javascript
import { SitewiseData } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                       | Type             | Description                                                                 |
| :------------------------- | :--------------- | :-------------------------------------------------------------------------- |
| `dataAllData`              | `Object\|String` | The "Pool" of available resources (id, label, data array).                   |
| `dataSiteData`             | `Array\|String`  | The list of already attached resources.                                    |
| `dataSiteId`               | `Number\|String` | Target site context.                                                       |
| `dataControllerName`       | `String`         | Controller for `saveSettings` endpoint.                                     |
| `dataCurrentKey`           | `String`         | Resource type key.                                                         |

## ⚙️ Logic
- **Filtering**: Includes a real-time search filter for the available pool.
- **Deduplication**: Automatically ensures that adding from available pool doesn't create duplicate entries in the site list.
- **Persistence**: Sends batch IDs to `{controller}/saveSettings` with an `action` parameter (`add` or `remove`).

## 📝 Usage Example

```html
<sitewise-data 
  :data-all-data="resourcePool" 
  :data-site-data="currentResources" 
  data-site-id="5" 
  data-current-key="modules"
/>
```
