# LanguageButton

A dropdown selector used in the `ActionBar` to switch the administrative language context.

## 🚀 Import

```javascript
import { LanguageButton } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                   | Type             | Description                                                     |
| :--------------------- | :--------------- | :-------------------------------------------------------------- |
| `dataLanguages`        | `Array\|String`  | List of language objects (e.g., `[{ id, name }]`).              |
| `dataSelectedLanguage` | `Number\|String` | The ID of the currently active language.                        |

## ⚙️ Logic
When a new language is selected, the component calls `/ajax/setLanguage/{id}` and reloads the page to apply the translation across the entire admin dashboard.

## 📝 Usage Example

```html
<language-button 
  :data-languages="languages" 
  data-selected-language="1" 
/>
```
