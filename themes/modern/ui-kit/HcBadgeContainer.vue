<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcBadgeContainer
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcBadgeContainer.vue';
defineOptions({ name: 'ModernHcBadgeContainer' });

const uiStyle = {
  base: "relative inline-flex",
  badgeWrapper: "absolute z-10 transform translate-x-1/2 -translate-y-1/2 top-0 right-0",
  badge: "flex items-center justify-center px-1.5 py-0.5 min-w-[18px] h-[18px] text-[8px] font-black leading-none bg-rose-600 text-white rounded-full border-2 border-white"
};
</script>
