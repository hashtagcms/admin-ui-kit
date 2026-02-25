<template>
  <div
    class="btn-toolbar justify-content-between border-bottom mb-2 pb-2"
    role="toolbar"
  >
    <div class="btn-group" role="group">
      <small style="position: relative; top: 5px" v-if="showExpand">
        <left-menu-toggle
          data-icon-css="fa fa-arrow-left hand"
          data-icon-css-off="fa fa-arrow-right hand"
        ></left-menu-toggle
      ></small>
      <h4 class="moduleTitle" v-html="title"></h4>
    </div>
    <div class="input-group actionToolbar">
      <copy-paste
        :data-copy-paste-auto-init="dataCopyPasteAutoInit"
        :data-show-copy="dataShowCopy"
        :data-show-paste="dataShowPaste"
      ></copy-paste>
      <button
        v-if="showBackButton"
        aria-label="Back"
        class="btn btn-outline-secondary"
        title="Back"
        type="button"
        @click="goBack()"
      >
        {{ backTitle }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import CopyPaste from "./library/copy-paste.vue";
import LeftMenuToggle from "./library/left-menu-show-hide.vue";

const props = defineProps([
  "dataTitle",
  "dataBackUrl",
  "dataBackTitle",
  "dataShowCopy",
  "dataShowPaste",
  "dataCopyPasteAutoInit",
  "dataShowExpand",
]);

// State
const title = ref(props.dataTitle);
const backUrl = ref(props.dataBackUrl);
const backTitle = ref(typeof props.dataBackTitle === "undefined" ? "Back" : props.dataBackTitle);

// Computed
const showBackButton = computed(() => typeof props.dataBackUrl !== "undefined");
const showExpand = computed(() => typeof props.dataShowExpand !== "undefined");

// Methods
const goBack = () => {
  window.location.href = backUrl.value;
};
</script>

