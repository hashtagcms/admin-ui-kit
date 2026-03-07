# HcSwitch

A toggle switch component used to alternate between two states (on/off). Ideal for settings and preferences where instant feedback is expected.

## 🚀 Import

```javascript
import { HcSwitch } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop         | Type      | Default   | Description                                                     |
| :----------- | :-------- | :-------- | :-------------------------------------------------------------- |
| `modelValue` | `Boolean` | `false`   | The toggle state (v-model).                                     |
| `label`      | `String`  | `''`      | Text label displayed next to the switch.                       |
| `icon`       | `String`  | `''`      | Optional icon shown inside the thumb when active (e.g., `fa fa-check`). |
| `variant`    | `String`  | `primary` | Color variant when active (`primary`, `success`, `danger`).     |
| `size`       | `String`  | `md`      | Toggle size (`sm`, `md`, `lg`).                                 |
| `disabled`   | `Boolean` | `false`   | Disables toggling.                                              |
| `ui`         | `Object`  | See API   | Theme-specific configuration for Tailwind classes.              |

## 📦 Slots

| Slot Name | Description                                           |
| :-------- | :---------------------------------------------------- |
| `default` | Custom content for the label area. Overrides `label`. |

## ⚡ Events

| Event               | Payload   | Description                             |
| :------------------ | :-------- | :-------------------------------------- |
| `update:modelValue` | `Boolean` | Fired when the switch toggles (v-model). |

## 📝 Usage Example

```html
<!-- Simple Switch -->
<hc-switch v-model="notifications" label="Enable Notifications" />

<!-- Large Success Switch with Icon -->
<hc-switch 
  v-model="isActive" 
  label="Activate Account" 
  variant="success" 
  size="lg" 
  icon="fa fa-check" 
/>
```

## 🎨 Customization (UI Object)

Supported keys: `container`, `track`, `inactiveTrack`, `activeTrackColors`, `thumb`, `thumbActivePositions`, `trackSizes`, `thumbSizes`.
