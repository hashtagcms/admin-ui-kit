<template>
  <div class="w-full mb-8">
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <!-- Title Section -->
        <div class="flex items-center gap-4">
            <div class="w-1.5 h-10 bg-blue-600 rounded-full shadow-lg shadow-blue-500/20"></div>
            <div>
                <h4 class="text-2xl font-black text-gray-900 tracking-tight uppercase leading-none">{{ getTitle(controllerTitle) }}</h4>
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1.5 opacity-70">Resource Management Instance</p>
            </div>
        </div>
        
        <!-- Actions Toolbar -->
        <div class="flex flex-wrap items-center gap-3 bg-gray-50/50 p-2 rounded-lg border border-gray-100 shadow-inner w-full lg:w-auto">
            <language-button
              v-if="hasLangMethod"
              :data-languages="dataLanguages"
              :data-selected-language="dataSelectedLanguage"
              class="hover:scale-105 transition-transform"
              >English</language-button
            >

            <button
              v-if="showAdd && showAddButtonBasedOnAction"
              title="Add New"
              @click="addNew"
              type="button"
              class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest rounded-lg shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 active:scale-95 group"
              aria-label="Add New"
            >
              <i class="fa fa-plus mr-2 group-hover:rotate-90 transition-transform" aria-hidden="true"></i> Add New
            </button>

            <a
              v-for="actionButton in moreActionButtons"
              class="inline-flex items-center px-6 py-3 bg-white border border-gray-200 hover:border-blue-500 text-gray-400 hover:text-blue-600 text-xs font-black uppercase tracking-widest rounded-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-95 group"
              :href="getAction(actionButton.action)"
              :title="actionButton.label"
            >
              <i
                v-if="actionButton.icon_css"
                :class="actionButton.icon_css"
                class="mr-2 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              ></i>
              <span v-if="getButtonType(actionButton) == 'button'">{{
                actionButton.label
              }}</span>
            </a>

            <button
              v-if="showSearchButton"
              title="Search"
              @click="showHideSearch"
              type="button"
              :class="[isActive, 'w-12 h-12 flex items-center justify-center rounded-lg transition-all active:scale-90 border']"
              aria-label="Search"
            >
              <i class="fa fa-search text-sm" aria-hidden="true"></i>
            </button>

            <button
              v-if="fields.length > 0"
              title="Change Layout"
              @click="changeLayout()"
              type="button"
              class="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 hover:border-blue-500 text-gray-400 hover:text-blue-600 rounded-lg shadow-sm transition-all active:scale-90"
              aria-label="Layout"
            >
              <i :class="layoutIcon" aria-hidden="true"></i>
            </button>

            <a v-if="showBack" class="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-black text-white text-xs font-black uppercase tracking-widest rounded-lg shadow-md transition-all active:scale-95" :href="backURL"
              >Back</a
            >
        </div>
    </div>
    
    <!-- Search Panel -->
    <div class="mt-8 transform origin-top transition-all" :class="showSearchPanel ? 'scale-100 opacity-100' : 'scale-95 opacity-0 hidden'" v-if="showSearchPanel">
      <div class="bg-white p-6 rounded-lg border border-gray-100 shadow-lg shadow-blue-500/5">
          <search-bar
            :class="searchAnim"
            :data-controller-name="controllerName"
            :data-selected-params="selectedParams"
            :data-fields="fields"
            :data-action-fields="actionFields"
          ></search-bar>
      </div>
    </div>
  </div>
</template>

<script>
import AdminConfig from "@hashtagcms/helpers/admin-config";
import CmsModuleDropdown from "./cms-module-dropdown.vue";
import LanguageButton from "./language-button.vue";
import SearchBar from "./search-bar.vue";
import { Toast } from "@hashtagcms/helpers/common";
import Humanize from "@hashtagcms/helpers/humanize";

