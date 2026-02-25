<template>
  <div>
    <modal-box ref="platformbox" @onClose="hideSpinner">
      <template #title>
        <div class="flex items-center gap-2">
            <i class="fa fa-layer-group text-blue-600"></i>
            <span>Select Platform Context</span>
        </div>
      </template>
      <template #content>
        <div class="flex flex-col sm:flex-row items-center gap-4 py-4">
          <div class="w-full sm:flex-1">
            <select
              v-model="currentPlatform"
              class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-sm cursor-pointer"
              @change="editNow()"
            >
              <option value="">Choose a platform...</option>
              <option v-for="platform in platforms" :key="platform.id" :value="platform.id">
                {{ platform.name }}
              </option>
            </select>
          </div>
          <div class="w-full sm:w-auto">
            <button
              class="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 whitespace-nowrap"
              type="button"
              @click="editNow()"
            >
              Proceed to Edit
            </button>
          </div>
        </div>
      </template>
    </modal-box>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, getCurrentInstance } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import { EventBus } from "../../../helpers/event-bus";
import { Toast, SafeJsonParse } from "../../../helpers/common";
import ModalBox from "./library/modal-box.vue";

const props = defineProps(["dataPlatforms"]);
const instance = getCurrentInstance();

const platformbox = ref(null);
const modelCss = ref("modal");
const showHide = ref(true);
const platforms = ref(SafeJsonParse(props.dataPlatforms, []));
const currentPlatform = ref("");
const currentTarget = ref(null);

const editNow = () => {
    let platform_id = currentPlatform.value;
    if (platform_id === "") {
        Toast.show(instance.proxy, "Please select a platform");
        return false;
    }
    let target = currentTarget.value;
    console.log("target ", target);
    let id = target.getAttribute("data-rowid");
    window.location = AdminConfig.admin_path(
        `category/edit/${id}/${platform_id}`
    );
};

const open = () => {
    if (platforms.value.length > 1) {
        platformbox.value?.open();
    } else if (platforms.value.length === 1) {
        currentPlatform.value = platforms.value[0].id;
        editNow();
    }
};

const close = () => {
    platformbox.value?.close();
};

const hideSpinner = () => {
    EventBus.emit("list-view-hide-spinner", instance.proxy);
};

const onListViewPreEdit = (current) => {
    currentTarget.value = current;        
    open();
};

onMounted(() => {
    EventBus.on("list-view-pre-edit", onListViewPreEdit);
});

onBeforeUnmount(() => {
    EventBus.off("list-view-pre-edit", onListViewPreEdit);
});

</script>

