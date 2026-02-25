<template>
  <form
    :action="actionUrl"
    method="get"
    v-on:submit.prevent="searchNow"
    class="form-inline"
    role="form"
  >
    <div class="row searchForm justify-content-end">
      <div class="col-auto space-between">
        <div class="form-group">
          <select
            name="fields"
            v-model="searchParams.f"
            class="form-select"
            @change="changeInputText()"
          >
            <option
              v-for="field in searchFields"
              :value="getFieldName(field, 'key')"
            >
              {{ getFieldName(field) }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-auto space-between">
        <select name="fields" v-model="searchParams.o" class="form-select">
          <option v-for="operator in operators" :value="operator">
            {{ operator }}
          </option>
        </select>
      </div>
      <div class="col-auto space-between">
        <input
          :type="inputType"
          v-model="searchParams.q"
          class="form-control"
          placeholder="Search for..."
        />
      </div>
      <div class="col-auto space-between">
        <span class="input-group-btn">
          <input
            type="submit"
            name="submit"
            value="Search"
            class="btn btn-success space-between btn-space"
          />
          <input
            type="reset"
            name="reset"
            @click="resetForm()"
            value="Reset"
            class="btn btn-outline-secondary btn-space"
          />
        </span>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import { SafeJsonParse } from "../../../helpers/common";

const props = defineProps([
  "dataSelectedParams",
  "dataControllerName",
  "dataFields",
  "dataActionFields",
]);

const defaultSearchParams = { q: "", f: "id", o: "=" };

// State
const searchParams = reactive({ q: "", f: "id", o: "=" });
const actionUrl = ref(AdminConfig.admin_path(`${props.dataControllerName}/search`));
const searchFields = ref(SafeJsonParse(props.dataFields, []));
const operators = ["=", "!=", ">", "<", ">=", "<=", "like%", "%like%"];
const hasAction = ref(SafeJsonParse(props.dataActionFields, []).length > 0);
const inputType = ref("text");

// Methods
const getFieldName = (key, prop = "label") => {
  return typeof key === "string" ? key : key[prop] === undefined ? key : key[prop];
};

const changeInputText = () => {
  if (searchParams.f.endsWith("_date") || searchParams.f.endsWith("_at")) {
    inputType.value = "date";
  } else {
    inputType.value = "text";
  }
};

const searchNow = () => {
  let url;
  if (searchParams.q.trim() === "") {
    url = AdminConfig.admin_path(props.dataControllerName);
  } else {
    const q = encodeURI(JSON.stringify(searchParams));
    const sep = actionUrl.value.indexOf("?") === -1 ? "?" : "&";
    url = `${actionUrl.value}${sep}q=${q}`;
  }
  window.location.href = url;
  return false;
};

const resetForm = () => {
  const url = AdminConfig.admin_path(props.dataControllerName);
  window.location.href = url;
};

const init = () => {
  if (hasAction.value) {
    searchFields.value.pop();
  }

  const selectedParams = SafeJsonParse(props.dataSelectedParams, defaultSearchParams);
  if (selectedParams.f === undefined) {
    Object.assign(searchParams, defaultSearchParams);
  } else {
    Object.assign(searchParams, selectedParams);
  }
  changeInputText();
};

onMounted(() => {
  init();
});
</script>

