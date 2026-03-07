# TitleBar

The standard page header component. It displays the resource title, breadcrumbs/subtitle, and common layout toggles.

## 🚀 Import

```javascript
import { TitleBar } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                   | Type             | Description                                                     |
| :--------------------- | :--------------- | :-------------------------------------------------------------- |
| `dataTitle`            | `String`         | Main heading (HTML supported).                                  |
| `dataSubTitle`         | `String`         | Smaller text below the title.                                   |
| `dataBackUrl`          | `String`         | Optional target for an "Action Bar" back button.                |
| `dataShowExpand`       | `Any`            | If present, shows the Sidebar toggle button.                    |
| `dataShowCopy/Paste`   | `Boolean\|String`| Toggles visibility of clipboard utilities.                     |

## ⚙️ Composition
- Integrates `LeftMenuToggle` for sidebar management.
- Integrates `CopyPaste` library component for content duplication.
- Uses `HcButton` for standard interactions.

## 📝 Usage Example

```html
<title-bar 
  data-title="Edit Category" 
  data-sub-title="Update category metadata and visibility" 
  data-back-url="/admin/category"
/>
```
