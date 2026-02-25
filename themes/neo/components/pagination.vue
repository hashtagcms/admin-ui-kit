<template>
  <div class="row">
    <div class="col-auto">
      <span class="counters" v-if="totalCount > 0">
        {{ dataFirstItem }} - {{ lastItem }} of {{ totalCount }}
      </span>
    </div>
    <div class="col-auto">
      <nav v-if="showPagination" class="shadow-sm">
        <ul class="pagination">
          <li v-for="page in allPages" :class="getCss(page)">
            <a
              class="page-link"
              :href="getLink(page)"
              v-html="getLabel(page.label)"
            ></a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="col float-end" v-if="totalCount > 0 && showDownload">
      <span class="pull-right" style="margin-right: 16px">
        <download-button
          :data-controller-name="controllerName"
        ></download-button>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { EventBus } from "../../../helpers/event-bus";
import { SafeJsonParse } from "../../../helpers/common";
import DownloadButton from "./downloads.vue";

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

// State
const totalCount = ref(parseInt(props.dataTotal));
const lastItem = ref(parseInt(props.dataLastItem));
const controllerName = ref(props.dataControllerName);
const paginator = ref(SafeJsonParse(props.dataPaginator, {}));
const pageLabel = {
  "pagination.next": props.dataNextLabel,
  "pagination.previous": props.dataPreviousLabel,
};
const showDownload = ref(props.dataShowDownload === "true" || props.dataShowDownload === "1");

// Computed
const hasPreviousPage = computed(() => paginator.value.prev_page_url != null);
const allPages = computed(() => paginator.value.links || []);
const showPagination = computed(() => allPages.value.length > 3); // ["Previous", "1", "Next"]

// Methods
const decreaseCounter = () => {
  totalCount.value -= 1;
  lastItem.value -= 1;
};

const getLink = (page) => (page.url == null ? "javascript:void(0)" : page.url);

const getLabel = (label) => pageLabel[label] || label;

const getCss = (page) => {
  if (page.url == null) {
    return "page-item disabled";
  }
  return page.active === true ? "page-item active" : "page-item";
};

const updatePageParams = () => {
  let params = window.location.search.substring(1);
  const hasPage = params.match(/page=\d+/gi);
  if (hasPage != null) {
    params = params.replace(/page=\d+/, "");
  }
  if (params !== "") {
    params = params.indexOf("&") === 0 ? params : `&${params}`;
    const elements = document.querySelectorAll(".pagination a");
    elements.forEach((ele) => {
      let href = ele.href;
      href = `${href}${params}`;
      // remove last and double &
      href = href.replace(/&$/, "").replace(/&&/, "&");
      ele.href = href;
    });
  }
};

onMounted(() => {
  updatePageParams();
  EventBus.on("pagination-on-delete", decreaseCounter);
});

onBeforeUnmount(() => {
  EventBus.off("pagination-on-delete", decreaseCounter);
});
</script>

