# SiteButton Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/site-button.vue`

A simple select dropdown for choosing a site, often used within specific forms (not global context).

## 🚀 Import

```javascript
import SiteButton from "@hashtagcms/components/site-button";
```

## 🛠 Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `data-sites` | `JSON String` | List of sites. |
| `data-current-site` | `Number` | Selected site ID. |

## 🛠 Usage

```html
<site-button
    data-sites='[...]'
></site-button>
```

Emits `site_changed` via EventBus when selection changes.
