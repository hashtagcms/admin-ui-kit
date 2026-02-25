# TabularView Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/tabular-view.vue`

`TabularView` is the powerhouse of the CMS interface. It renders lists of data dynamically based on configuration. It supports two view modes (Grid and Table) and handles inline status toggling via AJAX.

## 🚀 Import

```javascript
import TabularView from "@hashtagcms/components/tabular-view";
```

## 🛠 Props

| Prop                      | Type          | Description                                                                                                                                           |
| :------------------------ | :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-list`               | `JSON String` | **Required.** The array of data objects to display.                                                                                                   |
| `data-headers`            | `JSON String` | **Required.** Configuration for columns. See "Header Configuration" below.                                                                            |
| `data-action-fields`      | `JSON String` | Array of standard actions like `['edit', 'delete']`. Standard strings are automatically mapped to permissions (e.g., 'edit' -> 'edit').                |
| `data-more-action-fields` | `JSON String` | Array of custom action objects. Used for module-specific buttons.                                                                                     |
| `data-action-css`         | `JSON String` | Map of action names to FontAwesome icons (e.g., `{"edit": "fa-pencil"}`).                                                                            |
| `data-user-rights`        | `JSON String` | Array of user permissions (e.g., `['read', 'edit', 'delete']`). Used to control visibility of specific actions via a central mapping.                 |
| `data-action-as-ajax`     | `JSON String` | Array of fields/actions that should trigger an API call instead of a page load (e.g., `['publish_status']`).                                          |
| `data-min-results-needed` | `String/Int`  | Prevents deletion if total records are fewer than this number.                                                                                        |
| `data-controller-name`    | `String`      | **Required.** The base URL slug for the current module. Used for generating action paths.                                                             |

## ⚙️ Header Configuration

The `data-headers` prop expects an array of objects:

```javascript
[
  { label: "ID", key: "id" },
  { label: "Title", key: "lang.title" }, // Supports dot notation for nested objects
  { label: "Image", key: "image", isImage: true }, // Renders as image thumbnail
];
```

## ⚙️ Action Configuration

The `TabularView` delegates all action logic to the **`TabularViewActions`** helper class. It uses a centralized **Action-Permission Map** (defined in `helpers/common.js`). Standard actions are mapped as follows:
- `edit` -> Requires `edit` right
- `delete` -> Requires `delete` right
- `publish` -> Requires `publish` right
- `approve` -> Requires `approve` right
- `info` / `showinfo` -> Requires `read` right

> **Note:** If a user has only one permission (e.g., `edit`), the component is smart enough to show that specific action's icon and hide generic "more actions" to keep the UI clean.

### Custom Actions (`data-more-action-fields`)
You can pass custom actions that either link to a page or emit a Vue event.

```javascript
[
  { 
    label: "Settings", 
    action: "settings", 
    icon_css: "fa-cogs", 
    right: "edit", // Overrides default mapping
    action_append_field: "id" 
  },
  { 
    label: "Verify", 
    action: "verify", 
    isCustom: true // Emits @onAction instead of navigating
  }
]
```

## 📝 Usage Example

```html
<tabular-view
  data-controller-name="cms/pages"
  data-headers='[{"label":"ID","key":"id"}, {"label":"Name","key":"name"}]'
  data-list='[{"id":1, "name":"Page 1"}]'
  data-action-fields='["edit", "delete"]'
  data-user-rights='["read", "edit"]'
  @on-action="handleCustomAction"
></tabular-view>
```

## ⚙️ Handling Custom Actions (@on-action)

When an action has `isCustom: true`, the component doesn't navigate. Instead, it emits an `@on-action` event. Here is how to implement the handler:

### Template
```html
<tabular-view
  data-controller-name="cms/users"
  :data-more-action-fields="extraActions"
  @on-action="handleModuleAction"
></tabular-view>
```

### Script (Composition API)
```javascript
const extraActions = [
  { label: "Verify", action: "verify_user", icon_css: "fa-shield", isCustom: true }
];

const handleModuleAction = (eventData) => {
  const { action, rowid, row, target } = eventData;
  
  if (action === "verify_user") {
    console.log(`Verifying user ${row.name} (ID: ${rowid})`);
    // Your custom logic here (e.g., opening another modal or calling an API)
  }
};
```

### Event Data Structure
The event payload contains:
- `action`: (String) The name of the action.
- `rowid`: (String/Number) The ID of the clicked row.
- `row`: (Object) The complete data object for that row.
- `status`: (String) Current data-value (if any).
- `target`: (HTMLElement) The DOM element that was clicked.

### Example: Log Row Data to Console

If you want to add a "Debug" icon that simply prints the row data when clicked:

#### 1. Configuration
Add this to your `data-more-action-fields`:
```javascript
[
  { 
    label: "Log Info", 
    action: "debug_row", 
    icon_css: "fa-terminal", 
    isCustom: true 
  }
]
```

#### 2. Handler
```javascript
const handleModuleAction = (eventData) => {
  if (eventData.action === "debug_row") {
    console.log("Full Row Data:", eventData.row);
    alert(`Console logged for ID: ${eventData.rowid}`);
  }
};
```

## ✨ Events & Logic

- **`@on-action`**: Emitted when a custom action (`isCustom: true`) is clicked. Receives `{ action, rowid, row, status, target }`.
- **Read-Only Inspection**: If a user has `read` rights but not `edit`, the **ID field** becomes a blue clickable link that triggers the `InfoPopup` modal.
- **Action Column Visibility**: The "Action" column automatically hides if the user lacks permissions for all provided actions.
- **Delete**: Clicking delete opens a confirmation modal. If confirmed, it calls the `destroy` API.

## 🔗 Internal Dependencies

- Uses `TabularViewActions` for orchestrating action clicks and AJAX calls.
- Uses `ModalBox` for confirmations.
- Uses `InfoPopup` for "Show Info" actions.
- Uses `AdminConfig` for paths.
