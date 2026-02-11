# TabView Component

**Package:** `@hashtagcms/theme/modern` & `@hashtagcms/theme/neo`
**Source:** `packages/themes/[theme]/src/components/tab-view.vue`

`TabView` (registered as `<tab-view>`) is a flexible navigation component used to switch between different sections or views. It supports simple string arrays, object-based data with custom `href` links, and legacy ID-based matching.

## 🚀 Import

```javascript
import { TabView } from "@hashtagcms/theme/modern";
// or
import { TabView } from "@hashtagcms/theme/neo";
```

## 🛠 Props

| Prop               | Type            | Description                                                                                             |
| :----------------- | :-------------- | :------------------------------------------------------------------------------------------------------ |
| `data-tabs`        | `Array/String`  | **Required.** An array of tabs (strings or objects) or a JSON string representing the array.          |
| `data-active-tab`  | `String/Object` | The currently active tab. Can be a string (matching label or ID) or a tab object.                     |
| `data-base-url`    | `String`        | (Optional) Base URL used to generate fallback `href` links if no custom `href` is provided in tab objects. |

## ⚙️ Tab Data Formats

### 1. Simple String Arrays
Ideal for basic navigation where logic is handled by events.
```javascript
['General', 'Advanced', 'Security']
```

### 2. Object Arrays (Recommended)
Allows for custom links and unique identifiers.
```javascript
[
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Settings', id: 'settings_tab' }
]
```

## 📝 Usage Example (Blade)

```blade
<tab-view 
  data-tabs='[{"label":"General","href":"/admin/general"},{"label":"Security","href":"/admin/security"}]'
  data-active-tab="General"
></tab-view>
```

## ✨ Features & Events

- **Automatic JSON Parsing**: Automatically parses `data-tabs` if passed as a string from Blade.
- **Flexible Matching**: The active tab can be matched by exact label, ID, or a normalized version of the label (lowercase, no spaces).
- **Tab Change Event**: Emits a `tab-change` event when a tab is clicked, passing the selected tab object/string.
- **Accessibility**: Implements proper ARIA roles (`tablist`, `tab`) and selection attributes.
- **Theme Consistency**: Automatically adapts its styling based on the active theme (Tailwind for Modern, Bootstrap for Neo).

## 🧪 Testing
The component is verified via Vitest in `packages/themes/[theme]/tests/components/TabView.spec.js` and can be visually inspected in the playground.
