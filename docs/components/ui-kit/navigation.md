# Atomic Components - Navigation

Components for navigating between pages or grouping related content sections.

## HcTabs
Standard tabbed interface for logical sectioning of content.

### Props:
- `tabs`: Array of objects `{ id, label }`.

### Usage:
```html
<HcTabs :tabs="[ {id: 'main', label: 'Main'}, {id: 'seo', label: 'SEO'} ]" />
```

---

## HcBreadcrumbs
Navigation trail showing the current page depth.

### Props:
- `items`: Array of objects `{ label, href, icon }`.

### Usage:
```html
<HcBreadcrumbs :items="path" />
```

---

## HcPagination
Standard directional navigation for large list datasets.

### Props:
- `v-model`: Current page integration.
- `total-pages`: Total page count.

### Usage:
```html
<HcPagination v-model="page" :total-pages="10" />
```

---
[← Back to UI Kit](./README.md)
