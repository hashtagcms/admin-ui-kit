# ImageGallery

The `ImageGallery` component is a modal-based browser for the site's media assets. It allows users to search for images, upload new ones via the `FileUploader`, and insert selected images directly into a rich text editor.

## 🚀 Import

```javascript
import { ImageGallery } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                   | Type     | Description                                                     |
| :--------------------- | :------- | :-------------------------------------------------------------- |
| `dataEditor`           | `Object` | The TinyMCE or similar editor instance to insert images into.   |

## ⚡ Events (Bus)

- `image-gallery-open`: Emitted to `EventBus` when the gallery modal opens.
- `image-gallery-close`: Emitted to `EventBus` when the gallery modal closes.
- `gallery-image-uploaded`: Listens for this event to refresh the image list after a successful upload.

## ⚙️ Exposed Methods

- `open(editorInstance)`: Opens the gallery modal. Optionally sets the target editor instance.
- `close()`: Closes the gallery modal.

## 📝 Usage Example

```html
<image-gallery ref="myGallery" />

<!-- In script -->
<script setup>
const myGallery = ref(null);
const openGallery = (editor) => {
  myGallery.value.open(editor);
};
</script>
```
