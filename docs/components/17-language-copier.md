# LanguageCopier

A specialized management tool that allows administrators to duplicate record data from one language to another across multiple database tables. This is especially useful when initializing translations for a new language.

## 🚀 Import

```javascript
import { LanguageCopier } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                   | Type             | Description                                                     |
| :--------------------- | :--------------- | :-------------------------------------------------------------- |
| `dataLanguages`        | `Array\|String`  | Full list of languages available for source and target.          |
| `dataLanguageTables`   | `Array\|String`  | List of database tables supported for translation copying.       |

## 📦 Features
- **Multi-select Tables**: Users can choose specific tables to migrate.
- **Validation**: Prevents submitting identical source and target languages.
- **Progress Messages**: Displays status updates for each table during the migration process.

## 📝 Usage Example

```html
<language-copier 
  :data-languages="languages" 
  :data-language-tables="tables" 
/>
```
