<template>
  <div>
    <select
      :name="name"
      :id="id"
      @change="setPlatform"
      v-model="selected"
      :multiple="dataMultiple == 'true' ? true : false"
    >
      <option value="">Select Platform</option>
      <option v-for="platform in platforms" :value="platform.id">
        {{ platform.name }}
      </option>
    </select>
    <i v-show="isLoading" class="fa fa-refresh fa-spin" aria-hidden="true"></i>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import AdminConfig from "../../../helpers/admin-config";
import { SafeJsonParse } from "../../../helpers/common";
import { EventBus } from "../../../helpers/event-bus";

const props = defineProps([
  "dataName",
  "dataId",
  "dataPlatforms",
  "dataSelected",
  "dataMultiple",
  "dataSiteId",
  "dataFetchOnInit",
]);

// Helpers
const getInitialSelected = () => {
  if (typeof props.dataMultiple === "undefined" || props.dataMultiple !== "true") {
    return typeof props.dataSelected === "undefined" ? 1 : parseInt(props.dataSelected);
  }
  return SafeJsonParse(props.dataSelected, [1]);
};

// State
const platforms = ref(SafeJsonParse(props.dataPlatforms, []));
const name = ref(typeof props.dataName === "undefined" ? "platform_id" : props.dataName);
const id = ref(typeof props.dataId === "undefined" ? "platform_id" : props.dataId);
const isMultiple = computed(() => props.dataMultiple === "true");
const siteId = ref(typeof props.dataSiteId === "undefined" ? 1 : parseInt(props.dataSiteId));
const fetchOnInit = ref(
  typeof props.dataFetchOnInit === "undefined" || props.dataFetchOnInit === "false"
    ? false
    : props.dataFetchOnInit
);
const isLoading = ref(false);
const selected = ref(getInitialSelected());

// Methods
const populatePlatform = (sId = null) => {
  if (sId === null || sId === "") {
    platforms.value = [];
    return false;
  }
  isLoading.value = true;

  const platformUrl = AdminConfig.admin_path(`ajax/getInfo/site/${sId}`);
  axios
    .get(platformUrl)
    .then((res) => {
      platforms.value = res.data.results.platform;
    })
    .catch((err) => {
      console.error(err.response?.data || err.message);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const setPlatform = () => {
  EventBus.emit("platform_changed", selected.value);
};

const init = () => {
  populatePlatform(siteId.value);
};

// Lifecycle
onMounted(() => {
  if (fetchOnInit.value !== false) {
    init();
  }
  EventBus.on("site_changed", populatePlatform);
});

onBeforeUnmount(() => {
  EventBus.off("site_changed", populatePlatform);
});
</script>

