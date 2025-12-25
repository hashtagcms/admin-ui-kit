# SitewiseData Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/sitewise-data.vue`

Manages the association of data (e.g., categories, modules) to specific sites. Displays two lists: "Available" and "Selected".

## 🚀 Import

```javascript
import SitewiseData from "@hashtagcms/components/sitewise-data";
```

## 🛠 Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `data-list` | `JSON String` | All available items. |
| `data-selected` | `JSON String` | Items currently assigned to the site. |
| `data-site-id` | `Number` | The target site ID. |
| `data-save-url` | `String` | API endpoint to save changes. |

## 🛠 Usage

```html
<sitewise-data
    data-list='[...]'
    data-selected='[...]'
    data-site-id="1"
></sitewise-data>
```
