# ImageGallery Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/image-gallery.vue`

A full-featured media manager modal used to select or upload images for insertion into content.

## 🚀 Import

```javascript
import ImageGallery from "@hashtagcms/components/image-gallery";
```

## 🛠 Methods

*   **`open(editorInstance)`**: Opens the modal. If `editorInstance` is provided (e.g., TinyMCE), selecting an image will insert `<img src="...">` into the editor.

## 🛠 Usage

```html
<image-gallery ref="gallery"></image-gallery>

<button @click="$refs.gallery.open()">Select Image</button>
```
