import { createApp } from 'vue';
import App from './App.vue';
import '../dist/admin-ui-kit.min.css';

// Mock window.Laravel
window.Laravel = {
  htcmsAdminConfig: (key) => null,
  csrfToken: 'test-token'
};

// Mock global axios for playground
window.axios = {
  get: (url) => { console.log('GET', url); return Promise.resolve({ data: [] }); },
  post: (url, data) => { console.log('POST', url, data); return Promise.resolve({ data: [] }); }
};

const app = createApp(App);
app.mount('#app');
