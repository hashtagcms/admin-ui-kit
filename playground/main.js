import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';

// Mock window.Laravel
window.Laravel = {
  htcmsAdminConfig: (key) => null,
  csrfToken: 'test-token'
};

import globalSiteData from '../tests/shared/fake-data/global-site.json';

// Mock global axios for playground
window.axios = {
  get: (url) => {
    console.log('GET', url);
    if (url.includes('site/getSitesForUsers')) {
      return Promise.resolve({ data: globalSiteData });
    }
    if (url.includes('ajax/setSiteId')) {
      return Promise.resolve({ data: { success: true } });
    }
    return Promise.resolve({ data: [] });
  },
  post: (url, data) => {
    console.log('POST', url, data);
    return Promise.resolve({ data: { success: true } });
  }
};

const app = createApp(App);
app.use(router);
app.mount('#app');
