<template>
  <div class="inline-flex">
    <hc-button
      variant="soft"
      is-square
      :icon="currentCss"
      @click="toggleMenu"
      :aria-label="mode === 'collapse' ? 'Collapse Side Menu' : 'Toggle Side Menu'"
    />
  </div>
</template>

<script>
import { LeftMenu } from "../../../../helpers/common";
import { EventBus } from "../../../../helpers/event-bus";
import HcButton from "../../ui-kit/HcButton.vue";

export default {
  name: "LeftMenuToggle",
  components: {
    "hc-button": HcButton,
  },
  props: ["dataIconCss", "dataIconCssOff", "dataMode"],
  data() {
    return {
      currentCss: "",
      mode: this.dataMode || "collapse", // 'collapse' or 'hide'
      css: this.dataIconCss || "fa fa-bars",
      cssOff: this.dataIconCssOff || "fa fa-bars",
    };
  },
  mounted() {
    LeftMenu.init();
    this.init();
  },
  beforeUnmount() {
    EventBus.off("left-menu-on-show", this.onShow);
    EventBus.off("left-menu-on-hide", this.onHide);
    EventBus.off("left-menu-on-collapse", this.onCollapse);
    EventBus.off("left-menu-on-expand", this.onExpand);
  },
  methods: {
    init() {
      this.updateIcon();
      
      EventBus.on("left-menu-on-show", this.onShow);
      EventBus.on("left-menu-on-hide", this.onHide);
      EventBus.on("left-menu-on-collapse", this.onCollapse);
      EventBus.on("left-menu-on-expand", this.onExpand);
    },
    updateIcon() {
      if (this.mode === "collapse") {
        this.currentCss = LeftMenu.isCollapsed() ? this.cssOff : this.css;
      } else {
        this.currentCss = LeftMenu.isVisible() ? this.css : this.cssOff;
      }
    },
    onShow() { this.updateIcon(); },
    onHide() { this.updateIcon(); },
    onCollapse() { this.updateIcon(); },
    onExpand() { this.updateIcon(); },
    
    toggleMenu() {
      if (this.mode === "collapse") {
        LeftMenu.toggleCollapse();
      } else {
        LeftMenu.toggleShow();
      }
      this.updateIcon();
    },
  },
};
</script>
