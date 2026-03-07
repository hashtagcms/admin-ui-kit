# HcStatCard

A specialized card component designed to highlight key performance indicators (KPIs) and metrics, complete with trend indicators and icons.

## 🚀 Import

```javascript
import { HcStatCard } from "@hashtagcms/admin-ui-kit/common/js/ui-kit";
```

## 🛠 Props

| Prop             | Type             | Default   | Description                                                           |
| :--------------- | :--------------- | :-------- | :-------------------------------------------------------------------- |
| `title`          | `String`         | -         | **Required.** The metric label (e.g., "Total Users").                |
| `value`          | `String\|Number` | -         | **Required.** The metric value (e.g., "12.4k").                       |
| `icon`           | `String`         | `''`      | Icon class to display (e.g., `fa fa-users`).                         |
| `trend`          | `String\|Number` | `''`      | Percentage value for the trend (e.g., "12.5").                        |
| `trendDirection` | `String`         | `up`      | The direction of the trend (`up`, `down`, `neutral`).                |
| `trendText`      | `String`         | `''`      | Descriptor text (e.g., "vs last week"). Defaults to "vs last month". |
| `variant`        | `String`         | `primary` | Color variant used for the icon background.                           |
| `ui`             | `Object`         | See API   | Theme-specific configuration for Tailwind classes.                    |

## 📝 Usage Example

```html
<hc-stat-card 
  title="New Subscribers" 
  value="1,284" 
  icon="fa fa-user-plus" 
  trend="14.2" 
  trendDirection="up" 
  variant="success" 
  trendText="this week"
/>
```

## 🎨 Customization (UI Object)

Supported keys: `wrapper`, `contentContainer`, `title`, `value`, `iconWrapper`, `iconSize`, `trendContainer`, `trendBadge`, `trendText`, `iconBgs`, `trends`, `trendIcons`.
