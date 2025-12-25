# CmsModuleDropdown Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/cms-module-dropdown.vue`

A helper navigation component used to switch between related modules. For example, in a "Settings" section, this dropdown allows jumping between different setting categories defined in the same group.

## 🚀 Import

```javascript
import CmsModuleDropdown from "@hashtagcms/components/cms-module-dropdown";
```

## 🛠 Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `data-items` | `JSON String` | List of modules to display in the dropdown. |
| `data-label` | `String` | Label to display on the button (e.g., "More Settings"). |

## 📝 Usage Example

```html
<cms-module-dropdown
    data-label="Switch Module"
    data-items='[{"id":1, "name":"Site Settings", "link":"site-settings"}, {"id":2, "name":"Media Settings", "link":"media-settings"}]'
></cms-module-dropdown>
```
