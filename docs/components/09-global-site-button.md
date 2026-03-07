# GlobalSiteButton

A global selector component used in the admin panel header to switch between different site contexts. It manages site state using internal AJAX calls and stores the site list in secure local storage for performance.

## 🚀 Import

```javascript
import { GlobalSiteButton } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                   | Type             | Default   | Description                                                     |
| :--------------------- | :--------------- | :-------- | :-------------------------------------------------------------- |
| `dataSites`            | `Array\|String`  | `[]`      | Initial list of sites.                                          |
| `dataCurrentSite`      | `Number\|String` | `1`       | The IDs of the currently active site.                           |
| `dataSupportedSites`   | `Array\|String`  | `[]`      | Filtered list of sites supported for the current user.          |
| `dataIsAdmin`          | `Boolean\|String`| `'false'` | Whether the user has administrative privileges.                  |

## ⚙️ Logic
- **Initialization**: Fetches all available sites for the user on mount if not already cached in local storage.
- **Switching**: On selection change, it calls `/ajax/setSiteId/{id}` and refreshes the page to apply the new context globally.

## 📝 Usage Example

```html
<global-site-button 
  :data-sites="allSites" 
  data-current-site="1" 
/>
```
