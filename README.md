# HashtagCms Admin UI Kit

Welcome to the official **HashtagCms Admin UI Kit** monorepo. This repository houses the core modular logic, UI components, and utility libraries that power the HashtagCms ecosystem.

## 📦 Package

Everything is bundled into a single NPM package for easier consumption.

| Package                                     | Description                                                 | Version |
| :------------------------------------------ | :---------------------------------------------------------- | :------ |
| **[`@hashtagcms/admin-ui-kit`](./packages)** | Unified Library containing Components, Helpers, and Styles. | `1.0.7` |

_Note: The internals are still modular (`packages/components`, `packages/helpers`), but consumers should import from the main package._

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
// In your app.scss (Recommended: Use Source for overrides)
// Your own variables for themes
@import "./variables"; 

// Bootstrap (if needed by your local overrides, otherwise package might include it or expect it)
@import "~bootstrap/scss/bootstrap";

// Import HashtagCms Admin UI Kit Styles (Source)
// Note: Requires Sass loader configuration
@import "~@hashtagcms/styles/src/app";


// Or Pre-compiled CSS (Easiest)
// Must be imported if you are not using the source SCSS
@import "~@hashtagcms/admin-ui-kit/dist/admin-ui-kit.min.css";
```

##  Documentation

Detailed guides for every part of the library:

- [**Getting Started**](./docs/01-getting-started.md): Installation, setup and usage.
- [**Components Guide**](./docs/02-components.md): Component API and examples.
- [**Helpers Guide**](./docs/03-helpers.md): Utilities and helpers documentation.
- [**API Reference**](./docs/04-api-reference.md): Technical overview of exports and architecture.

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
