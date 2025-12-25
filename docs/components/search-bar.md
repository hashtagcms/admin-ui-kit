# SearchBar Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/search-bar.vue`

The `SearchBar` provides a standardized interface for filtering lists. It allows users to select a field, choose an operator, and input a query.

## 🚀 Import

```javascript
import SearchBar from "@hashtagcms/components/search-bar";
```

## 🛠 Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `data-fields` | `JSON String` | Array of fields available for searching. |
| `data-selected-params` | `JSON String` | Current URL search params (`q`, `f`, `o`) to pre-popluate the form. |
| `data-controller-name` | `String` | URL slug to submit the form to. |

## 📝 Usage Example

```html
<search-bar
    data-controller-name="users"
    data-fields='[{"label":"Name", "key":"name"}, {"label":"Email", "key":"email"}]'
></search-bar>
```

## ✨ Features

*   **Operators**: Supports `=`, `!=`, `>`, `<`, `like%`, `%like%`.
*   **Type Detection**: Automatically switches input type to `date` if the selected field name ends with `_at` or `_date`.
*   **Reset**: Simple reset button to clear filters.

---

# TitleBar Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/title-bar.vue`

Used primarily on "Create" or "Edit" pages to show context and navigation.

## 🚀 Import
```javascript
import TitleBar from "@hashtagcms/components/title-bar";
```

## 🛠 Props
| Prop | Description |
| :--- | :--- |
| `data-title` | The main H1 title. |
| `data-back-url` | URL for the back button. |
| `data-show-copy` | Shows the "Copy" utility button (optional). |

---

# TopNav Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/top-nav.vue`

The main header component.

## 🛠 Props
| Prop | Description |
| :--- | :--- |
| `data-site-name` | Application name. |
| `data-username` | Logged-in user's name. |
| `data-supported-sites` | Array of sites for the switcher. |
