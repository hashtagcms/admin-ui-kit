# HcDrawer

A side-panel component that slides in from the edge of the screen (Left or Right). Useful for navigation, detailed views, or complex filters.

## 🚀 Import

```javascript
import { HcDrawer } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop         | Type      | Default | Description                                                        |
| :----------- | :-------- | :------ | :----------------------------------------------------------------- |
| `modelValue` | `Boolean` | `false` | Controls the visibility (v-model).                                |
| `title`      | `String`  | `Panel` | Title displayed in the header.                                     |
| `subtitle`   | `String`  | `''`    | Secondary text below the title.                                   |
| `position`   | `String`  | `right` | Slide-in direction (`left`, `right`).                              |
| `size`       | `String`  | `md`    | Width of the drawer (`sm`, `md`, `lg`, `xl`, `full`).              |
| `ui`         | `Object`  | See API | Theme-specific configuration for Tailwind classes.                 |

## 📦 Slots

| Slot Name | Description                                           |
| :-------- | :---------------------------------------------------- |
| `default` | The main body content of the drawer.                  |
| `footer`  | Optional slot for actions at the bottom of the panel. |

## ⚡ Events

| Event               | Payload   | Description                                     |
| :------------------ | :-------- | :---------------------------------------------- |
| `update:modelValue` | `Boolean` | Fired when the drawer should be opened/closed. |

## 📝 Usage Example

```html
<hc-drawer 
  v-model="isSidePanelOpen" 
  title="Edit Profile"
  subtitle="Manage your account settings"
  position="right"
  size="lg"
>
  <div class="space-y-4">
    <!-- Form Content -->
  </div>
  
  <template #footer>
    <div class="flex justify-end gap-2">
      <hc-button variant="secondary" @click="isSidePanelOpen = false">Cancel</hc-button>
      <hc-button variant="primary">Save Changes</hc-button>
    </div>
  </template>
</hc-drawer>
```

## 🎨 Customization (UI Object)

Supported keys: `backdrop`, `backdropTransition`, `panel`, `header`, `title`, `subtitle`, `closeButton`, `closeIcon`, `body`, `footer`, `positions`, `sizes`.
