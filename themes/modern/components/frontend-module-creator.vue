
<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <form
      id="addEditFrm"
      :action="saveURL"
      class="bg-white shadow-lg rounded-lg border border-gray-100 overflow-hidden"
      method="post"
      role="form"
      v-on:keyup="hideErrorMessage($event)"
      v-on:submit.prevent="createModule"
    >
      <div class="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
          <h2 class="text-2xl font-black text-gray-800 tracking-tight">Frontend Module Configuration</h2>
          <p class="text-sm text-gray-500 mt-1">Configure layout, data handlers, and cache settings</p>
      </div>

      <div class="p-8 space-y-6">
          <!-- Basic Branding -->
          <div class="space-y-6 pb-6 border-b border-gray-100">
              <div class="space-y-1.5">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Module Name</label>
                <input
                  @blur="fillCopiedData"
                  id="name"
                  v-model="form.name"
                  class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-sm"
                  name="name"
                  placeholder="e.g. Header Module"
                  required
                  type="text"
                />
                <div class="mt-2 ml-1">
                    <label class="inline-flex items-center gap-2 cursor-pointer group">
                        <input
                          v-model="conventional"
                          type="checkbox"
                          @click="goConventional()"
                          class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span class="text-xs font-bold text-gray-400 group-hover:text-blue-600 transition-colors" :style="checkBoxAlignment">Apply Conventions</span>
                    </label>
                </div>
                <div class="px-2 text-[11px] text-red-500 font-bold" v-if="errors.name">{{ errors.name }}</div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Alias</label>
                <input
                  id="alias"
                  v-model="form.alias"
                  class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-sm"
                  name="alias"
                  placeholder="MODULE_ALIAS_HERE"
                  required
                  type="text"
                />
                <div class="px-2 text-[11px] text-red-500 font-bold" v-if="errors.alias">{{ errors.alias }}</div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">View Name</label>
                <input
                  id="view_name"
                  v-model="form.view_name"
                  class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-sm"
                  name="view_name"
                  placeholder="e.g. components/header"
                  required
                  type="text"
                />
                <div class="px-2 text-[11px] text-red-500 font-bold" v-if="errors.view_name">{{ errors.view_name }}</div>
              </div>

              <div class="space-y-1.5">
                <div class="flex items-center justify-between">
                    <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Cache Settings</label>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          v-model="form.individual_cache"
                          type="checkbox"
                          class="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span class="text-[10px] font-black text-orange-400 uppercase tracking-widest" :style="checkBoxAlignment">Individual?</span>
                    </label>
                </div>
                <input
                  id="cache_group"
                  v-model="form.cache_group"
                  class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-sm"
                  maxlength="60"
                  name="cache_group"
                  placeholder="Cache group name"
                />
                <div class="px-2 text-[11px] text-red-500 font-bold" v-if="errors.cache_group">{{ errors.cache_group }}</div>
              </div>
          </div>

          <!-- Data Logic Section -->
          <div class="space-y-6">
              <div class="flex items-center gap-3">
                  <div class="h-8 w-1 bg-green-500 rounded-full"></div>
                  <h3 class="text-lg font-black text-gray-800">Data & Logic</h3>
              </div>

              <div class="space-y-4">
                  <div class="space-y-1.5">
                    <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Data Type</label>
                    <select
                      id="data_type"
                      v-model="form.data_type"
                      class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-sm cursor-pointer"
                      @change="checkForService(form.data_type)"
                    >
                      <option value="">Select Data Type</option>
                      <option v-for="dataType in allDataTypes" :key="dataType" :value="dataType">{{ dataType }}</option>
                    </select>
                    <!-- Data type info panel — always shown, falls back to _default for unknown types -->
                    <div v-if="form.data_type" class="mt-3 rounded-xl border overflow-hidden shadow-sm" :class="activeTypeInfo.borderClass">
                      <div class="flex items-center gap-2 px-4 py-2" :class="activeTypeInfo.headerClass">
                        <i :class="activeTypeInfo.icon" class="text-sm"></i>
                        <span class="text-[10px] font-black uppercase tracking-widest">{{ form.data_type }}</span>
                        <span class="ml-auto text-[10px] font-bold opacity-70">{{ activeTypeInfo.fieldHint }}</span>
                      </div>
                      <div class="px-4 py-3 text-xs leading-relaxed" :class="activeTypeInfo.bodyClass">
                        {{ activeTypeInfo.description }}
                      </div>
                    </div>
                    <div class="px-2 text-[11px] text-red-500 font-bold" v-if="errors.data_type">{{ errors.data_type }}</div>
                  </div>

                  <div class="space-y-1.5">
                    <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Data Handler</label>
                    <textarea
                      id="data_handler"
                      v-model="form.data_handler"
                      class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-inner font-mono min-h-[100px]"
                      name="data_handler"
                      :placeholder="activeTypeInfo.placeholder"
                    ></textarea>
                  </div>
              </div>
          </div>

          <!-- Service Properties (Conditional) -->
          <div v-show="showServiceForm" class="bg-blue-50/20 p-6 rounded-lg border border-blue-100 space-y-4 animate-fadeIn">
              <h4 class="text-xs font-black text-blue-400 uppercase tracking-widest border-b border-blue-100 pb-2">External Service Integration</h4>
              
              <div class="space-y-4">
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-black text-gray-500 ml-1">HTTP METHOD</label>
                    <select v-model="form.method_type" class="bg-white border border-gray-200 text-xs rounded-lg block w-full px-3 py-2">
                      <option value="">Select</option>
                      <option v-for="mt in allMethodTypes" :key="mt.value" :value="mt.value">{{ mt.name }}</option>
                    </select>
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-black text-gray-500 ml-1">QUERY PARAMS</label>
                    <input v-model="form.service_params" class="bg-white border border-gray-200 text-xs rounded-lg block w-full px-3 py-2" placeholder="param1=val&param2=val" />
                  </div>
              </div>
              
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 ml-1 uppercase">Custom Headers (JSON)</label>
                <textarea v-model="form.headers" placeholder='{"Authorization": "Bearer..."}' class="bg-white border border-gray-200 text-xs rounded-lg block w-full px-3 py-2 font-mono h-20" />
              </div>
          </div>

           <!-- Query Service (Conditional) -->
           <div v-show="showQueryForm" class="bg-purple-50/30 p-6 rounded-lg border border-purple-100 space-y-4 animate-fadeIn">
               <h4 class="text-xs font-black text-purple-400 uppercase tracking-widest border-b border-purple-100 pb-2">Query Engine Properties</h4>
               <div class="space-y-4">
                   <div class="space-y-1.5">
                       <label class="text-[10px] font-black text-purple-600 ml-1">RAW SQL QUERY</label>
                       <textarea v-model="form.query_statement" class="bg-white border border-purple-100 text-xs rounded-lg block w-full px-3 py-2 font-mono h-24 shadow-sm" placeholder="SELECT..." />
                   </div>
                   <div class="space-y-1.5">
                       <label class="text-[10px] font-black text-purple-600 ml-1">RESULT MAPPING</label>
                       <select v-model="form.query_as" class="bg-white border border-purple-100 text-xs rounded-lg block w-full px-3 py-2 shadow-sm">
                           <option value="">Select Mapping</option>
                           <option v-for="qdt in allQueryDataTypes" :key="qdt.value" :value="qdt.value">{{ qdt.name }}</option>
                       </select>
                   </div>
               </div>
           </div>

          <!-- Component Attributes -->
          <div class="flex flex-wrap gap-4 bg-gray-50/30 p-4 rounded-xl border border-gray-100">
              <label class="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-gray-100 cursor-pointer hover:border-blue-500 transition-all gap-2 group shadow-sm">
                  <input v-model="form.is_seo_module" type="checkbox" class="w-5 h-5 text-blue-600 rounded border-gray-300" />
                  <span class="text-[10px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-tighter" :style="checkBoxAlignment">SEO Module</span>
              </label>
              <label class="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-gray-100 cursor-pointer hover:border-blue-500 transition-all gap-2 group shadow-sm">
                  <input v-model="form.is_mandatory" type="checkbox" class="w-5 h-5 text-blue-600 rounded border-gray-300" />
                  <span class="text-[10px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-tighter" :style="checkBoxAlignment">Mandatory</span>
              </label>
              <label class="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-gray-100 cursor-pointer hover:border-blue-500 transition-all gap-2 group shadow-sm">
                  <input v-model="form.shared" type="checkbox" class="w-5 h-5 text-blue-600 rounded border-gray-300" />
                  <span class="text-[10px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-tighter" :style="checkBoxAlignment">Shared</span>
              </label>
              <label class="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-gray-100 cursor-pointer hover:border-blue-500 transition-all gap-2 group shadow-sm">
                  <input v-model="form.live_edit" type="checkbox" class="w-5 h-5 text-blue-600 rounded border-gray-300" />
                  <span class="text-[10px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-tighter" :style="checkBoxAlignment">Live Edit</span>
              </label>
          </div>

          <!-- Extended Properties -->
          <div class="space-y-6">
              <div class="space-y-6">
                <div class="space-y-1.5">
                    <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Linked Module Alias</label>
                    <input v-model="form.linked_module" class="bg-white border border-gray-200 text-sm rounded-xl block w-full px-4 py-3 outline-none shadow-sm focus:ring-2 focus:ring-blue-500/20" placeholder="ALIAS_OF_TARGET" />
                </div>
                <div class="space-y-1.5">
                    <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Data Key Map</label>
                    <input v-model="form.data_key_map" class="bg-white border border-gray-200 text-sm rounded-xl block w-full px-4 py-3 outline-none shadow-sm focus:ring-2 focus:ring-blue-500/20" placeholder=":id, :site_id..." />
                </div>
              </div>

               <div class="space-y-1.5">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Contextual Description</label>
                <textarea v-model="form.description" class="bg-white border border-gray-200 text-sm rounded-xl block w-full px-4 py-3 min-h-[80px] shadow-sm focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Purpose of this module..." />
              </div>
          </div>

          <!-- Global Update Section -->
          <div v-show="showAllUpdateSection" class="bg-red-50/50 p-6 rounded-lg border border-red-100 border-dashed space-y-4">
              <label class="flex items-center gap-3 cursor-pointer group">
                  <input v-model="form.update_inAllSites" type="checkbox" class="w-6 h-6 text-red-600 border-red-300 rounded focus:ring-red-500" />
                  <span class="text-sm font-black text-red-700" :style="checkBoxAlignment">Sync Changes Across All Sites</span>
              </label>
              <div class="bg-red-100/50 text-[11px] text-red-700 p-4 rounded-xl border border-red-100 leading-relaxed font-bold">
                  <i class="fa fa-exclamation-triangle mr-1"></i> WARNING: This action will overwrite module metadata on multiple sites. Use only for global structural changes.
              </div>
          </div>
      </div>

      <!-- Action Footer -->
      <div class="px-8 py-10 bg-gray-50/50 border-t border-gray-100 flex flex-col items-center gap-6">
        <div v-if="errorMessage !== ''" class="w-full max-w-xl bg-red-50 text-red-700 px-6 py-4 rounded-lg border border-red-100 text-sm font-black flex items-center gap-4 animate-shake shadow-sm">
           <i class="fa fa-exclamation-triangle text-2xl"></i> {{ errorMessage }}
        </div>
        <div class="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <button
            class="w-full sm:w-auto px-16 py-4.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-lg shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 active:scale-95 text-lg"
            name="submit"
            type="submit"
          >
            Save Module
          </button>
          <a :href="dataBackUrl" class="w-full sm:w-auto px-12 py-4.5 bg-white border border-gray-200 text-gray-500 font-bold rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-all text-center">
            Back to List
          </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, getCurrentInstance } from "vue";
