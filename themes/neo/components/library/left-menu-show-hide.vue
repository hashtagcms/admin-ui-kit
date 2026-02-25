<template>
  <div class="btn-group">
    <span @click="toggleMenu" :class="currentCss"></span>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { LeftMenu } from "../../../../helpers/common";
import { EventBus } from "../../../../helpers/event-bus";

const props = defineProps(["dataIconCss", "dataIconCssOff"]);

// State
const visible = ref(true);
const currentCss = ref("");
const css = ref(props.dataIconCss || "fa fa-arrow-left hand");
const cssOff = ref(props.dataIconCssOff || "fa fa-arrow-right hand");

// Methods
const toggleMenu = () => {
  visible.value = !visible.value;
  LeftMenu.toggleShow();
};

const onShow = () => {
  currentCss.value = css.value;
};

const onHide = () => {
  currentCss.value = cssOff.value;
};

const init = () => {
  currentCss.value = LeftMenu.isVisible() ? css.value : cssOff.value;
  EventBus.on("left-menu-on-show", onShow);
  EventBus.on("left-menu-on-hide", onHide);
};

onMounted(() => {
  LeftMenu.init();
  init();
});

onBeforeUnmount(() => {
  EventBus.off("left-menu-on-show", onShow);
  EventBus.off("left-menu-on-hide", onHide);
});
</script>

