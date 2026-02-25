<template>
  <div>
    <div class="col-lg-6">
      <form
        id="addEditFrm"
        method="post"
        class="form-horizontal"
        role="form"
        v-on:submit.prevent="saveNow"
        v-on:keyup="hideErrorMessage($event)"
      >
        <div>
          <div class="mb-2">
            <p>
              <strong>Source Language:</strong> Data will be copied from the
              selected lanuage
            </p>
            <select
              required
              name="sourceLang"
              class="form-select"
              v-model="form.sourceLang"
              @change="hideErrorMessage($event)"
            >
              <option value="">Select</option>
              <option v-for="language in languages" :value="language.id">
                {{ language.name }} - {{ language.iso_code }}
              </option>
            </select>
            <div class="text text-danger">{{ errors.sourceLang }}</div>
          </div>
        </div>
        <div>
          <div class="mb-2">
            <p>
              <strong>Target Language:</strong> New record will be inserted with
              this language id in selected tables
            </p>
            <select
              required
              name="targetLang"
              class="form-select"
              v-model="form.targetLang"
              @change="hideErrorMessage($event)"
            >
              <option value="">Select</option>
              <option v-for="language in languages" :value="language.id">
                {{ language.name }} - {{ language.iso_code }}
              </option>
            </select>
            <div class="text text-danger">{{ errors.targetLang }}</div>
          </div>
        </div>

        <div>
          <div class="mb-2">
            <p>Select tables</p>
            <select
              required
              style="height: 200px"
              name="tables"
              class="form-select"
              multiple
              v-model="form.tables"
              @change="hideErrorMessage($event)"
            >
              <option v-for="langTable in languageTables">
                {{ langTable.name }}
              </option>
            </select>
            <div class="text text-danger">{{ errors.tables }}</div>
          </div>
        </div>
        <div class="row">
          <div
            class="alert alert-danger"
            v-show="typeof errorMessage == 'string' && errorMessage != ''"
          >
            {{ errorMessage }}
          </div>

          <div v-for="message in messages" :class="getCss(message)">
            {{ message.message }}
          </div>

          <div class="form-group center-align">
            <input
              type="submit"
              name="submit"
              value="Submit and Hold on"
              class="btn btn-success btn-large"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import Form from "../../../helpers/form";
import { Toast, SafeJsonParse } from "../../../helpers/common";

const props = defineProps(["dataLanguages", "dataLanguageTables"]);

const instance = getCurrentInstance();

// State
const languages = ref(SafeJsonParse(props.dataLanguages, []));
const languageTables = ref(SafeJsonParse(props.dataLanguageTables, []));
const messages = ref([]);
const form = reactive(
  new Form({
    tables: [],
    sourceLang: "",
    targetLang: "",
  })
);
const errors = reactive({});
const saveUrl = ref("language/translateNow");
const errorMessage = ref("");

// Methods
const getCss = (row) => {
  return row.status === 0 ? "text text-danger" : "text text-success";
};

const showError = (res) => {
  for (let i in res.errors) {
    if (Object.prototype.hasOwnProperty.call(res.errors, i)) {
      errors[i] = res.errors[i][0];
    }
  }
  errorMessage.value = res.message;
};

const hideErrorMessage = (event) => {
  const name = event.target.getAttribute("name");
  errors[name] = "";
  if (errorMessage.value !== "") {
    errorMessage.value = "";
  }
};

const onSuccess = (response) => {
  console.log(response);
  if (response.isSaved === 0) {
    Toast.show(instance, response.message);
    errorMessage.value = response.message;
  } else {
    errorMessage.value = "";
    messages.value = response.message;
  }
};

const saveNow = () => {
  const url = AdminConfig.admin_path(saveUrl.value);
  form
    .post(url)
    .then((response) => onSuccess(response))
    .catch((response) => showError(response));
  return false;
};
</script>

