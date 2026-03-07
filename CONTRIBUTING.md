# Contributing to HashtagCMS Admin UI Kit

Thank you for your interest in contributing to the **HashtagCMS Admin UI Kit**! We strive to make contributing as straightforward as possible. This guide outlines the standard development and submission processes.

---

## 🏗️ monorepo Architecture

Our project utilizes a tiered monorepo structure to ensure high reusability across themes:

- **`packages/themes/modern`**: The premium theme built on Tailwind CSS v4.
- **`packages/themes/neo`**: The legacy-compatible theme built on Bootstrap 5.
- **`packages/helpers`**: Shared business logic, state management, and utility classes used by all themes.
- **`tests/shared`**: Centralized mock data and testing utilities.

---

## 🛠️ How to Contribute

### 1. Environment Setup
- **Node.js**: 18.x or 20.x (LTS recommended).
- **Initialization**:
  ```bash
  npm install
  ```

### 2. Development Workflow
Fixes and features should be implemented in the appropriate package:
- **Visual Changes**: If restricted to a specific look-and-feel, edit the corresponding `packages/themes/{theme}/src/` directory.
- **Logic Enhancements**: If the change affects component behavior or API interaction, apply the fix in `packages/helpers/`.

### 3. Visual Validation
We provide an interactive **Playground** for real-time development.
```bash
npm run playground
```
> [!TIP]
> Use the theme switcher in the playground header to verify that your changes render correctly in both Neo and Modern environments.

### 4. Testing Requirements
We utilize **Vitest Projects** for high-performance, independent test suites.
```bash
# Run all theme test projects
npm run test

# Run tests for a specific theme implementation
npx vitest --project modern
```
**Important**: Every new component or logic change **must** include corresponding unit tests. Utilize the shared mock data in `tests/shared/fake-data/` to ensure consistent hydration.

---

## 📜 Coding Standards

- **Component Naming**: Use PascalCase for all Vue components (e.g., `TabularView.vue`).
- **Styling Standards**:
  - **Modern Theme**: Strictly utilize Tailwind v4 utility classes. avoid ad-hoc CSS.
  - **Neo Theme**: Adhere to standard Bootstrap 5 container and grid classes.
- **Documentation**: New features or breaking changes require updates to the relevant Markdown files in the `docs/` directory.

---

## 🚀 Submission Process

1. **Branching**: `git checkout -b feat/your-feature-name` (or `fix/`).
2. **Quality Check**: Run `npm run test` and `npm run build` locally.
3. **Commit**: Ensure commit messages are clear and follow standard conventions.
4. **Pull Request**: Open a PR against the `main` branch. Provide a brief summary of the impact of your changes.

---
*For more technical details, consult our [Theme Development Guide](./docs/05-theme-guide.md).*
