# HashtagCMS Professional Packages

Welcome to the official **HashtagCMS Professional** monorepo. This repository houses the core modular logic, UI components, and utility libraries that power the HashtagCMS ecosystem.

## 📦 Package

Everything is bundled into a single NPM package for easier consumption.

| Package                               | Description                                                 | Version |
| :------------------------------------ | :---------------------------------------------------------- | :------ |
| **[`@hashtagcms/jskit`](./packages)** | Unified Library containing Components, Helpers, and Styles. | `1.0.4` |

_Note: The internals are still modular (`packages/components`, `packages/helpers`), but consumers should import from the main package._

## 🚀 Getting Started

### Installation

```bash
npm install @hashtagcms/jskit
```

### Usage

**Components & Helpers:**

```javascript
import {
  ActionBar, // Components
  AdminConfig,
  Toast, // Helpers
} from "@hashtagcms/jskit";
```

**Styles:**

```scss
// In your app.scss (Recommended: Use Source for overrides)
// Your own variables for themes
@import "./variables"; 

// Bootstrap (if needed by your local overrides, otherwise package might include it or expect it)
@import "~bootstrap/scss/bootstrap";

// Import HashtagCMS JS Kit Styles (Source)
@import "~@hashtagcms/jskit/packages/styles/src/app";


// Or Pre-compiled CSS
@import "~@hashtagcms/jskit/dist/hashtagcms.min.css";
```

##  Documentation

Detailed guides for every part of the library:

- [**Integration Guide**](./docs/INTEGRATION_GUIDE.md): Setup and framework integration.
- [**Components Guide**](./docs/COMPONENTS_GUIDE.md): Component API and examples.
- [**Helpers Guide**](./docs/HELPERS_GUIDE.md): Utilities and helpers documentation.
- [**Styles Guide**](./docs/STYLES_GUIDE.md): Customization and SCSS variables.

## 🛠️ Development


This project uses **NPM Workspaces** to manage dependencies.

- **Linting**: Ensure code quality standards are met.
- **Testing**: Run unit tests for individual packages (configuration pending).

## 🤝 Contributing

We welcome contributions! Please see our [Contribution Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

_Built with ❤️ by [HashtagCMS](https://github.com/hashtagcms)._