export default {
  components: {
    "cms-module-dropdown": CmsModuleDropdown,
    "language-button": LanguageButton,
    "search-bar": SearchBar,
  },
  mounted() {
    this.shouldShowSearchPanel();
    //console.log(this.dataShowSearch);
  },
  props: [
    "dataSelectedParams",
    "dataControllerName",
    "dataControllerTitle",
    "dataFields",
    "dataActionFields",
    "dataLanguages",
    "dataSelectedLanguage",
    "dataMoreActions",
    "dataShowAdd",
    "dataHasLangMethod",
    "dataCmsModules",
    "dataShowSearch",
    "dataShowBack",
    "dataLayoutType",
  ],
  computed: {
    backURL() {
      return AdminConfig.admin_path(this.controllerName);
    },
    layoutIcon() {
      return this.layoutType === "grid" ? "fa fa-th-list" : "fa fa-table";
    },
    showAddButtonBasedOnAction() {
      return this.actionFields.indexOf("edit") !== -1;
    },
  },
  data() {
    return {
      canAdd: true,
      showSearchButton: !(
        typeof this.dataShowSearch === "undefined" ||
        this.dataShowSearch === "" ||
        this.dataShowSearch === "false"
      ),
      showSearchPanel: false,
      isActive: "btn btn-outline-secondary",
      searchAnim: "",
      moreActionButtons:
        typeof this.dataMoreActions === "undefined" ||
        this.dataMoreActions === ""
          ? []
          : JSON.parse(this.dataMoreActions),
      showAdd:
        typeof this.dataShowAdd === "undefined" || this.dataShowAdd === "true",
      hasLangMethod: !(
        typeof this.dataHasLangMethod === "undefined" ||
        this.dataHasLangMethod === "false"
      ),
      cmsModules:
        typeof this.dataCmsModules === "undefined" || this.dataCmsModules === ""
          ? []
          : JSON.parse(this.dataCmsModules),
      selectedParams:
        typeof this.dataSelectedParams === "undefined"
          ? ""
          : this.dataSelectedParams,
      controllerName:
        typeof this.dataControllerName === "undefined"
          ? ""
          : this.dataControllerName,
      controllerTitle:
        typeof this.dataControllerTitle === "undefined"
          ? ""
          : this.dataControllerTitle,
      fields:
        typeof this.dataFields === "undefined" || this.dataFields === ""
          ? []
          : this.dataFields,
      actionFields:
        typeof this.dataActionFields === "undefined" ||
        this.dataActionFields === ""
          ? []
          : this.dataActionFields,
      showBack: this.dataShowBack === "true",
      layoutType:
        typeof this.dataLayoutType === "undefined" || this.dataLayoutType === ""
          ? "table"
          : this.dataLayoutType,
    };
  },
  methods: {
    changeLayout() {
      Toast.show(this, "Please wait. Changing listing style for you...", 5000);
      this.layoutType = this.layoutType === "table" ? "grid" : "table";
      if ("URLSearchParams" in window) {
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.set("layout", this.layoutType);
        window.location.search = searchParams.toString();
      }
    },
    getAction(val) {
      if (val.indexOf("http") === 0) {
        return val;
      }
      return AdminConfig.admin_path(val);
    },
    maintainActiveSearch(animate = true) {
      let base = "inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ";
      this.isActive =
        this.showSearchPanel === true
          ? base + "bg-green-600 text-white hover:bg-green-700"
          : base + "text-gray-700 bg-white hover:bg-gray-50";
      this.searchAnim =
        this.showSearchPanel === true && animate == true
          ? "animated flipInX"
          : "";
    },
    showHideSearch() {
      this.showSearchPanel = !this.showSearchPanel;
      this.maintainActiveSearch();
    },
    shouldShowSearchPanel() {
      if (this.selectedParams !== "") {
        if (JSON.parse(this.selectedParams).q) {
          this.showSearchPanel = true;
        }
        this.maintainActiveSearch(false);
      }
    },
    addNew() {
      if (this.controllerName !== "") {
        var controller_url = AdminConfig.admin_path(this.controllerName);
        window.location.href = controller_url + "/create";
      }
    },
    getButtonType(row) {
      return !row.as || row.as === "button" ? "button" : row.as;
    },
    getTitle: function (text) {
      return Humanize(text);
    },
  },
};
</script>
