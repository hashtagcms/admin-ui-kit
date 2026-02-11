# Modern Theme - Theming Guide

This guide explains how to customize and extend the **Modern Theme** design system.

## 🏗️ Technical Foundation
The Modern Theme is built using **Tailwind CSS v4** and **Dart Sass**. It prioritizes a "premium aesthetic" with high-contrast typography, deep shadows, and subtle micro-animations.

## 🎨 Design Tokens

### Colors (Tailwind v4 Variable Mappings)
We use standard CSS variables powered by Tailwind. To customize, you can override these in `src/scss/app.scss`:

- **Primary Action**: `--color-blue-600` (Main buttons and active states)
- **Backgrounds**: `--color-gray-50` (Page body), `white` (Cards/Panels)
- **Borders**: `--color-gray-100` (Subtle dividers)
- **Typography**: 
  - `--color-gray-900` (Headings)
  - `--color-gray-500` (Subheadings/Descriptions)
  - `--color-gray-400` (Labels/Placeholders)

### Typography
- **Font Family**: "Inter", sans-serif (via Google Fonts).
- **Weight Mapping**: 
  - `font-black`: Used for Headings (tracking-tight).
  - `font-bold`: Used for interactive elements (buttons/labels).
  - `uppercase + tracking-widest`: Used for labels to provide a premium metadata feel.

## 🛠️ Performance Optimization (`@reference`)
To keep the theme output lean, all theme component styles should use the `@reference` directive:

```scss
/* packages/themes/modern/src/scss/app.scss */
@reference "tailwindcss";

.my-component {
    @apply p-4 bg-white rounded-xl shadow-lg;
}
```
**Important:** Using `@reference` ensures that Tailwind's base styles are not duplicated in the theme's output bundle, keeping it under ~15KB.

## 🧩 Component Styles
Modern components utilize specialized utility classes defined in `app.scss`:
- `.admin-form`: Large, centered form container with extreme padding.
- `.fieldset`: Outlined sections with floating legends.
- `.btn-primary`: Vibrant blue shadows (`shadow-blue-500/30`).

## 🔄 Adding New Design Tokens
If you need to add a new global utility, add it to the `@theme` block in the Tailwind entry point (if applicable) or define it as a standard CSS variable in the `:root` of `app.scss`.
