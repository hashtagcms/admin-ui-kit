# Homepage Component (Dashboard)

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/homepage.vue`

The `Homepage` component acts as the Layout Editor / Dashboard Manager. It provides a drag-and-drop interface for administrators to arrange CMS modules into "Hooks" defined by the frontend theme.

## 🚀 Import

```javascript
import Homepage from "@hashtagcms/components/homepage";
```

## 🧠 Core Concepts

1.  **Hooks**: Areas defined in your frontend theme (e.g., `header`, `footer`, `left-sidebar`).
2.  **Modules**: Reusable components (e.g., `Static Content`, `Login Form`) that can be placed into hooks.
3.  **Context**: The layout can differ based on **Site**, **Microsite**, **Platform**, and **Category**.

## 🛠 Props (Data Inputs)

This component requires significant data hydration:

| Prop | Description |
| :--- | :--- |
| `data-hook-info` | Definitions of available hooks in the active theme. |
| `data-category-modules` | The *current* arrangement of modules for this page categories. |
| `data-all-modules` | The pool of *all* available modules (displayed in the right sidebar). |
| `data-theme-info` | Information about the active theme (parsed to find hooks). |
| `data-categories` | List of categories (for context switching). |
| `data-platforms` | List of platforms (Mobile/Desktop/Web). |
| `data-user-rights` | Permissions to determine if user can drag/drop/save. |

## 📝 Usage Example

```html
<homepage
    data-site-id="1"
    data-platform-id="1"
    data-category-id="10"
    data-hook-info='[...]'
    data-category-modules='[...]'
></homepage>
```

## ✨ Features

*   **Drag & Drop**: Uses `SortableJS` to allow dragging modules from the "All Modules" list into specific "Hook" panels.
*   **Reordering**: Modules within a hook can be reordered.
*   **Context Switching**: Dropdowns at the top allow switching between Platforms (Web/Mobile) and Categories to edit their specific layouts.
*   **Copy/Clone**: Includes a built-in Modal to copy the layout from one category/platform to another.
*   **Validation**: Ensures required hooks are populated.

## 🔗 Internal Dependencies
*   `SortableJS`: For drag-and-drop.
*   `ModalBox`: For Copy/Delete confirmations.
*   `InfoPopup`: To view module details.
