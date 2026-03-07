# Homepage

The `Homepage` component is the central editor for the site layout. It visualizes theme "hooks" (content areas) and allows administrators to organize frontend modules within those hooks using a sophisticated drag-and-drop interface.

## 🚀 Import

```javascript
import { Homepage } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                   | Type             | Description                                                     |
| :--------------------- | :--------------- | :-------------------------------------------------------------- |
| `dataCategories`       | `Array\|String`  | Categories available for the current site.                      |
| `dataMicrosites`       | `Array\|String`  | Microsites available for the current site.                      |
| `dataPlatforms`        | `Array\|String`  | Platforms available for the current site.                       |
| `dataSiteId`           | `Number\|String` | Current site ID.                                                |
| `dataMicrositeId`      | `Number\|String` | Currently selected microsite.                                   |
| `dataCategoryId`       | `Number\|String` | Currently selected category.                                    |
| `dataPlatformId`       | `Number\|String` | Currently selected platform.                                    |
| `dataHookInfo`         | `Array\|String`  | Metadata for all hooks defined in the site.                     |
| `dataAllModules`       | `Array\|String`  | Master library of all available frontend modules.               |
| `dataCategoryModules`  | `Array\|String`  | Modules currently assigned to the active category/platform.     |
| `dataThemeInfo`        | `Object\|String` | Theme metadata, including the skeleton defining the hook layout.|
| `dataUserRights`       | `Array\|String`  | List of user permissions ('read', 'edit', 'delete').            |

## 📦 Interaction Model

1.  **Sidebar Library**: Features a searchable list of all modules.
2.  **Drag-and-Drop**: Move modules from the library into hooks, or between different hooks to reorder them.
3.  **Focus View**: Use the "Expand" icon on any hook to hide all other hooks and focus on a single area.
4.  **Global Actions**: 
    - **Clone**: Copy the entire layout from one category/platform to another.
    - **Flush**: Delete all modules from a specific hook or the entire category.

## 📝 Usage Example

```html
<homepage 
  :data-categories="categories"
  :data-hook-info="siteHooks"
  :data-all-modules="moduleLibrary"
  :data-theme-info="activeTheme"
/>
```
