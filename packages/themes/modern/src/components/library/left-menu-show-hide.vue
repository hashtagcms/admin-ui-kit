<template>
  <div class="inline-flex">
    <button 
        @click="toggleMenu" 
        class="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white text-gray-400 hover:text-blue-600 rounded-xl transition-all shadow-sm border border-gray-100/10 hover:border-blue-100 active:scale-90 group"
        aria-label="Toggle Side Menu"
    >
        <i :class="[currentCss, 'text-lg transition-transform group-hover:scale-110']"></i>
    </button>
  </div>
</template>

<script>
import { LeftMenu } from "@hashtagcms/helpers/common";
import { EventBus } from "@hashtagcms/helpers/event-bus";

export default {
  mounted() {
    LeftMenu.init();
    this.init();
  },
  props: ["dataIconCss", "dataIconCssOff"],
  data() {
    return {
      visible: true,
      currentCss: "",
      css:
        typeof this.dataIconCss == "undefined" || this.dataIconCss === ""
          ? "fa fa-arrow-left cursor-pointer"
          : this.dataIconCss,
      cssOff:
        typeof this.dataIconCssOff == "undefined" || this.dataIconCssOff === ""
          ? "fa fa-arrow-right cursor-pointer"
          : this.dataIconCssOff,
    };
  },
  methods: {
    init() {
      this.currentCss = LeftMenu.isVisible() ? this.css : this.cssOff;
      EventBus.on("left-menu-on-show", () => {
        this.currentCss = this.css;
      });
      EventBus.on("left-menu-on-hide", () => {
        this.currentCss = this.cssOff;
      });
    },
    toggleMenu() {
      this.visible = !this.visible;
      LeftMenu.toggleShow();
    },
  },
};
</script>
