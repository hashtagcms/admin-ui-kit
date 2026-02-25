<template>
  <div>
    <modal-box ref="platformbox" @onClose="hideSpinner">
      <template #title> Select Platform </template>
      <template #content>
        <div class="row">
          <div class="col-auto">
            <select
              v-model="currentPlatform"
              class="form-select select-medium"
              @change="editNow()"
            >
              <option value="">Select a platform</option>
              <option v-for="platform in platforms" :value="platform.id">
                {{ platform.name }}
              </option>
            </select>
          </div>
          <div class="col-auto">
            <button
              class="btn btn-success btn-from-submit"
              type="button"
              @click="editNow()"
            >
              Edit Now
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

// State
const modelCss = ref("modal");
const showHide = ref(true);
const platforms = ref(SafeJsonParse(props.dataPlatforms, []));
const currentPlatform = ref("");
const currentTarget = ref(null);

// Methods
const open = () => {
  if (platforms.value.length > 1) {
    if (platformbox.value) platformbox.value.open();
  } else if (platforms.value.length === 1) {
    currentPlatform.value = platforms.value[0].id;
    editNow();
  }
};

const editNow = () => {
  const platform_id = currentPlatform.value;
  if (platform_id === "") {
    Toast.show(instance, "Please select a platform");
    return false;
  }
  const target = currentTarget.value;
  const id = target.getAttribute("data-rowid");
  window.location = AdminConfig.admin_path(`category/edit/${id}/${platform_id}`);
};

const close = () => {
  if (platformbox.value) platformbox.value.close();
};

const hideSpinner = () => {
  EventBus.emit("list-view-hide-spinner");
};

const onPreEdit = (current) => {
  currentTarget.value = current;
  open();
};

// Lifecycle
onMounted(() => {
  EventBus.on("list-view-pre-edit", onPreEdit);
});

onBeforeUnmount(() => {
  EventBus.off("list-view-pre-edit", onPreEdit);
});
</script>