import { Toast, PasteFromClipboard, IsJson, SafeJsonParse, CheckBoxAlignment } from "../../../helpers/common";
import Form from "../../../helpers/form";

const props = defineProps([
  "dataControllerName",
  "dataBackUrl",
  "dataSite",
  "dataResults",
  "dataActionPerformed",
  "dataDataTypes",
  "dataDataTypesInfo",
  "dataFormAction",
  "dataSiteId",
]);

const instance = getCurrentInstance();

const allQueryDataTypes = [
  { name: "param", value: "param" },
  { name: "data", value: "data" },
];

const conventional = ref(false);
const formData = ref(SafeJsonParse(props.dataResults, []));
const siteData = ref(SafeJsonParse(props.dataSite, []));
const showExtraData = reactive({ show: false });
const allDataTypes = ref(SafeJsonParse(props.dataDataTypes, []));
const checkBoxAlignment = CheckBoxAlignment;
const allMethodTypes = [
  { name: "GET", value: "GET" },
  { name: "POST", value: "POST" },
];

const form = reactive(new Form({
  id: 0,
  name: "",
  icon_css: "",
  alias: "",
  view_name: "",
  cache_group: "",
  data_type: "",
  method_type: "",
  data_handler: "",
  data_key_map: "",
  query_statement: "",
  query_as: "",
  description: "",
  site_id: 1,
  is_seo_module: 0,
  individual_cache: 0,
  shared: 0,
  update_inAllSites: 0,
  is_mandatory: 0,
  service_params: "",
  actionPerformed: props.dataActionPerformed,
  backURL: props.dataBackUrl,
  headers: "",
  live_edit: 0,
  linked_module: "",
}));

