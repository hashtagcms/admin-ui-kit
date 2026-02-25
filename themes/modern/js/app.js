/** Axios setup **/
import axios from "axios";
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.content;
    axios.defaults.withCredentials = true;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}
window.axios = axios;


// Helpers - Imported from local helpers (which bridge the SDK)
import { AdminConfig } from '../../../helpers/admin-config';
import { Storage, Fetcher } from '../../../helpers/common';
// Helpers - Imported from @hashtagcms/admin-ui-kit (UI Bound)
import { Toast } from '../../../helpers';

window.AdminConfig = new AdminConfig();
window.ToastGlobal = Toast;
window.log = console.log;
window.Store = new Storage();
window.Fetcher = new Fetcher();

import { createApp } from 'vue';

// Import all components from the new package
import {
    TopNav, LeftNav, TitleBar, ToastBox, Loader, CopyPaste, TimerButton, LeftMenuShowHide,
    Homepage, InfoBoxes, InfoBox, ModalBox,
    TabularView, TabView, ActionBar, SearchBar,
    Pagination,
    ModulePermission, ModuleCreator, FrontendModuleCreator,
    MenuSorter,
    SiteWiseData, SiteWiseCopier, SiteCloner,
    LanguageCopier,
    CategoryPlatform, CategorySettings,
    ImageGallery
} from '..';

// Alias resolving if components had different names in import
const PaginationView = Pagination;

const app = createApp({
    components: {
        'top-nav': TopNav,
        'title-bar': TitleBar,
        'admin-modules': LeftNav,
        'info-box': InfoBox,
        'info-boxes': InfoBoxes,
        'table-view': TabularView,
        'tab-view': TabView,
        'search-bar': SearchBar,
        'action-bar': ActionBar,
        'pagination-view': PaginationView,
        'toast-box': ToastBox,
        'admin-loader': Loader,
        'modal-box': ModalBox,
        'module-permission': ModulePermission,
        'menu-sorter': MenuSorter,
        'site-wise': SiteWiseData,
        'site-wise-copier': SiteWiseCopier,
        'site-cloner': SiteCloner,
        'language-copier': LanguageCopier,
        'module-creator': ModuleCreator,
        'front-module-creator': FrontendModuleCreator,
        'copy-paste': CopyPaste,
        'timer-button': TimerButton,
        'category-platform': CategoryPlatform,
        'category-settings': CategorySettings,
        'left-menu-toggle': LeftMenuShowHide,
        'page-manager': Homepage,
        'image-gallery': ImageGallery
    }
}).mount('#app');

window.Vue = app;
