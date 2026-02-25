<template>
  <div class="w-full mb-8">
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <!-- Title Section -->
        <div class="flex items-center gap-4">
            <div class="w-1.5 h-10 bg-blue-600 rounded-full shadow-lg shadow-blue-500/20"></div>
            <div>
                <h4 class="text-2xl font-black text-gray-900 tracking-tight uppercase leading-none">{{ getTitle(controllerTitle) }}</h4>
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1.5 opacity-70">{{cmsModules.sub_title || 'Resource Management Instance'}}</p>
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
              v-for="actionButton in filteredMoreActionButtons"
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

<script setup>
import { ref, computed, onMounted, getCurrentInstance } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import CmsModuleDropdown from "./cms-module-dropdown.vue";
import LanguageButton from "./language-button.vue";
import SearchBar from "./search-bar.vue";
import { Toast, SafeJsonParse, ACTION_MAP } from "../../../helpers/common";
import Humanize from "../../../helpers/humanize";
import HcButton from "../ui-kit/HcButton.vue";

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
  "dataUserRights",
]);

const instance = getCurrentInstance();

const userRights = ref(SafeJsonParse(props.dataUserRights, []));
const can = (rights) => {
  return userRights.value.indexOf(rights) >= 0;
};

const showSearchButton = ref(!(
  typeof props.dataShowSearch === "undefined" ||
  props.dataShowSearch === "" ||
  props.dataShowSearch === "false"
));
const showSearchPanel = ref(false);
const searchAnim = ref("");



const moreActionButtons = ref(SafeJsonParse(props.dataMoreActions, []));

const filteredMoreActionButtons = computed(() => {
    return moreActionButtons.value;
});
const showAdd = ref(
  typeof props.dataShowAdd === "undefined" || props.dataShowAdd === "true"
);
const hasLangMethod = ref(!(
  typeof props.dataHasLangMethod === "undefined" ||
  props.dataHasLangMethod === "false"
));
const cmsModules = ref(SafeJsonParse(props.dataCmsModules, {}));
const selectedParams = ref(
  typeof props.dataSelectedParams === "undefined"
    ? ""
    : props.dataSelectedParams
);
const controllerName = ref(
  typeof props.dataControllerName === "undefined"
    ? ""
    : props.dataControllerName
);
const controllerTitle = ref(
  typeof props.dataControllerTitle === "undefined"
    ? ""
    : props.dataControllerTitle
);
const fields = ref(
  typeof props.dataFields === "undefined" || props.dataFields === ""
    ? []
    : props.dataFields
);
const actionFields = ref(
  typeof props.dataActionFields === "undefined" ||
  props.dataActionFields === ""
    ? []
    : props.dataActionFields
);
const showBack = ref(props.dataShowBack === "true");
const layoutType = ref(
  typeof props.dataLayoutType === "undefined" || props.dataLayoutType === ""
    ? "table"
    : props.dataLayoutType
);

const backURL = computed(() => {    
    return AdminConfig.admin_path(controllerName.value);
});

const layoutIcon = computed(() => {
    return layoutType.value === "grid" ? "fa fa-th-list" : "fa fa-table";
});

const showAddButtonBasedOnAction = computed(() => {
    const rights = userRights.value;
    // If user has ONLY 'read' right, hide the Add button
    if (rights.length === 1 && rights[0] === 'read') {
        return false;
    }
    return true;
});

const changeLayout = () => {
    const targetLayout = layoutType.value === "table" ? "grid" : "table";
    Toast.show(instance.proxy, `Changing layout to ${targetLayout}...`, 2000);
    
    if ("URLSearchParams" in window) {
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.set("layout", targetLayout);
        window.location.href = window.location.pathname + "?" + searchParams.toString();
    } else {
        window.location.href = window.location.pathname + "?layout=" + targetLayout;
    }
};

const getAction = (val) => {
    if (val.indexOf("http") === 0) {
        return val;
    }
    return AdminConfig.admin_path(val);
};

const showHideSearch = () => {
    showSearchPanel.value = !showSearchPanel.value;
    searchAnim.value = showSearchPanel.value ? "animated flipInX" : "";
};

const shouldShowSearchPanel = () => {
    if (selectedParams.value !== "") {
        const params = SafeJsonParse(selectedParams.value, {});
        if (params.q) {
            showSearchPanel.value = true;
        }
    }
};

const addNew = () => {
    if (controllerName.value !== "") {
        var controller_url = AdminConfig.admin_path(controllerName.value);
        window.location.href = controller_url + "/create";
    }
};

const getButtonType = (row) => {
    return !row.as || row.as === "button" ? "button" : row.as;
};

const getTitle = (text) => {
    return Humanize(text);
};

onMounted(() => {
    shouldShowSearchPanel();
});
</script>
