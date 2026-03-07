# HcFileUpload

A modern file upload component featuring drag-and-drop capability, file type filtering, and a live preview of selected files.

## 🚀 Import

```javascript
import { HcFileUpload } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop       | Type      | Default | Description                                           |
| :--------- | :-------- | :------ | :---------------------------------------------------- |
| `multiple` | `Boolean` | `false` | Allow selecting multiple files at once.               |
| `accept`   | `String`  | `*`     | Allowed file extensions (e.g., `image/*`, `.pdf`).    |
| `label`    | `String`  | `''`    | Main instruction text in the dropzone.                |
| `subLabel` | `String`  | `''`    | Secondary hint text (e.g., file size limits).         |
| `ui`       | `Object`  | See API | Theme-specific configuration for Tailwind classes.    |

## ⚡ Events

| Event    | Payload | Description                                                     |
| :------- | :------ | :-------------------------------------------------------------- |
| `change` | `Array` | Fired when files are added or removed. Returns an array of File objects. |

## 📝 Usage Example

```html
<hc-file-upload 
  label="Upload Documents"
  subLabel="PDF or DOCX only, max 5MB"
  accept=".pdf,.docx"
  multiple
  @change="handleFileUpload"
/>
```

## 🎨 Customization (UI Object)

Supported keys: `wrapper`, `dropzone`, `dropzoneIdle`, `dropzoneDragging`, `iconWrapper`, `uploadIcon`, `label`, `subLabel`, `fileList`, `fileItem`, `fileName`, `fileSize`, `removeButton`.
