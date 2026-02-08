# @hashtagcms/styles

The core design system for HashtagCms. This package contains the SASS/SCSS source files used to style the admin interface, compatible with the compiled CSS structure.

## 📦 Installation

```bash
npm install @hashtagcms/styles
```

## 🚀 Usage

For most projects, you will want to import the main standard entry point in your SCSS file:

```scss
@import "~@hashtagcms/styles/app";
```

## 📂 Structure

- **`_variables.scss`**: Global SASS variables for colors, spacing, and typography.
- **`_admin.scss`**: Core layout styles for the dashboard shell.
- **`_table-grid.scss`**: Styles for the `TabularView` component.
- **`_loader.scss`**: Styles for the `Loader` component.
- **`_toast.scss`**: Styles for the `ToastBox` component.

## 🎨 Customization

To override variables, import your custom variables _before_ importing this package:

```scss
// Your overrides
$primary-color: #3498db;

// Import HashtagCms styles
@import "~@hashtagcms/styles/app";
```
