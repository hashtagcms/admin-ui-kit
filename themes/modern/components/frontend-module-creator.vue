
<template>
  <div>
    <form
      id="addEditFrm"
      :action="saveURL"      
      method="post"
      role="form"
      v-on:keyup="hideErrorMessage($event)"
      v-on:submit.prevent="createModule"
    >
      <div class="p-8 lg:p-10 space-y-10">

          <!-- Basic Branding -->
          <div class="space-y-6">
              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-700 block" for="name">Module Name</label>
                <input
                  @blur="fillCopiedData"
                  id="name"
                  v-model="form.name"
                  class="form-control w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 pl-3 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900"
                  name="name"
                  placeholder="e.g. Header Module"
                  required
                  type="text"
                />
                <div class="flex items-center gap-2 mt-2">
                    <label class="inline-flex items-center gap-2 cursor-pointer group">
                        <input
                          v-model="conventional"
                          type="checkbox"
                          @click="goConventional()"
                          class="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                        />
                        <span class="text-xs font-semibold text-slate-500 group-hover:text-blue-600 transition-colors" :style="checkBoxAlignment">Apply Conventions</span>
                    </label>
                </div>
                <div class="text-[11px] text-rose-500 font-bold mt-1" v-if="errors.name">{{ errors.name }}</div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-700 block" for="alias">Alias</label>
                <input
                  id="alias"
                  v-model="form.alias"
                  class="form-control w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 pl-3 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900"
                  name="alias"
                  placeholder="MODULE_ALIAS_HERE"
                  required
                  type="text"
                />
                <div class="text-[11px] text-rose-500 font-bold mt-1" v-if="errors.alias">{{ errors.alias }}</div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-700 block" for="view_name">View Name</label>
                <input
                  id="view_name"
                  v-model="form.view_name"
                  class="form-control w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 pl-3 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900"
                  name="view_name"
                  placeholder="e.g. components/header"
                  required
                  type="text"
                />
                <div class="text-[11px] text-rose-500 font-bold mt-1" v-if="errors.view_name">{{ errors.view_name }}</div>
              </div>

              <div class="space-y-2">
                <div class="flex items-center justify-between">
                    <label class="text-sm font-medium text-slate-700" for="cache_group">Cache Settings</label>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          v-model="form.individual_cache"
                          type="checkbox"
                          class="w-4 h-4 text-orange-500 border-slate-300 rounded focus:ring-orange-500"
                        />
                        <span class="text-[10px] font-black text-orange-400 uppercase tracking-widest" :style="checkBoxAlignment">Individual?</span>
                    </label>
                </div>
                <input
                  id="cache_group"
                  v-model="form.cache_group"
                  class="form-control w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 pl-3 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900"
                  maxlength="60"
                  name="cache_group"
                  placeholder="Cache group name"
                />
                <div class="text-[11px] text-rose-500 font-bold mt-1" v-if="errors.cache_group">{{ errors.cache_group }}</div>
              </div>
          </div>

          <!-- Data Logic Section -->
          <div class="space-y-6 border-t border-slate-50 pt-10">
              <div class="flex items-center gap-3">
                  <h3 class="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Data &amp; Logic</h3>
              </div>

              <div class="space-y-6">
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-700 block" for="data_type">Data Type</label>
                    <HcAutoSuggest
                      id="data_type"
                      v-model="form.data_type"
                      placeholder="Enter or search Data Type..."
                      :data="dataTypeOptions"
                      display-field="data_type"
                      :min-chars="0"
                    >
                        <template #icon-left>
                            <i class="fa fa-database"></i>
                        </template>
                    </HcAutoSuggest>
                    <!-- Data type info panel -->
                    <div v-if="form.data_type" class="mt-3 rounded-xl border overflow-hidden" :class="activeTypeInfo.borderClass">
                      <div class="flex items-center gap-2 px-4 py-2" :class="activeTypeInfo.headerClass">
                        <i :class="activeTypeInfo.icon" class="text-sm"></i>
                        <span class="text-[10px] font-black uppercase tracking-widest">{{ form.data_type }}</span>
                        <span class="ml-auto text-[10px] font-bold opacity-70">{{ activeTypeInfo.fieldHint }}</span>
                      </div>
                      <div class="px-4 py-3 text-xs leading-relaxed" :class="activeTypeInfo.bodyClass">
                        {{ activeTypeInfo.description }}
                      </div>
                    </div>
                    <div class="text-[11px] text-rose-500 font-bold mt-1" v-if="errors.data_type">{{ errors.data_type }}</div>
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-700 block" for="data_handler">Data Handler</label>
                    <textarea
                      id="data_handler"
                      v-model="form.data_handler"
                      class="form-control w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 pl-3 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 font-mono min-h-[100px]"
                      name="data_handler"
                      :placeholder="activeTypeInfo.placeholder"
                    ></textarea>
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-700 block">Data Key Map</label>
                    <input v-model="form.data_key_map" class="form-control w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 pl-3 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900" placeholder=":id, :site_id..." />
                </div>
              </div>
          </div>

          <!-- Service Properties (Conditional) -->
          <div v-show="showServiceForm" class="space-y-6 border-t border-slate-50 pt-10">
              <h3 class="text-xs font-black uppercase tracking-[0.2em] text-blue-400">External Service Integration</h3>
              <div class="space-y-6">
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-700 block">HTTP Method</label>
                    <select v-model="form.method_type" class="form-select w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 pl-3 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900">
                      <option value="">Select</option>
                      <option v-for="mt in allMethodTypes" :key="mt.value" :value="mt.value">{{ mt.name }}</option>
                    </select>
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-700 block">Query Params</label>
                    <input v-model="form.service_params" class="form-control w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 pl-3 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900" placeholder="param1=val&param2=val" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-700 block">Custom Headers (JSON)</label>
                    <textarea v-model="form.headers" placeholder='{"Authorization": "Bearer..."}' class="form-control w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 pl-3 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 font-mono min-h-[80px]" />
                  </div>
              </div>
          </div>

          <!-- Query Service (Conditional) -->
          <div v-show="showQueryForm" class="space-y-6 border-t border-slate-50 pt-10">
              <h3 class="text-xs font-black uppercase tracking-[0.2em] text-violet-400">Query Engine Properties</h3>
              <div class="space-y-6">
                  <div class="space-y-2">
                      <label class="text-sm font-medium text-slate-700 block">Raw SQL Query</label>
                      <textarea v-model="form.query_statement" class="form-control w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 pl-3 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 font-mono min-h-[100px]" placeholder="SELECT..." />
                  </div>
                  <div class="space-y-2">
                      <label class="text-sm font-medium text-slate-700 block">Result Mapping</label>
                      <select v-model="form.query_as" class="form-select w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 pl-3 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900">
                          <option value="">Select Mapping</option>
                          <option v-for="qdt in allQueryDataTypes" :key="qdt.value" :value="qdt.value">{{ qdt.name }}</option>
                      </select>
                  </div>
              </div>
          </div>

          <!-- Component Attributes -->
          <div class="space-y-4 border-t border-slate-50 pt-10">
              <h3 class="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Attributes</h3>
              <div class="flex flex-wrap gap-3">
                  <label class="flex flex-col items-center justify-center p-3 bg-white rounded-sm border border-slate-200 cursor-pointer hover:border-blue-500 transition-all gap-2 group">
                      <input v-model="form.is_seo_module" type="checkbox" class="w-5 h-5 text-blue-600 rounded border-slate-300" />
                      <span class="text-[10px] font-black text-slate-400 group-hover:text-slate-800 uppercase tracking-tighter" :style="checkBoxAlignment">SEO Module</span>
                  </label>
                  <label class="flex flex-col items-center justify-center p-3 bg-white rounded-sm border border-slate-200 cursor-pointer hover:border-blue-500 transition-all gap-2 group">
                      <input v-model="form.is_mandatory" type="checkbox" class="w-5 h-5 text-blue-600 rounded border-slate-300" />
                      <span class="text-[10px] font-black text-slate-400 group-hover:text-slate-800 uppercase tracking-tighter" :style="checkBoxAlignment">Mandatory</span>
                  </label>
                  <label class="flex flex-col items-center justify-center p-3 bg-white rounded-sm border border-slate-200 cursor-pointer hover:border-blue-500 transition-all gap-2 group">
                      <input v-model="form.shared" type="checkbox" class="w-5 h-5 text-blue-600 rounded border-slate-300" />
                      <span class="text-[10px] font-black text-slate-400 group-hover:text-slate-800 uppercase tracking-tighter" :style="checkBoxAlignment">Shared</span>
                  </label>
                  <label class="flex flex-col items-center justify-center p-3 bg-white rounded-sm border border-slate-200 cursor-pointer hover:border-blue-500 transition-all gap-2 group">
                      <input v-model="form.live_edit" type="checkbox" class="w-5 h-5 text-blue-600 rounded border-slate-300" />
                      <span class="text-[10px] font-black text-slate-400 group-hover:text-slate-800 uppercase tracking-tighter" :style="checkBoxAlignment">Live Edit</span>
                  </label>
              </div>
          </div>

          <!-- Extended Properties -->
          <div class="space-y-6 border-t border-slate-50 pt-10">
              <h3 class="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Extended Properties</h3>
              <div class="space-y-6">
                <div class="space-y-2">
                    <HcAutoSuggest
                        v-model="form.linked_module"
                        label="Linked Module Alias"
                        placeholder="Module Alias"
                        :endpoint="props.dataFormAction.replace('/store', '/getModuleAlias')"
                        display-field="alias"
                        :min-chars="2"
                    >
                        <template #icon-left>
                            <i class="fa fa-link"></i>
                        </template>
                    </HcAutoSuggest>
                </div>                
                <div class="space-y-2">
                  <label class="text-sm font-medium text-slate-700 block">Contextual Description</label>
                  <textarea v-model="form.description" class="form-control w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 pl-3 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 min-h-[80px]" placeholder="Purpose of this module..." />
                </div>
              </div>
          </div>

          <!-- Global Update Section -->
          <div v-show="showAllUpdateSection" class="p-6 bg-rose-50/50 rounded-2xl border border-dashed border-rose-200 space-y-4">
              <label class="flex items-center gap-3 cursor-pointer group">
                  <input v-model="form.update_inAllSites" type="checkbox" class="w-5 h-5 text-rose-600 border-rose-300 rounded focus:ring-rose-500" />
                  <span class="text-sm font-black text-rose-700" :style="checkBoxAlignment">{{ syncLabel }}</span>
              </label>
              <div class="bg-rose-100/50 text-[11px] text-rose-700 p-4 rounded-xl border border-rose-100 leading-relaxed font-bold">
                  <i class="fa fa-exclamation-triangle mr-1"></i> {{ syncWarning }}
              </div>
          </div>

      </div>

      <!-- Action Footer -->
      <div class="px-8 py-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-4">
        <div v-if="errorMessage !== ''" class="w-full bg-rose-50 text-rose-700 px-4 py-3 rounded-xl border border-rose-100 text-xs font-black flex items-center gap-3">
           <i class="fa fa-exclamation-triangle"></i> {{ errorMessage }}
        </div>
        <a :href="dataBackUrl" class="w-full sm:w-auto text-center px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors order-2 sm:order-1">Cancel</a>
        <button
          class="w-full sm:w-auto px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-xl shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-2 order-1 sm:order-2"
          name="submit"
          type="submit"
        >
          <i class="fa fa-save opacity-50"></i>
          Save Module
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, getCurrentInstance } from "vue";
import { Toast, PasteFromClipboard, IsJson, SafeJsonParse, CheckBoxAlignment } from "../../../helpers/common";
import Form from "../../../helpers/form";
import { HcAutoSuggest } from "../ui-kit";

