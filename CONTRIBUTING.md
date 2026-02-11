# Contributing to HashtagCms Admin UI Kit

Thank you for your interest in contributing to the **HashtagCms Admin UI Kit**! We want to make it as easy as possible to contribute to this project.

## 🏗️ Monorepo Architecture

This project is a monorepo organized by **themes** and **shared helpers**. 

- `packages/themes/neo`: The legacy Bootstrap 5 theme.
- `packages/themes/modern`: The premium Tailwind v4 theme.
- `packages/helpers`: Shared business logic and utilities used by all themes.
- `tests/shared`: Centralized mock data and testing utilities.

---

## 🛠️ How to Contribute

### 1. Preparation
- Ensure you have **Node.js 18+** installed.
- Initialize the project:
  ```bash
  npm install
  ```

### 2. Developing Themes
If you are adding components or fixing styles:
- **Neo (Bootstrap)**: Changes go into `packages/themes/neo/src/`.
- **Modern (Tailwind)**: Changes go into `packages/themes/modern/src/`.
- **Shared Logic**: If a logic fix applies to BOTH themes, edit `packages/helpers/`.

### 3. Visual Verification (Playground)
We use an interactive playground for real-time development.
```bash
npm run playground
```
Use the theme switcher in the playground to verify your changes across both Neo and Modern.

### 4. Testing Your Changes
We use **Vitest Projects** to run independent tests for each theme.
```bash
# Run everything
npm run test

# Run a specific theme's tests
npx vitest --project neo
npx vitest --project modern
```
**Important**: All new components MUST have a `.spec.js` file and utilize the shared mock data in `tests/shared/fake-data/`.

---

## 📜 Coding Standards

- **Component Naming**: Use PascalCase for Vue components (e.g., `ActionBar.vue`).
- **Styling**: 
  - Do not use inline styles.
  - In `modern`, strictly use Tailwind v4 utility classes.
  - In `neo`, use standard Bootstrap 5 utility classes.
- **Documentation**: If you create a new theme or a significant helper, update the corresponding file in the `docs/` folder.

## 🚀 Submission Process

1. **Create a Branch**: `git checkout -b feat/your-feature-name`.
2. **Commit Changes**: Use clear, descriptive commit messages.
3. **Verify Integrity**: Run `npm run test` and `npm run build` to ensure no regressions.
4. **Pull Request**: Open a PR against the `main` branch.

Detailed instructions for theme development can be found in our **[Theme Development Guide](./docs/05-theme-guide.md)**.

---

Happy Coding! 🚀
