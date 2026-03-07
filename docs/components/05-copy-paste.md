# CopyPaste

A utility component that provides buttons to copy and paste form data via the system clipboard. It intelligently handles various input types (text, checkbox, radio, select) and triggers browser events so modern reactive frameworks can detect the changes.

## 🚀 Import

```javascript
import { CopyPaste } from "@hashtagcms/admin-ui-kit/themes/modern/components/library";
```

## 🛠 Props

| Prop                     | Type             | Default   | Description                                                     |
| :----------------------- | :--------------- | :-------- | :-------------------------------------------------------------- |
| `dataIgnoreFields`       | `String\|Array`  | (default) | Fields to skip during copy/paste (e.g., 'id', '_token').        |
| `dataForm`               | `String`         | -         | ID of the form container. Defaults to the entire `document`.    |
| `dataPasteElement`       | `String`         | -         | ID of the primary input to monitor for auto-paste on blur.     |
| `dataCopyPasteAutoInit`  | `Boolean\|String`| `true`    | If true, listens for JSON in the `pasteElement` to auto-fill.   |
| `dataShowCopy`           | `Boolean\|String`| `true`    | Whether to show the Copy button.                               |
| `dataShowPaste`          | `Boolean\|String`| `true`    | Whether to show the Paste button.                               |

## ⚡ Events (Bus)

- `on-copy`: Emitted to `EventBus` with the JSON data string when copy succeeds.
- `on-paste`: Emitted to `EventBus` with the raw clipboard string when paste succeeds.

## 📝 Usage Example

```html
<copy-paste 
  data-form="productForm" 
  :data-ignore-fields="['sku', 'stock_count']"
  data-paste-element="json_input"
/>
```

## 🎨 Visual Feedback
When data is pasted into a field, that element will briefly highlight with a light blue background to provide visual confirmation of the update.
