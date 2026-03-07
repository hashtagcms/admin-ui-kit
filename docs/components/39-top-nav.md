# TopNav

The global application header. Beyond branding and navigation, it acts as a security monitor for the user's active session.

## 🚀 Import

```javascript
import { TopNav } from "@hashtagcms/admin-ui-kit/themes/modern/components";
```

## 🛠 Props

| Prop                   | Type             | Description                                                     |
| :--------------------- | :--------------- | :-------------------------------------------------------------- |
| `dataUsername`         | `String`         | Display name of the logged-in user.                             |
| `dataSiteName`         | `String`         | Brand name to show in the logo area.                            |
| `dataLogo`             | `String`         | URL path to the logo image.                                     |
| `dataIsAdmin`          | `Boolean\|String`| Passed to the site selector to determine access levels.         |

## ⚙️ Features
- **Session Heartbeat**: Every 60 seconds, it sends a request to the `heartbeat` endpoint. 
- **Auto-Expiry Indicator**: If the heartbeat returns a `401` or `419` error (session expired), the status pill turns red and displays "Session Expired".
- **Global Site Selector**: Renders the `GlobalSiteButton` to allow cross-site navigation.
- **Secure Logout**: Triggers the standard `/logout` form submission.

## 📝 Usage Example

```html
<top-nav 
  data-username="Admin" 
  data-site-name="My CMS" 
  data-is-admin="true" 
/>
```
