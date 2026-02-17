# CopyPaste Component

**Package:** `@hashtagcms/admin-ui-kit`
**Source:** `themes/modern/components/library/copy-paste.vue`

The `CopyPaste` component provides buttons to copy form data to the clipboard and paste it back. This is useful for duplicating complex configurations between different records or environments.

## 🚀 Import

```javascript
import { CopyPaste } from "@hashtagcms/admin-ui-kit";
```

## 🛠 Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data-form` | `String` | `null` | ID of the form to serialize. If omitted, scans the whole document. |
| `data-ignore-fields` | `JSON String` | `["id", "_token", ...]` | Array of field names to exclude from copy. |
| `data-show-copy` | `String` | `"true"` | Show copy button. |
| `data-show-paste` | `String` | `"true"` | Show paste button. |
| `data-copy-paste-auto-init` | `String` | `"true"` | If true, enables auto-paste on blur of the first input if clipboard has JSON. |

## 📝 Usage Example

```html
<copy-paste form-id="moduleForm"></copy-paste>
```

## ✨ Features

1. **Clipboard API**: Uses `navigator.clipboard` to read/write JSON data.
2. **Smart Filling**: Matches JSON keys to form input names or IDs, handling checkboxes and radios correctly.
3. **Visual Feedback**: Highlights fields that were updated during a paste operation.
