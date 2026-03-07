# HcCard

A content container used to group related information and actions into a structured, visually distinct unit.

## 🚀 Import

```javascript
import { HcCard } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop        | Type      | Default | Description                                             |
| :---------- | :-------- | :------ | :------------------------------------------------------ |
| `title`     | `String`  | `''`    | Main title of the card.                                 |
| `subtitle`  | `String`  | `''`    | Subheading text below the title.                        |
| `shadow`    | `String`  | `md`     | Shadow intensity (`none`, `sm`, `md`, `lg`, `xl`).      |
| `rounded`   | `String`  | `lg`     | Corner radius (`none`, `sm`, `md`, `lg`, `xl`).         |
| `noBorder`  | `Boolean` | `false` | If true, removes the surrounding border.                |
| `bodyClass` | `String`  | `''`    | Extra CSS classes specifically for the body section.    |
| `p`         | `String`  | `''`    | Padding shortcut (applies to all sides).                |
| `px`        | `String`  | `px-6`  | Horizontal padding for the body.                        |
| `py`        | `String`  | `py-5`  | Vertical padding for the body.                          |
| `ui`        | `Object`  | See API | Theme-specific configuration for Tailwind classes.      |

## 📦 Slots

| Slot Name        | Description                                       |
| :--------------- | :------------------------------------------------ |
| `default`        | The main content area of the card.                |
| `header`         | Custom header content. Overrides `title`/`subtitle`.|
| `header-actions` | Slot for buttons/actions in the top right.       |
| `media`          | Area for images or banners usually at the top.    |
| `footer`         | Content area at the very bottom.                  |

## 📝 Usage Example

```html
<hc-card 
  title="Project Status" 
  subtitle="Last updated 2 hours ago"
>
  <template #header-actions>
    <hc-button size="xs" variant="ghost">Details</hc-button>
  </template>

  <p>The current project is 75% complete.</p>

  <template #footer>
    <hc-button variant="primary" fullWidth>Refresh</hc-button>
  </template>
</hc-card>
```

## 🎨 Customization (UI Object)

Supported keys: `base`, `header`, `title`, `subtitle`, `media`, `footer`, `shadows`, `rounded`, `border`, `noBorder`.
