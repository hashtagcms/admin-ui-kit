# CategorySettings Component

**Package:** `@hashtagcms/admin-ui-kit`
**Source:** `themes/modern/components/category-settings.vue`

The `CategorySettings` is a complex, full-page component for managing Category relations, themes, and ordering across platforms and microsites. It provides a drag-and-drop interface.

## 🚀 Import

```javascript
import { CategorySettings } from "@hashtagcms/admin-ui-kit";
```

## 🛠 Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data-site-id` | `Number` | `1` | ID of the current site. |
| `data-site-platforms` | `JSON String` | `[]` | List of available platforms. |
| `data-site-categories` | `JSON String` | `[]` | All categories available in the site (pool). |
| `data-site-themes` | `JSON String` | `[]` | List of available themes. |
| `data-site-microsites` | `JSON String` | `[]` | List of microsites. |
| `data-platform-id` | `Number` | `1` | Initial platform ID. |
| `data-microsite-id` | `Number` | `0` | Initial microsite ID. |
| `data-categories` | `JSON String` | `[]` | Currently active categories for the selected context (left side). |
| `data-user-rights` | `JSON String` | `[]` | Array of user permissions (e.g., `['edit', 'delete']`). |

## 📝 Usage Example

```html
<category-settings
  data-site-id="1"
  data-site-platforms='[...]'
  data-categories='[...]'
  data-user-rights='["edit"]'
></category-settings>
```

## ✨ Features

1. **Dual Lists**: "Active Categories" (Left) and "Available Pool" (Right).
2. **Drag & Drop**: Use `SortableJS` to drag categories from the pool to the active list, or reorder active categories.
3. **Context Switching**: Filter by Platform and Microsite.
4. **Theme Configuration**: Assign themes and cache partitions to specific category mappings via a popover.
5. **Global Operations**: Update theme for all categories at once.
