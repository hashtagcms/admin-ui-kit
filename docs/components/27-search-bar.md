# SearchBar

A compact search interface that allows users to perform field-specific queries using advanced operators. It integrates with the controller's search endpoint and maintains search state in the URL.

## 🚀 Import

```javascript
import { SearchBar } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                   | Type             | Description                                                     |
| :--------------------- | :--------------- | :-------------------------------------------------------------- |
| `dataFields`           | `Array\|String`  | List of searchable fields (e.g., `["id", "name"]`).             |
| `dataControllerName`   | `String`         | The controller used to build the search URL.                    |
| `dataSelectedParams`   | `Object\|String` | JSON of the current search state (field, query, operator).      |

## ⚙️ Logic
- **Smart Input Type**: Automatically changes the query input to `type="date"` if the selected field name ends in `_date` or `_at`.
- **Advanced Querying**: Supports operators like `=`, `!=`, `>`, `like%`, and `%like%`.
- **URL Sync**: Submitting the form redirects the browser to `{controller}/search?q={json_search_params}`.

## 📝 Usage Example

```html
<search-bar 
  data-controller-name="category" 
  :data-fields="['id', 'name', 'alias']" 
/>
```
