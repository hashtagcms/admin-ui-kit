# ModulePermission Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/module-permission.vue`

Provides a matrix interface to assign Read/Write permissions for modules to specific Roles or Users.

## 🚀 Import

```javascript
import ModulePermission from "@hashtagcms/components/module-permission";
```

## 🛠 Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `data-modules` | `JSON String` | List of all system modules. |
| `data-permission-modules` | `JSON String` | Existing permissions for the selected role/user. |
| `data-user-id` | `Number` | ID of the user being edited. |
| `data-role-id` | `Number` | ID of the role being edited. |

## 📝 Usage Example

```html
<module-permission
    data-modules='[{"id":1, "name":"Users"}]'
    data-permission-modules='[{"module_id":1, "readonly":0}]'
    data-role-id="2"
></module-permission>
```
