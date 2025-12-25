# GlobalSiteButton Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/global-site-button.vue`

The main dropdown found in the top navigation bar. It allows the administrator to switch the global "Current Site" context.

## 🚀 Import

```javascript
import GlobalSiteButton from "@hashtagcms/components/global-site-button";
```

## 🛠 Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `data-sites` | `JSON String` | List of all available sites. |
| `data-current-site` | `Number` | ID of the currently active site. |

## 📝 Usage Example

```html
<global-site-button
    data-sites='[{"id":1, "name":"Site A"}]'
    data-current-site="1"
></global-site-button>
```
