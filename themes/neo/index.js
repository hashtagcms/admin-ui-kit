import "./styles/app.scss";

import ActionBar from "./components/action-bar.vue";
import CategoryPlatform from "./components/category-platform.vue";
import CategorySettings from "./components/category-settings.vue";
import CmsModuleDropdown from "./components/cms-module-dropdown.vue";
import DownloadButton from "./components/downloads.vue";
import FileUploader from "./components/file-uploader.vue";
import FrontendModuleCreator from "./components/frontend-module-creator.vue";
import GlobalSiteButton from "./components/global-site-button.vue";
import Homepage from "./components/homepage.vue";
import HtmlSlot from "./components/html-slot.vue";
import ImageGallery from "./components/image-gallery.vue";
import InfoBoxes from "./components/info-boxes.vue";
import InfoPopup from "./components/info-popup.vue";
import LanguageButton from "./components/language-button.vue";
import LanguageCopier from "./components/language-copier.vue";
import LeftNav from "./components/left-nav.vue";
import MenuSorter from "./components/menu-sorter.vue";
import ModuleCreator from "./components/module-creator.vue";
import ModulePermission from "./components/module-permission.vue";
import Pagination from "./components/pagination.vue";
import PlatformButton from "./components/platform-button.vue";
import SearchBar from "./components/search-bar.vue";
import SiteButton from "./components/site-button.vue";
import SiteCloner from "./components/site-cloner.vue";
import SiteWiseCopier from "./components/sitewise-copier.vue";
import SiteWiseData from "./components/sitewise-data.vue";
import Sorter from "./components/sorter.vue";
import TabularView from "./components/tabular-view.vue";
import TabView from "./components/tab-view.vue";
import TitleBar from "./components/title-bar.vue";
import TopNav from "./components/top-nav.vue";

// Library imports
import CopyPaste from "./components/library/copy-paste.vue";
import InfoBox from "./components/library/info-box.vue";
import LeftMenuShowHide from "./components/library/left-menu-show-hide.vue";
import Loader from "./components/library/loader.vue";
import ModalBox from "./components/library/modal-box.vue";
import SplitButton from "./components/library/split-button.vue";
import TimerButton from "./components/library/timer-button.vue";
import ToastBox from "./components/library/toast-box.vue";

export {
    ActionBar,
    CategoryPlatform,
    CategorySettings,
    CmsModuleDropdown,
    DownloadButton,
    FileUploader,
    FrontendModuleCreator,
    GlobalSiteButton,
    Homepage,
    HtmlSlot,
    ImageGallery,
    InfoBoxes,
    InfoPopup,
    LanguageButton,
    LanguageCopier,
    LeftNav,
    MenuSorter,
    ModuleCreator,
    ModulePermission,
    Pagination,
    PlatformButton,
    SearchBar,
    SiteButton,
    SiteCloner,
    SiteWiseCopier,
    SiteWiseData,
    Sorter,
    TabularView,
    TabView,
    TitleBar,
    TopNav,
    CopyPaste,
    InfoBox,
    LeftMenuShowHide,
    Loader,
    ModalBox,
    SplitButton,
    TimerButton,
    ToastBox
};

// Helpers
import { AdminConfig } from "../../helpers/admin-config";
import * as common from "../../helpers/common";
import { Dashboard } from "../../helpers/dashboard";
import { EditorHelper, PageManager } from "../../helpers/editor";
import { ErrorMessage } from "../../helpers/error-message-handler";
import MapAPI from "../../helpers/map";
import Form from "../../helpers/form";
import TabularViewActions from "../../helpers/tabular-view-actions";

export { AdminConfig, Dashboard, EditorHelper, PageManager, ErrorMessage, MapAPI, Form, TabularViewActions };
export * from "../../helpers/common";

const HashtagCmsAdminUI = {
    VERSION: '1.0.0',
    ActionBar,
    CategoryPlatform,
    CategorySettings,
    CmsModuleDropdown,
    DownloadButton,
    FileUploader,
    FrontendModuleCreator,
    GlobalSiteButton,
    Homepage,
    HtmlSlot,
    ImageGallery,
    InfoBoxes,
    InfoPopup,
    LanguageButton,
    LanguageCopier,
    LeftNav,
    MenuSorter,
    ModuleCreator,
    ModulePermission,
    Pagination,
    PlatformButton,
    SearchBar,
    SiteButton,
    SiteCloner,
    SiteWiseCopier,
    SiteWiseData,
    Sorter,
    TabularView,
    TabView,
    TitleBar,
    TopNav,
    CopyPaste,
    InfoBox,
    LeftMenuShowHide,
    Loader,
    ModalBox,
    SplitButton,
    TimerButton,
    ToastBox,
    AdminConfig,
    ...common,
    Dashboard,
    EditorHelper,
    PageManager,
    ErrorMessage,
    MapAPI,
    Form,
    TabularViewActions
};

// Global exposure
if (typeof window !== 'undefined') {
    window.HashtagCmsAdminUI = HashtagCmsAdminUI;
}

export default HashtagCmsAdminUI;
