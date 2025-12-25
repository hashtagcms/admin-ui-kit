# TitleBar Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/title-bar.vue`

The `TitleBar` serves as the standard header for pages that require context (like "Edit User") and navigation controls (Back button).

## 🚀 Import

```javascript
import TitleBar from "@hashtagcms/components/title-bar";
```

## 🛠 Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `data-title` | `String` | **Required.** The main heading text (H1/H4). |
| `data-back-url` | `String` | URL for the back button. If present, the back button is rendered. |
| `data-show-copy` | `Boolean/String` | Shows the "Copy" utility buttons if true. |
| `data-show-paste` | `Boolean/String` | Shows the "Paste" utility buttons if true. |

## 📝 Usage Example

```html
<title-bar
    data-title="Edit Category: Electronics"
    data-back-url="/admin/category"
    data-show-copy="true"
></title-bar>
```
