# PlatformButton

A context-aware dropdown for selecting platform IDs (often used in forms and filters). It can dynamically fetch platform data based on a parent site selection.

## 🚀 Import

```javascript
import { PlatformButton } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                   | Type             | Default | Description                                                     |
| :--------------------- | :--------------- | :------ | :-------------------------------------------------------------- |
| `dataPlatforms`        | `Array\|String`  | `[]`    | Initial list of platforms to show.                              |
| `dataSelected`         | `Number\|String` | `1`     | The ID of the currently selected platform.                      |
| `dataFetchOnInit`      | `Boolean\|String`| `false` | If true, immediately fetches platforms for the `dataSiteId`.    |
| `dataMultiple`         | `String`         | `'false'`| If `'true'`, enables multi-selection mode.                     |

## ⚡ Events (Bus)

- `site_changed`: Listens for this event to clear current options and fetch new platforms related to the updated site ID.
- `platform_changed`: Emitted to `EventBus` when a selection is made.

## 📝 Usage Example

```html
<platform-button 
  data-selected="2" 
  data-fetch-on-init="true" 
  data-site-id="1" 
/>
```
