# InfoBox

The `InfoBox` is a dashboard card component designed to show metrics, module summaries, or navigation shortcuts with a modern, glassmorphic aesthetic.

## 🚀 Import

```javascript
import { InfoBox } from "@hashtagcms/admin-ui-kit/themes/modern/components/library";
```

## 🛠 Props

| Prop             | Type             | Default | Description                                                     |
| :--------------- | :--------------- | :------ | :-------------------------------------------------------------- |
| `dataTitle`      | `String`         | -       | The main label of the card.                                     |
| `dataIcon`       | `String`         | -       | FontAwesome icon class (e.g., `'fa-users'`).                    |
| `dataUrl`        | `String`         | -       | Navigation link for the card.                                   |
| `dataBgColor`    | `String`         | -       | Custom background color class.                                  |

## ⚙️ Logic
- **Dynamic Icons**: If `dataIcon` is not provided, the component attempts to generate a fallback icon label based on the first letter of the `dataTitle`.
- **Hover Transitions**: Features subtle scale and shadow transitions to provide focus on interactive dashboard elements.

## 📝 Usage Example

```html
<info-box 
  data-title="Users" 
  data-icon="fa-users" 
  data-url="/admin/users" 
  data-bg-color="bg-blue-600"
/>
```
