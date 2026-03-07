# InfoPopup

A utility component that displays a detailed, read-only view of a specific record in a modal. It fetches data dynamically via AJAX based on the provided model and ID.

## 🚀 Import

```javascript
import { InfoPopup } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## ⚙️ Exposed Methods

### `showInfo(model, id, excludeFields = [], isEditable = true)`
Triggers the AJAX fetch and opens the modal.

- **model**: The name of the database model/controller.
- **id**: The primary key of the record to fetch.
- **excludeFields**: List of data keys to hide from the table display.
- **isEditable**: If true, the `id` field in the popup will link to the record's edit page.

## ⚡ Events (Bus)

- `info-popup-open`: Emitted to `EventBus` when the modal is opened.
- `info-popup-close`: Emitted to `EventBus` when the modal is closed.

## 📝 Usage Example

```html
<info-popup ref="detailsPopup" />

<!-- In script -->
<script setup>
const detailsPopup = ref(null);
const viewUser = (userId) => {
  detailsPopup.value.showInfo('users', userId, ['password', 'remember_token']);
};
</script>
```
