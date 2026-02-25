<template>
  <div class="flex items-center space-x-2">
    <select
      :name="name"
      :id="id"
      @change="setPlatform"
      v-model="selected"
      :multiple="dataMultiple == 'true' ? true : false"
      class="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2 hover:border-gray-400 transition-all cursor-pointer"
    >
      <option value="">Select Platform</option>
      <option v-for="platform in platforms" :value="platform.id" :key="platform.id">
        {{ platform.name }}
      </option>
    </select>
    <i v-show="isLoading" class="fa fa-refresh fa-spin text-blue-600" aria-hidden="true"></i>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
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

const platforms = ref(SafeJsonParse(props.dataPlatforms, []));
const name = ref(
  typeof props.dataName === "undefined" ? "platform_id" : props.dataName
);
const id = ref(typeof props.dataId === "undefined" ? "platform_id" : props.dataId);
const siteId = ref(
  typeof props.dataSiteId === "undefined" ? 1 : parseInt(props.dataSiteId)
);
const fetchOnInit = ref(
  typeof props.dataFetchOnInit === "undefined" || props.dataFetchOnInit === "false"
    ? false
    : props.dataFetchOnInit
);
const isLoading = ref(false);

const selected = ref(
  props.dataMultiple !== "true"
    ? (typeof props.dataSelected === "undefined" ? 1 : parseInt(props.dataSelected))
    : SafeJsonParse(props.dataSelected, [1])
);

const populatePlatform = (siteIdParam = null) => {
  if (siteIdParam === null || siteIdParam === "") {
    platforms.value = [];
    return false;
  }
  isLoading.value = true;

  let platformUrl = AdminConfig.admin_path("ajax/getInfo/site/" + siteIdParam);
  axios
    .get(platformUrl)
    .then(function (res) {
      platforms.value = res.data.results.platform;
      isLoading.value = false;
    })
    .catch(function (res) {
      console.error(res.data);
      isLoading.value = false;
    });
};

const setPlatform = () => {
  EventBus.emit("platform_changed", selected.value);
};

onMounted(() => {
  if (fetchOnInit.value !== false) {
    populatePlatform(siteId.value);
  }
  EventBus.on("site_changed", populatePlatform);
});

onBeforeUnmount(() => {
  EventBus.off("site_changed", populatePlatform);
});
</script>

