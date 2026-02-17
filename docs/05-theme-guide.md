# Theme Development & Contribution Guide

This document explains how to contribute to existing themes or create new themes in the `@hashtagcms/admin-ui-kit` monorepo.

---

## 🏗️ Architecture Overview

The UI Kit uses a **Theme-First Monorepo Architecture**. Every theme is a self-contained unit located in `packages/themes/{theme_name}/`.

### Standard Directory Structure
```text
packages/themes/{theme_name}/
├── package.json          # Theme-specific dependencies
├── src/
│   ├── components/       # Vue 3 components
│   ├── scss/             # Theme styles (Sass)
│   └── js/               # Theme entry point (app.js)
├── static/               # Static assets (images, third-party libs)
├── views/                # Blade templates for Laravel integration
└── tests/                # Vitest spec files
    └── components/       # Component-level tests (logic only)
```

### Shared Testing Infrastructure
To ensure consistency, shared assets are located at the project root:
- **`tests/shared/fake-data/`**: Central repository for component attributes.
- **`tests/shared/test-utils.js`**: Shared logic for hydrating components.

---

## 📦 Static Assets

The build system automatically manages static assets, distributing them to the final `dist/{theme}/` folder.

### 1. Common Assets (Global)
Assets placed in `packages/common/` are automatically copied to **every** theme's output directory.
- `packages/common/js/`  → `dist/{theme}/js/` (e.g. vendors like TinyMCE)
- `packages/common/css/` → `dist/{theme}/css/`
- `packages/common/img/` → `dist/{theme}/img/`
- `packages/common/fonts/` → `dist/{theme}/fonts/`

**Example:**
Files in `packages/common/js/vendors/tinymce` will be available at imports/URLs like:
`/assets/hashtagcms/be/{theme}/js/vendors/tinymce/tinymce.min.js`

### 2. Theme-Specific Assets
For assets unique to a single theme, place them in `packages/themes/{theme_name}/static/`.
These contents are copied directly to the theme's root output `dist/{theme}/`.

**Example:**
`packages/themes/modern/static/img/hero.png` will be output to `dist/modern/img/hero.png`.

---

## 🎨 Developing Components

### 1. Component Design
- **Self-Containment**: Components should rely on props for data. Use `@hashtagcms/helpers` for shared logic.
- **Styling**:
  - **Modern Theme**: Use Tailwind v4 utility classes.
  - **Neo Theme**: Use Bootstrap 5 classes.
- **Naming**: Use PascalCase for Vue files and kebab-case for CSS classes.

### 2. Styles
Styles are located in `src/scss/app.scss`. 
- **Tailwind v4**: If contributing to the Modern theme, use the `@reference` directive to keep the bundle lean.
- **Shared Variables**: Use CSS variables for tokens like colors and spacing.

---

## 📂 The `views` Directory
The `views/` folder contains Laravel Blade templates that act as the entry points for the CMS. 
- These templates are intended to be published to the `resources/views/vendor/hashtagcms/be/{theme_name}` directory in a Laravel app.
- Ensure the HTML structure in Blade matches the expectations of the Vue components.

---

## 🧪 Testing Process

Every new component or major change **must** have a corresponding test case.

### 1. Structure
Place your tests in `packages/themes/{theme_name}/tests/components/{ComponentName}.spec.js`.

### 2. Running Tests
Tests are organized via Vitest Workspaces.
```bash
# Run all tests (Neo and Modern)
npm run test

# Run tests for a specific theme
npx vitest --project neo
npx vitest --project modern
```

### 3. Guidelines
- Use `@vue/test-utils` for mounting.
- Utilize the `loadFakeData` utility to hydrate props from `fake-data/*.txt` files.
- Verify both the logic (events/props) and the visual indicators (CSS classes like `bg-blue-600` or Bootstrap classes).

---

## 🕹️ Visual Testing (Playground)

The Playground is the fastest way to see your changes live in both themes.

### 1. Start the Playground
```bash
npm run playground
```
This launches a Vite server at `http://localhost:3000`.

### 2. Testing Your Component
- Open `playground/App.vue`.
- Add your component to the `availableViews` array.
- Use the **Theme Selector** in the header to toggle between Neo and Modern.
- Ensure your component renders correctly and responds layout shifts.

---

## 🚀 Creating a New Theme

The UI Kit uses **Dynamic Discovery**, meaning the build system and test runner automatically detect new subdirectories in the `themes/` folder.

To create a new theme:

1. **Scaffold**: Copy an existing theme folder (e.g., `themes/neo/`) to a new directory (e.g., `themes/material/`).
2. **Metadata**: Update the `package.json` inside your new theme folder with the new theme name and version.
3. **Styles**: Modify `styles/app.scss`. If using Tailwind, ensure your configuration matches the directory structure.
4. **Playground Registration**: Open `playground/App.vue` and add your theme to the `currentTheme` dropdown list and `switchTheme` logic if necessary to ensure it renders correctly in the preview.
5. **Build & Test**:
   - Run `npm run test` to see the new theme's test project (automatically created).
   - Run `npm run build` to generate the `dist/{theme_name}/` assets.

---

## 🤝 Contribution Rules
- **No Cross-Imports**: A theme should never import from another theme's directory.
- **Branding**: Always use "HashtagCms" casing.
- **Terminology**: Use "Extended Features" instead of "Premium Features".
- **Build First**: Always run `npm run build` before submitting a PR to verify bundle integrity.
