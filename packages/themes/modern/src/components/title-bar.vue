<template>
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
    <div class="flex items-center gap-4">
      <div v-if="showExpand" class="flex items-center">
        <left-menu-toggle
          data-icon-css="fa fa-chevron-left shadow-sm"
          data-icon-css-off="fa fa-chevron-right shadow-sm"
        ></left-menu-toggle>
      </div>
      <div>
          <h4 class="text-2xl font-black text-gray-900 tracking-tight uppercase leading-none" v-html="title"></h4>
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1.5 opacity-70">Configuration Workspace</p>
      </div>
    </div>
    
    <div class="flex items-center gap-3 w-full sm:w-auto bg-gray-50/50 p-2 rounded-lg border border-gray-100 shadow-inner">
      <copy-paste
        :data-copy-paste-auto-init="dataCopyPasteAutoInit"
        :data-show-copy="dataShowCopy"
        :data-show-paste="dataShowPaste"
      ></copy-paste>
      <button
        v-if="showBackButton"
        aria-label="Back"
        class="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white bg-gray-900 hover:bg-black rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
        title="Go Back"
        type="button"
        @click="goBack()"
      >
        <i class="fa fa-arrow-left text-[10px]"></i>
        {{ backTitle }}
      </button>
    </div>
  </div>
</template>

<script>
import CopyPaste from "./library/copy-paste.vue";
import LeftMenuShowHide from "./library/left-menu-show-hide.vue";

export default {
  components: {
    "copy-paste": CopyPaste,
    "left-menu-toggle": LeftMenuShowHide,
  },
  mounted() {},
  props: [
    "dataTitle",
    "dataBackUrl",
    "dataBackTitle",
    "dataShowCopy",
    "dataShowPaste",
    "dataCopyPasteAutoInit",
    "dataShowExpand",
  ],
  computed: {
    showBackButton() {
      return typeof this.dataBackUrl !== "undefined";
    },
    showExpand() {
      return typeof this.dataShowExpand !== "undefined";
    },
  },
  data() {
    return {
      title: this.dataTitle,
      backUrl: this.dataBackUrl,
      backTitle:
        typeof this.dataBackTitle === "undefined" ? "Back" : this.dataBackTitle,
    };
  },
  methods: {
    goBack() {
      window.location.href = this.backUrl;
    },
  },
};
</script>