const props = defineProps([
  "dataControllerName",
  "dataBackUrl",
  "dataSite",
  "dataResults",
  "dataActionPerformed",
  "dataModuleTypes",
  "dataMethodTypes",
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
const moduleTypes = ref(SafeJsonParse(props.dataModuleTypes, []));
const dataTypeOptions = computed(() => {
    return moduleTypes.value.map(type => ({ data_type: type.name }));
});
const checkBoxAlignment = CheckBoxAlignment;
const allMethodTypes = ref(SafeJsonParse(props.dataMethodTypes, [
  { name: "GET", value: "GET" },
  { name: "POST", value: "POST" },
]));

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
// Hardcoded fallback for unknown/new types
const DEFAULT_TYPE_INFO = {
  icon: 'fa fa-info-circle',
  borderClass: 'border-slate-200',
  headerClass: 'bg-slate-100 text-slate-700',
  bodyClass: 'bg-slate-50 text-slate-600',
  fieldHint: 'Please check documentation',
  placeholder: 'Enter handler value...',
  description: 'No specific help information is available for this type yet.',
};

// Map dynamic data to the format expected by the template
const activeTypeInfo = computed(() => {
    const typeName = form.data_type;
    const info = moduleTypes.value.find(t => t.name === typeName);

    if (!info) return DEFAULT_TYPE_INFO;

    // We can potentially store these in DB too, but for now we use consistent styling
    // or drive it from the type name if we want specific colors.
    return {
        icon: info.icon || DEFAULT_TYPE_INFO.icon,
        borderClass: 'border-slate-200',
        headerClass: 'bg-slate-100 text-slate-700',
        bodyClass: 'bg-slate-50 text-slate-600',
        fieldHint: info.field_hint || DEFAULT_TYPE_INFO.fieldHint,
        placeholder: info.placeholder || DEFAULT_TYPE_INFO.placeholder,
        description: info.description || DEFAULT_TYPE_INFO.description,
    };
});

const saveURL = ref(props.dataFormAction);

const showQueryForm = computed(() => {
  return form.data_type?.toLowerCase().indexOf("queryservice") > -1 || (form.data_type?.toLowerCase() !== "query" && form.data_type?.toLowerCase().indexOf("query") > -1);
});

const showServiceForm = computed(() => {
  return form.data_type?.toLowerCase().indexOf("service") > -1;
});

const showAllUpdateSection = computed(() => {
  return siteData.value.length > 1;
});

const syncLabel = computed(() => {
  return props.dataActionPerformed === "edit" ? "Sync Changes Across All Sites" : "Create Module in All Sites";
});

const syncWarning = computed(() => {
    return props.dataActionPerformed === "edit" 
        ? "WARNING: This action will overwrite module metadata on multiple sites. Use only for global structural changes."
        : "NOTE: This will create a copy of this module in all available sites using the same alias.";
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

// Check for service is now handled by computed properties showQueryForm and showServiceForm

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

