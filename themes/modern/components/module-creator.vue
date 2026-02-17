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
              <label class="flex items-center gap-3 cursor-pointer group">
                <div class="relative flex items-center">
                    <input
                      v-model="form.createFiles"
                      type="checkbox"
                      name="create-validator"
                      class="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded-md focus:ring-blue-500 transition-all shadow-sm"
                    />
                </div>
                <div>
                    <span class="text-sm font-bold text-gray-800 group-hover:text-blue-700 transition-colors">Generate Boilerplate Files</span>
                    <p class="text-[11px] text-gray-500 mt-0.5">Automates creation of Controller, Model, View, and Validator.</p>
                </div>
              </label>
          </div>

          <!-- Basic Info Section -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">List View</label>
                        <input v-model="form.list_view_name" class="bg-white border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none block w-full px-3 py-2" placeholder="common/listing" />
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Edit View</label>
                        <input v-model="form.edit_view_name" class="bg-white border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none block w-full px-3 py-2" placeholder="addedit" />
                    </div>
                </div>
              </div>
          </div>

          <!-- Data Source Section (Conditional) -->
          <div v-if="form.createFiles" class="border-t border-gray-100 pt-8 space-y-6">
              <div class="flex items-center gap-3 mb-4">
                  <div class="h-8 w-1 bg-blue-600 rounded-full"></div>
                  <h3 class="text-lg font-black text-gray-800">Master Data Configuration</h3>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                                <label class="flex items-center gap-2 cursor-pointer mt-1">
                                    <input v-model="rModel.isLanguage" type="checkbox" class="w-3.5 h-3.5 text-blue-600 rounded border-gray-300" />
                                    <span class="text-[10px] font-bold text-gray-500">I18n / Language?</span>
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
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

<script>
import AdminConfig from "../../../helpers/admin-config";
import axios from "axios";

import { Toast, SafeJsonParse } from "../../../helpers/common";
import Form from "../../../helpers/form";
import Sortable from "sortablejs";
import pluralize from "pluralize";

class DbData {
  static get data() {
    return {};
  }

  static getFields(table) {
    return new Promise((resolve, reject) => {
      axios
        .get("getFields?table=" + table)
        .then(function (res) {
          resolve(res);
        })
        .catch(function () {
          reject(this);
        });
    });
  }
}

