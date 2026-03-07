import { createRouter, createWebHistory } from 'vue-router';

// We'll define routes dynamically based on discovered themes
const routes = [
  {
    path: '/',
    redirect: '/theme/modern' // Default to modern
  },
  {
    path: '/theme/:themeName',
    name: 'ThemePlayground',
    component: () => import('./ThemeContainer.vue'),
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Support hash jumps within theme pages (e.g. #buttons)
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 100 // Offset for sticky header
      }
    }
    return { top: 0 }
  }
});

export default router;
