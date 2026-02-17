# CategoryPlatform Component

**Package:** `@hashtagcms/admin-ui-kit`
**Source:** `themes/modern/components/category-platform.vue`

The `CategoryPlatform` component is a modal dialog used to select a target platform before proceeding to edit a Category. Since Categories can be platform-specific, this step ensures the user is editing the correct context.

## 🚀 Import

```javascript
import { CategoryPlatform } from "@hashtagcms/admin-ui-kit";
```

## 🛠 Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data-platforms` | `JSON String` | `[]` | Array of platform objects (`{id, name}`). |

## 📝 Usage Example

```html
<category-platform
  data-platforms='[{"id":1, "name":"Web"}, {"id":2, "name":"Mobile"}]'
></category-platform>
```

## ✨ Features

1. **Modal Interface**: Opens a modal when triggered via `EventBus` (`list-view-pre-edit`).
2. **Auto-Select**: If only one platform exists, it automatically selects it and proceeds.
3. **Event Integration**: Listens for `list-view-pre-edit` event to know which row is being edited.
