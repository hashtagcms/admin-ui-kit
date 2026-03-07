# HcAvatar

A component for displaying user profile pictures, initials, or placeholders, with support for status indicators and different shapes/sizes.

## 🚀 Import

```javascript
import { HcAvatar } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop      | Type      | Default   | Description                                                           |
| :-------- | :-------- | :-------- | :-------------------------------------------------------------------- |
| `src`     | `String`  | `''`      | The image source URL.                                                 |
| `name`    | `String`  | `''`      | User name used to generate initials if `src` is missing or fails.    |
| `alt`     | `String`  | `''`      | Alternative text for the image.                                       |
| `size`    | `String`  | `md`      | Avatar size (e.g., `xs`, `sm`, `md`, `lg`, `xl`).                     |
| `rounded` | `Boolean` | `true`    | If true, the avatar is circular. Otherwise, rounded square.           |
| `status`  | `String`  | `''`      | Optional status indicator (e.g., `online`, `offline`, `away`, `busy`). |
| `variant` | `String`  | `primary` | Color variant for the fallback initials background.                  |
| `ui`      | `Object`  | See API   | Theme-specific configuration for Tailwind classes.                    |

## 📦 Slots

None. The component automatically switches between an image and initials based on the provided props.

## 📝 Usage Example

```html
<!-- Image Avatar with Online Status -->
<hc-avatar 
  src="https://example.com/user.jpg" 
  size="lg" 
  status="online" 
/>

<!-- Initials Avatar -->
<hc-avatar 
  name="John Doe" 
  variant="success" 
  :rounded="false" 
/>
```

## 🎨 Customization (UI Object)

Supported keys in the `ui` configuration:
- `base`: Root wrapper classes.
- `avatarWrapper`: The main circle/square container.
- `image`: Styling for the `<img>` element.
- `initials`: Styling for the fallback text.
- `statusBase`: Base classes for the status dot.
- `sizes`: Mapping for different size scales.
- `statusColors`: Mapping for status indicator colors.
- `fallbackColors`: Mapping for initials background variants.
