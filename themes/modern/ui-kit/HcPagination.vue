<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcPagination
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcPagination.vue';
defineOptions({ name: 'ModernHcPagination' });

const uiStyle = {
  base: "flex items-center space-x-1",
  button: "p-2 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg border transition-all duration-300",
  enabledButton: "border-gray-100 bg-white text-gray-500 hover:border-blue-500 hover:text-blue-600 hover:-translate-y-0.5 active:scale-95",
  disabledButton: "border-gray-100 bg-white text-gray-500 opacity-30 cursor-not-allowed",
  prevIcon: "fa fa-chevron-left text-[10px]",
  nextIcon: "fa fa-chevron-right text-[10px]",
  pageButton: "px-3 py-1.5 min-w-[32px] text-[10px] font-black uppercase tracking-widest rounded-lg border transition-all duration-300 hover:-translate-y-0.5 active:scale-95",
  activePage: "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30",
  inactivePage: "bg-white border-gray-100 text-gray-500 hover:border-blue-500 hover:text-blue-600",
  ellipsis: "px-2 text-gray-300"
};
</script>
