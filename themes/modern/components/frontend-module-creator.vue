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
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-100">
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
                        <span class="text-xs font-bold text-gray-400 group-hover:text-blue-600 transition-colors">Apply Conventions</span>
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
                        <span class="text-[10px] font-black text-orange-400 uppercase tracking-widest">Individual?</span>
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
                    <div
                      v-show="form.data_type != '' && this.dataTypesInfo[form.data_type]"
                      class="mt-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700 leading-relaxed shadow-sm"
                      v-html="this.dataTypesInfo[form.data_type] || ''"
                    ></div>
                    <div class="px-2 text-[11px] text-red-500 font-bold" v-if="errors.data_type">{{ errors.data_type }}</div>
                  </div>

                  <div class="space-y-1.5">
                    <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Data Handler</label>
                    <textarea
                      id="data_handler"
                      v-model="form.data_handler"
                      class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-inner font-mono min-h-[100px]"
                      name="data_handler"
                      placeholder="e.g. SELECT * FROM table WHERE site_id=:site_id"
                    ></textarea>
                  </div>
              </div>
          </div>

          <!-- Service Properties (Conditional) -->
          <div v-show="showServiceForm" class="bg-blue-50/20 p-6 rounded-lg border border-blue-100 space-y-4 animate-fadeIn">
              <h4 class="text-xs font-black text-blue-400 uppercase tracking-widest border-b border-blue-100 pb-2">External Service Integration</h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50/30 p-4 rounded-xl border border-gray-100">
              <label class="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-gray-100 cursor-pointer hover:border-blue-500 transition-all gap-2 group shadow-sm">
                  <input v-model="form.is_seo_module" type="checkbox" class="w-5 h-5 text-blue-600 rounded border-gray-300" />
                  <span class="text-[10px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-tighter">SEO Module</span>
              </label>
              <label class="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-gray-100 cursor-pointer hover:border-blue-500 transition-all gap-2 group shadow-sm">
                  <input v-model="form.is_mandatory" type="checkbox" class="w-5 h-5 text-blue-600 rounded border-gray-300" />
                  <span class="text-[10px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-tighter">Mandatory</span>
              </label>
              <label class="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-gray-100 cursor-pointer hover:border-blue-500 transition-all gap-2 group shadow-sm">
                  <input v-model="form.shared" type="checkbox" class="w-5 h-5 text-blue-600 rounded border-gray-300" />
                  <span class="text-[10px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-tighter">Shared</span>
              </label>
              <label class="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-gray-100 cursor-pointer hover:border-blue-500 transition-all gap-2 group shadow-sm">
                  <input v-model="form.live_edit" type="checkbox" class="w-5 h-5 text-blue-600 rounded border-gray-300" />
                  <span class="text-[10px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-tighter">Live Edit</span>
              </label>
          </div>

          <!-- Extended Properties -->
          <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div v-show="this.showAllUpdateSection" class="bg-red-50/50 p-6 rounded-lg border border-red-100 border-dashed space-y-4">
              <label class="flex items-center gap-3 cursor-pointer group">
                  <input v-model="form.update_inAllSites" type="checkbox" class="w-6 h-6 text-red-600 border-red-300 rounded focus:ring-red-500" />
                  <span class="text-sm font-black text-red-700">Sync Changes Across All Sites</span>
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

<script>
import { Toast, PasteFromClipboard, IsJson, SafeJsonParse } from "../../../helpers/common";
import Form from "../../../helpers/form";

