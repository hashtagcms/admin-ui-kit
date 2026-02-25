# SiteWiseCopier Component

**Package:** `@hashtagcms/admin-ui-kit`
**Source:** `themes/modern/components/sitewise-copier.vue`

The `SiteWiseCopier` component allows users to copy data and settings from one site context to another. It uses the `SiteWiseData` component internally to handle the data selection and visualization.

## 🚀 Import

```javascript
import { SiteWiseCopier } from "@hashtagcms/admin-ui-kit";
```

## 🛠 Usage

```html
<site-wise-copier
  data-all-sites="[...]"
  data-current-key="city"
  data-site-id="1"
></site-wise-copier>
```

## 🛠 Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `data-all-sites` | `JSON String` | List of all sites available for selection as source. |
| `data-site-id` | `Number` | The destination (current) site ID. |
| `data-current-key` | `String` | The type of data being copied (e.g., 'city', 'country'). |
| `data-controller-name` | `String` | API controller to handle copy/remove (default: "site"). |

## ⚙️ Behavior

1.  **Selection**: User selects an "Origin Context" (Source Site).
2.  **Hydration**: Component fetches data from the source site via API.
3.  **Visualization**: Displays differences using the internal `SiteWiseData` grid.
4.  **Execution**: User can add (copy) or remove items from the destination site.
