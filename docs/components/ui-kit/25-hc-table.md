# HcTable

A layout component for displaying data in a structured, tabular format. It focuses on clean typography and spacing for maximum readability.

## 🚀 Import

```javascript
import { HcTable } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop      | Type    | Default | Description                                         |
| :-------- | :------ | :------ | :-------------------------------------------------- |
| `headers` | `Array` | `[]`    | Array of strings representing column titles.        |
| `ui`      | `Object`| See API | Theme-specific configuration for Tailwind classes.  |

## 📦 Slots

| Slot Name | Description                                           |
| :-------- | :---------------------------------------------------- |
| `default` | The collection of table rows (`<tr>`) and cells (`<td>`).|

## 📝 Usage Example

```html
<hc-table :headers="['Name', 'Email', 'Role', 'Status']">
  <tr v-for="user in users" :key="user.id">
    <td>{{ user.name }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.role }}</td>
    <td>
      <hc-badge :variant="user.active ? 'success' : 'gray'">
        {{ user.active ? 'Active' : 'Inactive' }}
      </hc-badge>
    </td>
  </tr>
</hc-table>
```

## 🎨 Customization (UI Object)

Supported keys: `wrapper`, `table`, `thead`, `headerRow`, `headerCell`, `tbody`.
