# Atomic Components - Data & Layout

Components for presenting information and managing the structural visual hierarchy.

## HcCard
A fundamental white-space container for grouping content and actions.

### Props:
- `title`: Header text.
- `subtitle`: Small descriptive text.
- `shadow`: Shadow size (`none`, `sm`, `md`, `lg`, `xl`). Default: `md`.
- `rounded`: Border radius (`none`, `sm`, `md`, `lg`, `xl`, `2xl`). Default: `lg`.
- `p`: Padding class. Overrides `px` and `py` if set (e.g., `p-0`).
- `px`: Horizontal padding class. Default: `px-6`.
- `py`: Vertical padding class. Default: `py-5`.
- `noBorder`: Boolean. If true, removes the border.

### Usage:
```html
<HcCard title="Site Usage" subtitle="Daily stats" shadow="lg" px="px-4" py="py-2">
  <!-- Content -->
</HcCard>
```

---

## HcTable
A lightweight, styled table component for simple data sets.

### Props:
- `headers`: Array of strings for header labels.

### Usage:
```html
<HcTable :headers="['ID', 'Name']">
  <tr>
    <td class="px-6 py-4">01</td>
    <td class="px-6 py-4">Admin</td>
  </tr>
</HcTable>
```

---

## HcStatCard
A specialized card for displaying high-level dashboard metrics.

### Props:
- `title`: Metric label.
- `value`: Numerical or text value.
- `trend`: Change percentage (e.g., "+10%").
- `variant`: `primary`, `success`, `danger`, etc.

### Usage:
```html
<HcStatCard title="Total Orders" value="450" trend="+12%" variant="success" />
```

---

## HcPlaceholder (Skeletons)
Loading placeholders used to maintain layout stability during data fetches.

### Props:
- `width`: Tailwind width class.
- `height`: Tailwind height class.

### Usage:
```html
<HcPlaceholder width="w-full" height="h-24" />
<HcPlaceholder width="w-1/2" height="h-4" class="mt-4" />
```

---
[← Back to UI Kit](./README.md)
