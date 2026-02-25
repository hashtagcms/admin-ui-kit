<template>
  <div>
    <form
      id="addEditFrm"
      :action="saveURL"
      class="form-group"
      method="post"
      role="form"
      v-on:keyup="hideErrorMessage($event)"
      v-on:submit.prevent="createModule"
    >
      <div class="form-group row mb-3">
        <label class="col-sm-2" for="name">Name</label>
        <div class="col-sm-7">
          <input
            @blur="fillCopiedData"
            id="name"
            v-model="form.name"
            class="form-control"
            name="name"
            placeholder="Module name"
            required
            type="text"
          />
          <label
            ><input
              v-model="conventional"
              type="checkbox"
              @click="goConventional()"
            />
            Go Conventional</label
          >
          <div class="text text-danger">{{ this.errors.name }}</div>
        </div>
      </div>

      <div class="form-group row mb-3">
        <label class="col-sm-2" for="alias">Alias</label>
        <div class="col-sm-7">
          <input
            id="alias"
            v-model="form.alias"
            class="form-control"
            name="alias"
            placeholder="Alias"
            required
            type="text"
          />
          <div class="text text-danger">{{ this.errors.alias }}</div>
        </div>
      </div>

      <div class="form-group row mb-3">
        <label class="col-sm-2" for="view_name">View Name</label>
        <div class="col-sm-7">
          <input
            id="view_name"
            v-model="form.view_name"
            class="form-control"
            name="view_name"
            placeholder="View name"
            required
            type="text"
          />
          <div class="text text-danger">{{ this.errors.view_name }}</div>
        </div>
      </div>

      <div class="form-group row mb-3">
        <label class="col-sm-2" for="cache_group">Cache Group</label>
        <div class="col-sm-7">
          <input
            id="cache_group"
            v-model="form.cache_group"
            class="form-control"
            maxlength="60"
            name="cache_group"
            placeholder="Cache Category"
            type="text"
          />

          <div class="text text-danger">{{ this.errors.cache_group }}</div>
        </div>
      </div>

      <div class="form-group row mb-3">
        <label class="col-sm-2" for="individual_cache"
          >Is Individual Cache?</label
        >
        <label class="col-sm-7">
          <input
            id="individual_cache"
            v-model="form.individual_cache"
            name="individual_cache"
            type="checkbox"
          />
        </label>
      </div>

      <div class="form-group row mb-3">
        <label class="col-sm-2" for="data_type">Data Type</label>
        <div class="col-sm-7">
          <select
            id="data_type"
            v-model="form.data_type"
            class="form-select select-big"
            name="data_type"
            @change="checkForService(form.data_type)"
          >
            <option value="">Select</option>
            <option v-for="dataType in allDataTypes" :value="dataType">
              {{ dataType }}
            </option>
          </select>
          <div class="text text-danger">{{ this.errors.data_type }}</div>
          <div
            v-show="form.data_type != '' && this.dataTypesInfo[form.data_type]"
            class="alert alert-info"
            v-html="this.dataTypesInfo[form.data_type] || ''"
          ></div>
        </div>
      </div>

      <div class="form-group row mb-3">
        <label class="col-sm-2" for="data_handler">Data Handler</label>
        <label class="col-sm-7">
          <textarea
            id="data_handler"
            v-model="form.data_handler"
            class="form-control input"
            mb-2s="5"
            name="data_handler"
            placeholder="Query or Service URL or filteration for this module"
            row
            v-bind:style="fluidCol"
          />
        </label>
      </div>

      <div v-show="showServiceForm">
        <div class="form-group row mb-3">
          <label class="col-sm-2" for="method_type">Method Type</label>
          <div class="col-sm-7">
            <select
              id="method_type"
              v-model="form.method_type"
              class="form-select select-big"
              name="method_type"
            >
              <option value="">Select</option>
              <option
                v-for="methodType in allMethodTypes"
                :value="methodType.value"
              >
                {{ methodType.name }}
              </option>
            </select>
            <div class="text text-danger">{{ this.errors.data_type }}</div>
          </div>
        </div>
        <div class="form-group row mb-3">
          <label class="col-sm-2" for="service_params">Service Params</label>
          <div class="col-sm-7">
            <input
              id="service_params"
              v-model="form.service_params"
              class="form-control"
              name="service_params"
              placeholder="Service Params"
              type="text"
            />
            <div class="text text-danger">{{ this.errors.service_params }}</div>
          </div>
        </div>
        <div class="form-group row mb-3">
          <label class="col-sm-2" for="service_params">Service Headers</label>
          <div class="col-sm-7">
            <textarea
              id="headers"
              v-model="form.headers"
              class="form-control input"
              name="headers"
              placeholder="Service header as json"
              rows="5"
            />
            <div class="text text-danger">{{ this.errors.headers }}</div>
          </div>
        </div>
      </div>

      <div class="form-group row mb-3">
        <label class="col-sm-2" for="data_key_map">Data Key Map</label>
        <label class="col-sm-7">
          <textarea
            id="data_key_map"
            v-model="form.data_key_map"
            class="form-control input"
            name="data_key_map"
            placeholder="key to be replaced in comma seperated. ie: :site_id, :lang_id "
            rows="5"
            v-bind:style="fluidCol"
          />
        </label>
      </div>

      <div class="form-group row mb-3">
        <label class="col-sm-2" for="is_seo_module"
          >Use this module as seo module</label
        >
        <label class="col-sm-7">
          <input
            id="is_seo_module"
            v-model="form.is_seo_module"
            name="is_seo_module"
            type="checkbox"
          />
        </label>
      </div>

      <div class="form-group row mb-3">
        <label class="col-sm-2" for="is_mandatory">Is Mandatory?</label>
        <label class="col-sm-7">
          <input
            id="is_mandatory"
            v-model="form.is_mandatory"
            name="is_mandatory"
            type="checkbox"
          />
        </label>
      </div>

      <div class="form-group row mb-3">
        <label class="col-sm-2" for="shared">Is Shared?</label>
        <label class="col-sm-7">
          <input
            id="shared"
            v-model="form.shared"
            name="shared"
            type="checkbox"
          />
        </label>
      </div>
      <div class="form-group row mb-3">
        <label class="col-sm-2" for="linked_module">Linked Module Alias</label>
        <label class="col-sm-7">
          <input
            id="linked_module"
            v-model="form.linked_module"
            name="linked_module"
            type="text"
            class="form-control"
          />
        </label>
      </div>

      <div class="form-group row mb-3">
        <label class="col-sm-2" for="live_edit">Live Edit?</label>
        <label class="col-sm-7">
          <input
            id="live_edit"
            v-model="form.live_edit"
            name="live_edit"
            type="checkbox"
          />
        </label>
      </div>

      <div v-show="showQueryForm" class="form-group row mb-3">
        <fieldset class="border">
          <legend>Query Service Properties</legend>
          <div class="form-group">
            <label class="col-sm-2" for="query_statement" v-bind:style="sFont"
              >Query</label
            >

            <label class="col-sm-7">
              <textarea
                id="query_statement"
                v-model="form.query_statement"
                class="form-control input"
                name="query_statement"
                rows="5"
                v-bind:style="fluidCol"
              />
            </label>
          </div>

          <div class="form-group row mb-3">
            <label class="col-sm-2" for="query_as" v-bind:style="sFont"
              >Get query data as</label
            >
            <div class="col-sm-7">
              <select
                id="query_as"
                v-model="form.query_as"
                class="form-select select-big"
                name="query_as"
              >
                <option value="">Select</option>
                <option
                  v-for="queryData in allQueryDataTypes"
                  :value="queryData.value"
                >
                  {{ queryData.name }}
                </option>
              </select>
              <div class="text text-danger">{{ this.errors.query_as }}</div>
            </div>
          </div>
        </fieldset>
      </div>

      <div class="form-group row mb-3">
        <label class="col-sm-2" for="description"
          >Description or different database connection name if it is a query
          module</label
        >
        <label class="col-sm-7">
          <textarea
            id="description"
            v-model="form.description"
            class="form-control input"
            name="description"
            rows="5"
            v-bind:style="fluidCol"
          />
        </label>
      </div>
      <div v-show="this.showAllUpdateSection" class="form-group row mb-3">
        <label class="col-sm-2" for="update_inAllSites"
          >Update in all sites?</label
        >
        <label class="col-sm-7">
          <input
            id="update_inAllSites"
            v-model="form.update_inAllSites"
            name="update_inAllSites"
            type="checkbox"
          />
          <div class="alert alert-info">
            Be careful by clicking this checkbox. Content will be updated in all
            sites based on alias. If you are changing alias it will be updated
            only in this site.
          </div>
        </label>
      </div>
      <div class="row mb-3">
        <div
          v-show="typeof errorMessage === 'string' && errorMessage !== ''"
          class="alert alert-danger"
        >
          {{ errorMessage }}
        </div>
        <div class="form-group center-align">
          <input
            class="btn btn-success btn-from-submit"
            name="submit"
            type="submit"
            value="Save"
          />
          <a :href="dataBackUrl" class="btn btn-outline-secondary">Back</a>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, getCurrentInstance } from "vue";
