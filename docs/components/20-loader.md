# Loader

A global loading overlay that can be used to block user interaction during long-running background tasks (like AJAX fetches or saves).

## 🚀 Import

```javascript
import { Loader } from "@hashtagcms/admin-ui-kit/themes/modern/components/library";
```

## 🛠 Props

| Prop             | Type     | Default                   | Description                                              |
| :--------------- | :------- | :------------------------ | :------------------------------------------------------- |
| `dataLoadingText`| `String` | `"Loading. Please wait..."`| The text to display below the spinner.                   |
| `dataAsModal`    | `Boolean`| `true`                    | If true, displays a dark backdrop behind the loader.     |

## ⚙️ Exposed Methods

- `show(message = null)`: Opens the loader overlay. Optionally updates the message.
- `hide()`: Closes the loader overlay.

## 📝 Usage Example

```html
<loader ref="globalLoader" data-as-modal="true" />

<!-- In script -->
<script setup>
const globalLoader = ref(null);
const processData = async () => {
  globalLoader.value.show("Saving record...");
  await performSave();
  globalLoader.value.hide();
};
</script>
```
