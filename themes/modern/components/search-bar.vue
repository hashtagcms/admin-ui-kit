<template>
  <form
    :action="actionUrl"
    method="get"
    v-on:submit.prevent="searchNow"
    class="w-full"
    role="form"
  >
    <div class="flex flex-wrap items-center gap-4">
      <div class="flex-1 min-w-[200px] flex items-center gap-3">
          <div class="flex-1 sm:flex-none sm:w-48">
              <select
                name="fields"
                v-model="searchParams.f"
                class="bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-inner font-bold cursor-pointer"
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
          
          <div class="w-24">
            <select name="fields" v-model="searchParams.o" class="bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full px-3 py-3 outline-none transition-all shadow-inner font-mono">
              <option v-for="operator in operators" :value="operator">
                {{ operator }}
              </option>
            </select>
          </div>
      </div>
      
      <div class="flex-1 md:flex-[2] min-w-[200px]">
        <input
          :type="inputType"
          v-model="searchParams.q"
          class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full px-5 py-3 outline-none transition-all shadow-sm placeholder-gray-400 font-medium"
          placeholder="What are you looking for?"
        />
      </div>
      
      <div class="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="submit"
            name="submit"
            class="flex-1 sm:flex-none px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <i class="fa fa-search text-[10px]"></i>
            Search
          </button>
          <button
            type="reset"
            name="reset"
            @click="resetForm()"
            class="flex-1 sm:flex-none px-6 py-3 bg-white border border-gray-200 hover:border-gray-300 text-gray-400 hover:text-gray-900 text-xs font-black uppercase tracking-widest rounded-xl transition-all active:scale-95"
          >
            Reset
          </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import { SafeJsonParse } from "../../../helpers/common";

const props = defineProps([
  "dataSelectedParams",
  "dataControllerName",
  "dataFields",
  "dataActionFields",
]);

const defaultSearchParams = { q: "", f: "id", o: "=" };
const searchParams = ref({ ...defaultSearchParams });
const actionUrl = ref(
  AdminConfig.admin_path(props.dataControllerName + "/search")
);
const searchFields = ref(SafeJsonParse(props.dataFields, []));
const operators = ["=", "!=", ">", "<", ">=", "<=", "like%", "%like%"];
const hasAction = SafeJsonParse(props.dataActionFields, []).length > 0;
const inputType = ref("text");

const getFieldName = (field, prop = "label") => {
  return typeof field === "string"
    ? field
    : field[prop] === undefined
    ? field
    : field[prop];
};

const changeInputText = () => {
  if (
    searchParams.value.f.endsWith("_date") ||
    searchParams.value.f.endsWith("_at")
  ) {
    inputType.value = "date";
  } else {
    inputType.value = "text";
  }
};

const searchNow = () => {
  let url;
  if (searchParams.value.q.trim() === "") {
    url = AdminConfig.admin_path(props.dataControllerName);
  } else {
    let q = encodeURI(JSON.stringify(searchParams.value));
    let sep = actionUrl.value.indexOf("?") === -1 ? "?" : "&";
    url = actionUrl.value + sep + "q=" + q;
  }

  window.location.href = url;
};

const resetForm = () => {
  window.location.href = AdminConfig.admin_path(props.dataControllerName);
};

const init = () => {
  if (hasAction) {
    searchFields.value.pop();
  }

  const selected = SafeJsonParse(
    props.dataSelectedParams,
    defaultSearchParams
  );
  searchParams.value =
    selected.f === undefined ? { ...defaultSearchParams } : selected;

  changeInputText();
};

onMounted(() => {
  init();
});
</script>

