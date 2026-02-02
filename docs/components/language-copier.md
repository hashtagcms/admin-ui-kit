# Language Copier Component

The `LanguageCopier` component facilitates copying language-specific data (like translations or localized settings) from one language to another within the system.

## Usage

```html
<language-copier
  :data-languages="languages"
  :data-selected-language="currentLang"
  :data-controller-name="controller"
/>
```

## Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `dataLanguages` | `String` (JSON) / `Array` | List of available languages. |
| `dataSelectedLanguage` | `String` / `Number` | ID of the currently selected source language. |
| `dataControllerName` | `String` | Controller context for the copy operation. |

## Behavior

- Displays a dropdown or list of target languages.
- Allows copying content from the current language to the selected target.
- Handles confirmation and API submission.

## Events

- Emits success/error events or uses Global Toaster.
