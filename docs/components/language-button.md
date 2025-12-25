# LanguageButton Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/language-button.vue`

Navigation bar dropdown that allows toggling the content language for the current session.

## 🚀 Import

```javascript
import LanguageButton from "@hashtagcms/components/language-button";
```

## 🛠 Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `data-languages` | `JSON String` | List of available languages. |
| `data-current-language` | `Number` | ID of the current language. |

## 🛠 Usage

```html
<language-button
    data-languages='[{"id":1, "name":"English"}]'
    data-current-language="1"
></language-button>
```
