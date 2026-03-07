# ActionBar

The `ActionBar` component is a primary header used in resource management pages. It provides a consistent interface for the page title, resource-specific actions (like adding new items), search functionality, layout toggles, and multi-language navigation.

## 🚀 Import

```javascript
import { ActionBar } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                   | Type             | Default   | Description                                                                 |
| :--------------------- | :--------------- | :-------- | :-------------------------------------------------------------------------- |
| `dataSelectedParams`   | `String`         | `''`      | JSON string or raw parameters for active filters.                           |
| `dataControllerName`   | `String`         | `''`      | The name of the controller/resource (e.g., 'category').                     |
| `dataControllerTitle`  | `String`         | `''`      | The display title (auto-humanized).                                        |
| `dataFields`           | `Array\|String`  | `[]`      | List of searchable fields for the search panel.                             |
| `dataActionFields`     | `Array\|String`  | `[]`      | Fields specifically for action-based searching.                            |
| `dataLanguages`        | `Array\|String`  | `[]`      | Available languages for the language button.                               |
| `dataSelectedLanguage` | `String`         | -         | Currently selected language.                                               |
| `dataMoreActions`      | `Array\|String`  | `[]`      | Additional custom action buttons.                                          |
| `dataShowAdd`          | `String`         | `'true'`  | Whether to show the "Add New" button.                                      |
| `dataHasLangMethod`    | `String`         | `'false'` | Enables the language selection button.                                     |
| `dataCmsModules`       | `Object\|String` | `{}`      | Module context for the breadcrumb dropdown.                               |
| `dataShowSearch`       | `String`         | `'false'` | Whether to enable and show the search toggle.                              |
| `dataShowBack`         | `String`         | `'false'` | Whether to show the "Back" button.                                         |
| `dataLayoutType`       | `String`         | `'table'` | Current view layout ('table' or 'grid').                                   |
| `dataUserRights`       | `Array\|String`  | `[]`      | JSON of user permissions (e.g., `["read", "add"]`).                        |

## 📝 Usage Example

```html
<action-bar 
  data-controller-name="category"
  data-controller-title="Resource Categories"
  data-show-add="true"
  data-show-search="true"
  :data-fields="['id', 'name', 'alias']"
  :data-cms-modules="cmsModules"
  data-user-rights='["read", "add", "edit"]'
/>
```

## 🎨 Layout Toggle
The component emits a browser event/redirect when the layout is changed (between 'table' and 'grid'), automatically appending a `layout` query parameter to the URL.
