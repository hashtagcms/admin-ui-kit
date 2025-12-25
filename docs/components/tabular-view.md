# TabularView Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/tabular-view.vue`

`TabularView` is the powerhouse of the CMS interface. It renders lists of data dynamically based on configuration. It supports two view modes (Grid and Table) and handles inline status toggling via AJAX.

## 🚀 Import

```javascript
import TabularView from "@hashtagcms/components/tabular-view";
```

## 🛠 Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `data-list` | `JSON String` | **Required.** The array of data objects to display. |
| `data-headers` | `JSON String` | **Required.** Configuration for columns. See "Header Configuration" below. |
| `data-action-fields` | `JSON String` | Array of standard actions like `['edit', 'delete']`. Values here determine which icons appear in the last column. |
| `data-user-rights` | `JSON String` | Array of permissions the current user has (e.g., `['edit']`). If a user lacks permission, the button is disabled. |
| `data-action-as-ajax` | `JSON String` | Array of fields/actions that should trigger an API call instead of a page load (e.g., `['publish_status']`). |
| `data-min-results-needed` | `String/Int` | Prevents deletion if total records are fewer than this number. |

## ⚙️ Header Configuration

The `data-headers` prop expects an array of objects:

```javascript
[
  { label: "ID", key: "id" },
  { label: "Title", key: "lang.title" }, // Supports dot notation for nested objects
  { label: "Image", key: "image", isImage: true } // Renders as image thumbnail
]
```

## 📝 Usage Example

```html
<tabular-view
    data-headers='[{"label":"ID","key":"id"}, {"label":"Name","key":"name"}]'
    data-list='[{"id":1, "name":"Page 1"}, {"id":2, "name":"Page 2"}]'
    data-action-fields='["edit", "delete"]'
    data-action-as-ajax='["publish_status"]'
></tabular-view>
```

## ✨ Events & Logic
*   **Delete**: Clicking delete opens a confirmation modal (`ModalBox`). If confirmed, it calls the `destroy` API and removes the row from the DOM.
*   **Inline Editing**: If a field is in `data-action-as-ajax`, clicking it toggles status (e.g., 1 -> 0) and updates the icon CSS.
*   **Media Handling**: If `isImage: true` is passed in headers, it generates a thumbnail linking to the full media path.

## 🔗 Internal Dependencies
*   Uses `ModalBox` for confirmations.
*   Uses `InfoPopup` for "Show Info" actions.
*   Uses `AdminConfig` for paths.
