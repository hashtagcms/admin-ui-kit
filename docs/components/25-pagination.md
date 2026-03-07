# Pagination

A layout component for managing large datasets. It integrates the `HcPagination` UI with data summary statistics and an optional download trigger.

## 🚀 Import

```javascript
import { Pagination } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                   | Type             | Description                                                     |
| :--------------------- | :--------------- | :-------------------------------------------------------------- |
| `dataPaginator`        | `Object\|String` | Standard Laravel pagination object (links, current_page, etc.). |
| `dataTotal`            | `Number\|String` | Total record count.                                             |
| `dataFirstItem`        | `Number\|String` | Index of the first item on the current page.                    |
| `dataLastItem`         | `Number\|String` | Index of the last item on the current page.                     |
| `dataShowDownload`     | `Boolean\|String`| Whether to show the `Downloads` button.                         |

## ⚡ Events (Bus)

- `pagination-on-delete`: Listens for this event (usually emitted by a list view after deletion) to decrement the total count and update the "Showing X to Y of Z" labels.

## 📝 Usage Example

```html
<pagination 
  :data-paginator="laravelPaginator" 
  data-total="150" 
  data-show-download="true" 
/>
```
