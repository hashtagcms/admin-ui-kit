# ActionBar Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/action-bar.vue`

The `ActionBar` is a high-level UI component designed to sit at the top of a module's listing page (e.g., User List, Category List). It aggregates common actions such as adding new records, searching, switching between list/grid views, and filtering.

## 🚀 Import

```javascript
import ActionBar from "@hashtagcms/components/action-bar";
// or
import { ActionBar } from "@hashtagcms/components";
```

## 🛠 Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data-controller-name` | `String` | `""` | **Required.** The base URL slug for the current module (e.g., `site`). Used for generating "Add New" URLs. |
| `data-controller-title` | `String` | `""` | The title to prevent in the bar. |
| `data-action-fields` | `JSON String` | `[]` | Array of enabled actions. If it contains `'edit'`, the **Add New** button will be visible. |
| `data-fields` | `JSON String` | `[]` | Array of fields available for search. |
| `data-show-search` | `String` | `"true"` | Pass `"false"` to hide the search toggle button. |
| `data-more-actions` | `JSON String` | `[]` | Array of custom extra buttons to render. |
| `data-layout-type` | `String` | `"table"` | Current layout state: `"table"` or `"grid"`. |

## 📝 Usage Example

```html
<action-bar
    data-controller-name="blog/post"
    data-controller-title="Blog Posts"
    data-action-fields='["edit", "delete", "publish"]'
    data-show-search="true"
></action-bar>
```

## ✨ Features

1.  **Add New Button**: Automatically appears if `edit` is in `data-action-fields`. Redirects to `${controllerName}/create`.
2.  **Search Toggle**: Clicking the search icon toggles a search bar panel (renders `<search-bar>` internally).
3.  **Layout Switching**: Toggles between Grid and Table view if data supports it.
4.  **Language Support**: Integrates `<language-button>` automatically if `data-has-lang-method` is true.

## 🔗 Internal Dependencies
*   Uses `AdminConfig` (`@hashtagcms/helpers/admin-config`) for URL generation.
*   Uses `LanguageButton` component.
*   Uses `SearchBar` component.
