# FrontendModuleCreator Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/frontend-module-creator.vue`

This component provides a UI for defining frontend modules that interact with APIs/Services. It allows configuring module aliases, view names, and data fetching strategies (Service vs Query).

## 🚀 Import

```javascript
import FrontendModuleCreator from "@hashtagcms/components/frontend-module-creator";
```

## 🛠 Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `data-module-types` | `JSON String` | Available module types. |
| `data-method-types` | `JSON String` | HTTP methods (GET, POST). |
| `data-controller-name` | `String` | Base URL for submission. |

## 📝 Usage Example

```html
<frontend-module-creator
    data-controller-name="frontend-manager"
></frontend-module-creator>
```
