# InfoBoxes Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/info-boxes.vue`

Renders a grid of shortcut/info boxes, typically found on the Dashboard.

## 🚀 Import

```javascript
import InfoBoxes from "@hashtagcms/components/info-boxes";
```

## 🛠 Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `data-modules` | `JSON String` | Array of modules to display icons for. |

## 🛠 Usage

```html
<info-boxes
    data-modules='[{"name":"Users", "icon_css":"fa-user", "link":"users"}, ...]'
></info-boxes>
```
