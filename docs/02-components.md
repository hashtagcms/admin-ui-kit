# Components

The HashtagCMS Admin UI Kit provides a tiered component library. This page categorizes the available components by their functional role.

## 🏁 Core Layout & Navigation

These components form the backbone of the administrative interface.

- **[ActionBar](./components/01-action-bar.md)**: The primary toolbar for module listings.
- **[TitleBar](./components/37-title-bar.md)**: Header component with title and breadcrumb support.
- **[TopNav](./components/39-top-nav.md)**: Global header featuring session monitoring and site switching.
- **[LeftNav](./components/19-left-nav.md)**: Main sidebar navigation system.
- **[TabularView](./components/35-tabular-view.md)**: The core data grid engine supporting Table and Grid layouts.
- **[TabView](./components/34-tab-view.md)**: Horizontal navigation tabs with URL synchronization.
- **[Pagination](./components/25-pagination.md)**: Integrated results counter and page controls.

## 💎 Atomic UI Kit (HcKit)

For granular design and custom forms, use the **HcKit** suite. These components are highly reusable and theme-agnostic.

- **[Complete UI Kit Catalog](./components/ui-kit/README.md)**: Detailed documentation for buttons, inputs, modals, and more.
- **Quick Links**: [HcButton](./components/ui-kit/07-hc-button.md), [HcInput](./components/ui-kit/14-hc-input.md), [HcModal](./components/ui-kit/15-hc-modal.md).

## ⚙️ Module & CMS Management

Advanced tools for managing CMS structure and permissions.

- **[Homepage](./components/10-homepage.md)**: Dashboard editor with drag-and-drop module layout.
- **[ModuleCreator](./components/23-module-creator.md)**: Tool for generating backend logic and listing schemas.
- **[FrontendModuleCreator](./components/08-frontend-module-creator.md)**: Configure frontend display modules.
- **[ModulePermission](./components/24-module-permission.md)**: Fine-grained access control interface.
- **[Sorter](./components/32-sorter.md)**: Simple vertical drag-and-drop sorting.
- **[CmsModuleDropdown](./components/04-cms-module-dropdown.md)**: Context-aware quick navigator.

## 🌍 Site & Context Tools

Components tailored for multi-site and multi-language environments.

- **[GlobalSiteButton](./components/09-global-site-button.md)**: Global context switcher for admins.
- **[SiteCloner](./components/29-site-cloner.md)**: Full-site mirroring and migration utility.
- **[SitewiseCopier](./components/30-sitewise-copier.md)**: Granular resource copying between sites.
- **[LanguageCopier](./components/17-language-copier.md)**: Duplication tool for translation workflows.

## 🖼️ Media & Search

- **[FileUploader](./components/07-file-uploader.md)**: Drag-and-drop file management.
- **[ImageGallery](./components/12-image-gallery.md)**: Modal-based media library explorer.
- **[SearchBar](./components/27-search-bar.md)**: Advanced filtering engine with custom operators.

## 🛠 Library Utilities

Generic helper components for common UI patterns.

- **[Loader](./components/library/04-loader.md)**: Global loading overlay.
- **[ToastBox](./components/library/08-toast-box.md)**: Stacked notification management.
- **[ModalBox](./components/library/05-modal-box.md)**: Standardized dialog wrapper.
- **[CopyPaste](./components/library/01-copy-paste.md)**: Clipboard helper for configuration data.
- **[TimerButton](./components/library/07-timer-button.md)**: Countdown button with auto-redirect.

---

## 🔗 Next Steps

Learn how to leverage our logic helpers to manage your application data:

- **[Helper Utilities](./03-helpers.md)**: Documentation for the `Form`, `AdminConfig`, and `EventBus` classes.
- **[API Reference](./04-api-reference.md)**: Technical details on package exports and utility functions.
