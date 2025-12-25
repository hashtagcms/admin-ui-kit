# HashtagCMS Professional Packages

Welcome to the official **HashtagCMS Professional** monorepo. This repository houses the core modular logic, UI components, and utility libraries that power the HashtagCMS ecosystem.

## 📦 Packages

This monorepo is organized into the following scoped packages:

| Package | Description | Version |
| :--- | :--- | :--- |
| **[`@hashtagcms/components`](./packages/components)** | A cohesive collection of Vue.js components for building HashtagCMS admin interfaces. [Read Guide](./docs/COMPONENTS_GUIDE.md) | `1.0.0` |
| **[`@hashtagcms/helpers`](./packages/helpers)** | Essential JavaScript utilities, form handlers, and API wrappers used across the system. [Read Guide](./docs/HELPERS_GUIDE.md) | `1.0.0` |
| **[`@hashtagcms/styles`](./packages/styles)** | The core SASS/CSS design system, including variables, mixins, and theme definitions. [Read Guide](./docs/STYLES_GUIDE.md) | `1.0.0` |

## 🚀 Getting Started

These packages are designed to be consumed within the HashtagCMS ecosystem or other Vue.js based projects.

### Installation

For development, you can clone this repository and use `npm` workspaces.

```bash
git clone https://github.com/marghoobsuleman/cms-js-kit.git
cd cms-js-kit
npm install
```

### Usage

Each package can be imported individually.

**Components:**
```javascript
import ActionBar from "@hashtagcms/components/action-bar";
import { ToastBox } from "@hashtagcms/components/library";
```

**Helpers:**
```javascript
import { Toast } from "@hashtagcms/helpers/common";
import AdminConfig from "@hashtagcms/helpers/admin-config";
```

**Styles:**
```scss
// In your main SCSS file
@import "@hashtagcms/styles/app";
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
