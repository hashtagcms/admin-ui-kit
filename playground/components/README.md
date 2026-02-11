# Playground Components

This directory contains reusable, theme-agnostic components for the HashtagCMS Admin UI Kit playground.

## Components

### 1. **InfoCards.vue**
Renders the welcome section with two cards:
- Component Suite card (lists all available components)
- Environment card (shows tech stack badges)

**Props:**
- `config` - Theme configuration object
- `themeName` - Current theme name ('modern', 'neo', etc.)
- `views` - Array of available view definitions

---

### 2. **ComponentSection.vue**
Basic section wrapper for simple components that don't need special layout.

**Props:**
- `config` - Theme configuration object
- `number` - Section number (e.g., "01", "02")
- `title` - Section title

**Usage:**
```vue
<ComponentSection :config="tc" number="01" title="Title Bar">
  <TitleBar v-bind="props" />
</ComponentSection>
```

---

### 3. **GridSection.vue**
Section wrapper for components that need a grid container (Bootstrap row).

**Props:**
- `config` - Theme configuration object
- `number` - Section number
- `title` - Section title
- `wrapperClass` - CSS class for the grid wrapper

**Usage:**
```vue
<GridSection :config="tc" number="03" title="Info Boxes" :wrapper-class="tc.classes.componentWrapper.infoBoxes">
  <InfoBoxes v-bind="props" />
</GridSection>
```

---

### 4. **CardSection.vue**
Section wrapper for components that need a card with optional footer.

**Props:**
- `config` - Theme configuration object
- `number` - Section number
- `title` - Section title

**Slots:**
- `default` - Main content
- `footer` - Optional footer content (e.g., pagination)

**Usage:**
```vue
<CardSection :config="tc" number="04" title="Data Grid">
  <TabularView v-bind="props" />
  <template #footer>
    <Pagination v-bind="paginationProps" />
  </template>
</CardSection>
```

---

### 5. **LeftNavSection.vue**
Special two-column layout for sidebar navigation demo.

**Props:**
- `config` - Theme configuration object
- `themeName` - Current theme name
- `number` - Section number
- `title` - Section title

**Slots:**
- `sidebar` - Sidebar navigation component

**Usage:**
```vue
<LeftNavSection :config="tc" :theme-name="currentTheme" number="05" title="Sidebar">
  <template #sidebar>
    <LeftNav v-bind="props" />
  </template>
</LeftNavSection>
```

---

### 6. **SectionHeader.vue** *(Deprecated - use ComponentSection instead)*
Simple section header component. Kept for backward compatibility.

---

## Architecture Benefits

✅ **Theme-Agnostic**: All styling comes from theme config  
✅ **Reusable**: DRY principle - no repeated code  
✅ **Maintainable**: Change once, applies everywhere  
✅ **Scalable**: Easy to add new section types  
✅ **Type-Safe**: Can add TypeScript types for props  

## Adding a New Section Type

1. Create a new component in this directory
2. Accept `config` prop for theme classes
3. Use `config.classes.*` for all styling
4. Export from `index.js`
5. Import and use in `App.vue`

Example:
```vue
<template>
  <div :class="config.classes.col12">
    <div :class="config.classes.sectionHeader.wrapper">
      <!-- Your custom layout -->
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  config: { type: Object, required: true },
  // ... other props
});
</script>
```
