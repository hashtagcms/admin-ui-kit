<template>
  <modal-box ref="infoModal" data-show-footer="true">
    <template #title>
      <div style="text-transform: capitalize">{{ model }} Info</div>
    </template>
    <template #content>
      <div class="row" style="max-height: 500px; overflow: scroll">
        <table class="table table-striped">
          <tbody>
            <template v-for="(res, key) in resData">
              <tr v-if="!shouldExclude(key)">
                <td>
                  {{ key }}
                </td>
                <td>
                  <span v-if="key === 'id'" v-html="getValue(key, res)"></span>
                  <span v-if="key !== 'id'" v-text="getValue(key, res)"></span>
                </td>
              </tr>
            </template>
            <tr v-if="errorMessage !== ''">
              <td style="background-color: #fff; border: none">
                <div class="text text-danger">
                  {{ errorMessage }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #footer>
      <button class="btn btn-outline-secondary" @click="close()">Close</button>
    </template>
  </modal-box>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import axios from "axios";
import AdminConfig from "../../../helpers/admin-config";
import { Toast, Loader } from "../../../helpers/common";
import ModalBox from "./library/modal-box.vue";
import { EventBus } from "../../../helpers/event-bus";

const props = defineProps(["dataModel", "dataModuleRelations", "dataId"]);

const instance = getCurrentInstance();
const infoModal = ref(null);

// State
const model = ref(props.dataModel === undefined || props.dataModel === "" ? null : props.dataModel);
const relation = ref(
  props.dataModuleRelations === undefined || props.dataModuleRelations === ""
    ? ""
    : props.dataModuleRelations
);
const id = ref(props.dataId === undefined || props.dataId === "" ? 0 : parseInt(props.dataId));
const resData = ref([]);
const errorMessage = ref("");
const isEditable = ref(true);
const excludeFields = ref([]);

// Methods
const shouldExclude = (key) => excludeFields.value.indexOf(key) >= 0;

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
  if (infoModal.value) infoModal.value.open();
  EventBus.emit("info-popup-open");
};

const close = () => {
  if (infoModal.value) infoModal.value.close();
  EventBus.emit("info-popup-close");
};

const showInfo = (m, i, exFields = [], isEdit = true) => {
  isEditable.value = isEdit.toString() === "true";
  excludeFields.value = exFields;
  model.value = m;
  Loader.show(instance.proxy);
  axios
    .get(`${AdminConfig.get("base_path")}/ajax/getInfo/${m}/${i}`)
    .then((res) => {
      errorMessage.value = "";
      resData.value = {};
      resData.value = res.data.results;
      if (res.data.error === true) {
        errorMessage.value = res.data.message;
      }
      open();
      Loader.hide(instance.proxy);
    })
    .catch((err) => {
      Toast.show(instance.proxy, err.message);
      Loader.hide(instance.proxy);
    });
};

// Expose methods to parent
defineExpose({ showInfo, open, close });
</script>

