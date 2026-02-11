<template>
  <div v-show="visible" class="fixed inset-0 z-[9999] flex items-center justify-center">
    <!-- Modal Backdrop -->
    <div v-if="asModal" class="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] transition-opacity"></div>
    
    <!-- Loader Panel -->
    <div class="relative flex flex-col items-center bg-white p-8 rounded-lg shadow-lg border border-gray-100 min-w-[200px]">
      <div class="relative w-12 h-12">
        <!-- Outer Track -->
        <svg class="absolute inset-0 w-full h-full text-gray-100" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle fill="none" stroke="currentColor" stroke-width="8" cx="33" cy="33" r="28"></circle>
        </svg>
        <!-- Animated Spinner -->
        <svg class="absolute inset-0 w-full h-full text-blue-600 animate-spin" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle
            fill="none"
            stroke="currentColor"
            stroke-width="8"
            stroke-linecap="round"
            stroke-dasharray="100"
            stroke-dashoffset="60"
            cx="33"
            cy="33"
            r="28"
          ></circle>
        </svg>
      </div>

      <span class="mt-4 text-gray-600 font-medium text-sm tracking-wide" v-html="loadingText"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dataLoadingText", "dataAsModal"],
  mounted() {
    this.fixLayout();
  },
  data() {
    return {
      loadingText:
        typeof this.dataLoadingText === "undefined"
          ? "Loading. Please wait..."
          : this.dataLoadingText,
      asModal:
        typeof dataAsModal === "undefined" || dataAsModal === true
          ? true
          : false,
      visible: false,
    };
  },
  methods: {
    fixLayout(position = null) {
        // Tailwind handles layout automatically via fixed inset-0
    },
    show(message = null, position = null) {
      this.visible = true;

      if (typeof message == "string") {
        this.loadingText = message;
      }
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>
