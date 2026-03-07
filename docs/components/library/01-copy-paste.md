# CopyPaste

The `CopyPaste` component provides a standard UI for clipboard operations within the CMS, allowing records or configurations to be duplicated across sites or platforms.

## 🚀 Import

```javascript
import { CopyPaste } from "@hashtagcms/admin-ui-kit/themes/modern/components/library";
```

## 🛠 Props

| Prop                       | Type             | Default | Description                                                        |
| :------------------------- | :--------------- | :------ | :----------------------------------------------------------------- |
| `dataShowCopy`             | `Boolean\|String`| `true`  | Whether to show the Copy button.                                   |
| `dataShowPaste`            | `Boolean\|String`| `true`  | Whether to show the Paste button.                                  |
| `dataCopyPasteAutoInit`    | `Boolean\|String`| `true`  | If true, initializes clipboard state on mount.                     |
| `dataBtnCss`               | `String`         | `''`    | Extra Tailwind classes for both buttons.                           |

## ⚡ Events (Bus)

- `copy_clicked`: Emitted to `EventBus` when the copy action is triggered.
- `paste_clicked`: Emitted to `EventBus` when the paste action is triggered.
- `copy_paste_data_changed`: Listens for this event to update the button's internal state (e.g., enabling/disabling Paste based on clipboard contents).

## ⚙️ Behavior
- **State Management**: Uses local storage or the `EventBus` to keep track of copied objects.
- **Visual Feedback**: The Paste button automatically dims or highlights based on whether valid data is present in the clipboard.

## 📝 Usage Example

```html
<copy-paste 
  data-show-copy="true" 
  data-show-paste="true" 
  data-btn-css="hover:bg-blue-50"
/>
```
