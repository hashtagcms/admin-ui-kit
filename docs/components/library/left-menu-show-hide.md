# LeftMenuShowHide Component

**Package:** `@hashtagcms/admin-ui-kit`
**Source:** `themes/modern/components/library/left-menu-show-hide.vue`

A toggle button for the main sidebar navigation (LeftNav).

## 🚀 Import

```javascript
import { LeftMenuShowHide } from "@hashtagcms/admin-ui-kit";
```

## 🛠 Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data-mode` | `String` | `"collapse"` | Toggle mode: `'collapse'` (mini/full) or `'hide'` (visible/hidden). |
| `data-icon-css` | `String` | `"fa fa-bars"` | Icon when menu is active/expanded. |
| `data-icon-css-off` | `String` | `"fa fa-bars"` | Icon when menu is collapsed/hidden. |

## 📝 Usage Example

```html
<left-menu-show-hide data-mode="collapse"></left-menu-show-hide>
```

## ✨ Features

1. **State Persistence**: Uses `LeftMenu` helper to manage state (often persisted in localStorage).
2. **Reactive Icon**: Updates icon based on current menu state.
