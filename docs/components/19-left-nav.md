# LeftNav

The `LeftNav` is the main navigation sidebar for the admin dashboard. It provides a hierarchical structure for modules, supports a mini/collapsed state with tooltips and popover submenus, and features automatic active-state highlighting.

## 🚀 Import

```javascript
import { LeftNav } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                     | Type             | Description                                                     |
| :----------------------- | :--------------- | :-------------------------------------------------------------- |
| `dataList`               | `Array\|String`  | Hierarchical JSON of all menu items and their children.         |
| `dataControllerName`     | `String`         | Name of the current active controller (for highlighting).       |
| `dataHashtagcmsVersion`  | `String`         | Version string to display in the sidebar footer.                |

## 📦 Key Capabilities

- **Collapsible Layout**: Switches between a wide drawer (72w) and a sleek icon-only bar (20w).
- **Submenu Portal**: In collapsed mode, submenus are rendered via `Teleport` to the `body` to avoid overflow clipping.
- **Auto-Sync**: Listens for global events via `LeftMenu` helper to sync its state with other UI toggles.
- **Smart Icons**: Automatically falls back to the first letter of the controller name if no `icon_css` is provided.

## 📝 Usage Example

```html
<left-nav 
  :data-list="navigationData" 
  data-controller-name="category" 
  data-hashtagcms-version="1.5.0"
/>
```
