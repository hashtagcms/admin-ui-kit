<template>
  <div class="inline-flex">
    <hc-button
      variant="soft"
      is-square
      size="sm"
      :icon="currentCss"
      @click="toggleMenu"
      :aria-label="mode === 'collapse' ? 'Collapse Side Menu' : 'Toggle Side Menu'"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { LeftMenu } from "../../../../helpers/common";
import { EventBus } from "../../../../helpers/event-bus";
import HcButton from "../../ui-kit/HcButton.vue";

const props = defineProps(["dataIconCss", "dataIconCssOff", "dataMode"]);

const currentCss = ref("");
const mode = ref(props.dataMode || "collapse"); // 'collapse' or 'hide'
const css = ref(props.dataIconCss || "fa fa-bars");
const cssOff = ref(props.dataIconCssOff || "fa fa-bars");

const updateIcon = () => {
    if (mode.value === "collapse") {
        currentCss.value = LeftMenu.isCollapsed() ? cssOff.value : css.value;
    } else {
        currentCss.value = LeftMenu.isVisible() ? css.value : cssOff.value;
    }
};

const onShow = () => updateIcon();
const onHide = () => updateIcon();
const onCollapse = () => updateIcon();
const onExpand = () => updateIcon();

const init = () => {
    updateIcon();
    
    EventBus.on("left-menu-on-show", onShow);
    EventBus.on("left-menu-on-hide", onHide);
    EventBus.on("left-menu-on-collapse", onCollapse);
    EventBus.on("left-menu-on-expand", onExpand);
};

onMounted(() => {
    LeftMenu.init();
    init();
});

onBeforeUnmount(() => {
    EventBus.off("left-menu-on-show", onShow);
    EventBus.off("left-menu-on-hide", onHide);
    EventBus.off("left-menu-on-collapse", onCollapse);
    EventBus.off("left-menu-on-expand", onExpand);
});

const toggleMenu = () => {
    if (mode.value === "collapse") {
        LeftMenu.toggleCollapse();
    } else {
        LeftMenu.toggleShow();
    }
    updateIcon();
};

</script>

