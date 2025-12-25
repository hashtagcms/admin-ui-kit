# Loader Component

**Package:** `@hashtagcms/components`
**Source:** `packages/components/src/library/loader.vue`

A global loading spinner overlay used to block user interaction during async operations.

## 🚀 Import

```javascript
import { Loader } from "@hashtagcms/components/library";
// or
import Loader from "@hashtagcms/components/library/loader";
```

## 🛠 Usage

This component is usually controlled via the `Loader` helper via `@hashtagcms/helpers`.

```javascript
import { Loader } from "@hashtagcms/helpers/common";

// Show
Loader.show(this, "Please wait...");

// Hide
Loader.hide(this);
```

You need to place `<loader></loader>` once in your main `App.vue` or layout.
