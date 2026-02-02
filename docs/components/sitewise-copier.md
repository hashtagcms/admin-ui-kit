# Sitewise Copier Component

The `SitewiseCopier` component allows users to copy data and settings from one site (platform/language) to another. It typically fetches source and destination options via API and handles the copy operation.

## Usage

```html
<sitewise-copier
  :data-title="title"
  :data-label="label"
  :data-submit-label="submitLabel"
  :data-api-url="apiUrl"
/>
```

## Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `dataTitle` | `String` | Title of the copier section. |
| `dataLabel` | `String` | Label for the selection input. |
| `dataSubmitLabel` | `String` | Text for the submit button. |
| `dataApiUrl` | `String` | API endpoint to fetch comparison data or copy targets. |

## Behavior

1.  **Loading**: Fetches available copy options on mount.
2.  **Selection**: User selects target site/language.
3.  **Action**: Triggers API call to perform the copy.
4.  **Feedback**: Displays toast messages on success/failure.

## Events

This component primarily interacts via internal API calls and Global Toast notifications.
