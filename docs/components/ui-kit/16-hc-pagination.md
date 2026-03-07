# HcPagination

A refined navigation component for navigating through multi-page data sets. It features intelligent page numbering with ellipsis support for large page counts.

## 🚀 Import

```javascript
import { HcPagination } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop         | Type     | Default | Description                                                   |
| :----------- | :------- | :------ | :------------------------------------------------------------ |
| `modelValue` | `Number` | `1`     | The current active page (v-model).                            |
| `totalPages` | `Number` | -       | **Required.** Total number of pages available.               |
| `maxVisible` | `Number` | `5`     | Maximum number of page buttons to show before using ellipsis. |
| `ui`         | `Object` | See API | Theme-specific configuration for Tailwind classes.            |

## ⚡ Events

| Event               | Payload  | Description                                        |
| :------------------ | :------- | :------------------------------------------------- |
| `update:modelValue` | `Number` | Fired when the page changes (for v-model).           |
| `change`            | `Number` | Fired when the page changes. Passing the new page number. |

## 📝 Usage Example

```html
<hc-pagination 
  v-model="currentPage" 
  :totalPages="100" 
  :maxVisible="7" 
  @change="onPageChange" 
/>
```

## 🎨 Customization (UI Object)

Supported keys: `base`, `button`, `enabledButton`, `disabledButton`, `prevIcon`, `nextIcon`, `pageButton`, `activePage`, `inactivePage`, `ellipsis`.
