# ModulePermission

A management interface for assigning module-level access and read-only restrictions to specific users. It allows for hierarchical selection where parent module changes can optionally cascade to children.

## 🚀 Import

```javascript
import { ModulePermission } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                   | Type             | Description                                                               |
| :--------------------- | :--------------- | :------------------------------------------------------------------------ |
| `dataCmsModules`       | `Array\|String`  | Full list of system modules and their children.                           |
| `dataUserModules`      | `Array\|String`  | Current user data including their existing `cmsmodules` relationships.    |
| `dataIsSuperAdmin`     | `Boolean\|String`| Flag to bypass manual assignment (Admins get all access automatically).   |

## ⚙️ Behavior Logic
- **Read-Only Toggle**: If a module is marked as read-only, the user can view the module but cannot perform create, edit, or delete actions.
- **Bulk Selection**: Includes a "Select All" toggle for rapid provisioning.
- **Readiness Integration**: Features a "Go Back" button to return to the user management list.

## 📝 Usage Example

```html
<module-permission 
  :data-user-modules="userData" 
  :data-cms-modules="allModules" 
  data-is-super-admin="false"
/>
```
