<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <title-bar
      data-title="Create New Module"
      :data-back-url="dataBackUrl"
      data-show-copy="false"
      data-show-paste="false"
    ></title-bar>
    <form
      :action="saveURL"
      class="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
      method="post"
      role="form"
      v-on:keyup="hideErrorMessage($event)"
      v-on:submit.prevent="createModule"
    >
      <!-- Dashboard Header -->
      <div class="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
          <h3 class="text-xs font-black uppercase tracking-[0.2em] text-slate-400">System Module Definition</h3>
      </div>

      <div class="p-8 lg:p-10 space-y-12">
          <!-- Configuration Toggle -->
          <div class="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
              <label class="flex items-center cursor-pointer group leading-none">
                <div class="relative flex items-center">
                    <input
                      v-model="form.createFiles"
                      type="checkbox"
                      name="create-validator"
                      class="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded-lg focus:ring-blue-500 transition-all shadow-sm"
                    />
                </div>
                <div class="ml-4">
                    <span class="text-xs font-black uppercase tracking-widest text-slate-800 group-hover:text-blue-600 transition-colors">Generate Logic & Scaffolding</span>
                    <p class="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-1 opacity-70">Automates creation of Controller, Model, View, and Validator files.</p>
                </div>
              </label>
          </div>

          <!-- Module Identity -->
          <div class="space-y-8">
              <div class="flex items-center gap-3">
                  <i class="fa fa-cube text-blue-500"></i>
                  <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-800">Module Identity & Presentation</h4>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input v-model="form.display_name" type="hidden" />
                  
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-700 block">Module Name</label>
                    <input
                      v-model="form.name"
                      class="form-control w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900"
                      name="name"
                      placeholder="e.g. BlogPost"
                      required
                      type="text"
                      @blur="updateControllerName()"
                    />
                    <div class="px-2 text-[10px] text-red-500 font-bold uppercase tracking-tight mt-1" v-if="errors.name">{{ errors.name }}</div>
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-700 block">Sub-Title / Description</label>
                    <input
                      v-model="form.sub_title"
                      class="form-control w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900"
                      name="sub_title"
                      placeholder="Optional descriptive title"
                      type="text"
                    />
                    <div class="px-2 text-[10px] text-red-500 font-bold uppercase tracking-tight mt-1" v-if="errors.sub_title">{{ errors.sub_title }}</div>
                  </div>
              </div>

              <!-- Technical Core -->
              <div class="space-y-8 pt-10 border-t border-slate-100">
                  <div class="flex items-center gap-3 text-amber-600">
                      <i class="fa fa-code"></i>
                      <h4 class="text-[10px] font-black uppercase tracking-widest">Logic & Architecture</h4>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div class="space-y-2">
                        <label class="text-sm font-medium text-slate-700 block">Controller Mapping</label>
                        <input
                          v-model="form.controller_name"
                          class="form-control w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900"
                          name="controller_name"
                          placeholder="e.g. blog-posts"
                          required
                          type="text"
                          @blur="updateControllerName(form.controller_name)"
                        />
                        <div class="px-2 text-[10px] text-red-500 font-bold uppercase tracking-tight mt-1" v-if="errors.controller_name">{{ errors.controller_name }}</div>
                      </div>

                      <div class="space-y-2">
                        <label class="text-sm font-medium text-slate-700 block">Organizational Parent</label>
                        <select v-model="form.parent_id" class="form-select w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 cursor-pointer">
                          <option value="">No Parent (Root Level)</option>
                          <option v-for="module in allModules" :key="module.id" :value="module.id">
                            {{ module.name }}
                          </option>
                        </select>
                        <div class="px-2 text-[10px] text-red-500 font-bold uppercase tracking-tight mt-1" v-if="errors.parent_id">{{ errors.parent_id }}</div>
                      </div>

                      <div class="space-y-2">
                        <label class="text-sm font-medium text-slate-700 block">Dashboard Icon (FontAwesome)</label>
                        <div class="flex items-center gap-3">
                            <div class="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-center min-w-[50px] shadow-inner text-slate-400">
                                <i :class="form.icon_css ||'fa fa-cube'" class="text-lg"></i>
                            </div>
                            <input
                              v-model="form.icon_css"
                              class="form-control w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900"
                              name="icon_css"
                              placeholder="fa fa-pencil"
                              required
                              type="text"
                            />
                        </div>
                        <div class="px-2 text-[10px] text-red-500 font-bold uppercase tracking-tight mt-1" v-if="errors.icon_css">{{ errors.icon_css }}</div>
                      </div>
                  </div>
              </div>

              <!-- Interface Routing -->
              <div class="space-y-8 pt-10 border-t border-slate-100">
                  <div class="flex items-center gap-3 text-emerald-600">
                      <i class="fa fa-eye"></i>
                      <h4 class="text-[10px] font-black uppercase tracking-widest">Interface Routing</h4>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div class="space-y-2">
                        <label class="text-sm font-medium text-slate-700 block">Listing Template</label>
                        <input v-model="form.list_view_name" class="form-control w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900" placeholder="common/listing" />
                      </div>

                      <div class="space-y-2">
                        <label class="text-sm font-medium text-slate-700 block">Editor Template</label>
                        <input v-model="form.edit_view_name" class="form-control w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900" placeholder="addedit" />
                      </div>
                  </div>
              </div>
          </div>

          <!-- Data Source Section (Conditional) -->
          <div v-if="form.createFiles" class="pt-10 border-t border-slate-100 space-y-8">
              <div class="flex items-center gap-3 text-indigo-600">
                  <i class="fa fa-database"></i>
                  <h4 class="text-[10px] font-black uppercase tracking-widest">Master Data Configuration</h4>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-700 block">Main Table Source</label>
                    <select
                      v-model="mainModel.tableName"
                      class="form-control w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 cursor-pointer"
                      @change="populateMainDataFields()"
                    >
                      <option value="">Choose Main Database Table</option>
                      <option v-for="table in allTables" :key="table.name" :value="table.name">
                        {{ table.name }}
                      </option>
                    </select>
                    <div v-if="mainModel.tableName" class="mt-2 ml-1">
                        <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-widest">
                          <i class="fa fa-code mr-1.5"></i> {{ getModelName(mainModel.tableName) }}
                        </span>
                    </div>
                  </div>

                  <div class="space-y-4">
                    <div class="space-y-2">
                        <label class="text-sm font-medium text-slate-700 block">Relational Models</label>
                        <select
                          v-model="relationModels.tableName"
                          class="form-control w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4 hover:border-gray-300 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 cursor-pointer"
                          @change="addRelationModel()"
                        >
                          <option value="">Add Joint Table Relation</option>
                          <option v-for="table in allTables" :key="table.name" :value="table.name">
                            {{ table.name }}
                          </option>
                        </select>
                    </div>

                    <div v-if="hasRelation()" class="grid grid-cols-1 gap-4">
                        <div v-for="(rModel, index) in relationModels.models" :key="index" class="bg-slate-50 border border-slate-100 rounded-xl p-5 shadow-sm relative group overflow-hidden transition-all hover:bg-white hover:border-indigo-200">
                            <div class="flex flex-col gap-4">
                                <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                                    <span class="text-[10px] font-black text-indigo-600 uppercase tracking-widest truncate max-w-[150px]">{{ rModel.model.split('::')[0] }}</span>
                                    <button
                                      type="button"
                                      class="text-slate-300 hover:text-red-500 transition-colors"
                                      @click="removeRelationModel(index, rModel.model)"
                                    >
                                      <i class="fa fa-times-circle text-lg"></i>
                                    </button>
                                </div>
                                <div class="grid grid-cols-2 gap-3">
                                     <input
                                      :value="rModel.relationAlias"
                                      @input="updateRelationModel($event, index, 'relationAlias')"
                                      class="bg-white border border-slate-200 text-xs font-bold rounded-lg px-3 py-2 focus:border-indigo-500 outline-none transition-colors"
                                      placeholder="Alias"
                                    />
                                    <select
                                      class="bg-white border border-slate-200 text-xs font-bold rounded-lg px-3 py-2 outline-none cursor-pointer"
                                      @change="updateRelationModel($event, index, 'relationType')"
                                    >
                                      <option value="hasMany">hasMany</option>
                                      <option value="belongsTo">belongsTo</option>
                                      <option value="hasOne">hasOne</option>
                                      <option value="belongsToMany">belongsToMany</option>
                                      <option value="hasOneThrough">hasOneThrough</option>
                                      <option value="hasManyThrough">hasManyThrough</option>
                                    </select>
                                </div>
                                <label class="flex items-center cursor-pointer mt-1 leading-none group/lang">
                                    <input v-model="rModel.isLanguage" type="checkbox" class="w-4 h-4 text-indigo-600 rounded-lg border-slate-300" />
                                    <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 group-hover/lang:text-indigo-600 transition-colors">I18n / Language Table?</span>
                                </label>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
          </div>

          <!-- Field Selector Grid -->
          <div v-if="hasMainDataSource()" class="mt-12 space-y-6 pt-10 border-t border-slate-100">
              <div class="flex items-center justify-between">
                <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Fields to Include</h4>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <!-- Main Table Fields -->
                  <div class="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col h-[400px] overflow-hidden">
                      <div class="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-blue-50/20">
                         <span class="text-[10px] font-black text-blue-700 uppercase tracking-widest">{{ getModelName(mainModel.tableName).split('::')[0] }}</span>
                         <button type="button" @click="selectAllField(mainModel)" class="text-[9px] font-black bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-all uppercase tracking-widest">Add All</button>
                      </div>
                      <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
                         <ul class="space-y-1">
                            <li
                                v-for="field in mainModel.fields"
                                :key="field"
                                @click="selectField(field, mainModel)"
                                class="px-4 py-3 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all flex items-center justify-between group cursor-pointer active:scale-[0.98]"
                            >
                                {{ field }}
                                <i class="fa fa-plus-circle text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                            </li>
                         </ul>
                      </div>
                  </div>

                  <!-- Relation Fields -->
                  <div
                    v-for="(rModel, index) in relationModels.models"
                    :key="index"
                    class="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col h-[400px] overflow-hidden"
                  >
                     <div class="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-purple-50/20">
                         <div class="flex flex-col">
                            <span class="text-[10px] font-black text-purple-700 uppercase tracking-widest">{{ rModel.model.split('::')[0] }}</span>
                            <span class="text-[9px] font-bold text-purple-400 mt-0.5 uppercase tracking-tighter">via: {{ rModel.relationAlias }}</span>
                         </div>
                         <button type="button" @click="selectAllField(mainModel, rModel.relationAlias)" class="text-[9px] font-black bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition-all uppercase tracking-widest">Add All</button>
                      </div>
                      <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
                         <ul class="space-y-1">
                            <li
                                v-for="field in rModel.fields"
                                :key="field"
                                @click="selectField(field, mainModel, rModel.relationAlias)"
                                class="px-4 py-3 text-xs font-bold text-slate-600 hover:bg-purple-50 hover:text-purple-700 rounded-xl cursor-pointer transition-all flex items-center justify-between group active:scale-[0.98]"
                            >
                                {{ field }}
                                <i class="fa fa-plus-circle text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                            </li>
                         </ul>
                      </div>
                  </div>
              </div>

              <!-- Selected Fields Area -->
              <div v-if="mainModel.selected.length > 0" class="mt-12">
                  <div class="bg-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-800">
                      <div class="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                          <div class="flex items-center gap-3">
                              <div class="h-6 w-1 bg-emerald-500 rounded-full"></div>
                              <h4 class="text-[10px] font-black text-white uppercase tracking-widest">Selected Schema Definition <span class="text-slate-500 ml-2 font-medium normal-case">(Drag to reorder)</span></h4>
                          </div>
                          <button type="button" @click="removeAllField(mainModel)" class="text-[10px] font-black text-rose-400 hover:text-rose-300 transition-colors uppercase tracking-widest border border-rose-400/20 px-4 py-2 rounded-xl">Clear All</button>
                      </div>
                      <ul id="selectedFields" class="flex flex-wrap gap-4 min-h-[60px]">
                        <li
                            v-for="(val, index) in mainModel.selected"
                            :key="val"
                            :data-fieldname="val"
                            class="bg-white/5 border border-white/10 hover:border-emerald-500/50 text-slate-300 px-5 py-3 rounded-xl text-xs font-black flex items-center gap-4 cursor-move hover:bg-white/10 hover:text-white transition-all shadow-xl active:ring-2 active:ring-emerald-500 group"
                        >
                            <i class="fa fa-grip-vertical text-slate-600 group-hover:text-emerald-400"></i>
                            {{ val }}
                            <button type="button" @click="removeField(mainModel, index)" class="text-slate-600 hover:text-rose-400 transition-colors ml-1">
                                <i class="fa fa-times-circle text-lg"></i>
                            </button>
                        </li>
                    </ul>
                  </div>
              </div>
          </div>
      </div>

      <!-- Card Footer -->
      <div class="px-8 py-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-4 overflow-hidden">
          <div v-if="errorMessage !== ''" class="w-full sm:flex-1 bg-red-50 text-red-700 px-6 py-4 rounded-xl border border-red-100 text-[10px] font-black flex items-center gap-4 animate-shake transition-all uppercase tracking-widest">
             <i class="fa fa-exclamation-triangle mr-1"></i> {{ errorMessage }}
          </div>
          
          <a :href="dataBackUrl" class="w-full sm:w-auto text-center px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors order-2 sm:order-1">Back</a>
          
          <button 
            type="submit" 
            name="submit" 
            class="w-full sm:w-auto px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-xl shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-2 order-1 sm:order-2"
          >
              <i class="fa fa-save opacity-50"></i>
              Create Module
          </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick, getCurrentInstance } from "vue";
