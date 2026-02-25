<template>
  <div class="max-w-2xl">
    <div class="bg-white shadow-lg rounded-lg border border-gray-100 overflow-hidden">
      <div class="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
          <h2 class="text-xl font-black text-gray-800 tracking-tight">Language Resource Copier</h2>
          <p class="text-sm text-gray-500 mt-1">Duplicate data across language contexts</p>
      </div>

      <form
        id="addEditFrm"
        method="post"
        class="p-8 space-y-6"
        role="form"
        v-on:submit.prevent="saveNow"
        v-on:keyup="hideErrorMessage($event)"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-1.5">
            <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Source Language</label>
            <select
              required
              name="sourceLang"
              class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-sm cursor-pointer"
              v-model="form.sourceLang"
              @change="hideErrorMessage($event)"
            >
              <option value="">Select Origin</option>
              <option v-for="lang in languages" :key="lang.id" :value="lang.id">
                {{ lang.name }} ({{ lang.iso_code }})
              </option>
            </select>
            <div class="px-2 text-[11px] text-red-500 font-bold" v-if="errors.sourceLang">{{ errors.sourceLang }}</div>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Target Language</label>
            <select
              required
              name="targetLang"
              class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-sm cursor-pointer"
              v-model="form.targetLang"
              @change="hideErrorMessage($event)"
            >
              <option value="">Select Destination</option>
              <option v-for="lang in languages" :key="lang.id" :value="lang.id">
                {{ lang.name }} ({{ lang.iso_code }})
              </option>
            </select>
            <div class="px-2 text-[11px] text-red-500 font-bold" v-if="errors.targetLang">{{ errors.targetLang }}</div>
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Affected Data Tables</label>
          <select
            required
            name="tables"
            class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-inner font-mono overflow-y-auto"
            multiple
            style="height: 180px"
            v-model="form.tables"
            @change="hideErrorMessage($event)"
          >
            <option v-for="lt in languageTables" :key="lt.name" :value="lt.name">
              {{ lt.name }}
            </option>
          </select>
          <div class="px-2 text-[11px] text-red-500 font-bold" v-if="errors.tables">{{ errors.tables }}</div>
        </div>

        <div class="space-y-4 pt-4">
          <div v-show="typeof errorMessage === 'string' && errorMessage !== ''" class="bg-red-50 text-red-700 px-6 py-4 rounded-xl border border-red-100 text-sm font-black flex items-center gap-3 animate-shake shadow-sm">
             <i class="fa fa-exclamation-triangle"></i> {{ errorMessage }}
          </div>

          <div class="space-y-2">
              <div v-for="(msg, idx) in messages" :key="idx" :class="[msg.status === 0 ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100', 'px-4 py-3 rounded-lg border text-xs font-bold transition-all animate-fadeIn shadow-sm']">
                {{ msg.message }}
              </div>
          </div>

          <div class="flex justify-center">
            <button
              type="submit"
              class="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-lg shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 active:scale-95 text-base"
            >
              Start Migration
            </button>
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

const languages = ref(SafeJsonParse(props.dataLanguages, []));
const languageTables = ref(SafeJsonParse(props.dataLanguageTables, []));
const messages = ref([]);
const form = reactive(new Form({
  tables: [],
  sourceLang: "",
  targetLang: "",
}));
const errors = reactive({});
const saveUrl = "language/translateNow";
const errorMessage = ref("");

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
  let name = event.target.getAttribute("name");
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
  let url = AdminConfig.admin_path(saveUrl);

  form
    .post(url)
    .then((response) => onSuccess(response))
    .catch((response) => showError(response));

  return false;
};
</script>