const errors = reactive({});
const errorMessage = ref("");
// Hardcoded data type definitions — single source of truth for all 7 types
const DATA_TYPE_DEFINITIONS = {
  // Fallback shown for any unknown/future type — never causes an error
  _default: {
    icon: 'fa fa-info-circle',
    borderClass: 'border-gray-200',
    headerClass: 'bg-gray-100 text-gray-500',
    bodyClass: 'bg-gray-50 text-gray-500',
    fieldHint: 'Check documentation',
    placeholder: 'Enter handler value...',
    description: 'No description is available for this data type yet. Please refer to the HashtagCMS documentation for usage details.',
  },
  Static: {
    icon: 'fa fa-database',
    borderClass: 'border-slate-200',
    headerClass: 'bg-slate-100 text-slate-700',
    bodyClass: 'bg-slate-50 text-slate-600',
    fieldHint: 'Data Handler → CONTENT_ALIAS',
    placeholder: 'e.g. HERO_BANNER_CONTENT',
    description: 'Reads data from the static_module_contents table. Enter the CONTENT_ALIAS value in the Data Handler field to identify which static content to load.',
  },
  Query: {
    icon: 'fa fa-code',
    borderClass: 'border-violet-200',
    headerClass: 'bg-violet-100 text-violet-700',
    bodyClass: 'bg-violet-50 text-violet-600',
    fieldHint: 'Data Handler → MySQL query',
    placeholder: 'e.g. SELECT * FROM articles WHERE site_id=:site_id AND status=1',
    description: 'Write a raw MySQL SELECT query directly in the Data Handler field. The system will execute it and pass the result set to the view.',
  },
  Service: {
    icon: 'fa fa-globe',
    borderClass: 'border-blue-200',
    headerClass: 'bg-blue-100 text-blue-700',
    bodyClass: 'bg-blue-50 text-blue-600',
    fieldHint: 'Data Handler → Service URL',
    placeholder: 'e.g. https://api.example.com/v1/articles',
    description: 'Write the external service/API URL in the Data Handler field. The system will call that endpoint and pass the JSON response to the view.',
  },
  Custom: {
    icon: 'fa fa-puzzle-piece',
    borderClass: 'border-orange-200',
    headerClass: 'bg-orange-100 text-orange-700',
    bodyClass: 'bg-orange-50 text-orange-600',
    fieldHint: 'Data Handler → Class reference (optional)',
    placeholder: 'e.g. App\\Handlers\\MyHandler (optional — leave blank to render view only)',
    description: 'Renders the module view directly. A PHP class reference is optional — if provided, its return value is passed to the view as data. If left blank, the view still renders and you can handle everything in the frontend.',
  },
  QueryService: {
    icon: 'fa fa-exchange',
    borderClass: 'border-teal-200',
    headerClass: 'bg-teal-100 text-teal-700',
    bodyClass: 'bg-teal-50 text-teal-600',
    fieldHint: 'Data Handler → URL  |  Query → MySQL',
    placeholder: 'e.g. https://api.example.com/v1/search',
    description: 'Hybrid type: put the external service URL in the Data Handler field, and write the MySQL query in the Query field. Both are executed and merged before passing to view.',
  },
  UrlService: {
    icon: 'fa fa-link',
    borderClass: 'border-cyan-200',
    headerClass: 'bg-cyan-100 text-cyan-700',
    bodyClass: 'bg-cyan-50 text-cyan-600',
    fieldHint: 'Data Handler → Service URL (URL params auto-injected)',
    placeholder: 'e.g. https://api.example.com/v1/detail',
    description: 'Similar to Service, but automatically reads parameters from the current request URL and appends them to the API call. Useful for detail/search pages where the URL drives the query.',
  },
  ServiceLater: {
    icon: 'fa fa-clock-o',
    borderClass: 'border-amber-200',
    headerClass: 'bg-amber-100 text-amber-700',
    bodyClass: 'bg-amber-50 text-amber-600',
    fieldHint: 'Data Handler → Service URL (passed to view, not called)',
    placeholder: 'e.g. https://api.example.com/v1/products',
    description: 'The system will NOT call the API immediately. Instead, it passes the service URL directly to the view so the frontend can call it on demand.',
  },
};

