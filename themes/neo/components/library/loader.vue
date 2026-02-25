<template>
  <div v-show="visible">
    <div class="loaderModal" ref="loaderModal" v-show="asModal"></div>
    <div class="loaderPanel" ref="loaderSpinner">
      <div class="spinner">
        <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle
            class="length"
            fill="none"
            stroke-width="8"
            stroke-linecap="round"
            cx="33"
            cy="33"
            r="28"
          ></circle>
        </svg>
        <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle
            fill="none"
            stroke-width="8"
            stroke-linecap="round"
            cx="33"
            cy="33"
            r="28"
          ></circle>
        </svg>
        <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle
            fill="none"
            stroke-width="8"
            stroke-linecap="round"
            cx="33"
            cy="33"
            r="28"
          ></circle>
        </svg>
        <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle
            fill="none"
            stroke-width="8"
            stroke-linecap="round"
            cx="33"
            cy="33"
            r="28"
          ></circle>
        </svg>
      </div>

      <span class="loaderText" v-html="loadingText"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps(["dataLoadingText", "dataAsModal"]);

// Template Refs
const loaderModal = ref(null);
const loaderSpinner = ref(null);

// State
const loadingText = ref(
  props.dataLoadingText === undefined ? "Loading. Please wait..." : props.dataLoadingText
);
const asModal = ref(props.dataAsModal === undefined || props.dataAsModal === true);
const visible = ref(false);

// Helpers
const getHeightWidth = () => {
  let width = 0;
  let height = 0;
  if (typeof window.innerWidth === "number") {
    // Non-IE
    width = window.innerWidth;
    height = window.innerHeight;
  } else if (
    document.documentElement &&
    (document.documentElement.clientWidth || document.documentElement.clientHeight)
  ) {
    // IE 6+ in 'standards compliant mode'
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
  } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
    // IE 4 compatible
    width = document.body.clientWidth;
    height = document.body.clientHeight;
  }

  return { width, height };
};

// Methods
const fixLayout = (position = null) => {
  const heightWidth = getHeightWidth();

  if (loaderModal.value) {
    loaderModal.value.style.width = `${heightWidth.width}px`;
    loaderModal.value.style.height = `${heightWidth.height}px`;
  }

  if (loaderSpinner.value && position !== null) {
    if (position.left) {
      loaderSpinner.value.style.left = `${position.left}px`;
    }
    if (position.top) {
      loaderSpinner.value.style.top = `${position.top}px`;
    }
    if (position.right) {
      loaderSpinner.value.style.top = `${position.right}px`;
    }
  }
};

const show = (message = null, position = null) => {
  visible.value = true;

  if (typeof message === "string") {
    loadingText.value = message;
  }

  fixLayout(position);
};

const hide = () => {
  visible.value = false;
};

defineExpose({ show, hide });

onMounted(() => {
  fixLayout();
});
</script>

