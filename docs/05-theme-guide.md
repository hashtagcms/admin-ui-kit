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
├── views/                # Blade templates for Laravel integration
└── tests/                # Vitest spec files
    └── components/       # Component-level tests (logic only)
```

### Shared Testing Infrastructure
To ensure consistency, shared assets are located at the project root:
- **`tests/shared/fake-data/`**: Central repository for component attributes.
- **`tests/shared/test-utils.js`**: Shared logic for hydrating components.

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

If you are creating a brand new theme (e.g., "dark-mode"):
1. **Copy** the `neo` or `modern` folder as a template.
2. **Update** `package.json` name to `@hashtagcms/theme-{name}`.
3. **Register** the new theme in the root `webpack.config.js` entry points.
4. **Add** a new project block to `vitest.workspace.js`.
5. **Update** `playground/App.vue` to include the new theme in the dropdown.

---

## 🤝 Contribution Rules
- **No Cross-Imports**: A theme should never import from another theme's directory.
- **Branding**: Always use "HashtagCms" casing.
- **Terminology**: Use "Extended Features" instead of "Premium Features".
- **Build First**: Always run `npm run build` before submitting a PR to verify bundle integrity.
