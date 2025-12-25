# TopNav Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/top-nav.vue`

The `TopNav` is the persistent top-level navigation bar for the admin panel. It handles branding, global search (optional), site switching, and user session management.

## 🚀 Import

```javascript
import TopNav from "@hashtagcms/components/top-nav";
```

## 🛠 Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `data-site-name` | `String` | The application name displayed next to the logo. |
| `data-username` | `String` | The name of the currently logged-in user. |
| `data-supported-sites` | `JSON String` | Array of sites available for the `GlobalSiteButton` switcher. |
| `data-current-site` | `String/Number` | ID of the currently active site. |
| `data-is-admin` | `Boolean` | Flag to show/hide admin-specific controls. |

## 📝 Usage Example

```html
<top-nav
    data-site-name="My CMS"
    data-username="Super Admin"
    data-supported-sites='[{"id":1, "name":"US Shop"}, {"id":2, "name":"EU Shop"}]'
></top-nav>
```

## 🔗 Internal Dependencies
*   **`GlobalSiteButton`**: Renders the dropdown for switching between sites.
