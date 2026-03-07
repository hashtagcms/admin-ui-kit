# Loader

A global overlay component that provides visual feedback during long-running operations. It features a high-visibility spinner and customizable status messages.

## 🚀 Import

```javascript
import { Loader } from "@hashtagcms/admin-ui-kit/themes/modern/components/library";
```

## 🛠 Props

| Prop             | Type             | Default | Description                                                     |
| :--------------- | :--------------- | :------ | :-------------------------------------------------------------- |
| `dataShowLoader` | `Boolean\|String`| `false` | Initial visibility state.                                       |
| `dataText`       | `String`         | -       | Message displayed below the spinner (e.g., "Processing...").    |

## ⚙️ Exposed Methods

- `show(message = null)`: Activates the overlay. Optionally updates the display text.
- `hide()`: Deactivates the overlay.

## ⚡ Events (Bus)

- `loader_show`: Listens for this event to activate globally.
- `loader_hide`: Listens for this event to deactivate globally.

## 📝 Usage Example

```javascript
// Programmatic access via ref
loaderRef.value.show("Generating files...");
```
