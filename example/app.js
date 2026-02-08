// Import Vue 3 (Assuming you are using a bundler like Webpack or Vite)
import { createApp } from "vue";

// Import components and styles from HashtagCms Kit
// Make sure you have installed the package: npm install @hashtagcms/admin-ui-kit
import { ActionBar, TabularView, Pagination } from "@hashtagcms/admin-ui-kit";

// Import Styles (or you can import SCSS in your style file)
import "@hashtagcms/admin-ui-kit/packages/styles/src/app.scss";
// OR import pre-built CSS if you are not using SASS
// import "@hashtagcms/admin-ui-kit/dist/admin-ui-kit.min.css";

// Example App Logic
const app = createApp({
  data() {
    return {
      message: "Hello HashtagCms!",
    };
  },
  methods: {
    handleAction(action) {
      console.log("Action triggered:", action);
    },
  },
});

// Register Components Globally
app.component("action-bar", ActionBar);
app.component("tabular-view", TabularView);
app.component("pagination", Pagination);

// Mount the app
app.mount("#app");
