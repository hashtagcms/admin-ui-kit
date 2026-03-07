# TabView

The `TabView` provides a horizontal scrolling tab bar that integrates with URL-based navigation. It is visually consistent with the `HcTabs` UI kit component but tailored for theme-level navigation.

## 🚀 Import

```javascript
import { TabView } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop             | Type             | Description                                                     |
| :--------------- | :--------------- | :-------------------------------------------------------------- |
| `dataTabs`       | `Array\|String`  | List of tabs (strings or {label, id, href} objects).            |
| `dataActiveTab`  | `String\|Object` | The ID or object representating the currently active tab.       |
| `dataBaseUrl`    | `String`         | Base path for relative tab links.                               |

## ⚙️ Behavior
- **URL Navigation**: Clicking a tab changes `window.location.href` based on the `baseUrl` prop.
- **Auto-Scroll**: On mount or tab change, the component automatically scrolls the tab bar horizontally to ensure the active tab is centered.
- **Semantic HTML**: Uses `role="tablist"` and `role="tab"` for accessibility.

## 📝 Usage Example

```html
<tab-view 
  :data-tabs="['Details', 'Permissions', 'Settings']" 
  data-active-tab="Details" 
  data-base-url="/admin/modules"
/>
```
