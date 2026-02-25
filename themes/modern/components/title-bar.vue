<template>
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
    <div class="flex items-center gap-4">
      <div v-if="showExpand" class="flex items-center">
        <left-menu-toggle
          data-icon-css="fa fa-chevron-left shadow-sm"
          data-icon-css-off="fa fa-chevron-right shadow-sm"
        ></left-menu-toggle>
      </div>
      <div class="w-1.5 h-10 bg-blue-600 rounded-full shadow-lg shadow-blue-500/20"></div>
      <div>
          <h4 class="text-2xl font-black text-gray-900 tracking-tight uppercase leading-none" v-html="title"></h4>
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1.5 opacity-70">{{subTitle}}</p>
      </div>
    </div>
    
    <div v-if="showDiv" class="flex items-center gap-3 w-full sm:w-auto bg-gray-50/50 p-2 rounded-lg border border-gray-100 shadow-inner">
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

<script setup>
import { ref, computed } from "vue";
import CopyPaste from "./library/copy-paste.vue";
import LeftMenuToggle from "./library/left-menu-show-hide.vue";
import HcButton from "../ui-kit/HcButton.vue";

const props = defineProps([
  "dataTitle",
  "dataBackUrl",
  "dataBackTitle",
  "dataSubTitle",
  "dataShowCopy",
  "dataShowPaste",
  "dataCopyPasteAutoInit",
  "dataShowExpand"
]);

const title = ref(props.dataTitle);
const subTitle = ref(props.dataSubTitle || "");
const backUrl = ref(props.dataBackUrl);
const backTitle = ref(
  typeof props.dataBackTitle === "undefined" ? "Back" : props.dataBackTitle
);

const showBackButton = computed(() => {
  return props.dataBackUrl !== undefined;
});

const showExpand = computed(() => {
  return props.dataShowExpand !== undefined;
});

const showDiv = computed(() => {
  const isCopyVisible = props.dataShowCopy === undefined || props.dataShowCopy?.toString() === "true";
  const isPasteVisible = props.dataShowPaste === undefined || props.dataShowPaste?.toString() === "true";
  return showBackButton.value || isCopyVisible || isPasteVisible;
});


</script>

