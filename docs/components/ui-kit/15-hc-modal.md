# HcModal

A centered overlay component designed for critical interactions. It traps focus and requires attention while providing clean transitions and backdrop handling.

## 🚀 Import

```javascript
import { HcModal } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop         | Type      | Default | Description                                            |
| :----------- | :-------- | :------ | :----------------------------------------------------- |
| `modelValue` | `Boolean` | -       | **Required.** Controls visibility (v-model).           |
| `title`      | `String`  | `''`    | Modal header text.                                     |
| `size`       | `String`  | `md`    | Modal width (`sm`, `md`, `lg`, `xl`, `full`).          |
| `ui`         | `Object`  | See API | Theme-specific configuration for Tailwind classes.     |

## 📦 Slots

| Slot Name | Description                                           |
| :-------- | :---------------------------------------------------- |
| `title`   | Custom header content. Overrides the `title` prop.    |
| `default` | Main body content of the modal.                       |
| `footer`  | Action area at the bottom (buttons, etc.).            |

## ⚡ Events

| Event               | Payload   | Description                                     |
| :------------------ | :-------- | :---------------------------------------------- |
| `update:modelValue` | `Boolean` | Fired when the modal should be opened/closed.   |

## 📝 Usage Example

```html
<hc-modal v-model="showConfirm" title="Delete Confirmation">
  <p>Are you sure you want to permanently delete this record?</p>

  <template #footer>
    <div class="flex justify-end gap-3">
      <hc-button variant="secondary" @click="showConfirm = false">Cancel</hc-button>
      <hc-button variant="danger" @click="handleDelete">Delete</hc-button>
    </div>
  </template>
</hc-modal>
```

## 🎨 Customization (UI Object)

Supported keys: `wrapper`, `backdrop`, `content`, `header`, `title`, `closeButton`, `closeIcon`, `body`, `footer`, `sizes`.
