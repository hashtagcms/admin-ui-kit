<template>
  <div class="w-full mb-8">
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <!-- Title Section -->
        <div class="flex items-center gap-4">
            <div class="w-1.5 h-10 bg-blue-600 rounded-full shadow-lg shadow-blue-500/20"></div>
            <div>
                <h4 class="text-2xl font-black text-gray-900 tracking-tight uppercase leading-none">{{ getTitle(controllerTitle) }}</h4>
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1.5 opacity-70">{{this.cmsModules.sub_title || 'Resource Management Instance'}}</p>
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

            <hc-button
              v-if="showAdd && showAddButtonBasedOnAction"
               variant="primary"
               @click="addNew"
               icon="fa fa-plus"
            >
              Add New
            </hc-button>

            <hc-button
              v-for="actionButton in moreActionButtons"
              :key="actionButton.action"
              variant="secondary"
              outline
              :href="getAction(actionButton.action)"
              :icon="actionButton.icon_css"
              as="a"
            >
              <span v-if="getButtonType(actionButton) == 'button'">{{
                actionButton.label
              }}</span>
            </hc-button>

            <hc-button
              v-if="showSearchButton"
              variant="secondary"
              outline
              @click="showHideSearch"
              icon="fa fa-search"
              :active="showSearchPanel"
              is-square
              size="sm"
            />

            <hc-button
              v-if="fields.length > 0"
              variant="secondary"
              outline
              @click="changeLayout"
              :icon="layoutIcon"
              :active="layoutType !== 'table'"
              is-square
              size="sm"
            />

            <hc-button
               v-if="showBack"
               variant="dark"
               :href="backURL"
               as="a"
            >
              Back
            </hc-button>
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
import AdminConfig from "../../../helpers/admin-config";
import CmsModuleDropdown from "./cms-module-dropdown.vue";
import LanguageButton from "./language-button.vue";
import SearchBar from "./search-bar.vue";
import { Toast, SafeJsonParse } from "../../../helpers/common";
import Humanize from "../../../helpers/humanize";
import HcButton from "../ui-kit/HcButton.vue";

export default {
  name: "ActionBar",
  components: {
    "cms-module-dropdown": CmsModuleDropdown,
    "language-button": LanguageButton,
    "search-bar": SearchBar,
    HcButton
  },
  mounted() {
    this.shouldShowSearchPanel();
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
      searchAnim: "",
      moreActionButtons: SafeJsonParse(this.dataMoreActions, []),
      showAdd:
        typeof this.dataShowAdd === "undefined" || this.dataShowAdd === "true",
      hasLangMethod: !(
        typeof this.dataHasLangMethod === "undefined" ||
        this.dataHasLangMethod === "false"
      ),
      cmsModules: SafeJsonParse(this.dataCmsModules, {}),
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
      const targetLayout = this.layoutType === "table" ? "grid" : "table";
      Toast.show(this, `Changing layout to ${targetLayout}...`, 2000);
      
      if ("URLSearchParams" in window) {
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.set("layout", targetLayout);
        window.location.href = window.location.pathname + "?" + searchParams.toString();
      } else {
        window.location.href = window.location.pathname + "?layout=" + targetLayout;
      }
    },
    getAction(val) {
      if (val.indexOf("http") === 0) {
        return val;
      }
      return AdminConfig.admin_path(val);
    },
    showHideSearch() {
      this.showSearchPanel = !this.showSearchPanel;
      this.searchAnim = this.showSearchPanel ? "animated flipInX" : "";
    },
    shouldShowSearchPanel() {
      if (this.selectedParams !== "") {
        const params = SafeJsonParse(this.selectedParams, {});
        if (params.q) {
          this.showSearchPanel = true;
        }
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
