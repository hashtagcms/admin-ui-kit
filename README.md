# HashtagCMS Professional Packages

Welcome to the official **HashtagCMS Professional** monorepo. This repository houses the core modular logic, UI components, and utility libraries that power the HashtagCMS ecosystem.

## 📦 Package

Everything is bundled into a single NPM package for easier consumption.

| Package | Description | Version |
| :--- | :--- | :--- |
| **[`@hashtagcms/jskit`](./packages)** | Unified Library containing Components, Helpers, and Styles. | `1.0.4` |

*Note: The internals are still modular (`packages/components`, `packages/helpers`), but consumers should import from the main package.*

## 🚀 Getting Started

### Installation

```bash
npm install @hashtagcms/jskit
```

### Usage

**Components & Helpers:**
```javascript
import { 
    ActionBar,          // Components
    AdminConfig, Toast  // Helpers
} from "@hashtagcms/jskit";
```

**Styles:**
```scss
// In your app.scss (Recommended: Use Source for overrides)
@import "~@hashtagcms/jskit/packages/styles/src/app";

// Or Pre-compiled CSS
@import "~@hashtagcms/jskit/dist/hashtagcms.min.css";
```

## 🛠️ Development

This project uses **NPM Workspaces** to manage dependencies.

- **Linting**: Ensure code quality standards are met.
- **Testing**: Run unit tests for individual packages (configuration pending).

## 🤝 Contributing

We welcome contributions! Please see our [Contribution Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---
*Built with ❤️ by [Marghoob Suleman](https://github.com/marghoobsuleman).*
