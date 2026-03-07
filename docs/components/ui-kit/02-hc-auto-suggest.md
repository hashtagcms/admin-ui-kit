# HcAutoSuggest

An advanced input field that provides real-time suggestions as the user types. It supports both local data arrays and remote API endpoints with debounced fetching.

## 🚀 Import

```javascript
import { HcAutoSuggest } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop           | Type             | Default | Description                                                     |
| :------------- | :--------------- | :------ | :-------------------------------------------------------------- |
| `modelValue`   | `String\|Number` | `''`    | The current value (v-model).                                    |
| `label`        | `String`         | `''`    | Input label text.                                               |
| `placeholder`  | `String`         | `''`    | Input placeholder.                                              |
| `disabled`     | `Boolean`        | `false` | Disables the input field.                                       |
| `data`         | `Array`          | `null`  | Local array of suggestions.                                     |
| `endpoint`     | `String`         | -       | Remote API URL for fetching suggestions.                        |
| `displayField` | `String`         | `name`  | The field to show in the suggestion list if items are objects. |
| `searchParam`  | `String`         | `q`     | The query parameter name for remote API calls.                  |
| `minChars`     | `Number`         | `2`     | Minimum characters required before showing suggestions.         |
| `hint`         | `String`         | `''`    | Helper text below the input.                                   |
| `ui`           | `Object`         | See API | Theme-specific configuration for Tailwind classes.             |

## 📦 Slots

| Slot Name   | Description                      |
| :---------- | :------------------------------- |
| `icon-left` | Optional slot for a leading icon. |

## ⚡ Events

| Event                | Payload          | Description                                         |
| :------------------- | :--------------- | :-------------------------------------------------- |
| `update:modelValue`  | `String`         | Fired when the input value changes.                 |
| `select`             | `Object\|String` | Fired when a suggestion is selected from the list. |

## 📝 Usage Example

### With Local Data
```html
<hc-auto-suggest 
  v-model="selectedCity" 
  :data="['New York', 'London', 'Paris', 'Tokyo']"
  placeholder="Search cities..."
/>
```

### With Remote API
```html
<hc-auto-suggest 
  v-model="username" 
  endpoint="/api/users/search"
  displayField="username"
  searchParam="term"
  @select="onUserSelect"
/>
```

## 🎨 Customization (UI Object)

Supported keys in the `ui` configuration: `wrapper`, `label`, `container`, `iconLeftWrapper`, `input`, `dropdown`, `item`, `itemActive`, `loadingWrapper`, `hint`.
