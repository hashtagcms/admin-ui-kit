<template>
  <div>
    <form
      :action="saveURL"
      class="form-horizontal"
      method="post"
      role="form"
      v-on:keyup="hideErrorMessage($event)"
      v-on:submit.prevent="createModule"
    >
      <div class="form-group row">
        <label class="col-sm-10">
          <input
            v-model="form.createFiles"
            type="checkbox"
            name="create-validator"
          />
          Create Files (Controller/Model/View/Vaidator) -
          <small class="text-info"
            >Try creating it from terminal command. It might not work due to
            rights</small
          >
        </label>
      </div>

      <input v-model="form.display_name" type="hidden" />
      <div class="form-group row">
        <label class="col-sm-3">Name</label>
        <div class="col-sm-7">
          <input
            v-model="form.name"
            class="form-control"
            name="name"
            placeholder="Module name"
            required
            type="text"
            @blur="updateControllerName()"
          />
          <div class="text text-danger">{{ this.errors.name }}</div>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-sm-3">Sub Title</label>
        <div class="col-sm-7">
          <input
            v-model="form.sub_title"
            class="form-control"
            name="name"
            placeholder="Sub title"
            type="text"
          />
          <div class="text text-danger">{{ this.errors.sub_title }}</div>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-sm-3">Controller Name (link rewrite)</label>
        <div class="col-sm-7">
          <input
            v-model="form.controller_name"
            class="form-control"
            name="controller_name"
            placeholder="Controller name"
            required
            type="text"
            @blur="updateControllerName(form.controller_name)"
          />
          <div class="text text-danger">{{ this.errors.controller_name }}</div>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-sm-3">Parent</label>
        <div class="col-sm-7">
          <select v-model="form.parent_id" class="form-select select-big">
            <option value="">Select</option>
            <option v-for="module in allModules" :value="module.id">
              {{ module.name }}
            </option>
          </select>

          <div class="text text-danger">{{ this.errors.parent_id }}</div>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-sm-3">Icon CSS</label>
        <div class="col-sm-7">
          <input
            v-model="form.icon_css"
            class="form-control"
            name="name"
            placeholder="Icon CSS"
            required
            type="text"
          />
          <div class="text text-danger">{{ this.errors.icon_css }}</div>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-sm-3">List View Name</label>
        <div class="col-sm-7">
          <input
            v-model="form.list_view_name"
            class="form-control"
            name="name"
            placeholder="Enter list view Name (Default list view is common/listing)"
            type="text"
          />
          <div class="text text-danger">{{ this.errors.list_view_name }}</div>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3">Edit View Name</label>
        <div class="col-sm-7">
          <input
            v-model="form.edit_view_name"
            class="form-control"
            name="name"
            placeholder="Edit list view Name (Default edit view is addedit)"
            type="text"
          />
          <div class="text text-danger">{{ this.errors.edit_view_name }}</div>
        </div>
      </div>

      <div v-if="form.createFiles">
        <div class="form-group row">
          <label class="col-sm-3">Data Source</label>
          <div class="col-sm-7">
            <select
              v-model="mainModel.tableName"
              class="form-select select-big"
              @change="populateMainDataFields()"
            >
              <option value="">Select</option>
              <option v-for="table in allTables" :value="table.name">
                {{ table.name }}
              </option>
            </select>
            <div class="col-sm-5">
              <span v-if="mainModel.tableName != ''" class="models">
                {{ getModelName(mainModel.tableName) }}
              </span>
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-sm-3">Data with? Choose another model.</label>
          <div class="col-sm-7">
            <select
              v-model="relationModels.tableName"
              class="form-select select-big"
              @change="addRelationModel()"
            >
              <option value="">Select</option>
              <option v-for="table in allTables" :value="table.name">
                {{ table.name }}
              </option>
            </select>

            <div>
              <fieldset v-if="hasRelation()" class="fieldset">
                <legend class="small legendTitle">Relation Models</legend>
                <div
                  v-for="(rModel, index) in relationModels.models"
                  class="models_row"
                >
                  <span class="models">
                    {{ rModel.model }}
                    <input
                      :value="rModel.relationAlias"
                      name="relation"
                      placeholder="Relation name"
                      type="text"
                      @change="
                        updateRelationModel($event, index, 'relationAlias')
                      "
                    />
                    <select
                      class="select"
                      name="relationType"
                      @change="
                        updateRelationModel($event, index, 'relationType')
                      "
                    >
                      <option value="hasMany">hasMany</option>
                      <option value="belongsTo">belongsTo</option>
                      <option value="hasOne">hasOne</option>
                    </select>
                    isLanguage:
                    <input
                      v-model="rModel.isLanguage"
                      type="checkbox"
                      name="relationModel"
                    />
                    <span
                      class="small fa fa-close"
                      @click="removeRelationModel(index, rModel.model)"
                    ></span>
                  </span>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="row" v-if="hasMainDataSource()">
          <strong>Click on fields to choose</strong>
        </div>
        <div v-if="hasMainDataSource()" class="form-group row">
          <div class="col-auto">
            <div class="card shadow-sm models-box">
              <div class="card-header">
                <span
                  class="text-small pull-right hand text-success"
                  @click="selectAllField(mainModel)"
                  >Add all &#187;</span
                >{{ getModelName(mainModel.tableName) }}<br />
              </div>
              <div class="card-body p-0 m-0 tables_panel">
                <ul class="list-group list-group-flush">
                  <li
                    class="list-group-item"
                    v-for="field in mainModel.fields"
                    @click="selectField(field, mainModel)"
                  >
                    {{ field }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <template v-if="hasRelation()">
            <div
              class="col-auto"
              v-for="(rModel, index) in relationModels.models"
            >
              <div class="card shadow-sm models-box">
                <div class="card-header">
                  <span
                    class="text-small pull-right hand text-success"
                    @click="selectAllField(mainModel, rModel.relationAlias)"
                    >Add all &#187;</span
                  >{{ rModel.model }}<br />->with['{{ rModel.relationAlias }}']
                </div>
                <div class="card-body p-0 m-0 tables_panel">
                  <ul class="list-group list-group-flush">
                    <li
                      class="list-group-item"
                      v-for="field in rModel.fields"
                      @click="
                        selectField(field, mainModel, rModel.relationAlias)
                      "
                    >
                      {{ field }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="row mt-3" v-if="mainModel.selected.length > 0">
          <div class="col">
            <div class="card shadow-sm">
              <div class="card-header">
                Selected Fields
                <span
                  class="text-small pull-right hand text-danger"
                  @click="removeAllField(mainModel)"
                  >Remove all</span
                >
              </div>
              <div class="card-body">
                <ul id="selectedFields">
                  <li
                    class="fields non-selectable"
                    v-for="(val, index) in mainModel.selected"
                    :data-fieldname="val"
                  >
                    {{ val }}
                    <span
                      class="small fa fa-close"
                      @click="removeField(mainModel, index)"
                    ></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div v-if="errorMessage !== ''" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        <div class="form-group center-align">
          <input
            class="btn btn-success btn-from-submit"
            name="submit"
            type="submit"
            value="Save"
          />
          <a :href="dataBackUrl" class="btn btn-outline-secondary">Cancel</a>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick, getCurrentInstance } from "vue";
import axios from "axios";
import pluralize from "pluralize";
import Sortable from "sortablejs";
import AdminConfig from "../../../helpers/admin-config";
import { Toast, SafeJsonParse } from "../../../helpers/common";
import Form from "../../../helpers/form";

const props = defineProps([
  "dataDatabaseTables",
  "dataControllerName",
  "dataBackUrl",
  "dataCmsModules",
]);

const instance = getCurrentInstance();

// Utility for DB data
const getFields = (table) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`getFields?table=${table}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

// State
const allTables = ref(SafeJsonParse(props.dataDatabaseTables, []));
const allModules = ref(SafeJsonParse(props.dataCmsModules, []));
const mainModel = reactive({ tableName: "", fields: [], modelName: "", selected: [] });
const relationModels = reactive({ tableName: "", models: [] });

const form = reactive(
  new Form({
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
  })
);

const errors = ref({});
const cacheData = reactive({});
let sortable = null;
let sortingInterval = -1;
const errorMessage = ref("");

// Computed
const saveURL = computed(() =>
  AdminConfig.admin_path(`${props.dataControllerName}/createModule`)
);

// Methods
const isControllerExists = (name = "") => {
  if (name !== "") {
    axios.get(`isControllerExists?name=${name}`).then((res) => {
      if (res.data === 1) {
        Toast.show(instance, "Controller already exist");
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

const getModelName = (modelName = "") => {
  let name = pluralize.singular(modelName) + "::class";
  let arr = name.split("_");
  arr = arr.map((a) => a.charAt(0).toUpperCase() + a.slice(1));
  return arr.join("");
};

const populateMainDataFields = () => {
  if (mainModel.tableName !== "") {
    mainModel.fields = ["Please wait..."];
    getFields(mainModel.tableName).then((res) => {
      mainModel.fields = res.data;
    });
    mainModel.modelName = getModelName(mainModel.tableName);
    form.dataSource = mainModel.modelName;
  }
};

const updateWithData = () => {
  form.dataWith = [];
  relationModels.models.forEach((current) => {
    if (!form.dataWith.includes(current.relationAlias)) {
      form.dataWith.push(current.relationAlias);
    }
  });
};

const hasInRelationModel = (modelName) => cacheData[modelName] !== undefined;

const addRelationModel = () => {
  if (relationModels.tableName !== "") {
    const tableName = relationModels.tableName;
    const modelName = getModelName(tableName);

    if (!hasInRelationModel(modelName)) {
      let relationAlias = "";
      if (tableName.endsWith("_langs") || tableName.endsWith("_sites")) {
        relationAlias = tableName.endsWith("_langs") ? "lang" : "site";
      } else {
        relationAlias = pluralize.singular(tableName.replace(/_/g, "")).toLowerCase();
      }

      const isLanguage = relationAlias === "lang";
      const relationType = "hasMany";

      const relationalData = {
        model: modelName,
        relationAlias: relationAlias,
        relationType: relationType,
        isLanguage: isLanguage,
        fields: [],
        selected: [],
      };

      if (!cacheData[modelName]) {
        relationModels.models.push(relationalData);
        cacheData[modelName] = relationalData;
        cacheData[modelName].fields = ["Please wait..."];
        getFields(tableName).then((res) => {
          cacheData[modelName].fields = res.data;
        });
      }
      updateWithData();
    }
  }
};

const removeSelectedRelationFields = (alias) => {
  if (mainModel.selected.length > 0) {
    mainModel.selected = mainModel.selected.filter(
      (current) => !current.startsWith(`${alias}.`)
    );
  }
};

const updateRelationModel = (event, index, key) => {
  const alias = relationModels.models[index][key];
  relationModels.models[index][key] = event.target.value;

  if (key === "relationAlias") {
    relationModels.models[index].selected = [];
    removeSelectedRelationFields(alias);
  }
  updateWithData();
};

const removeRelationModel = (index, model) => {
  const alias = relationModels.models[index].relationAlias;
  delete cacheData[model];
  relationModels.models.splice(index, 1);
  relationModels.tableName = "";
  removeSelectedRelationFields(alias);
};

const hasRelation = () => relationModels.models.length > 0;
const hasMainDataSource = () => mainModel.tableName !== "";

const cancelSortingCallback = () => {
  if (sortingInterval !== -1) {
    clearInterval(sortingInterval);
  }
};

const sortingCallback = () => {
  cancelSortingCallback();
};

const enableSorting = () => {
  nextTick(() => {
    if (sortable != null) {
      sortable.destroy();
    }
    const el = document.getElementById("selectedFields");
    if (el) {
      sortable = Sortable.create(el, {
        onEnd: sortingCallback,
        onStart: cancelSortingCallback,
      });
    }
  });
};

const selectField = (field, where, relation = "") => {
  const fieldName = relation !== "" ? `${relation}.${field}` : field;
  if (!where.selected.includes(fieldName)) {
    where.selected.push(fieldName);
  }
  enableSorting();
};

const selectAllField = (where, relation = "") => {
  if (where.selected.length === 0) {
    where.selected = where.fields.map((f) => (relation !== "" ? `${relation}.${f}` : f));
  } else {
    where.fields.forEach((f) => selectField(f, where, relation));
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
  const items = document.querySelectorAll("#selectedFields li");
  const count = items.length;
  if (count > 1) {
    const selected = [];
    items.forEach((item) => {
      const field = item.getAttribute("data-fieldname");
      selected.push(field);
    });
    form.selectedFields = selected;
  }
};

const showError = (res) => {
  errors.value = {};
  if (res.errors) {
    for (let i in res.errors) {
      if (Object.prototype.hasOwnProperty.call(res.errors, i)) {
        errors.value[i] = res.errors[i][0];
      }
    }
  }
  errorMessage.value = res.message;
};

const resetForm = (response) => {
  mainModel.tableName = "";
  mainModel.fields = [];
  mainModel.modelName = "";
  mainModel.selected = [];
  relationModels.tableName = "";
  relationModels.models = [];

  if (response.created === 0) {
    Toast.show(instance, "There is some error...");
    errorMessage.value = response.message;
  } else {
    Toast.show(instance, "Created...");
  }
};

const createModule = () => {
  setSortedFields();
  form.relationModels = relationModels;
  form
    .post(saveURL.value)
    .then((response) => resetForm(response))
    .catch((response) => showError(response));
};

const hideErrorMessage = (event) => {
  const name = event.target.getAttribute("name");
  if (name) errors.value[name] = "";
  if (errorMessage.value !== "") {
    errorMessage.value = "";
  }
};
</script>