// Always resolves — never returns undefined. Falls back to _default for unknown types.
const activeTypeInfo = computed(() => DATA_TYPE_DEFINITIONS[form.data_type] ?? DATA_TYPE_DEFINITIONS._default);

const saveURL = ref(props.dataFormAction);

const showQueryForm = computed(() => {
  return form.data_type?.toLowerCase().indexOf("queryservice") > -1;
});

const showServiceForm = computed(() => {
  return form.data_type?.toLowerCase().indexOf("service") > -1;
});

const showAllUpdateSection = computed(() => {
  return props.dataActionPerformed === "edit" && siteData.value.length > 1;
});

const setFormData = (data) => {
    let addEditFrm = document.querySelector("#addEditFrm");
    for (let a in data) {
        let val = data[a];
        if (typeof form[a] !== "undefined" && typeof form[a] !== "function") {
            form[a] = val;
        }

        let ele = (addEditFrm && addEditFrm[a]) || document.getElementById(a);
        if (ele) {
            let eleType = ele.type;
            if ((eleType === "checkbox" || eleType === "radio") && eleType !== "submit") {
                form[a] = val === 1 || val === true || val === "1";
            }
        }
    }
};

const fillCopiedData = () => {
  PasteFromClipboard()
    .then((res) => {
      if (IsJson(form.name)) {
        setFormData(SafeJsonParse(form.name, {}));
      }
    })
    .catch((res) => {
      console.log("unable to paste");
    });
};

