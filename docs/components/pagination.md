# Pagination Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/pagination.vue`

Handles pagination UI for listing pages. It is designed to work out-of-the-box with Laravel's `LengthAwarePaginator` JSON response.

## 🚀 Import

```javascript
import Pagination from "@hashtagcms/components/pagination";
```

## 🛠 Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `data-paginator` | `JSON String` | **Required.** The full paginator object from Laravel. |
| `data-total` | `Number/String` | Total number of items in the database. |
| `data-first-item` | `Number` | Index of the first item on current page. |
| `data-last-item` | `Number` | Index of the last item on current page. |
| `data-show-download` | `Boolean` | If `true`, shows a CSV/Excel download button. |

## 📝 Usage Example

```html
<pagination
    data-paginator='{"current_page":1, "data":[...], "links":[...]}'
    data-total="100"
    data-first-item="1"
    data-last-item="20"
></pagination>
```

## ✨ Features

*   **Auto-Link Integration**: Automatically appends existing query parameters (like search filters) to pagination links.
*   **Bootstrap 5**: Renders standard Bootstrap pagination styles.
*   **Counters**: Displays "Showing 1 - 20 of 100".
