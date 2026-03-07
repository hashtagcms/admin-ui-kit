# HcPlaceholder

A "skeleton" loading component used to provide visual feedback while content is being fetched. It helps maintain the layout and reduces perceived load time.

## 🚀 Import

```javascript
import { HcPlaceholder } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop      | Type     | Default  | Description                                          |
| :-------- | :------- | :------- | :--------------------------------------------------- |
| `width`   | `String` | `w-full` | Tailwind width class (e.g., `w-1/2`, `w-20`).        |
| `height`  | `String` | `h-4`    | Tailwind height class (e.g., `h-10`, `h-32`).        |
| `rounded` | `String` | `lg`     | Corner radius (`none`, `sm`, `md`, `lg`, `xl`, `full`).|
| `ui`      | `Object` | See API  | Theme-specific configuration for Tailwind classes.   |

## 📦 Slots

| Slot Name | Description                                                  |
| :-------- | :----------------------------------------------------------- |
| `default` | Optional internal content. Usually left empty for skeletons. |

## 📝 Usage Example

```html
<!-- Text Skeleton -->
<hc-placeholder width="w-2/3" height="h-3" />
<hc-placeholder width="w-full" height="h-3" />

<!-- Profile Image Skeleton -->
<hc-placeholder width="w-12" height="h-12" rounded="full" />
```

## 🎨 Customization (UI Object)

Supported keys:
- `base`: Main styling and animation (usually includes `animate-pulse` or `hc-shimmer`).
- `rounded`: Mapping of radius keys to Tailwind classes.
- `shimmer`: Specific classes for the shimmer effect.
