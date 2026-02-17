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

<script>
import { EventBus } from "../../../helpers/event-bus";
import { SafeJsonParse } from "../../../helpers/common";
import DownloadButton from "./downloads.vue";
import HcPagination from "../ui-kit/HcPagination.vue";

export default {
  name: "Pagination",
  components: {
    "download-button": DownloadButton,
    HcPagination
  },
  mounted() {
    this.updatePageParams();
    let $this = this;
    EventBus.on("pagination-on-delete", function () {
      $this.decreaseCounter();
    });
  },
  props: [
    "dataPaginator",
    "dataFirstItem",
    "dataLastItem",
    "dataTotal",
    "dataControllerName",
    "dataNextLabel",
    "dataPreviousLabel",
    "dataShowDownload",
  ],
  data() {
    return {
      totalCount: parseInt(this.dataTotal),
      lastItem: parseInt(this.dataLastItem),
      controllerName: this.dataControllerName,
      paginator: SafeJsonParse(this.dataPaginator, {}),
      pageLabel: {
        "pagination.next": this.dataNextLabel,
        "pagination.previous": this.dataPreviousLabel,
      },
      showDownload:
        this.dataShowDownload === "true" || this.dataShowDownload === "1",
    };
  },
  computed: {
    showPagination() {
      return this.paginator.last_page > 1;
    },
  },
  methods: {
    decreaseCounter() {
      this.totalCount = this.totalCount - 1;
      this.lastItem = this.lastItem - 1;
    },
    handlePageChange(page) {
      // Find the URL for this page number in Laravel's links
      // Usually Laravel provides links like [ {label: "1", url: "..."}, {label: "2", url: "..."}, ... ]
      const pageLink = this.paginator.links.find(link => link.label == page);
      if (pageLink && pageLink.url) {
        window.location.href = pageLink.url;
      } else {
        // Fallback: manually construct URL or find by page number
        const baseUrl = this.paginator.path;
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('page', page);
        window.location.href = `${baseUrl}?${searchParams.toString()}`;
      }
    },
    updatePageParams() {
      // This legacy method was used to fixup <a> tags, 
      // with HcPagination we handle navigation via handlePageChange
    },
  },
};
</script>
