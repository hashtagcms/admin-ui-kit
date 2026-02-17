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

<script>
import AdminConfig from "../../../helpers/admin-config";
import { Toast, Loader } from "../../../helpers/common";
import ModalBox from "./library/modal-box.vue";
import { EventBus } from "../../../helpers/event-bus";

export default {
  components: {
    "modal-box": ModalBox,
  },
  props: ["dataModel", "dataModuleRelations", "dataId"],
  mounted() {
    //console.log('Component mounted...')
  },
  data() {
    return {
      model:
        typeof this.dataModel === "undefined" || this.dataModel === ""
          ? null
          : this.dataModel,
      relation:
        typeof this.dataModuleRelations === "undefined" ||
        this.dataModuleRelations === ""
          ? ""
          : this.dataModuleRelations,
      id:
        typeof this.dataId === "undefined" || this.dataId === ""
          ? 0
          : parseInt(this.dataId),
      resData: [],
      errorMessage: "",
      isEditable: true,
      excludeFields: [],
    };
  },
  methods: {
    shouldExclude(key) {
      return this.excludeFields.indexOf(key) >= 0;
    },
    getValue(key, value) {
      if (!this.isEditable) {
        return value;
      }
      if (key === "id" && this.isEditable) {
        let path = `edit/${value}`;
        path = AdminConfig.admin_path(`${this.model}/${path}`);
        return `<a href="${path}">${value}</a>`;
      }
      return value;
    },
    showInfo(model, id, excludeFields = [], isEditable = true) {
      this.isEditable = isEditable.toString() === "true";
      this.excludeFields = excludeFields;
      this.model = model;
      let $this = this;
      Loader.show(this);
      axios
        .get(AdminConfig.get("base_path") + `/ajax/getInfo/${model}/${id}`)
        .then(function (res) {
          $this.errorMessage = "";
          $this.resData = {};
          $this.resData = res.data.results;
          if (res.data.error === true) {
            $this.errorMessage = res.data.message;
          }
          $this.open();
          Loader.hide($this);
        })
        .catch(function (res) {
          Toast.show($this, res.message);
          Loader.hide($this);
        });
    },
    open() {
      this.$refs.infoModal.open();
      EventBus.emit("info-popup-open");
    },
    close() {
      this.$refs.infoModal.close();
      EventBus.emit("info-popup-close");
    },
  },
};
</script>
