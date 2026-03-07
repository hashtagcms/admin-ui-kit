# ModuleCreator

The `ModuleCreator` is a high-level administrative tool designed to streamline the creation of new system modules. It allows developers to define module metadata and optionally automate the scaffolding of backend files (Controllers, Models, Validators).

## 🚀 Import

```javascript
import { ModuleCreator } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Key Props

| Prop                   | Type             | Description                                                     |
| :--------------------- | :--------------- | :-------------------------------------------------------------- |
| `dataDatabaseTables`   | `Array\|String`  | List of tables to populate the "Main Table Source" dropdown.    |
| `dataCmsModules`       | `Array\|String`  | Existing modules to populate the "Parent" selector.             |
| `dataBackUrl`          | `String`         | Navigation target after successful creation or cancellation.     |

## 📦 Scaffolding Features

1.  **File Generation**: When "Generate Logic" is checked, the system generates the Laravel boilerplates.
2.  **Schema Definition**: 
    - Select a main table and see its fields dynamically.
    - Drag-and-drop selected fields to define the order in which they appear in listings.
3.  **Relationships**: Add join-table relations with configurable types (`hasMany`, `belongsTo`, etc.) and designated aliases.
4.  **Language Support**: Toggle flag for I18n-enabled relational tables.

## 📝 Usage Example

```html
<module-creator 
  :data-database-tables="tables" 
  :data-cms-modules="modules" 
  data-back-url="/admin/cms-modules"
/>
```