const goConventional = () => {
    if (conventional.value === false) {
        let name = form.name;
        form.alias = ("MODULE_" + name.toUpperCase()).replace(/\s/g, "_");
        form.view_name = name.toLowerCase().replace(/\s/g, "-");
    }
};

const checkForService = (dataType) => {
    showExtraData.show = dataType !== "" && (dataType.indexOf("Service") > -1 || dataType.indexOf("service") > -1);
};

const showError = (res) => {
    for (let i in res.errors) {
        if (res.errors.hasOwnProperty(i)) {
            errors[i] = res.errors[i][0];
        }
    }
    errorMessage.value = res.message;
};

const hideErrorMessage = (event) => {
    let name = event.target.getAttribute("name");
    if (name) errors[name] = "";
    if (errorMessage.value !== "") {
        errorMessage.value = "";
    }
};

const resetForm = (response) => {
    const isTrue = (val) => val?.toString() === "true" || val?.toString() === "1";
    
    if (!isTrue(response.isSaved)) {
        Toast.show(instance.proxy, "There is some error...");
        errorMessage.value = response.message;
    } else {
        errorMessage.value = "";
        Toast.show(instance.proxy, "Saved...");
        if (isTrue(response.isSaved)) {
            window.location.href = response.backURL;
        }
    }
};

const createModule = () => {
    // Pre-check logic
    form.is_seo_module = form.is_seo_module ? 1 : 0;
    form.individual_cache = form.individual_cache ? 1 : 0;
    form.update_inAllSites = form.update_inAllSites ? 1 : 0;
    form.is_mandatory = form.is_mandatory ? 1 : 0;
    form.shared = form.shared ? 1 : 0;
    form.live_edit = form.live_edit ? 1 : 0;
    form.service_params = form.service_params || "";

    form.post(saveURL.value)
        .then((response) => {
            resetForm(response);
        })
        .catch((response) => {
            showError(response);
        });
};

onMounted(() => {
    if (props.dataActionPerformed === "edit") {
        setFormData(formData.value);
    } else {
        form.site_id = props.dataSiteId;
    }
});
</script>

