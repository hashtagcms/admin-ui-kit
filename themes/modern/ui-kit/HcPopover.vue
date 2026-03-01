<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcPopover
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcPopover.vue';
defineOptions({ name: 'ModernHcPopover' });

const uiStyle = {
  wrapper: "relative inline-block",
  trigger: "cursor-pointer",
  popover: "absolute z-[1200] bg-white border border-gray-100 rounded-lg shadow-2xl min-w-[240px] overflow-hidden",
  header: "px-5 py-3 border-b border-gray-50 bg-gray-50/50",
  title: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-900",
  content: "px-5 py-4 text-xs font-bold text-gray-600 leading-relaxed",
  positions: {
    // Top row
    'top': 'bottom-full left-1/2 -translate-x-1/2 mb-3',
    'top-start': 'bottom-full left-0 mb-3',
    'top-end': 'bottom-full right-0 mb-3',
    
    // Bottom row
    'bottom': 'top-full left-1/2 -translate-x-1/2 mt-3',
    'bottom-start': 'top-full left-0 mt-3',
    'bottom-end': 'top-full right-0 mt-3',

    // Left row
    'left': 'right-full top-1/2 -translate-y-1/2 mr-3',
    'left-start': 'right-full top-0 mr-3',
    'left-end': 'right-full bottom-0 mr-3',

    // Right row
    'right': 'left-full top-1/2 -translate-y-1/2 ml-3',
    'right-start': 'left-full top-0 ml-3',
    'right-end': 'left-full bottom-0 ml-3'
  },
  transitionName: 'hc-popover-fade'
};
</script>
