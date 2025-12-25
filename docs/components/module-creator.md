# ModuleCreator Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/module-creator.vue`

The `ModuleCreator` is a utility for developers to scaffold new backend modules. It can create database entries, controllers, models, and views.

## 🚀 Import

```javascript
import ModuleCreator from "@hashtagcms/components/module-creator";
```

## 🛠 Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `data-database-tables` | `JSON String` | List of available database tables. |
| `data-controller-name` | `String` | Base URL for form submission. |
| `data-back-url` | `String` | URL for the cancel button. |

## 📝 Usage Example

```html
<module-creator
    data-database-tables='["users", "posts", "categories"]'
    data-controller-name="module-manager"
></module-creator>
```

---

# FrontendModuleCreator Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/frontend-module-creator.vue`

Configures API/Service-based modules for the frontend application. Allows mapping of data types and services.

## 🚀 Import

```javascript
import FrontendModuleCreator from "@hashtagcms/components/frontend-module-creator";
```
