# Atomic Components - Overlays

Components that appear on top of the main UI or handle complex contextual interactions.

## HcModal
Standard dialog overlay with slots for header, body, and footer.

### Props:
- `v-model`: Boolean controlling visibility.
- `title`: Modal header.
- `size`: `sm`, `md`, `lg`, `xl`.

### Usage:
```html
<HcModal v-model="show" title="Confirm Action">
  <p>Are you sure?</p>
  <template #footer>
    <HcButton variant="danger">Delete</HcButton>
  </template>
</HcModal>
```

---

## HcDrawer
Slide-out panel from the right edge, ideal for complex filter settings or details.

### Usage:
```html
<HcDrawer v-model="show" title="Global Filters">
  <!-- Content -->
</HcDrawer>
```

---

## HcTooltip
Small text snippet that appears on hover.

### Props:
- `text`: Tooltip content.
- `position`: `top`, `bottom`, `left`, `right`.

### Usage:
```html
<HcTooltip text="Edit Record" position="top">
  <HcButton icon="fa fa-pencil-alt" />
</HcTooltip>
```

---

## HcPopover
Rich content overlay triggered on click.

### Usage:
```html
<HcPopover title="Quick Help">
  <HcButton>Info</HcButton>
  <template #content>
    <p>Detailed explanation or guide goes here...</p>
  </template>
</HcPopover>
```

---

## HcDropdown
Customizable menu or selection list with support for icons and variants.

### Props:
- `items`: Array of objects `{ label, icon, variant, onClick }`.

### Usage:
```html
<HcDropdown :items="menuItems" />
```

---
[← Back to UI Kit](./README.md)
