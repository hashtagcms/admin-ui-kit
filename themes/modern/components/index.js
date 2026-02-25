import "../styles/app.scss";

import ActionBar from "./action-bar.vue";
import CategoryPlatform from "./category-platform.vue";
import CategorySettings from "./category-settings.vue";
import CmsModuleDropdown from "./cms-module-dropdown.vue";
import DownloadButton from "./downloads.vue";
import FileUploader from "./file-uploader.vue";
import FrontendModuleCreator from "./frontend-module-creator.vue";
import GlobalSiteButton from "./global-site-button.vue";
import Homepage from "./homepage.vue";
import HtmlSlot from "./html-slot.vue";
import ImageGallery from "./image-gallery.vue";
import InfoBoxes from "./info-boxes.vue";
import InfoPopup from "./info-popup.vue";
import LanguageButton from "./language-button.vue";
import LanguageCopier from "./language-copier.vue";
import LeftNav from "./left-nav.vue";
import MenuSorter from "./menu-sorter.vue";
import ModuleCreator from "./module-creator.vue";
import ModulePermission from "./module-permission.vue";
import Pagination from "./pagination.vue";
import PlatformButton from "./platform-button.vue";
import SearchBar from "./search-bar.vue";
import SiteButton from "./site-button.vue";
import SiteCloner from "./site-cloner.vue";
import SiteWiseCopier from "./sitewise-copier.vue";
import SiteWiseData from "./sitewise-data.vue";
import Sorter from "./sorter.vue";
import TabularView from "./tabular-view.vue";
import TabView from "./tab-view.vue";
import TitleBar from "./title-bar.vue";
import TopNav from "./top-nav.vue";

// Library imports
import CopyPaste from "./library/copy-paste.vue";
import InfoBox from "./library/info-box.vue";
import LeftMenuShowHide from "./library/left-menu-show-hide.vue";
import Loader from "./library/loader.vue";
import ModalBox from "./library/modal-box.vue";
import SplitButton from "./library/split-button.vue";
import TimerButton from "./library/timer-button.vue";
import ToastBox from "./library/toast-box.vue";

// Atomic UI Kit (HcKit)

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

export * from "../ui-kit";

import { AdminConfig } from "../../../helpers/admin-config";
import * as common from "../../../helpers/common";
import { Dashboard } from "../../../helpers/dashboard";
import { EditorHelper, PageManager } from "../../../helpers/editor";
import { ErrorMessage } from "../../../helpers/error-message-handler";
import MapAPI from "../../../helpers/map";
import Form from "../../../helpers/form";
import HcUiKit from "../ui-kit";

export { AdminConfig, Dashboard, EditorHelper, PageManager, ErrorMessage, MapAPI, Form };
export * from "../../../helpers/common";

const HashtagCmsAdminUI = {
    VERSION: "2.0.0",
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
    ...HcUiKit,
    AdminConfig,
    ...common,
    Dashboard,
    EditorHelper,
    PageManager,
    ErrorMessage,
    MapAPI,
    Form
};

// Global exposure
if (typeof window !== 'undefined') {
    window.HashtagCmsAdminUI = HashtagCmsAdminUI;
}

export default HashtagCmsAdminUI;
