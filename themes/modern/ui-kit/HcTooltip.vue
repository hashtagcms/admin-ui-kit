<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcTooltip
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcTooltip.vue';
defineOptions({ name: 'ModernHcTooltip' });

const uiStyle = {
  wrapper: "relative inline-block group",
  tooltip: "absolute z-[1200] px-3 py-2 text-[10px] font-black uppercase tracking-widest text-white bg-gray-900 rounded-md shadow-xl whitespace-nowrap transition-all duration-300 scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100",
  arrow: "absolute w-2 h-2 bg-gray-900 rotate-45",
  positions: {
    'top': 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    'bottom': 'top-full left-1/2 -translate-x-1/2 mt-2',
    'left': 'right-full top-1/2 -translate-y-1/2 mr-2',
    'right': 'left-full top-1/2 -translate-y-1/2 ml-2'
  },
  arrowPositions: {
    'top': 'top-full left-1/2 -translate-x-1/2 -mt-1',
    'bottom': 'bottom-full left-1/2 -translate-x-1/2 -mb-1',
    'left': 'left-full top-1/2 -translate-y-1/2 -ml-1',
    'right': 'right-full top-1/2 -translate-y-1/2 -mr-1'
  }
};
</script>