export default {
  mounted() {
    //console.log("backUrl "+this.dataBackUrl)
    //console.log(this.controllerName);
  },
  props: [
    "dataDatabaseTables",
    "dataControllerName",
    "dataBackUrl",
    "dataCmsModules",
  ],
  computed: {
    saveURL: function () {
      return AdminConfig.admin_path(this.dataControllerName + "/createModule");
    },
  },
  data() {
    return {
      allTables: SafeJsonParse(this.dataDatabaseTables, []),
      allModules: SafeJsonParse(this.dataCmsModules, []),
      mainModel: { tableName: "", fields: [], modelName: "", selected: [] },
      relationModels: { tableName: "", models: [] },

      form: new Form({
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
      }),
      errors: {},
      cacheData: {},
      sortable: null,
      sortingInterval: -1,
      errorMessage: "",
    };
  },
  methods: {
    updateControllerName(controller_name) {
      let name = controller_name || this.form.name;
      name = name.toLowerCase().replace(/\s/g, "");

      this.form.controller_name = pluralize.singular(name);
      this.form.validator_name = this.form.controller_name;

      //check controller existence
      if (controller_name !== undefined) {
        this.isControllerExists(this.form.controller_name);
      }

      this.form.icon_css = this.form.controller_name;

      //console.log("this.form.validator_name "+this.form.validator_name);
    },
    getModelName(modelName = "") {
      let tableName = modelName;
      let $this = this;
      modelName = pluralize.singular(modelName) + "::class";
      let arr = modelName.split("_");
      arr = arr.map((a) => a.charAt(0).toUpperCase() + a.substr(1, a.length));

      return arr.join("");
    },
    populateMainDataFields() {
      let $this = this;
      if (this.mainModel.tableName !== "") {
        this.mainModel.fields = ["Please wait..."];
        DbData.getFields(this.mainModel.tableName).then(function (res) {
          $this.mainModel.fields = res.data;
        });
        this.mainModel.modelName = this.getModelName(this.mainModel.tableName);
        this.form.dataSource = this.mainModel.modelName;
      }
    },
    updateWithData() {
      this.form.dataWith = [];
      for (let i = 0; i < this.relationModels.models.length; i++) {
        let current = this.relationModels.models[i];
        if (this.form.dataWith.indexOf(current.relationAlias) === -1) {
          this.form.dataWith.push(current.relationAlias);
        }
      }
    },
    addRelationModel() {
      if (this.relationModels.tableName !== "") {
        let tableName = this.relationModels.tableName;
        let modelName = this.getModelName(tableName);

        if (this.hasInRelationModel(modelName) === false) {
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

          //not to show same table again.
          if (!this.cacheData[modelName]) {
            this.relationModels.models.push(relationalData);
          }
          //Add in cache
          this.cacheData[modelName] = relationalData;
          this.cacheData[modelName].fields = ["Please wait..."];
          DbData.getFields(tableName).then((res) => {
            this.cacheData[modelName].fields = res.data;
          });

          this.updateWithData();
        }
      }
    },
    hasInRelationModel(modelName) {
      return this.cacheData[modelName] || false;
    },
    updateRelationModel(event, index, key) {
      let alias = this.relationModels.models[index][key];
      this.relationModels.models[index][key] = event.target.value;

      if (key === "relationAlias") {
        //reset
        this.relationModels.models[index].selected = [];
        this.removeSelectedRelationFields(alias);
      }

      this.updateWithData();
    },
    removeSelectedRelationFields(alias) {
      if (this.mainModel.selected.length > 0) {
        let selected = [];
        for (let i = 0; i < this.mainModel.selected.length; i++) {
          let current = this.mainModel.selected[i];
          if (!current.startsWith(alias + ".")) {
            selected.push(current);
          } else {
            // this.mainModel.selected.splice(i, 1); this is not working
          }
        }
        this.mainModel.selected = selected;
      }
    },
    removeRelationModel(index, model) {
      let alias = this.relationModels.models[index].relationAlias;

      delete this.cacheData[model];
      this.relationModels.models.splice(index, 1);
      this.relationModels.tableName = "";

      this.removeSelectedRelationFields(alias);
    },
    hasRelation() {
      return this.relationModels.models.length > 0;
    },
    hasMainDataSource() {
      return this.mainModel.tableName !== "";
    },
    selectAllField(where, relation = "") {
      if (where.selected.length === 0) {
        where.selected = where.fields.slice();
        if (relation !== "") {
          where.selected = where.selected.map((c) => relation + "." + c);
        }
      } else {
        for (let i = 0; i < where.fields.length; i++) {
          this.selectField(where.fields[i], where, relation);
        }
      }

      this.enableSorting();
    },
    selectField(field, where, relation = "") {
      field = relation !== "" ? relation + "." + field : field;

      if (where.selected.indexOf(field) === -1) {
        where.selected.push(field);
      }

      this.enableSorting();
    },
    removeField(where, index) {
      where.selected.splice(index, 1);
    },
    removeAllField(where) {
      where.selected = [];
      this.form.selectedFields = [];
    },
    isControllerExists(name = "") {
      if (name !== "") {
        let $this = this;
        axios.get("isControllerExists?name=" + name).then(function (res) {
          if (res.data === 1) {
            Toast.show($this, "Controller already exist");
          }
        });
      }
    },
    createModule() {
      this.setSortedFields();
      this.form.relationModels = this.relationModels;

      //console.log(this.mainModel);
      //console.log(this.relationModels);
      //console.log(this.form);

      this.form
        .post(this.saveURL)
        .then((response) => this.resetForm(response))
        .catch((response) => this.showError(response));
    },
    enableSorting() {
      this.$nextTick(function () {
        if (this.sortable != null) {
          this.sortable.destroy();
        }
        let el = document.getElementById("selectedFields");
        this.sortable = Sortable.create(el, {
          onEnd: this.sortingCallback,
          onStart: this.cancelSortingCallback,
        });
      });
    },
    cancelSortingCallback() {
      if (this.sortingInterval !== -1) {
        clearInterval(this.sortingInterval);
      }
    },
    sortingCallback() {
      this.cancelSortingCallback();
    },
    setSortedFields() {
      let items = document.querySelectorAll("#selectedFields li");
      let count = items.length;
      if (count > 1) {
        let selected = [];
        for (let i = 0; i < count; i++) {
          let current = items[i];
          let field = current.getAttribute("data-fieldname");
          selected.push(field);
        }
        this.form.selectedFields = selected;
      }
    },
    showError(res) {
      this.errors = {};
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
      this.mainModel = {
        tableName: "",
        fields: [],
        modelName: "",
        selected: [],
      };
      this.relationModels = { tableName: "", models: [] };

      if (response.created === 0) {
        Toast.show(this, "There is some error...");
        this.errorMessage = response.message;
      } else {
        Toast.show(this, "Created...");
      }
    },
  },
};
</script>
