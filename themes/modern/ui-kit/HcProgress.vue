<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcProgress
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcProgress.vue';
defineOptions({ name: 'ModernHcProgress' });

const uiStyle = {
  wrapper: "w-full",
  labelContainer: "flex justify-between mb-1",
  label: "text-[10px] font-black uppercase tracking-widest text-gray-500",
  percentage: "text-[10px] font-black text-gray-400",
  track: "w-full bg-gray-100 overflow-hidden",
  barBase: "h-full transition-all duration-500 ease-out",
  animated: "animate-pulse",
  colors: {
    'primary': 'bg-blue-600',
    'success': 'bg-emerald-500',
    'danger': 'bg-rose-500',
    'warning': 'bg-amber-500',
    'info': 'bg-sky-500'
  },
  sizes: {
    'sm': 'h-1',
    'md': 'h-2',
    'lg': 'h-4'
  },
  roundedFull: 'rounded-full',
  roundedNone: 'rounded-none'
};
</script>
