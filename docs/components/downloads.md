# DownloadButton Component

**Package:** `@hashtagcms/admin-ui-kit`
**Source:** `themes/modern/components/downloads.vue`

The `DownloadButton` is a simple action button intended for download operations. It redirects the user to the `download` method of the current controller.

## 🚀 Import

```javascript
import { DownloadButton } from "@hashtagcms/admin-ui-kit";
```

## 🛠 Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data-controller-name` | `String` | `""` | **Required.** The base controller slug (e.g. `blog/post`). The click action navigates to `admin_path(controllerName + "/download")`. |

## 📝 Usage Example

```html
<download-button
  data-controller-name="blog/post"
>
  Download CSV
</download-button>
```

## ✨ Features

1. **Redirects**: On click, it performs a window location redirect to the download URL.
2. **Styled**: Uses standard button styling.
