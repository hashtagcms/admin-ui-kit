# SiteButton

A dropdown selector for choosing a site ID context. Designed to be a compact version of the global site selector, often used within administrative forms.

## 🚀 Import

```javascript
import { SiteButton } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop             | Type             | Default  | Description                                              |
| :--------------- | :--------------- | :------- | :------------------------------------------------------- |
| `dataSites`      | `Array\|String`  | `[]`     | List of sites available for selection.                   |
| `dataSelected`   | `Number\|String` | `1`      | The ID of the currently selected site.                   |
| `dataName`       | `String`         | `'site_id'`| The `name` attribute for the select element.            |

## ⚡ Events (Bus)

- `site_changed`: Emitted to `EventBus` whenever the selection changes. Other components (like `PlatformButton`) listen to this to refresh their options.

## 📝 Usage Example

```html
<site-button 
  :data-sites="sitesList" 
  data-selected="1" 
/>
```
