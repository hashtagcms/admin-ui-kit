# PlatformButton Component

**Package:** `@hashtagcms/admin-ui-kit`
**Source:** `themes/modern/components/platform-button.vue`

The `PlatformButton` renders a select dropdown populated with available platforms. It can be used for filtering data by platform or assigning a platform to an entity.

## 🚀 Import

```javascript
import { PlatformButton } from "@hashtagcms/admin-ui-kit";
```

## 🛠 Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data-platforms` | `JSON String` | `[]` | List of platform objects. |
| `data-selected` | `String/Number` | `1` | ID(s) of selected platform(s). |
| `data-fetch-on-init` | `String` | `"false"` | If `"true"`, fetches platforms from API on mount. |
| `data-site-id` | `Number` | `1` | Site ID used when fetching platforms. |
| `data-multiple` | `String` | `"false"` | Enable multiple selection. |
| `data-name` | `String` | `"platform_id"` | Name attribute for the select input. |

## 📝 Usage Example

```html
<platform-button
  data-fetch-on-init="true"
  data-site-id="1"
  @change="handlePlatformChange"
></platform-button>
```

## ✨ Features

1. **Dynamic Loading**: Can fetch platforms via AJAX (`ajax/getInfo/site/{id}`).
2. **Event Bus**: Emits global `platform_changed` event via EventBus.
3. **Reactive**: Updates when `site_changed` event is received.
