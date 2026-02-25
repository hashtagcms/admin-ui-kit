<template>
  <div class="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg border border-gray-100 shadow-sm gap-4 mt-8" v-if="totalCount > 0">
    <div class="text-xs font-black text-gray-400 uppercase tracking-widest px-4">
      <span class="counters">
        Showing <span class="text-gray-900">{{ dataFirstItem }}</span> to <span class="text-gray-900">{{ lastItem }}</span> of <span class="text-blue-600 font-black">{{ totalCount }}</span> Results
      </span>
    </div>
    
    <div class="flex-1 flex justify-center">
      <hc-pagination 
        v-if="showPagination"
        :model-value="paginator.current_page"
        :total-pages="paginator.last_page"
        @change="handlePageChange"
      />
    </div>

    <div v-if="totalCount > 0 && showDownload" class="px-2">
      <download-button
        :data-controller-name="controllerName"
      ></download-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { EventBus } from "../../../helpers/event-bus";
import { SafeJsonParse } from "../../../helpers/common";
import DownloadButton from "./downloads.vue";
import HcPagination from "../ui-kit/HcPagination.vue";

const props = defineProps([
  "dataPaginator",
  "dataFirstItem",
  "dataLastItem",
  "dataTotal",
  "dataControllerName",
  "dataNextLabel",
  "dataPreviousLabel",
  "dataShowDownload",
]);

const totalCount = ref(parseInt(props.dataTotal));
const lastItem = ref(parseInt(props.dataLastItem));
const controllerName = ref(props.dataControllerName);
const paginator = ref(SafeJsonParse(props.dataPaginator, {}));
const showDownload = ref(
  props.dataShowDownload === "true" || props.dataShowDownload === "1"
);

const showPagination = computed(() => {
  return paginator.value.last_page > 1;
});

const decreaseCounter = () => {
  totalCount.value = totalCount.value - 1;
  lastItem.value = lastItem.value - 1;
};

const handlePageChange = (page) => {
  // Find the URL for this page number in Laravel's links
  // Usually Laravel provides links like [ {label: "1", url: "..."}, {label: "2", url: "..."}, ... ]
  const pageLink = paginator.value.links?.find((link) => link.label == page);
  if (pageLink && pageLink.url) {
    window.location.href = pageLink.url;
  } else {
    // Fallback: manually construct URL or find by page number
    const baseUrl = paginator.value.path;
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", page);
    window.location.href = `${baseUrl}?${searchParams.toString()}`;
  }
};

onMounted(() => {
  EventBus.on("pagination-on-delete", decreaseCounter);
});

onBeforeUnmount(() => {
  EventBus.off("pagination-on-delete", decreaseCounter);
});
</script>

