# HcTabs

A polished tab component for organizing content into separate views that are accessible via a list of navigation buttons. It features smooth scrolling into view for active tabs.

## 🚀 Import

```javascript
import { HcTabs } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop         | Type     | Default | Description                                                     |
| :----------- | :------- | :------ | :-------------------------------------------------------------- |
| `tabs`       | `Array`  | -       | **Required.** Array of objects: `[{ id, label, content }]`.     |
| `initialTab` | `String` | `''`    | The ID of the tab to be active by default. Defaults to first.   |
| `ui`         | `Object` | See API | Theme-specific configuration for Tailwind classes.              |

## 📦 Slots

| Slot Name | Description                                           |
| :-------- | :---------------------------------------------------- |
| `[tab.id]`| Dynamic slot for custom content, keyed by the tab ID. |

## 📝 Usage Example

```html
<hc-tabs 
  :tabs="[
    { id: 'info', label: 'General Info' },
    { id: 'settings', label: 'Advanced Settings' }
  ]"
  initialTab="info"
>
  <template #info>
    <div class="p-4">
      <h3>Basic Information</h3>
      <p>Configure the core details here.</p>
    </div>
  </template>

  <template #settings>
    <div class="p-4">
      <h3>System Settings</h3>
      <p>Fine-tune the application behavior.</p>
    </div>
  </template>
</hc-tabs>
```

## 🎨 Customization (UI Object)

Supported keys: `wrapper`, `headerContainer`, `tabList`, `tabItem`, `tabButton`, `activeTab`, `inactiveTab`, `contentContainer`, `contentPanel`.
