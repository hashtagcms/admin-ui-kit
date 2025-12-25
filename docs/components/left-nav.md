# LeftNav Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/left-nav.vue`

The `LeftNav` component renders the main sidebar navigation. It supports nested menus, active state checking, and permission-based visibility.

## 🚀 Import

```javascript
import LeftNav from "@hashtagcms/components/left-nav";
```

## 🛠 Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `data-list` | `JSON String` | **Required.** The hierarchical menu structure. |
| `data-controller-name` | `String` | The current controller name (used for highlighting active menu). |
| `data-user-rights` | `JSON String` | Array of permissions for the current user. |

## 📝 Usage Example

```html
<left-nav
    data-controller-name="page"
    data-list='[{"id":1, "name":"Dashboard", "icon_css":"fa fa-home", "link":"dashboard", "child":[]}]'
></left-nav>
```