import { Toast, PasteFromClipboard, IsJson, SafeJsonParse } from "../../../helpers/common";
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

// State
const sFont = { "font-size": "14px" };
const fluidCol = { width: "100%" };
const allQueryDataTypes = [
  { name: "param", value: "param" },
  { name: "data", value: "data" },
];
const conventional = ref(false);
const formData = ref(SafeJsonParse(props.dataResults, []));
const siteData = ref(SafeJsonParse(props.dataSite, []));
const showExtraData = reactive({});
const allDataTypes = ref(SafeJsonParse(props.dataDataTypes, []));
const allMethodTypes = [
  { name: "GET", value: "GET" },
  { name: "POST", value: "POST" },
];

const form = reactive(
  new Form({
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
  })
);

const errors = ref({});
const errorMessage = ref("");
const dataTypesInfo = ref(SafeJsonParse(props.dataDataTypesInfo, []));
const saveURL = ref(props.dataFormAction);

// Computed
const showQueryForm = computed(() => form.data_type.toLowerCase().indexOf("queryservice") > -1);
const showServiceForm = computed(() => form.data_type.toLowerCase().indexOf("service") > -1);
const showAllUpdateSection = computed(
  () => props.dataActionPerformed === "edit" && siteData.value.length > 1
);

// Methods
const setFormData = (data) => {
  const formEle = document.querySelector("#addEditFrm");
  for (let a in data) {
    const val = data[a];
    if (Object.prototype.hasOwnProperty.call(form, a) && typeof form[a] !== "function") {
      form[a] = val;
    }

    const ele = formEle ? formEle[a] || document.getElementById(a) : document.getElementById(a);
    if (ele) {
      const eleType = ele.type;
      if ((eleType === "checkbox" || eleType === "radio") && eleType !== "submit") {
        form[a] = val === 1;
      }
    }
  }
};

