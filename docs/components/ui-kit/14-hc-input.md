# HcInput

A standardized input component that extends basic `<input>` functionality with support for labels, hints, variants, sizes, and leading/trailing icons.

## 🚀 Import

```javascript
import { HcInput } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop          | Type             | Default   | Description                                                 |
| :------------ | :--------------- | :-------- | :---------------------------------------------------------- |
| `modelValue`  | `String\|Number` | `''`      | The input value (v-model).                                  |
| `label`       | `String`         | `''`      | Label text above the input.                                 |
| `placeholder` | `String`         | `''`      | Placeholder text.                                           |
| `type`        | `String`         | `text`    | Input type (`text`, `password`, `email`, `number`, etc.).  |
| `variant`     | `String`         | `primary` | Visual variant (`primary`, `success`, `danger`).            |
| `size`        | `String`         | `md`      | Input size (`sm`, `md`, `lg`).                              |
| `hint`        | `String`         | `''`      | Helper text below the input.                                |
| `disabled`    | `Boolean`        | `false`   | Disables the input.                                         |
| `readonly`    | `Boolean`        | `false`   | Sets the input to read-only.                                |
| `ui`          | `Object`         | See API   | Theme-specific configuration for Tailwind classes.          |

## 📦 Slots

| Slot Name    | Description                       |
| :----------- | :-------------------------------- |
| `icon-left`  | Custom content for a leading icon. |
| `icon-right` | Custom content for a trailing icon.|

## ⚡ Events

| Event               | Payload          | Description                           |
| :------------------ | :--------------- | :------------------------------------ |
| `update:modelValue` | `String\|Number` | Fired on input change for v-model.    |

## 📝 Usage Example

```html
<!-- Email Input with Icon -->
<hc-input 
  v-model="email" 
  label="Email Address"
  type="email"
  placeholder="you@example.com"
>
  <template #icon-left>
    <i class="fa fa-envelope text-gray-400"></i>
  </template>
</hc-input>

<!-- Password Input with Hint -->
<hc-input 
  v-model="password" 
  type="password" 
  label="Password" 
  hint="Must be at least 8 characters." 
/>
```

## 🎨 Customization (UI Object)

Supported keys: `wrapper`, `label`, `container`, `input`, `paddingLeftWithIcon`, `paddingRightWithIcon`, `hint`, `disabled`, `enabled`, `sizes`, `variants`.
