# LeftMenuShowHide

A toggle button component designed to control the state of the main side navigation menu. It supports two distinct modes: collapsing (narrowing) or completely hiding the menu.

## 🚀 Import

```javascript
import { LeftMenuShowHide } from "@hashtagcms/admin-ui-kit/themes/modern/components/library";
```

## 🛠 Props

| Prop             | Type     | Default       | Description                                              |
| :--------------- | :------- | :------------ | :------------------------------------------------------- |
| `dataMode`       | `String` | `'collapse'`  | Either `'collapse'` (mini-menu) or `'hide'` (full-off).  |
| `dataIconCss`    | `String` | `'fa fa-bars'`| Icon class when the menu is in its default state.        |
| `dataIconCssOff` | `String` | `'fa fa-bars'`| Icon class when the menu is toggled.                     |

## ⚡ Events (Bus)

The component listens for global `EventBus` events to keep its button state in sync:
- `left-menu-on-show`
- `left-menu-on-hide`
- `left-menu-on-collapse`
- `left-menu-on-expand`

## 📝 Usage Example

```html
<left-menu-show-hide 
  data-mode="collapse" 
  data-icon-css="fa fa-outdent" 
  data-icon-css-off="fa fa-indent" 
/>
```
