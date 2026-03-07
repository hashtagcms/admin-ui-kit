# FileUploader

The `FileUploader` component provides a user-friendly interface for uploading multiple files with progress tracking, tag assignment, and error handling. It is designed to work seamlessly with the HashtagCMS gallery system.

## 🚀 Import

```javascript
import { FileUploader } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop           | Type     | Default    | Description                                                     |
| :------------- | :------- | :--------- | :-------------------------------------------------------------- |
| `dataTitle`    | `String` | -          | Optional title for the uploader section.                        |
| `dataAccept`   | `String` | `'image/*'`| Standard HTML file input `accept` attribute (e.g., '.pdf,.doc').|

## ⚡ Events (Bus)

- `gallery-image-uploaded`: Emitted to `EventBus` when a file upload finishes successfully, passing the server response data.

## 📦 Key Features
- **Progress Tracking**: Real-time progress bar powered by `HcProgress`.
- **Tagging**: Required tags field to categorize uploads for easier searching.
- **Asynchronous**: Uses Axios for background uploads without page refreshes.

## 📝 Usage Example

```html
<file-uploader 
  data-title="Upload Product Images" 
  data-accept="image/png, image/jpeg" 
/>
```
