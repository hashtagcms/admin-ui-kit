# Downloads

A simple button component used to trigger a file download associated with a specific controller.

## 🚀 Import

```javascript
import { Downloads } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                   | Type     | Default | Description                                                     |
| :--------------------- | :------- | :------ | :-------------------------------------------------------------- |
| `dataControllerName`   | `String` | -       | **Required.** The name of the controller that handles the download. |

## 📦 Slots

| Slot Name | Description                                           |
| :-------- | :---------------------------------------------------- |
| `default` | The button text. Defaults to "Download".               |

## 🔗 Action Logic
Clicking the button redirects the window location to `{admin_path}/{controller_name}/download`.

## 📝 Usage Example

```html
<downloads data-controller-name="reports">
  Export CSV
</downloads>
```
