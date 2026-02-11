# HashtagCMS Admin UI Kit Playground

## 🎯 What is the Playground?

The Playground is a **live demo environment** for the HashtagCMS Admin UI Kit. It allows you to:

- 🎨 **Preview all components** in different themes
- 🔄 **Switch between themes** instantly (Modern, Neo, etc.)
- 🧪 **Test components** with real-world data
- 📱 **View responsive layouts** 
- 🚀 **Develop new themes** without touching the main codebase

## 🏗️ Architecture Overview

### The Theme-Based System

The playground uses a **theme-agnostic architecture** where each theme provides its own configuration:

```
packages/themes/
├── modern/
│   ├── src/
│   │   ├── components/     ← Vue components
│   │   └── scss/           ← Styles
│   └── playground.config.js  ← Theme configuration
├── neo/
│   ├── src/
│   └── playground.config.js
└── [your-theme]/
    ├── src/
    └── playground.config.js  ← Just add this!
```

### How It Works (Step by Step)

#### 1. **Theme Discovery** 🔍

When you run `npm run playground`, the system automatically discovers all themes:

```javascript
// playground/theme-loader.js
const themeConfigModules = import.meta.glob('../packages/themes/*/playground.config.js', { eager: true });
```

This finds:
- `packages/themes/modern/playground.config.js`
- `packages/themes/neo/playground.config.js`
- `packages/themes/[any-new-theme]/playground.config.js`

#### 2. **Theme Selection** 🎨

The dropdown in the header shows all discovered themes:

```vue
<select v-model="currentTheme">
  <option value="modern">Modern (Tailwind v4)</option>
  <option value="neo">Neo (Bootstrap 5)</option>
  <!-- Auto-populated from theme configs -->
</select>
```

#### 3. **Configuration Loading** ⚙️

When you select a theme, it loads that theme's configuration:

```javascript
// App.vue
const tc = computed(() => getThemeConfig(currentTheme.value));

// tc.classes.container → 'p-8 max-w-[1600px]...' (Modern)
// tc.classes.container → 'container py-5' (Neo)
```

#### 4. **Component Rendering** 🎭

Components use the theme config for all styling:

```vue
<!-- App.vue -->
<div :class="tc.classes.container">
  <ComponentSection :config="tc" number="01" title="Title Bar">
    <TitleBar v-bind="props" />
  </ComponentSection>
</div>
```

The `ComponentSection` component reads the config:

```vue
<!-- components/ComponentSection.vue -->
<div :class="config.classes.col12">
  <div :class="config.classes.sectionHeader.wrapper">
    <span :class="config.classes.sectionHeader.number">01.</span>
    <h3 :class="config.classes.sectionHeader.title">Title Bar</h3>
  </div>
  <slot></slot>
</div>
```

#### 5. **Asset Loading** 📦

The playground dynamically loads theme assets:

```javascript
// Modern theme
await import('@hashtagcms/theme/modern/scss/app.scss');
const modern = await import('@hashtagcms/theme/modern/components/index.js');

// Neo theme
await import('@hashtagcms/theme/neo/scss/app.scss');
const neo = await import('@hashtagcms/theme/neo/components/index.js');
```

## 📂 File Structure

```
playground/
├── index.html              ← Entry HTML
├── main.js                 ← Vue app initialization
├── App.vue                 ← Main playground app
├── theme-loader.js         ← Auto-discovers themes
├── utils.js                ← Helper functions
└── components/             ← Reusable section components
    ├── InfoCards.vue
    ├── ComponentSection.vue
    ├── GridSection.vue
    ├── CardSection.vue
    ├── LeftNavSection.vue
    └── README.md
```

## 🎨 Theme Configuration

Each theme provides a `playground.config.js`:

```javascript
export default {
  name: 'modern',
  displayName: 'Modern (Tailwind v4)',
  framework: 'tailwind',
  
  classes: {
    // Layout
    container: 'p-8 max-w-[1600px] mx-auto',
    componentsRow: 'space-y-24',
    col12: 'scroll-mt-24',
    
    // Section Headers
    sectionHeader: {
      wrapper: 'flex items-center gap-3 mb-6',
      number: 'text-3xl font-black text-gray-200',
      title: 'text-lg font-black uppercase tracking-widest',
    },
    
    // Component Wrappers
    componentWrapper: {
      infoBoxes: '',  // Modern doesn't need wrapper
      sitewise: '',
    },
    
    // ... more classes
  },
  
  features: {
    showBackgroundIcon: true,
  }
}
```

## 🚀 Running the Playground

### Start the Development Server

```bash
npm run playground
```

This runs:
```bash
vite --config vite.playground.config.js
```

The playground will be available at: **http://localhost:3000**

### URL Parameters

- **Theme Selection**: `?theme=neo`
  - Example: `http://localhost:3000?theme=neo`

- **Component Jump**: `#component-id`
  - Example: `http://localhost:3000#title-bar`

## 🎯 Adding a New Theme

Want to add a new theme? It's incredibly easy!

### Step 1: Create Theme Folder

