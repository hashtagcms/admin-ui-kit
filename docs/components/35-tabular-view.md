# TabularView

`TabularView` is the core layout engine for displaying resource listings. It supports both **Table** and **Grid** layouts, handles permission-based actions, and includes comprehensive XSS sanitization.

## 🚀 Import

```javascript
import { TabularView } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props (Partial)

| Prop                   | Type             | Description                                                               |
| :--------------------- | :--------------- | :------------------------------------------------------------------------ |
| `dataHeaders`          | `Array\|String`  | Column definitions (label, key, isImage).                                  |
| `dataList`             | `Array\|String`  | The raw data rows.                                                         |
| `dataActionFields`     | `Array\|String`  | Primary actions (edit, delete, approve).                                  |
| `dataUserRights`       | `Array\|String`  | Permissions from the backend (read, edit, etc.).                         |
| `dataLayoutType`       | `String`         | `'table'` (list) or `'grid'` (cards).                                     |

## 🔒 Security: XSS Sanitization
The component features a robust `sanitizeHTML` method that:
- Removes dangerous tags (`<script>`, `<iframe>`, etc.).
- Strips all `on*` event handlers from remaining elements.
- Blocks protocols like `javascript:` while allowing specific patterns used for admin info popups.

## ⚙️ Action Logic
- **Permissions**: Actions are only rendered if the `dataUserRights` list contains the required capability.
- **AJAX support**: If an action is marked as AJAX, it triggers a request without page reload, showing a spinner during the operation.
- **Media Support**: Automatically detects image extensions and renders `<img>` tags for fields marked `isImage: true`.

## 📝 Usage Example

```html
<tabular-view 
  :data-headers="cols" 
  :data-list="records" 
  :data-action-fields="['edit', 'delete']"
  data-layout-type="table" 
/>
```
