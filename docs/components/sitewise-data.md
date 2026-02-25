# SiteWiseData Component

**Package:** `@hashtagcms/admin-ui-kit`
**Source:** `themes/modern/components/sitewise-data.vue`

Manages the association of data (e.g., categories, modules) to specific sites. Displays two lists: "Available" and "Attached".

## 🚀 Import

```javascript
import { SiteWiseData } from "@hashtagcms/admin-ui-kit";
```

## 🛠 Props

| Prop            | Type          | Description                           |
| :-------------- | :------------ | :------------------------------------ |
| `data-all-data` | `JSON String` | All available items in the pool.      |
| `data-site-data`| `JSON String` | Items currently assigned to the site. |
| `data-site-id`  | `Number`      | The target site ID.                   |
| `data-controller-name` | `String` | Controller name for API calls (default: "site"). |

## 🛠 Usage

```html
<site-wise
  data-all-data="[...]"
  data-site-data="[...]"
  data-site-id="1"
></site-wise>
```