```bash
mkdir -p packages/themes/my-theme/src/{components,scss}
```

### Step 2: Create playground.config.js

```javascript
// packages/themes/my-theme/playground.config.js
export default {
  name: 'my-theme',
  displayName: 'My Awesome Theme',
  framework: 'bulma', // or whatever you're using
  
  classes: {
    container: 'container',
    componentsRow: 'section',
    col12: 'column is-12',
    
    sectionHeader: {
      wrapper: 'level',
      number: 'title is-1',
      title: 'title is-3',
    },
    
    componentWrapper: {
      infoBoxes: 'columns',
      sitewise: 'columns',
    },
    
    // ... define all required classes
  }
}
```

### Step 3: That's It! 🎉

The playground automatically discovers your theme and adds it to the dropdown!

## 🧪 Testing Components

The playground uses fake data from `tests/shared/fake-data/`:

```
tests/shared/fake-data/
├── admin-modules.txt       ← Left nav data
├── table-view.txt          ← Grid data
├── action-bar.txt          ← Action bar data
├── info-boxes.txt          ← Info boxes data
├── pagination-view.txt     ← Pagination data
├── title-bar.txt           ← Title bar data
└── site-wise.txt           ← Sitewise data
```

These files contain attribute strings that are parsed into component props:

```
title="Dashboard"
icon_css="fa fa-home"
controller_name="dashboard"
```

## 🔧 Configuration Reference

### Required Classes

Every theme config must define these classes:

```javascript
{
  container: '',           // Main container
  componentsRow: '',       // Components wrapper
  col12: '',              // Full-width column
  
  sectionHeader: {
    wrapper: '',          // Header container
    number: '',           // Section number
    title: '',            // Section title
  },
  
  componentWrapper: {
    infoBoxes: '',        // InfoBoxes wrapper
    sitewise: '',         // SitewiseData wrapper
    leftNav: '',          // LeftNav layout
    leftNavSidebar: '',   // Sidebar column
    leftNavContent: '',   // Content column
  },
  
  card: {
    wrapper: '',          // Card container
    footer: '',           // Card footer
  },
  
  infoCards: {
    wrapper: '',          // Cards container
    colWrapper: '',       // Column wrapper
    card: '',             // Card style
    cardBody: '',         // Card body
    cardBlue: '',         // Blue card
    cardBlueBody: '',     // Blue card body
    title: '',            // Card title
    titleBlue: '',        // Blue card title
    text: '',             // Card text
    textBlue: '',         // Blue card text
    badgeWrapper: '',     // Badge container
    badge: '',            // Badge style
    iconWrapper: '',      // Icon container
    iconGroup: '',        // Icon group
    icon: '',             // Icon style
    iconText: '',         // Icon text
  }
}
```

## 🎭 Component Sections

The playground uses specialized components for different layouts:

### ComponentSection
Basic wrapper for simple components:
```vue
<ComponentSection :config="tc" number="01" title="Title Bar">
  <TitleBar v-bind="props" />
</ComponentSection>
```

### GridSection
For components needing a grid wrapper:
```vue
<GridSection :config="tc" number="03" title="Info Boxes" 
  :wrapper-class="tc.classes.componentWrapper.infoBoxes">
  <InfoBoxes v-bind="props" />
</GridSection>
```

### CardSection
For components in a card with footer:
```vue
<CardSection :config="tc" number="04" title="Data Grid">
  <TabularView v-bind="props" />
  <template #footer>
    <Pagination v-bind="props" />
  </template>
</CardSection>
```

### LeftNavSection
Special two-column layout:
```vue
<LeftNavSection :config="tc" :theme-name="currentTheme" 
  number="05" title="Sidebar">
  <template #sidebar>
    <LeftNav v-bind="props" />
  </template>
</LeftNavSection>
```

## 🐛 Troubleshooting

### Theme not showing in dropdown?

1. Check `playground.config.js` exists in theme folder
2. Verify it exports a default object with `name` property
3. Restart the playground server

### Styles not loading?

1. Check theme has `src/scss/app.scss` or `src/scss/app.css`
2. Verify Vite config has theme alias
3. Check browser console for import errors

### Components not rendering?

1. Verify theme has `src/components/index.js`
2. Check all components are exported
3. Look for console errors

## 📚 Learn More

- **Theme Configs**: See `packages/themes/*/playground.config.js`
- **Components**: See `playground/components/README.md`
- **Theme Loader**: See `playground/theme-loader.js`
- **Main App**: See `playground/App.vue`

## 🎉 Benefits of This Architecture

✅ **Zero-Config Theme Addition** - Just add a folder  
✅ **No Conditional Logic** - Clean, declarative code  
✅ **Theme Isolation** - Each theme owns its config  
✅ **Auto-Discovery** - Themes appear automatically  
✅ **Scalable** - Works for 2 or 200 themes  
✅ **Maintainable** - Change once, applies everywhere  
✅ **Type-Safe Ready** - Easy to add TypeScript  

---

**Happy theming! 🎨**
