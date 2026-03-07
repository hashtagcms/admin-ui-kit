# CategorySettings

The `CategorySettings` component is a comprehensive management interface for site categories. It allows administrators to assign categories to platforms/microsites, manage their order via drag-and-drop, and configure specific theme and cache settings for each category-platform association.

## 🚀 Import

```javascript
import { CategorySettings } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                 | Type           | Default | Description                                              |
| :------------------- | :------------- | :------ | :------------------------------------------------------- |
| `dataSiteId`         | `Number\|String`| `1`     | The target site ID.                                      |
| `dataSitePlatforms`  | `Array\|String`| `[]`    | Platforms available on this site.                        |
| `dataSiteCategories` | `Array\|String`| `[]`    | Master list of all categories in the site pool.          |
| `dataSiteThemes`     | `Array\|String`| `[]`    | Themes available for selection.                          |
| `dataSiteMicrosites` | `Array\|String`| `[]`    | Microsites available on this site.                       |
| `dataPlatformId`     | `Number\|String`| `1`     | The currently active platform context.                   |
| `dataMicrositeId`    | `Number\|String`| `0`     | The currently active microsite context.                  |
| `dataCategories`     | `Array\|String`| `[]`    | JSON of Categories already assigned to current platform. |
| `dataUserRights`     | `Array\|String`| `[]`    | List of user permissions ('read', 'edit', 'delete').     |

## 📦 Key Features

1.  **Drag-and-Drop Sorting**: Reorder active categories using `SortableJS`.
2.  **Global Sync**: A checkbox to apply changes (insert/delete/update) across all platforms simultaneously.
3.  **Advanced Popover**: Click the ellipsis to open a configuration panel for Theme and Cache partition settings.
4.  **Pool Management**: Moving categories between "Available Pool" and "Active Categories".

## 📝 Usage Example

```html
<category-settings 
  :data-site-id="1"
  :data-site-platforms="platforms"
  :data-site-categories="allCategories"
  :data-categories="activeCategories"
  :data-user-rights="['read', 'edit', 'delete']"
/>
```
