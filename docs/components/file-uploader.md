# FileUploader Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/file-uploader.vue`

A drag-and-drop compatible file uploader that supports multiple files and tagging.

## 🚀 Import

```javascript
import FileUploader from "@hashtagcms/components/file-uploader";
```

## 🛠 Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `data-url` | `String` | API endpoint for upload. |
| `data-max-files` | `Number` | Max number of files allowed (default: multiple). |

## 🛠 Usage

```html
<file-uploader
    data-url="/admin/media/upload"
></file-uploader>
```

It emits `upload-finished` event when all files are uploaded.