export default {
  mounted() {
    if (this.dataActionPerformed === "edit") {
      this.setFormData(this.formData);
    } else {
      this.form.site_id = this.dataSiteId;
    }
  },
  props: [
    "dataControllerName",
    "dataBackUrl",
    "dataSite",
    "dataResults",
    "dataActionPerformed",
    "dataDataTypes",
    "dataDataTypesInfo",
    "dataFormAction",
    "dataSiteId",
  ],
  data() {
    return {
      sFont: {
        "font-size": "14px",
      },
      fluidCol: {
        width: "100%",
      },
      allQueryDataTypes: [
        { name: "param", value: "param" },
        { name: "data", value: "data" },
      ],
      conventional: false,
      formData: SafeJsonParse(this.dataResults, []),
      siteData: SafeJsonParse(this.dataSite, []),
      showExtraData: {},
      allDataTypes: SafeJsonParse(this.dataDataTypes, []),
      allMethodTypes: [
        { name: "GET", value: "GET" },
        { name: "POST", value: "POST" },
      ],
      form: new Form({
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
        actionPerformed: this.dataActionPerformed,
        backURL: this.dataBackUrl,
        headers: "",
        live_edit: 0,
        linked_module: "",
      }),
      errors: {},
      cacheData: {},
      sortable: null,
      sortingInterval: -1,
      errorMessage: "",
      dataTypesInfo: SafeJsonParse(this.dataDataTypesInfo, []),
      saveURL: this.dataFormAction,
    };
  },
  computed: {
    showQueryForm: function () {
      return this.form.data_type.toLowerCase().indexOf("queryservice") > -1;
    },
    showServiceForm: function () {
      return this.form.data_type.toLowerCase().indexOf("service") > -1;
    },
    showAllUpdateSection: function () {
      return this.dataActionPerformed === "edit" && this.siteData.length > 1;
    },
  },
  methods: {
    fillCopiedData() {
      PasteFromClipboard()
        .then((res) => {
          if (IsJson(this.form.name)) {
            this.setFormData(SafeJsonParse(this.form.name, {}));
          }
        })
        .catch((res) => {
          console.log("unable to paste");
        });
    },
    goConventional(arg) {
      //wanted to go conventional
      if (this.conventional === false) {
        let name = this.form.name;
        this.form.title = name;
        this.form.alias = ("MODULE_" + name.toUpperCase()).replace(/\s/g, "_");
        this.form.view_name = name.toLowerCase().replace(/\s/g, "-");
      }
    },
    setFormData(data) {
      let data_length = Object.keys(data).length;
      let form = document.querySelector("#addEditFrm");
      for (let a in data) {
        //setting document values
        let val = data[a];
        //setting form values;
        if (
          typeof this.form[a] !== "undefined" &&
          typeof this.form[a] !== "function"
        ) {
          this.form[a] = val;
        }

        let ele = form[a] || document.getElementById(a);

        if (ele) {
          let eleType = ele.type;
          // to make it visible for checkbox and radio
          if (
            (eleType === "checkbox" || eleType === "radio") &&
            eleType !== "submit"
          ) {
            this.form[a] = val === 1;
          }
        }
      }
    },
    checkForService(dataType) {
      let self = this;
      this.showExtraData["show"] =
        dataType !== "" &&
        (dataType.indexOf("Service") > -1 || dataType.indexOf("service") > -1);
    },
    createModule() {
      let $this = this;

      preCheck(this);

      this.form
        .post(this.saveURL)
        .then((response) => {
          this.resetForm(response);
        })
        .catch((response) => {
          this.showError(response);
        });

      function preCheck() {
        $this.form.is_seo_module = $this.form.is_seo_module
          ? $this.form.is_seo_module
          : 0;
        $this.form.individual_cache = $this.form.individual_cache
          ? $this.form.individual_cache
          : 0;
        $this.form.update_inAllSites = $this.form.update_inAllSites
          ? $this.form.update_inAllSites
          : 0;
        $this.form.is_mandatory = $this.form.is_mandatory
          ? $this.form.is_mandatory
          : 0;
        $this.form.service_params = $this.form.service_params
          ? $this.form.service_params
          : "";
        $this.form.shared = $this.form.shared ? $this.form.shared : 0;
        $this.form.live_edit = $this.form.live_edit ? $this.form.live_edit : 0;
      }
    },
    showError(res) {
      for (let i in res.errors) {
        if (res.errors.hasOwnProperty(i)) {
          this.errors[i] = res.errors[i][0];
        }
      }

      this.errorMessage = res.message;
    },
    hideErrorMessage(event) {
      let name = event.target.getAttribute("name");
      this.errors[name] = "";

      if (this.errorMessage !== "") {
        this.errorMessage = "";
      }
    },
    resetForm(response) {
      //console.log("response.isSaved ",response.isSaved);
      if (!isTrue(response.isSaved)) {
        this.errorMessage = {};
        Toast.show(this, "There is some error...");
        this.errorMessage = response.message;
      } else {
        this.errorMessage = "";

        let action = this.dataActionPerformed.toUpperCase();

        Toast.show(this, "Saved...");

        if (isTrue(response.isSaved)) {
          window.location.href = response.backURL;
        }
      }

      function isTrue(isSaved) {
        return isSaved.toString() === "true" || isSaved.toString() === "1";
      }
    },
  },
};
</script>
