<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <form
      :action="saveURL"
      class="bg-white shadow-lg rounded-lg border border-gray-100 overflow-hidden"
      method="post"
      role="form"
      v-on:keyup="hideErrorMessage($event)"
      v-on:submit.prevent="createModule"
    >
      <div class="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
          <h2 class="text-2xl font-black text-gray-800 tracking-tight">Create New Module</h2>
          <p class="text-sm text-gray-500 mt-1">Define your module configuration and data source</p>
      </div>

      <div class="p-8 space-y-6">
          <!-- File Creation Toggle -->
          <div class="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
              <label class="flex items-center cursor-pointer group leading-none">
                <div class="relative flex items-center">
                    <input
                      v-model="form.createFiles"
                      type="checkbox"
                      name="create-validator"
                      class="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded-md focus:ring-blue-500 transition-all shadow-sm"
                    />
                </div>
                <div style="position: relative; top: -5px; left: 7px;">
                    <span class="text-sm font-bold text-gray-800 group-hover:text-blue-700 transition-colors">Generate Boilerplate Files</span>
                    <p class="text-[11px] text-gray-500 mt-0.5">Automates creation of Controller, Model, View, and Validator.</p>
                </div>
              </label>
          </div>

          <!-- Basic Info Section -->
          <div class="space-y-6">
              <input v-model="form.display_name" type="hidden" />
              
              <div class="space-y-1.5">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Module Name</label>
                <input
                  v-model="form.name"
                  class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-sm"
                  name="name"
                  placeholder="e.g. BlogPost"
                  required
                  type="text"
                  @blur="updateControllerName()"
                />
                <div class="px-2 text-[11px] text-red-500 font-bold" v-if="errors.name">{{ errors.name }}</div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Sub Title</label>
                <input
                  v-model="form.sub_title"
                  class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-sm"
                  name="sub_title"
                  placeholder="Optional descriptive title"
                  type="text"
                />
                <div class="px-2 text-[11px] text-red-500 font-bold" v-if="errors.sub_title">{{ errors.sub_title }}</div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Controller Name</label>
                <input
                  v-model="form.controller_name"
                  class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-sm"
                  name="controller_name"
                  placeholder="e.g. blog-posts"
                  required
                  type="text"
                  @blur="updateControllerName(form.controller_name)"
                />
                <div class="px-2 text-[11px] text-red-500 font-bold" v-if="errors.controller_name">{{ errors.controller_name }}</div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Parent Module</label>
                <select v-model="form.parent_id" class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-sm cursor-pointer">
                  <option value="">No Parent (Root Level)</option>
                  <option v-for="module in allModules" :key="module.id" :value="module.id">
                    {{ module.name }}
                  </option>
                </select>
                <div class="px-2 text-[11px] text-red-500 font-bold" v-if="errors.parent_id">{{ errors.parent_id }}</div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Icon CSS (FontAwesome)</label>
                <div class="flex items-center gap-3">
                    <div class="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-center justify-center min-w-[50px] shadow-inner">
                        <i :class="form.icon_css || 'fa fa-cube'" class="text-gray-400 text-xl"></i>
                    </div>
                    <input
                      v-model="form.icon_css"
                      class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-sm"
                      name="icon_css"
                      placeholder="fa fa-pencil"
                      required
                      type="text"
                    />
                </div>
                <div class="px-2 text-[11px] text-red-500 font-bold" v-if="errors.icon_css">{{ errors.icon_css }}</div>
              </div>

              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">List View</label>
                <input v-model="form.list_view_name" class="bg-white border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none block w-full px-3 py-2" placeholder="common/listing" />
              </div>

              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Edit View</label>
                <input v-model="form.edit_view_name" class="bg-white border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none block w-full px-3 py-2" placeholder="addedit" />
              </div>
          </div>

          <!-- Data Source Section (Conditional) -->
          <div v-if="form.createFiles" class="border-t border-gray-100 pt-8 space-y-6">
              <div class="flex items-center gap-3 mb-4">
                  <div class="h-8 w-1 bg-blue-600 rounded-full"></div>
                  <h3 class="text-lg font-black text-gray-800">Master Data Configuration</h3>
              </div>

              <div class="space-y-6">
                  <div class="space-y-1.5">
                    <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Main Table</label>
                    <select
                      v-model="mainModel.tableName"
                      class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-sm cursor-pointer"
                      @change="populateMainDataFields()"
                    >
                      <option value="">Choose Main Database Table</option>
                      <option v-for="table in allTables" :key="table.name" :value="table.name">
                        {{ table.name }}
                      </option>
                    </select>
                    <div v-if="mainModel.tableName" class="mt-2 ml-1">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                          <i class="fa fa-code mr-1.5"></i> {{ getModelName(mainModel.tableName) }}
                        </span>
                    </div>
                  </div>

                  <div class="space-y-4">
                    <div class="space-y-1.5">
                        <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Relational Models</label>
                        <select
                          v-model="relationModels.tableName"
                          class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-sm cursor-pointer"
                          @change="addRelationModel()"
                        >
                          <option value="">Add Joint Table Relation</option>
                          <option v-for="table in allTables" :key="table.name" :value="table.name">
                            {{ table.name }}
                          </option>
                        </select>
                    </div>

                    <div v-if="hasRelation()" class="space-y-3">
                        <div v-for="(rModel, index) in relationModels.models" :key="index" class="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm relative group overflow-hidden">
                            <div class="flex flex-col gap-3">
                                <div class="flex items-center justify-between">
                                    <span class="text-xs font-black text-blue-600 truncate max-w-[150px]">{{ rModel.model.split('::')[0] }}</span>
                                    <button
                                      type="button"
                                      class="text-gray-400 hover:text-red-500 transition-colors"
                                      @click="removeRelationModel(index, rModel.model)"
                                    >
                                      <i class="fa fa-times-circle"></i>
                                    </button>
                                </div>
                                <div class="grid grid-cols-2 gap-2">
                                     <input
                                      :value="rModel.relationAlias"
                                      @input="updateRelationModel($event, index, 'relationAlias')"
                                      class="bg-white border border-gray-200 text-[11px] rounded-lg px-2 py-1.5 focus:border-blue-500 outline-none shadow-sm"
                                      placeholder="Alias"
                                    />
                                    <select
                                      class="bg-white border border-gray-200 text-[11px] rounded-lg px-2 py-1.5 shadow-sm"
                                      @change="updateRelationModel($event, index, 'relationType')"
                                    >
                                      <option value="hasMany">hasMany</option>
                                      <option value="belongsTo">belongsTo</option>
                                      <option value="hasOne">hasOne</option>
                                    </select>
                                </div>
                                <label class="flex items-center cursor-pointer mt-1 leading-none">
                                    <input v-model="rModel.isLanguage" type="checkbox" class="w-3.5 h-3.5 text-blue-600 rounded border-gray-300" />
                                    <span class="text-[10px] font-bold text-gray-500" :style="checkBoxAlignment">I18n / Language?</span>
                                </label>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>

              <!-- Field Selector Grid -->
              <div v-if="hasMainDataSource()" class="mt-8 space-y-4">
                  <div class="flex items-center justify-between">
                    <h4 class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Select Fields to Include</h4>
                  </div>
                  
                  <div class="space-y-4">
                      <!-- Main Table Fields -->
                      <div class="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col h-[400px]">
                          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-blue-50/20">
                             <span class="text-xs font-black text-blue-800 tracking-tight">{{ getModelName(mainModel.tableName).split('::')[0] }}</span>
                             <button type="button" @click="selectAllField(mainModel)" class="text-[10px] font-black bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-all">Add All</button>
                          </div>
                          <div class="flex-1 overflow-y-auto p-3 custom-scrollbar">
                             <ul class="space-y-1">
                                <li
                                    v-for="field in mainModel.fields"
                                    :key="field"
                                    @click="selectField(field, mainModel)"
                                    class="px-3 py-2.5 text-xs font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl cursor-not-allowed transition-all flex items-center justify-between group active:scale-[0.98] cursor-pointer"
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
                        class="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col h-[400px]"
                      >
                         <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-purple-50/20">
                             <div class="flex flex-col">
                                <span class="text-xs font-black text-purple-800 tracking-tight">{{ rModel.model.split('::')[0] }}</span>
                                <span class="text-[9px] font-bold text-purple-400 mt-0.5 uppercase tracking-widest">via: {{ rModel.relationAlias }}</span>
                             </div>
                             <button type="button" @click="selectAllField(mainModel, rModel.relationAlias)" class="text-[10px] font-black bg-purple-600 text-white px-2 py-1 rounded-md hover:bg-purple-700 transition-all">Add All</button>
                          </div>
                          <div class="flex-1 overflow-y-auto p-3 custom-scrollbar">
                             <ul class="space-y-1">
                                <li
                                    v-for="field in rModel.fields"
                                    :key="field"
                                    @click="selectField(field, mainModel, rModel.relationAlias)"
                                    class="px-3 py-2.5 text-xs font-bold text-gray-600 hover:bg-purple-50 hover:text-purple-700 rounded-xl cursor-pointer transition-all flex items-center justify-between group active:scale-[0.98]"
                                >
                                    {{ field }}
                                    <i class="fa fa-plus-circle text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                </li>
                             </ul>
                          </div>
                      </div>
                  </div>
              </div>

              <!-- Selected Fields Area -->
              <div v-if="mainModel.selected.length > 0" class="mt-8">
                  <div class="bg-gray-900 rounded-lg p-8 shadow-lg border border-gray-800">
                      <div class="flex items-center justify-between mb-6 border-b border-gray-800 pb-4">
                          <div class="flex items-center gap-3">
                              <div class="h-6 w-1 bg-green-500 rounded-full"></div>
                              <h4 class="text-sm font-black text-white uppercase tracking-widest">Selected Schema <span class="text-gray-500 ml-2 font-medium">(Drag to reorder)</span></h4>
                          </div>
                          <button type="button" @click="removeAllField(mainModel)" class="text-[10px] font-black text-red-400 hover:bg-red-400/10 px-3 py-1 rounded-lg border border-red-400/20 transition-all uppercase tracking-widest">Clear All</button>
                      </div>
                      <ul id="selectedFields" class="flex flex-wrap gap-3 min-h-[50px]">
                        <li
                            v-for="(val, index) in mainModel.selected"
                            :key="val"
                            :data-fieldname="val"
                            class="bg-gray-800 border-2 border-transparent hover:border-blue-500/50 text-gray-300 px-4 py-2.5 rounded-xl text-[11px] font-black flex items-center gap-4 cursor-move hover:bg-gray-700 hover:text-white transition-all shadow-lg active:ring-2 active:ring-blue-500 group"
                        >
                            <i class="fa fa-grip-vertical text-gray-600 group-hover:text-blue-400"></i>
                            {{ val }}
                            <button type="button" @click="removeField(mainModel, index)" class="text-gray-600 hover:text-red-400 transition-colors ml-1">
                                <i class="fa fa-times-circle text-base"></i>
                            </button>
                        </li>
                    </ul>
                  </div>
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
            class="w-full sm:w-auto px-16 py-4.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-lg shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 active:scale-95 text-lg tracking-tight"
            name="submit"
            type="submit"
          >
            Create Module
          </button>
          <a :href="dataBackUrl" class="w-full sm:w-auto px-12 py-4.5 bg-white border border-gray-200 text-gray-500 font-bold rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-all text-center">
            Cancel
          </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick, getCurrentInstance } from "vue";
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
    mainModel.selected = mainModel.selected.filter(current => !current.startsWith(alias + "."));
  }
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

