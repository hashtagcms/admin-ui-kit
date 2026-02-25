<template>
  <div class="container-fluid border-bottom mb-2 pb-2">
    <div class="row">
      <div class="col">
        <div
          class="btn-toolbar justify-content-between"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <div class="btn-group" role="group">
            <h4 class="moduleTitle">{{ getTitle(controllerTitle) }}</h4>
          </div>
          <div class="input-group actionToolbar">
            <language-button
              v-if="hasLangMethod"
              :data-languages="dataLanguages"
              :data-selected-language="dataSelectedLanguage"
              >English</language-button
            >
            <button
              v-if="showAdd && showAddButtonBasedOnAction"
              title="Add New"
              @click="addNew"
              type="button"
              class="btn btn-outline-secondary"
              aria-label="Add New"
            >
              <i class="fa fa-plus" aria-hidden="true"></i> Add New
            </button>
            <a
              v-for="actionButton in moreActionButtons"
              class="btn btn-outline-secondary"
              :href="getAction(actionButton.action)"
              :title="actionButton.label"
            >
              <i
                v-if="actionButton.icon_css"
                :class="actionButton.icon_css"
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
              :class="isActive"
              aria-label="Search"
            >
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
            <button
              v-if="fields.length > 0"
              title="Change Layout"
              @click="changeLayout()"
              type="button"
              class="btn btn-outline-secondary"
              aria-label="Layout"
            >
              <i :class="layoutIcon" aria-hidden="true"></i>
            </button>
            <a v-if="showBack" class="btn btn-outline-secondary" :href="backURL"
              >Back</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col" v-if="showSearchPanel">
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

<script setup>
import { ref, computed, onMounted, getCurrentInstance } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import CmsModuleDropdown from "./cms-module-dropdown.vue";
import LanguageButton from "./language-button.vue";
import SearchBar from "./search-bar.vue";
import { Toast, SafeJsonParse } from "../../../helpers/common";
import Humanize from "../../../helpers/humanize";

const props = defineProps([
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
]);

const instance = getCurrentInstance();

// State
const canAdd = ref(true);
const showSearchButton = ref(
  !(
    typeof props.dataShowSearch === "undefined" ||
    props.dataShowSearch === "" ||
    props.dataShowSearch === "false"
  )
);
const showSearchPanel = ref(false);
const isActive = ref("btn btn-outline-secondary");
const searchAnim = ref("");
const moreActionButtons = ref(SafeJsonParse(props.dataMoreActions, []));
const showAdd = ref(typeof props.dataShowAdd === "undefined" || props.dataShowAdd === "true");
const hasLangMethod = ref(
  !(typeof props.dataHasLangMethod === "undefined" || props.dataHasLangMethod === "false")
);
const cmsModules = ref(SafeJsonParse(props.dataCmsModules, {}));
const selectedParams = ref(typeof props.dataSelectedParams === "undefined" ? "" : props.dataSelectedParams);
const controllerName = ref(typeof props.dataControllerName === "undefined" ? "" : props.dataControllerName);
const controllerTitle = ref(typeof props.dataControllerTitle === "undefined" ? "" : props.dataControllerTitle);
const fields = ref(typeof props.dataFields === "undefined" || props.dataFields === "" ? [] : props.dataFields);
const actionFields = ref(
  typeof props.dataActionFields === "undefined" || props.dataActionFields === "" ? [] : props.dataActionFields
);
const showBack = ref(props.dataShowBack === "true");
const layoutType = ref(
  typeof props.dataLayoutType === "undefined" || props.dataLayoutType === "" ? "table" : props.dataLayoutType
);

// Computed
const backURL = computed(() => AdminConfig.admin_path(controllerName.value));
const layoutIcon = computed(() => (layoutType.value === "grid" ? "fa fa-th-list" : "fa fa-table"));
const showAddButtonBasedOnAction = computed(() => actionFields.value.indexOf("edit") !== -1);

// Methods
const maintainActiveSearch = (animate = true) => {
  isActive.value = showSearchPanel.value === true ? "btn btn-success" : "btn btn-outline-secondary";
  searchAnim.value = showSearchPanel.value === true && animate === true ? "animated flipInX" : "";
};

const showHideSearch = () => {
  showSearchPanel.value = !showSearchPanel.value;
  maintainActiveSearch();
};

const shouldShowSearchPanel = () => {
  if (selectedParams.value !== "") {
    const params = SafeJsonParse(selectedParams.value, {});
    if (params.q) {
      showSearchPanel.value = true;
    }
    maintainActiveSearch(false);
  }
};

const changeLayout = () => {
  Toast.show(instance, "Please wait. Changing listing style for you...", 5000);
  layoutType.value = layoutType.value === "table" ? "grid" : "table";
  if ("URLSearchParams" in window) {
    let sParams = new URLSearchParams(window.location.search);
    sParams.set("layout", layoutType.value);
    window.location.search = sParams.toString();
  }
};

const getAction = (val) => {
  if (val.indexOf("http") === 0) {
    return val;
  }
  return AdminConfig.admin_path(val);
};

const addNew = () => {
  if (controllerName.value !== "") {
    const controller_url = AdminConfig.admin_path(controllerName.value);
    window.location.href = `${controller_url}/create`;
  }
};

const getButtonType = (row) => (!row.as || row.as === "button" ? "button" : row.as);
const getTitle = (text) => Humanize(text);

onMounted(() => {
  shouldShowSearchPanel();
});
</script>

