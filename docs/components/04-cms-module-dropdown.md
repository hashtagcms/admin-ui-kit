# CmsModuleDropdown

A specialized navigational dropdown used in the `ActionBar` to switch between a parent resource and its related sub-modules. It uses a `SplitButton` internally to handle the selection.

## 🚀 Import

```javascript
import { CmsModuleDropdown } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                 | Type           | Default | Description                                                     |
| :------------------- | :------------- | :------ | :-------------------------------------------------------------- |
| `dataModules`        | `Object\|String`| `{}`    | Module data containing the parent name and a list of `child` modules. |
| `dataCurrentModule`  | `String`       | `''`    | The controller name of the module that is currently active.   |

## 🔗 Navigation Logic
When a module is selected from the dropdown, the component automatically redirects the browser to the admin path of the chosen controller.

## 📝 Usage Example

```html
<cms-module-dropdown 
  :data-modules="{ 
    name: 'Categories', 
    controller_name: 'category', 
    child: [
      { name: 'Settings', controller_name: 'category/settings' }
    ] 
  }" 
  data-current-module="category"
/>
```
