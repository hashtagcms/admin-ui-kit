# LeftMenuShowHide

A toggle button used to collapse or expand the admin sidebar. It synchronizes navigation state across the application via global events.

## 🚀 Import

```javascript
import { LeftMenuShowHide } from "@hashtagcms/admin-ui-kit/themes/modern/components/library";
```

## 🛠 Props

| Prop             | Type             | Default           | Description                                                        |
| :--------------- | :--------------- | :---------------- | :----------------------------------------------------------------- |
| `dataIconCss`    | `String`         | `'fa-bars'`       | Icon when the menu is in its primary state.                        |
| `dataIconCssOff` | `String`         | `'fa-arrow-left'` | Icon when the menu is in its toggled state.                        |
| `dataMode`       | `String`         | `'collapse'`      | Toggle mode: `'collapse'` (mini-sidebar) or `'hide'` (full hidden). |

## ⚡ Events (Bus)

- `left_menu_toggle_clicked`: Emitted to `EventBus` on click.
- `left_menu_status_changed`: Listens to this event to update its own icon if the menu state was changed by another trigger (e.g., window resizing).

## 📝 Usage Example

```html
<left-menu-show-hide 
  data-mode="collapse" 
  data-icon-css="fa-chevron-right" 
/>
```
