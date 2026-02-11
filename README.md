# HashtagCms Admin UI Kit

Welcome to the official **HashtagCms Admin UI Kit** monorepo. This repository houses the core modular logic, UI components, and utility libraries that power the HashtagCms ecosystem.

## 📦 Package

Everything is bundled into a single NPM package for easier consumption.

| Package                                     | Description                                                 | Version |
| :------------------------------------------ | :---------------------------------------------------------- | :------ |
| **[`@hashtagcms/admin-ui-kit`](./packages)** | Unified Library containing Themes (Neo/Modern) and Helpers. | `1.0.9` |

_Note: The package is structured as a monorepo with specialized themes in `packages/themes` and shared logic in `packages/helpers`._

## 🚀 Getting Started

### Installation

```bash
npm install @hashtagcms/admin-ui-kit
```

### Usage

**Components & Helpers:**

```javascript
import {
  ActionBar, // Components
  AdminConfig,
  Toast, // Helpers
} from "@hashtagcms/admin-ui-kit";
```

**Styles:**

```scss
// Option 1: Modern Theme (Tailwind v4 based - Lean)
@import "~@hashtagcms/admin-ui-kit/dist/modern/admin-ui-kit.min.css";

// Option 2: Neo Theme (Bootstrap 5 based - Legacy)
@import "~@hashtagcms/admin-ui-kit/dist/neo/admin-ui-kit.min.css";

// Option 3: Source SCSS (For deep customization)
@import "~@hashtagcms/theme-modern/src/scss/app";
```

##  Documentation

Detailed guides for every part of the library:

- [**Getting Started**](./docs/01-getting-started.md): Installation, setup and usage.
- [**Components Guide**](./docs/02-components.md): Component API and examples.
- [**Helpers Guide**](./docs/03-helpers.md): Utilities and helpers documentation.
- [**API Reference**](./docs/04-api-reference.md): Technical overview of exports and architecture.
- [**Theme Development**](./docs/05-theme-guide.md): Guide for contributing to themes or creating new ones.

## 🛠️ Development


This project uses **NPM Workspaces** to manage dependencies.

- **Linting**: Ensure code quality standards are met.
- **Testing**: Run unit tests with `npm run test`.
- **Playground**: Interactive dev environment. Run `npm run playground` and visit `http://localhost:3000`.

## 🤝 Contributing

We welcome contributions! Please see our [Contribution Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

_Built with ❤️ by [HashtagCms](https://github.com/hashtagcms)._
