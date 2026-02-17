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
      
      <hc-button
        v-if="showBackButton"
        variant="dark"
        :href="backUrl"
        as="a"
        icon="fa fa-arrow-left"
      >
        {{ backTitle }}
      </hc-button>
    </div>
  </div>
</template>

<script>
import CopyPaste from "./library/copy-paste.vue";
import LeftMenuShowHide from "./library/left-menu-show-hide.vue";
import HcButton from "../ui-kit/HcButton.vue";

export default {
  name: "TitleBar",
  components: {
    "copy-paste": CopyPaste,
    "left-menu-toggle": LeftMenuShowHide,
    HcButton
  },
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
};
</script>