const fillCopiedData = () => {
  PasteFromClipboard()
    .then(() => {
      if (IsJson(form.name)) {
        setFormData(SafeJsonParse(form.name, {}));
      }
    })
    .catch((err) => {
      console.error("unable to paste", err);
    });
};

const goConventional = () => {
  if (conventional.value === false) {
    const name = form.name;
    form.alias = `MODULE_${name.toUpperCase()}`.replace(/\s/g, "_");
    form.view_name = name.toLowerCase().replace(/\s/g, "-");
  }
};

const checkForService = (dataType) => {
  showExtraData.show =
    dataType !== "" && (dataType.indexOf("Service") > -1 || dataType.indexOf("service") > -1);
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
  const isTrue = (val) => val.toString() === "true" || val.toString() === "1";
  if (!isTrue(response.isSaved)) {
    Toast.show(instance, "There is some error...");
    errorMessage.value = response.message;
  } else {
    errorMessage.value = "";
    Toast.show(instance, "Saved...");
    if (isTrue(response.isSaved)) {
      window.location.href = response.backURL;
    }
  }
};

const createModule = () => {
  // Pre-check logic
  form.is_seo_module = form.is_seo_module ? form.is_seo_module : 0;
  form.individual_cache = form.individual_cache ? form.individual_cache : 0;
  form.update_inAllSites = form.update_inAllSites ? form.update_inAllSites : 0;
  form.is_mandatory = form.is_mandatory ? form.is_mandatory : 0;
  form.service_params = form.service_params ? form.service_params : "";
  form.shared = form.shared ? form.shared : 0;
  form.live_edit = form.live_edit ? form.live_edit : 0;

  form
    .post(saveURL.value)
    .then((response) => {
      resetForm(response);
    })
    .catch((response) => {
      showError(response);
    });
};

const hideErrorMessage = (event) => {
  const name = event.target.getAttribute("name");
  if (name) errors.value[name] = "";
  if (errorMessage.value !== "") {
    errorMessage.value = "";
  }
};

onMounted(() => {
  if (props.dataActionPerformed === "edit") {
    setFormData(formData.value);
  } else {
    form.site_id = props.dataSiteId;
  }
});
</script>

