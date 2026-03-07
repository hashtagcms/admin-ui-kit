# HcSelect

A styled wrapper for the native `<select>` element, ensuring a consistent look and feel across different browsers while maintaining accessibility.

## 🚀 Import

```javascript
import { HcSelect } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop          | Type     | Default   | Description                                           |
| :------------ | :------- | :-------- | :---------------------------------------------------- |
| `modelValue`  | `String\|Number` | `''`      | The selected value (v-model).                         |
| `options`     | `Array`  | -         | **Required.** Array of objects: `[{ label, value }]`. |
| `label`       | `String` | `''`      | Label text above the select field.                    |
| `placeholder` | `String` | `''`      | Default disabled option shown when no value is selected.|
| `variant`     | `String` | `primary` | Visual variant (`primary`, `success`, `danger`).      |
| `size`        | `String` | `md`      | Select size (`sm`, `md`, `lg`).                       |
| `hint`        | `String` | `''`      | Helper text below the select field.                   |
| `disabled`    | `Boolean`| `false`   | Disables the select.                                  |
| `ui`          | `Object` | See API   | Theme-specific configuration for Tailwind classes.    |

## ⚡ Events

| Event               | Payload          | Description                           |
| :------------------ | :--------------- | :------------------------------------ |
| `update:modelValue` | `String\|Number` | Fired on selection change for v-model. |

## 📝 Usage Example

```html
<hc-select 
  v-model="selectedRole" 
  label="User Role"
  placeholder="Select a role..."
  :options="[
    { label: 'Admin', value: '1' },
    { label: 'Editor', value: '2' },
    { label: 'Viewer', value: '3' }
  ]"
/>
```

## 🎨 Customization (UI Object)

Supported keys: `wrapper`, `label`, `container`, `select`, `arrowWrapper`, `arrowIcon`, `hint`, `disabled`, `enabled`, `sizes`, `variants`.
