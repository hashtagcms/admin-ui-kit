<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcCard
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcCard.vue';
defineOptions({ name: 'ModernHcCard' });

const uiStyle = {
  base: "bg-white border transition-all duration-300",
  header: "px-6 py-4 border-b border-gray-50 flex items-center justify-between",
  title: "text-xs font-black uppercase tracking-widest text-gray-900",
  subtitle: "text-[10px] font-bold text-gray-400 mt-0.5",
  media: "relative",
  footer: "px-6 py-4 bg-gray-50/30 border-t border-gray-50",
  shadows: {
    'none': 'shadow-none',
    'sm': 'shadow-sm',
    'md': 'shadow-md',
    'lg': 'shadow-lg',
    'xl': 'shadow-xl'
  },
  rounded: {
    'none': 'rounded-none',
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'xl': 'rounded-xl',
    '2xl': 'rounded-2xl'
  },
  border: 'border-gray-100',
  noBorder: 'border-transparent'
};
</script>
