# InfoPopup Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/info-popup.vue`

Displays detailed information about a database record in a modal. It fetches data via AJAX.

## 🚀 Import

```javascript
import InfoPopup from "@hashtagcms/components/info-popup";
```

## 🛠 Methods

*   **`showInfo(modelName, id)`**: Triggers the AJAX call to `/admin/info/{modelName}/{id}` and opens the modal with the result.

## 🛠 Usage

```html
<info-popup ref="infoPopup"></info-popup>

<!-- Call via ref -->
<button @click="$refs.infoPopup.showInfo('User', 1)">View User</button>
```
