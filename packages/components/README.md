# @hashtagcms/components

A collection of robust, reusable Vue.js components designed for building HashtagCMS admin interfaces. These components are optimized for server-side rendering integration (using `data-` attributes) and modern SPA capabilities.

## 📦 Installation

```bash
npm install @hashtagcms/components
```

## 🚀 Usage

Import components directly in your Vue application:

```javascript
import { ActionBar, TabularView } from "@hashtagcms/components";

// Or import individual files
import ActionBar from "@hashtagcms/components/action-bar";
```

## 🛠 Component Reference

### `ActionBar`
A versatile toolbar that sits at the top of module pages. It handles adding new items, searching, layout switching (grid/table), and language toggling.

**Props:**
*   `data-controller-name`: The current controller (e.g., `'site'`).
*   `data-controller-title`: Page title.
*   `data-action-fields`: Array of enabled actions (e.g., `['edit', 'delete']`).
*   `data-fields`: Fields available for search.
*   `data-show-search`: Boolean to toggle search button.

### `TabularView`
The powerhouse grid component for displaying lists of data.

**Features:**
*   **Dynamic Columns**: Renders columns based on `data-headers`.
*   **Actions**: Automatically generates Edit/Delete/Approve buttons based on permissions.
*   **Smart Rendering**: Handles images, videos, and nested object values (e.g., `lang.name`) automatically.
*   **Inline Editing**: Supports inline toggle switches for boolean states (like `publish_status`).

**Props:**
*   `data-list`: JSON string of the data rows.
*   `data-headers`: Configuration for columns.
*   `data-user-rights`: Array of permissions (e.g., `['edit', 'delete']`).
*   `data-action-as-ajax`: Actions that should trigger an API call instead of navigation.

### `SearchBar`
A dynamic search form that allows users to query data with specific logic.

**Features:**
*   **Field Selection**: Dropdown to choose which field to search.
*   **Operators**: Supports `=`, `!=`, `>`, `<`, `like%`, etc.
*   **Type Detection**: Automatically switches input type to `date` for date fields.

### `Pagination`
A Bootstrap-styled pagination component that synchronizes with Laravel's pagination response.

**Props:**
*   `data-paginator`: The full pagination object from Laravel.
*   `data-total`: Total number of records.
*   `data-show-download`: Helper to show/hide export options.

### `ModulePermission`
A specialized component for managing role-based access control (RBAC) matrices.

### `InfoPopup`
A modal wrapper used by `TabularView` and others to display quick information or read-only details without leaving the page.

### Library Components
We also export smaller utility components found in `src/library`:
*   `ToastBox`: Notification toaster.
*   `Loader`: Full-screen or partial loading spinner.
*   `ModalBox`: Generic dialog wrapper.

## 🤝 Integration Note
Most components are designed to accept data via `props`. When used in a mixed Blade/Vue environment, standard practice is to pass JSON-encoded strings to the `data-` attributes, which the components automatically parse.
