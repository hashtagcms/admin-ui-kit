# HcCheckbox

A purely styled checkbox component used for selecting binary options (true/false) in forms.

## 🚀 Import

```javascript
import { HcCheckbox } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop         | Type      | Default | Description                                       |
| :----------- | :-------- | :------ | :------------------------------------------------ |
| `modelValue` | `Boolean` | `false` | The checked state (v-model).                      |
| `label`      | `String`  | `''`    | The label text displayed next to the checkbox.   |
| `disabled`   | `Boolean` | `false` | Disables interaction with the checkbox.          |
| `ui`         | `Object`  | See API | Theme-specific configuration for Tailwind classes.|

## 📦 Slots

| Slot Name | Description                                           |
| :-------- | :---------------------------------------------------- |
| `default` | Custom content for the label area. Overrides `label`. |

## ⚡ Events

| Event               | Payload   | Description                                     |
| :------------------ | :-------- | :---------------------------------------------- |
| `update:modelValue` | `Boolean` | Fired when the checkbox state toggles.          |

## 📝 Usage Example

```html
<!-- Simple Usage -->
<hc-checkbox v-model="rememberMe" label="Remember me" />

<!-- Custom Label Slot -->
<hc-checkbox v-model="agree">
  I agree to the <a href="/terms" class="text-blue-500">Terms of Service</a>
</hc-checkbox>
```

## 🎨 Customization (UI Object)

Supported keys:
- `container`: Main label wrapper.
- `inputWrapper`: Container for the hidden input and styled box.
- `box`: The square box styling.
- `checkedBox` / `uncheckedBox`: State-specific box styles.
- `checkIcon`: Styling for the checkmark SVG.
- `label`: Styling for the label text.
- `srOnly`: Classes to visually hide the real input but keep it accessible.
