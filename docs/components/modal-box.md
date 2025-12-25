# ModalBox Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/library/modal-box.vue`

A generic Bootstrap-based modal wrapper that supports slots for Header, Body, and Footer.

## 🚀 Import

```javascript
import { ModalBox } from "@hashtagcms/components/library";
```

## 🛠 Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `id` | `String` | **Required.** Unique ID for the modal. |
| `title` | `String` | Title text for the header. |
| `size` | `String` | Bootstrap size class (e.g., `modal-lg`, `modal-xl`). |

## 📝 Usage Example

```html
<modal-box id="myModal" title="Confirm Action">
    <template v-slot:body>
        Are you sure you want to proceed?
    </template>
    <template v-slot:footer>
        <button class="btn btn-secondary">Cancel</button>
        <button class="btn btn-primary">Confirm</button>
    </template>
</modal-box>
```
