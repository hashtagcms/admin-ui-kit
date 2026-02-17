# Atomic Components - Forms

Standardized form elements with built-in label and hint support, optimized for field alignment.

## HcInput
Standard text input field.

### Props:
- `label`: Field label.
- `hint`: Small helper text below the input.
- `variant`: `success`, `danger` (for validation states).
- `type`: `text`, `password`, `email`, etc.

### Usage:
```html
<HcInput v-model="val" label="Post Title" hint="Required field" />
```

---

## HcSelect
Dropdown selection component.

### Props:
- `options`: Array of objects `{ label, value }`.
- `label`: Field label.

### Usage:
```html
<HcSelect v-model="val" :options="categories" label="Category" />
```

---

## HcCheckbox
Toggle a single boolean state or multiple choices.

### Usage:
```html
<HcCheckbox v-model="val" label="Enabled" />
```

---

## HcSwitch
A modern toggle switch, typically used for binary settings.

### Usage:
```html
<HcSwitch v-model="val" label="Enable Notifications" />
```

---

## HcRadioGroup
A group of radio buttons for mutually exclusive selections.

### Props:
- `options`: Array of objects `{ label, value }`.
- `is-stacked`: Boolean (vertical vs horizontal layout).

### Usage:
```html
<HcRadioGroup v-model="val" :options="roles" label="User Role" />
```

---

## HcFileUpload
Drag-and-drop file uploader with preview support.

### Usage:
```html
<HcFileUpload @upload="handleUpload" />
```

---
[← Back to UI Kit](./README.md)