import TitleBar from "./title-bar.vue";
import AdminConfig from "../../../helpers/admin-config";
import axios from "axios";
import { Toast, SafeJsonParse, CheckBoxAlignment } from "../../../helpers/common";
import Form from "../../../helpers/form";
import Sortable from "sortablejs";
import pluralize from "pluralize";

const props = defineProps([
  "dataDatabaseTables",
  "dataControllerName",
  "dataBackUrl",
  "dataCmsModules",
]);

const instance = getCurrentInstance();
const checkBoxAlignment = CheckBoxAlignment;

class DbData {
  static getFields(table) {
    return new Promise((resolve, reject) => {
      axios
        .get("getFields?table=" + table)
        .then(function (res) {
          resolve(res);
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }
}

const allTables = ref(SafeJsonParse(props.dataDatabaseTables, []));
const allModules = ref(SafeJsonParse(props.dataCmsModules, []));
const mainModel = reactive({ tableName: "", fields: [], modelName: "", selected: [] });
const relationModels = reactive({ tableName: "", models: [] });

const form = reactive(new Form({
  name: "",
  controller_name: "",
  validator_name: "",
  dataWith: [],
  dataSource: "",
  createFiles: true,
  selectedFields: [],
  relationModels: [],
  parent_id: "",
  display_name: "",
  sub_title: "",
  icon_css: "",
  list_view_name: "",
  edit_view_name: "",
}));

const errors = ref({});
const cacheData = reactive({});
const sortable = ref(null);
const sortingInterval = ref(-1);
const errorMessage = ref("");

const saveURL = computed(() => {
  return AdminConfig.admin_path(props.dataControllerName + "/createModule");
});

const getModelName = (modelName = "") => {
  modelName = pluralize.singular(modelName) + "::class";
  let arr = modelName.split("_");
  arr = arr.map((a) => a.charAt(0).toUpperCase() + a.substr(1, a.length));
  return arr.join("");
};

const isControllerExists = (name = "") => {
  if (name !== "") {
    axios.get("isControllerExists?name=" + name).then(function (res) {
      if (res.data === 1) {
        Toast.show(instance.proxy, "Controller already exist");
      }
    });
  }
};

const updateControllerName = (controller_name) => {
  let name = controller_name || form.name;
  name = name.toLowerCase().replace(/\s/g, "");

  form.controller_name = pluralize.singular(name);
  form.validator_name = form.controller_name;

  if (controller_name !== undefined) {
    isControllerExists(form.controller_name);
  }
  form.icon_css = form.controller_name;
};

const populateMainDataFields = () => {
  if (mainModel.tableName !== "") {
    mainModel.fields = ["Please wait..."];
    DbData.getFields(mainModel.tableName).then(function (res) {
      mainModel.fields = res.data;
    });
    mainModel.modelName = getModelName(mainModel.tableName);
    form.dataSource = mainModel.modelName;
  }
};

const updateWithData = () => {
  form.dataWith = [];
  for (let i = 0; i < relationModels.models.length; i++) {
    let current = relationModels.models[i];
    if (form.dataWith.indexOf(current.relationAlias) === -1) {
      form.dataWith.push(current.relationAlias);
    }
  }
};

const hasInRelationModel = (modelName) => {
  return cacheData[modelName] || false;
};

const addRelationModel = () => {
  if (relationModels.tableName !== "") {
    let tableName = relationModels.tableName;
    let modelName = getModelName(tableName);

    if (hasInRelationModel(modelName) === false) {
      let relationAlias = "";
      if (tableName.endsWith("_langs") || tableName.endsWith("_sites")) {
        relationAlias = tableName.endsWith("_langs") ? "lang" : "site";
      } else {
        relationAlias = pluralize
          .singular(tableName.replace(/_/g, ""))
          .toLowerCase();
      }

      let isLanguage = relationAlias === "lang";
      let relationType = "hasMany";

      let relationalData = {
        model: modelName,
        relationAlias: relationAlias,
        relationType: relationType,
        isLanguage: isLanguage,
        fields: [],
        selected: [],
      };

      if (!cacheData[modelName]) {
        relationModels.models.push(relationalData);
      }
      cacheData[modelName] = relationalData;
      cacheData[modelName].fields = ["Please wait..."];
      DbData.getFields(tableName).then((res) => {
        cacheData[modelName].fields = res.data;
      });

      updateWithData();
    }
  }
};

const removeSelectedRelationFields = (alias) => {
  if (mainModel.selected.length > 0) {
    mainModel.selected = mainModel.selected.filter(
      (current) => !current.startsWith(alias + ".")
    );
  }
  form.dataWith = form.dataWith.filter((current) => current !== alias);
};

const updateRelationModel = (event, index, key) => {
  let alias = relationModels.models[index][key];
  relationModels.models[index][key] = event.target.value;

  if (key === "relationAlias") {
    relationModels.models[index].selected = [];
    removeSelectedRelationFields(alias);
  }

  updateWithData();
};

const removeRelationModel = (index, model) => {
  let alias = relationModels.models[index].relationAlias;
  delete cacheData[model];
  relationModels.models.splice(index, 1);
  relationModels.tableName = "";
  removeSelectedRelationFields(alias);
  updateWithData();
};

const hasRelation = () => relationModels.models.length > 0;
const hasMainDataSource = () => mainModel.tableName !== "";

const cancelSortingCallback = () => {
  if (sortingInterval.value !== -1) {
    clearInterval(sortingInterval.value);
  }
};

const sortingCallback = () => {
  cancelSortingCallback();
};

const enableSorting = () => {
  nextTick(function () {
    if (sortable.value != null) {
      sortable.value.destroy();
    }
    let el = document.getElementById("selectedFields");
    if (el) {
      sortable.value = Sortable.create(el, {
        onEnd: sortingCallback,
        onStart: cancelSortingCallback,
      });
    }
  });
};

const selectField = (field, where, relation = "") => {
  const fieldName = relation !== "" ? relation + "." + field : field;
  if (where.selected.indexOf(fieldName) === -1) {
    where.selected.push(fieldName);
  }
  enableSorting();
};

const selectAllField = (where, relation = "") => {
  if (where.selected.length === 0) {
    where.selected = where.fields.slice();
    if (relation !== "") {
      where.selected = where.selected.map((c) => relation + "." + c);
    }
  } else {
    for (let i = 0; i < where.fields.length; i++) {
      selectField(where.fields[i], where, relation);
    }
  }
  enableSorting();
};

const removeField = (where, index) => {
  where.selected.splice(index, 1);
};

const removeAllField = (where) => {
  where.selected = [];
  form.selectedFields = [];
};

const setSortedFields = () => {
  let items = document.querySelectorAll("#selectedFields li");
  let count = items.length;
  if (count > 0) {
    let selected = [];
    for (let i = 0; i < count; i++) {
      let current = items[i];
      let field = current.getAttribute("data-fieldname");
      selected.push(field);
    }
    form.selectedFields = selected;
  }
};

const showError = (res) => {
  errors.value = {};
  for (let i in res.errors) {
    if (res.errors.hasOwnProperty(i)) {
      errors.value[i] = res.errors[i][0];
    }
  }
  errorMessage.value = res.message;
};

const hideErrorMessage = (event) => {
  let name = event.target.getAttribute("name");
  if (name) errors.value[name] = "";
  if (errorMessage.value !== "") errorMessage.value = "";
};

const resetFormFields = (response) => {
  mainModel.tableName = "";
  mainModel.fields = [];
  mainModel.modelName = "";
  mainModel.selected = [];
  relationModels.tableName = "";
  relationModels.models = [];
  Object.keys(cacheData).forEach(key => delete cacheData[key]);

  if (response.created === 0) {
    Toast.show(instance.proxy, "There is some error...");
    errorMessage.value = response.message;
  } else {
    Toast.show(instance.proxy, "Created...");
  }
};

const createModule = () => {
  setSortedFields();
  form.relationModels = relationModels;
  form
    .post(saveURL.value)
    .then((response) => resetFormFields(response))
    .catch((response) => showError(response));
};
</script>

