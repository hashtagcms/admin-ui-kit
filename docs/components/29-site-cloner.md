# SiteCloner

A powerful administrative utility that allows for full mirror-copying of content and configuration from one site to another.

## 🚀 Import

```javascript
import { SiteCloner } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop             | Type             | Description                                              |
| :--------------- | :--------------- | :------------------------------------------------------- |
| `dataAllSites`   | `Array\|String`  | Full list of sites to choose as origin and destination.  |

## ⚙️ Logic
- **Backend Sync**: Triggers a POST request to `site/cloneSite`.
- **Status Reporting**: Displays a scrollable list of operational logs (e.g., "Cloned 5 pages", "Error cloning categories") returned from the server.
- **Safety**: Includes warning messages clarifying that the action is irreversible.

## 📝 Usage Example

```html
<site-cloner :data-all-sites="sites" />
```
