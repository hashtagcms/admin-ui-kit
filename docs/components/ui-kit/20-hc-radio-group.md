# HcRadioGroup

A group of styled radio buttons for selecting a single option from a list of mutually exclusive choices.

## 🚀 Import

```javascript
import { HcRadioGroup } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop         | Type                        | Default | Description                                                     |
| :----------- | :-------------------------- | :------ | :-------------------------------------------------------------- |
| `modelValue` | `String\|Number\|Boolean` | `null`  | The selected value (v-model).                                   |
| `options`    | `Array`                     | -       | **Required.** Array of objects: `[{ label, value, disabled }]`. |
| `name`       | `String`                    | -       | **Required.** Shared name for the radio group.                  |
| `isStacked`  | `Boolean`                   | `false` | If true, options appear vertically. Defaults to inline (row).   |
| `disabled`   | `Boolean`                   | `false` | Disables the entire radio group.                                |
| `ui`         | `Object`                    | See API | Theme-specific configuration for Tailwind classes.              |

## ⚡ Events

| Event               | Payload                   | Description                               |
| :------------------ | :------------------------ | :---------------------------------------- |
| `update:modelValue` | `String\|Number\|Boolean` | Fired when the selection changes (v-model).|

## 📝 Usage Example

```html
<hc-radio-group 
  v-model="paymentMethod" 
  name="payment"
  :options="[
    { label: 'Credit Card', value: 'cc' },
    { label: 'PayPal', value: 'pp' },
    { label: 'Apple Pay', value: 'ap', disabled: true }
  ]"
  isStacked
/>
```

## 🎨 Customization (UI Object)

Supported keys: `group`, `stacked`, `inline`, `container`, `disabled`, `inputWrapper`, `srOnly`, `circle`, `checkedCircle`, `uncheckedCircle`, `innerCircle`, `label`.
