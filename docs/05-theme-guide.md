# Theme Development & Contribution

This guide outlines the technical architecture of the `@hashtagcms/admin-ui-kit` monorepo and explains how to contribute to existing themes or develop new ones.

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Shared vs Theme-Specific Assets](#shared-vs-theme-specific-assets)
3. [Component Development](#component-development)
4. [Testing & Validation](#testing-and-validation)
5. [Creating a New Theme](#creating-a-new-theme)

---

## 🏗️ Architecture Overview

The UI Kit utilizes a **Theme-First Monorepo Architecture**. Each theme is a self-contained unit capable of overriding global components and styles while leveraging shared helpers.

### Directory Structure
```text
themes/{theme_name}/
├── package.json          # Theme dependencies
├── src/
│   ├── components/       # Theme-specific Vue 3 components
│   ├── scss/             # Theme stylesheet entry points
│   └── js/               # Theme build entry (app.js)
├── static/               # Theme-unique assets
└── views/                # Laravel Blade layout templates
```

---

## 📦 Shared vs Theme-Specific Assets

A critical aspect of our architecture is the relationship between `common` assets and the active theme.

### 1. Common Assets
Assets placed in the `common/` directory are automatically distributed to the `/dist/{theme}/` folder of **every** theme during the build process. This ensures that essential utilities (like TinyMCE editors or global fonts) are always available.

### 2. Modern vs Neo Themes
- **Modern Theme**: Built on **Tailwind CSS v4**. It prioritizes high-fidelity aesthetics, glassmorphism, and rapid layout development.
- **Neo Theme**: Built on **Bootstrap 5**. It is designed for high accessibility and legacy system compatibility.

---

## 🎨 Component Development

When creating components, adhere to the following standards:

1. **Self-Containment**: Use props for all data inputs. Avoid direct store access inside library components.
2. **Logic Sharing**: Import standard logic from `@hashtagcms/helpers` to ensure identical behavior across themes.
3. **Styling**: 
   - Components in the `Modern` theme should use utility classes exclusively.
   - Use CSS variables for tokens like `--primary-color` to allow for easy runtime adjustments.

---

## 🧪 Testing & Validation

### Unit Testing
We use **Vitest** for component logic validation. Tests are organized via workspaces.
```bash
# Test a specific theme implementation
npx vitest --project modern
```

### Visual Testing (Playground)
The Playground allows for real-time visual inspection of components across multiple themes simultaneously.
```bash
npm run playground
```

---

## 🚀 Creating a New Theme

The build system utilizes **Dynamic Discovery**. To create a new theme:

1. **Scaffold**: Duplicate the `modern` folder into a new directory (e.g. `material`).
2. **Metadata**: Update the `package.json` with your new theme name.
3. **Styles**: Modify the SCSS entry points.
4. **Register**: Add your theme to the `playground/App.vue` theme selector for visual testing.

---

## 🔗 Related Documentation

- **[Getting Started](./01-getting-started.md)**: Basic installation and usage guide.
- **[Component Catalog](./02-components.md)**: List of all available UI and functional components.
- **[API Reference](./04-api-reference.md)**: Technical overview of exported classes and methods.
