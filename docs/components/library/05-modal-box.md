# ModalBox

A versatile modal wrapper built on top of `HcModal`. It provides standard slots for Title, Content, and Footer, providing a consistent layout for all dialogs in the Modern theme.

## 🚀 Import

```javascript
import { ModalBox } from "@hashtagcms/admin-ui-kit/themes/modern/components/library";
```

## 🛠 Props

| Prop             | Type             | Default | Description                                                        |
| :--------------- | :-------------   | :------ | :----------------------------------------------------------------- |
| `dataSize`       | `String`         | `'md'`  | Modal size: `'sm'`, `'md'`, `'lg'`, or `'xl'`.                    |
| `dataShowFooter` | `Boolean\|String`| `false` | Whether to show the bottom action bar.                             |
| `dataTitleCss`   | `String`         | `''`    | Extra CSS classes for the header area.                             |
| `dataContentCss` | `String`         | `''`    | Extra CSS classes for the body area.                               |

## 📦 Slots

| Slot Name | Description                                           |
| :-------- | :---------------------------------------------------- |
| `title`   | Custom header content.                                |
| `content` | The main body of the modal.                           |
| `footer`  | Custom action buttons.                                |

## ⚙️ Exposed Methods

- `open(returnedData = {})`: Opens the modal. `returnedData` is passed back to callers upon closing.
- `close()`: Closes the modal and triggers the optional callback.
- `show(config)`: A convenience method to set the title/content and open the modal simultaneously.

## ⚡ Events

- `@on-close`: Emitted when the modal is closed, passing any data returned during the close transition.

## 📝 Usage Example

```html
<modal-box ref="myModal" data-size="lg" data-show-footer="true">
  <template #title>Confirm Action</template>
  <template #content>Are you sure you want to delete this?</template>
</modal-box>
```
