# CategoryPlatform

A modal wrapper used specifically in the category management flow to prompt the user to select a platform context before editing.

## 🚀 Import

```javascript
import { CategoryPlatform } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop             | Type           | Default | Description                                  |
| :--------------- | :------------- | :------ | :------------------------------------------- |
| `dataPlatforms`  | `Array\|String`| `[]`    | Array of platform objects: `[{ id, name }]`. |

## ⚡ Events (Internal Bus)

The component listens for global events:
- `list-view-pre-edit`: Triggers the modal to open and captures the target row.

It emits:
- `list-view-hide-spinner`: Emitted to the `EventBus` when the modal is closed.

## 📝 Usage Example

```html
<category-platform :data-platforms="sitePlatforms" />
```

## 🔗 Logic
- If multiple platforms are provided, it opens a modal for selection.
- If only one platform is provided, it automatically proceeds to the edit URL.
- Redirects to `/category/edit/{row_id}/{platform_id}` upon selection.
