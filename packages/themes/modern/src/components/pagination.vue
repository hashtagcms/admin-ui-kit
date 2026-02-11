<template>
  <div class="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg border border-gray-100 shadow-sm gap-4 mt-8">
    <div class="text-xs font-black text-gray-400 uppercase tracking-widest px-4">
      <span class="counters" v-if="totalCount > 0">
        Showing <span class="text-gray-900">{{ dataFirstItem }}</span> to <span class="text-gray-900">{{ lastItem }}</span> of <span class="text-blue-600 font-black">{{ totalCount }}</span> Results
      </span>
    </div>
    
    <div class="flex-1 flex justify-center">
      <nav v-if="showPagination" class="inline-flex items-center gap-1.5" aria-label="Pagination">
        <ul class="inline-flex items-center gap-1.5">
          <li v-for="page in allPages" :key="page.label">
            <a
              :class="getCss(page)"
              :href="getLink(page)"
              v-html="getLabel(page.label)"
            ></a>
          </li>
        </ul>
      </nav>
    </div>

    <div v-if="totalCount > 0 && showDownload" class="px-2">
      <download-button
        :data-controller-name="controllerName"
      ></download-button>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@hashtagcms/helpers/event-bus";
import DownloadButton from "./downlods.vue";

export default {
  components: {
    "download-button": DownloadButton,
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
      paginator: JSON.parse(this.dataPaginator),
      pageLabel: {
        "pagination.next": this.dataNextLabel,
        "pagination.previous": this.dataPreviousLabel,
      },
      showDownload:
        this.dataShowDownload === "true" || this.dataShowDownload === "1",
    };
  },
  computed: {
    hasPreviousPage() {
      return this.paginator.prev_page_url != null;
    },
    allPages() {
      return this.paginator.links;
    },
    showPagination() {
      return this.allPages.length > 3; //["Previous", "1", "Next"]
    },
  },
  methods: {
    decreaseCounter() {
      this.totalCount = this.totalCount - 1;
      this.lastItem = this.lastItem - 1;
    },
    getLink(page) {
      return page.url == null ? "javascript:void(0)" : page.url;
    },
    getLabel(label) {
      //label is provided from view file
      if (this.pageLabel[label]) {
        return this.pageLabel[label];
      }

      return label;
    },
    getCss(page) {
      let base = "relative inline-flex items-center px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-sm active:scale-95";
      if (page.url == null) {
        return base + " bg-gray-50 text-gray-300 border border-transparent cursor-not-allowed";
      }
      if (page.active === true) {
        return base + " bg-blue-600 text-white shadow-lg shadow-blue-500/20 z-10 scale-105";
      }
      return base + " bg-white text-gray-400 border border-gray-100 hover:border-blue-500 hover:text-blue-600";
    },
    updatePageParams() {
      let params = window.location.search.substring(1);
      // console.log("params "+params);
      let hasPage = params.match(/page=\d+/gi);
      if (hasPage != null) {
        params = params.replace(/page=\d+/, "");
      }
      if (params !== "") {
        params = params.indexOf("&") === 0 ? params : "&" + params;
        let elements = document.querySelectorAll(".pagination a");
        elements.forEach(function (ele, index) {
          let href = ele.href;
          href = href + "" + params;
          //remove last and double &
          href = href.replace(/&$/, "");
          href = href.replace(/&&/, "&");
          ele.href = href;
        });
      }
    },
  },
};
</script>
