<template>
  <modal-box ref="infoModal" data-show-footer="true">
    <template #title>
      <div class="flex items-center gap-2">
          <i class="fa fa-info-circle text-blue-500"></i>
          <span class="capitalize font-black text-gray-800 tracking-tight">{{ model }} Details</span>
      </div>
    </template>
    <template #content>
      <div class="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 rounded-lg border border-gray-100 shadow-inner bg-white">
        <table class="w-full text-left border-collapse">
          <tbody class="divide-y divide-gray-50">
            <template v-for="(res, key) in resData" :key="key">
              <tr v-if="!shouldExclude(key)" class="hover:bg-gray-50/50 transition-colors group">
                <td class="px-6 py-4 text-[10px] font-black text-gray-400 group-hover:text-blue-500 uppercase tracking-widest bg-gray-50/30 w-1/3 leading-relaxed">
                  {{ key.replace(/_/g, ' ') }}
                </td>
                <td class="px-6 py-4 text-xs font-bold text-gray-600 leading-normal">
                  <span v-if="key === 'id'" v-html="getValue(key, res)" class="text-blue-600 hover:text-blue-800 transition-colors"></span>
                  <span v-else v-text="getValue(key, res)"></span>
                </td>
              </tr>
            </template>
            <tr v-if="errorMessage !== ''">
              <td colspan="2" class="px-6 py-6 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest text-center italic">
                <i class="fa fa-exclamation-triangle mr-1"></i> {{ errorMessage }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #footer>
      <button class="px-10 py-3 border border-gray-200 hover:bg-gray-50 text-gray-400 hover:text-gray-900 text-[10px] font-black rounded-xl transition-all active:scale-95 uppercase tracking-widest shadow-sm" @click="close()">Dismiss View</button>
    </template>
  </modal-box>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import { Toast, Loader } from "../../../helpers/common";
import ModalBox from "./library/modal-box.vue";
import { EventBus } from "../../../helpers/event-bus";

const props = defineProps(["dataModel", "dataModuleRelations", "dataId"]);
const instance = getCurrentInstance();

const infoModal = ref(null);

const model = ref(
  props.dataModel === "undefined" || props.dataModel === ""
    ? null
    : props.dataModel
);
const relation = ref(
  props.dataModuleRelations === "undefined" || props.dataModuleRelations === ""
    ? ""
    : props.dataModuleRelations
);
const id = ref(
  props.dataId === "undefined" || props.dataId === ""
    ? 0
    : parseInt(props.dataId)
);
const resData = ref([]);
const errorMessage = ref("");
const isEditable = ref(true);
const excludeFields = ref([]);

const shouldExclude = (key) => {
  return excludeFields.value.indexOf(key) >= 0;
};

const getValue = (key, value) => {
  if (!isEditable.value) {
    return value;
  }
  if (key === "id" && isEditable.value) {
    let path = `edit/${value}`;
    path = AdminConfig.admin_path(`${model.value}/${path}`);
    return `<a href="${path}">${value}</a>`;
  }
  return value;
};

const open = () => {
  infoModal.value?.open();
  EventBus.emit("info-popup-open");
};

const close = () => {
  infoModal.value?.close();
  EventBus.emit("info-popup-close");
};

const showInfo = (modelParam, idParam, excludeFieldsParam = [], isEditableParam = true) => {
  isEditable.value = isEditableParam.toString() === "true";
  excludeFields.value = excludeFieldsParam;
  model.value = modelParam;
  
  Loader.show(instance.proxy);
  axios
    .get(AdminConfig.get("base_path") + `/ajax/getInfo/${modelParam}/${idParam}`)
    .then(function (res) {
      errorMessage.value = "";
      resData.value = res.data.results;
      if (res.data.error === true) {
        errorMessage.value = res.data.message;
      }
      open();
      Loader.hide(instance.proxy);
    })
    .catch(function (res) {
      Toast.show(instance.proxy, res.message);
      Loader.hide(instance.proxy);
    });
};

defineExpose({
  showInfo,
  open,
  close,
});
</script>

