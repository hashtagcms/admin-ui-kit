# SitewiseCopier

The `SitewiseCopier` provides a higher-level implementation of the `SiteWiseData` component. It features a site selector and automatically handles AJAX data fetching to populate the migration interface.

## 🚀 Import

```javascript
import { SitewiseCopier } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                   | Type             | Description                                                               |
| :--------------------- | :--------------- | :------------------------------------------------------------------------ |
| `dataSiteId`           | `Number\|String` | The ID of the current (destination) site.                                 |
| `dataAllSites`         | `Array\|String`  | Available sites to copy *from*. Current site is automatically filtered out. |
| `dataCurrentKey`       | `String`         | The resource type being managed (e.g., 'category', 'theme').              |
| `dataControllerName`   | `String`         | Controller handling the migration logic (defaults to 'site').             |

## ⚙️ Strategy
- **On site selection**: Fetches data from `{controller}/getBySite/{source_id}/{key}`.
- **Copy Action**: Triggers `{controller}/copySettings` on the server.
- **Remove Action**: Triggers `{controller}/removeSettings` on the server.
- **Toast Integration**: Provides detailed feedback on how many records were copied versus ignored.

## 📝 Usage Example

```html
<sitewise-copier 
  data-site-id="1" 
  :data-all-sites="sites" 
  data-current-key="category" 
/>
```
