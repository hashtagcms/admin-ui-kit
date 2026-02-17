# Atomic Components - General

Foundational elements for actions and identity.

## HcButton
The standard action component with support for multiple variants, sizes, and icon placement.

### Props:
- `variant`: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `dark`, `light`.
- `size`: `xs`, `sm`, `md`, `lg`.
- `outline`: Boolean.
- `rounded`: `none`, `sm`, `md`, `lg`, `xl`, `full`.

### Usage:
```html
<HcButton variant="primary" size="md">Save Changes</HcButton>
<HcButton variant="secondary" outline>Cancel</HcButton>
```

---

## HcButtonGroup
Wraps multiple buttons into a cohesive group.

### Usage:
```html
<HcButtonGroup>
  <HcButton variant="secondary">Left</HcButton>
  <HcButton variant="secondary">Middle</HcButton>
  <HcButton variant="secondary">Right</HcButton>
</HcButtonGroup>
```

---

## HcBadge
Small status indicators or counters.

### Props:
- `variant`: `primary`, `secondary`, `success`, `danger`, etc.
- `pill`: Boolean (rounded corners).

### Usage:
```html
<HcBadge variant="success">Active</HcBadge>
<HcBadge variant="danger" pill>Inactive</HcBadge>
```

---

## HcAvatar
User profile representation with support for images, initials, and status indicators.

### Props:
- `src`: Image URL.
- `name`: User name (for initials fallback).
- `size`: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`.
- `status`: `online`, `away`, `busy`, `offline`.

### Usage:
```html
<HcAvatar name="Marghoob Suleman" status="online" size="md" />
```

---
[← Back to UI Kit](./README.md)
