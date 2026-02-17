# Atomic Components - Feedback

Components to provide visual status, loading states, and updates to the user.

## HcAlert
Inline notification message with support for titles and icons.

### Props:
- `variant`: `info`, `success`, `warning`, `danger`.
- `title`: Optional bold header.
- `dismissible`: Boolean.

### Usage:
```html
<HcAlert variant="success" title="Success!" dismissible>
  Your settings have been saved.
</HcAlert>
```

---

## HcToast
Temporary floating notification. Best used via a global toaster service.

### Props:
- `title`: Header text (required).
- `message`: Body text (required).
- `variant`: `success`, `error`, `warning`, `info`.
- `duration`: Timeout in ms (default `5000`). Set to `0` for infinite.
- `offset`: Top position offset in px (default `32`).

### Usage:
```html
<HcToast title="Update" message="Syncing..." variant="info" :duration="3000" />
```

---

## HcSpinner
Standardized loading indicator.

### Props:
- `size`: `xs`, `sm`, `md`, `lg`.
- `color`: `primary`, `success`, etc.

### Usage:
```html
<HcSpinner size="md" color="primary" />
```

---

## HcProgress
Progress bar with percentage and labeling options.

### Props:
- `percentage`: Number (0-100).
- `show-label`: Boolean.
- `variant`: `primary`, `success`, `danger`.

### Usage:
```html
<HcProgress :percentage="75" show-label label="System Health" />
```

---

## HcBadgeContainer
A wrapper that adds a notification badge to any child element (best for Bell/Message icons).

### Props:
- `count`: Number to display.
- `max-count`: Max number before showing "99+".

### Usage:
```html
<HcBadgeContainer count="5">
  <i class="fa fa-bell"></i>
</HcBadgeContainer>
```

---
[← Back to UI Kit](./README.md)
