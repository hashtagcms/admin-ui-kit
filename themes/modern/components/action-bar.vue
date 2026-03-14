<template>
  <div class="w-full mb-8">
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <!-- Title Section -->
        <div class="flex items-center gap-4">
            <div class="w-1.5 h-10 bg-blue-600 rounded-full shadow-lg shadow-blue-500/20"></div>
            <div>
                <h4 class="text-2xl font-black text-gray-900 tracking-tight uppercase leading-none">{{ getTitle(controllerTitle) }}</h4>
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1.5 opacity-70">{{cmsModules.sub_title || 'Manage CMS modules'}}</p>
            </div>
        </div>
        
        <!-- Actions Toolbar -->
        <div class="flex flex-wrap items-center gap-3 bg-gray-50/50 p-2 rounded-lg border border-gray-100 shadow-inner w-auto">
            <div class="inline-block">
                <cms-module-dropdown :data-modules="cmsModules" :data-current-module="controllerName"></cms-module-dropdown>
            </div>
            
            <language-button
              v-if="hasLangMethod"
              :data-languages="dataLanguages"
              :data-selected-language="dataSelectedLanguage"
              class="hover:scale-105 transition-transform"
              >English</language-button
            >

            <button 
                v-if="showAdd && showAddButtonBasedOnAction"
                type="button" 
                class="inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:scale-95 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed group border border-transparent bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 px-6 h-10 text-xs rounded-lg"
                @click="addNew"
            >
                <span class="inline-flex transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 mr-2"><i class="fa fa-plus"></i></span>
                <span class=""> Add New </span>
            </button>

            <a
              v-for="actionButton in filteredMoreActionButtons"
              :key="actionButton.action"
              :href="getAction(actionButton.action)"
              class="inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:scale-95 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed group border border-transparent bg-slate-600 text-white shadow-lg shadow-slate-500/20 hover:bg-slate-700 hover:shadow-slate-500/30 w-10 h-10 text-xs rounded-lg p-0"
            >
                <span class="inline-flex transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" :class="getButtonType(actionButton) === 'button' ? 'mr-2' : ''"><i :class="actionButton.icon_css"></i></span>
                <span v-if="getButtonType(actionButton) == 'button'">{{ actionButton.label }}</span>
            </a>

            <button 
                v-if="showSearchButton"
                type="button" 
                :class="showSearchPanel ? 'border-transparent bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-700' : 'bg-white border-gray-200 text-gray-400 hover:text-emerald-600 hover:border-emerald-500'"
                class="inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:scale-95 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed group border w-10 h-10 text-xs rounded-lg p-0"
                @click="showHideSearch"
            >
                <span class="inline-flex transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"><i class="fa fa-search"></i></span>
            </button>

            <button 
                v-if="fields.length > 0"
                type="button" 
                :class="layoutType !== 'table' ? 'bg-slate-600 text-white border-transparent shadow-lg shadow-slate-500/20 hover:bg-slate-700 hover:shadow-slate-500/30' : 'bg-white border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-500'"
                class="inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:scale-95 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed group border w-10 h-10 text-xs rounded-lg p-0"
                @click="changeLayout"
            >
                <span class="inline-flex transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"><i :class="layoutIcon"></i></span>
            </button>

            <a
               v-if="showBack"
               :href="backURL"
               class="inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:scale-95 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed group border border-transparent bg-gray-800 text-white shadow-lg shadow-gray-500/20 hover:bg-gray-900 hover:shadow-gray-500/30 px-6 h-10 text-xs rounded-lg"
            >
              Back
            </a>
        </div>
    </div>
    
    <!-- Search Panel -->
    <div class="mt-8 transform origin-top transition-all" :class="showSearchPanel ?'scale-100 opacity-100' : 'scale-95 opacity-0 hidden'" v-if="showSearchPanel">
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

const userRights = computed(() => SafeJsonParse(props.dataUserRights, []));
const can = (rights) => {
  return userRights.value.indexOf(rights) >= 0;
};

const showSearchButton = computed(() => !(
  typeof props.dataShowSearch === "undefined" ||
  props.dataShowSearch === "" ||
  props.dataShowSearch === "false"
));
const showSearchPanel = ref(false);
const searchAnim = ref("");


const moreActionButtons = computed(() => SafeJsonParse(props.dataMoreActions, []));

const filteredMoreActionButtons = computed(() => {
    return moreActionButtons.value;
});
const showAdd = computed(() =>
  typeof props.dataShowAdd === "undefined" || props.dataShowAdd === "true"
);
const hasLangMethod = computed(() => !(
  typeof props.dataHasLangMethod === "undefined" ||
  props.dataHasLangMethod === "false"
));
const cmsModules = computed(() => SafeJsonParse(props.dataCmsModules, {}));
const selectedParams = computed(() =>
  typeof props.dataSelectedParams === "undefined"
    ? ""
    : props.dataSelectedParams
);
const controllerName = computed(() =>
  typeof props.dataControllerName === "undefined"
    ? ""
    : props.dataControllerName
);
const controllerTitle = computed(() =>
  typeof props.dataControllerTitle === "undefined"
    ? ""
    : props.dataControllerTitle
);
const fields = computed(() =>
  typeof props.dataFields === "string" ? SafeJsonParse(props.dataFields, []) : props.dataFields || []
);
const actionFields = computed(() =>
  typeof props.dataActionFields === "string" ? SafeJsonParse(props.dataActionFields, []) : props.dataActionFields || []
);
const showBack = computed(() => props.dataShowBack === "true");
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
