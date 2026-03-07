# FrontendModuleCreator

The `FrontendModuleCreator` is a comprehensive form for managing frontend modules. It handles the configuration of module logic, data fetching (API/SQL), caching policies, and SEO properties.

## 🚀 Import

```javascript
import { FrontendModuleCreator } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                   | Type             | Default | Description                                                     |
| :--------------------- | :--------------- | :------ | :-------------------------------------------------------------- |
| `dataControllerName`   | `String`         | -       | Name of the controller managing this module.                    |
| `dataBackUrl`          | `String`         | -       | URL to redirect to when cancelling or finishing.                |
| `dataSite`             | `Array\|String`  | `[]`    | Available sites for global sync.                                |
| `dataResults`          | `Object\|String` | `{}`    | Existing module data (used in "edit" mode).                     |
| `dataActionPerformed`  | `String`         | -       | Either 'add' or 'edit'.                                         |
| `dataDataTypes`        | `Array\|String`  | `[]`    | Available data types (Static, Query, Service, etc.).            |
| `dataDataTypesInfo`    | `Object\|String` | `{}`    | Instructional text for different data types.                    |
| `dataFormAction`       | `String`         | -       | The destination URL for form submission.                        |
| `dataSiteId`           | `Number\|String` | `1`     | Current site ID context.                                        |

## 📦 Supported Data Types

- **Static**: Loads content from static module tables using an alias.
- **Query**: Executes raw MySQL queries.
- **Service**: Fetches data from external REST APIs.
- **QueryService**: A hybrid of raw SQL and external API data.
- **UrlService**: API calls driven by current URL parameters.
- **Custom**: Renders a view directly, optionally using a custom PHP handler.

## 📝 Usage Example

```html
<frontend-module-creator 
  data-action-performed="edit"
  :data-results="moduleData"
  data-form-action="/admin/frontend-modules/update"
  data-back-url="/admin/frontend-modules"
/>
```
