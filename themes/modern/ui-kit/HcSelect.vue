<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcSelect
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcSelect.vue';
defineOptions({ name: 'ModernHcSelect' });

const uiStyle = {
  wrapper: "w-full",
  label: "block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1",
  container: "relative group",
  select: "w-full bg-white border appearance-none transition-all duration-300 outline-none font-bold text-xs tracking-tight px-4 cursor-pointer",
  arrowWrapper: "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors",
  arrowIcon: "fa fa-chevron-down text-[10px]",
  hint: "mt-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-tighter ml-1",
  disabled: "opacity-50 cursor-not-allowed bg-gray-50",
  enabled: "hover:border-gray-300",
  sizes: {
    'sm': 'py-2 rounded-md',
    'md': 'py-3.5 rounded-lg',
    'lg': 'py-5 rounded-xl'
  },
  variants: {
    'primary': 'border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900',
    'success': 'border-emerald-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-emerald-900',
    'danger': 'border-rose-100 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 text-rose-900',
    'info': 'border-blue-100 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 text-blue-900'
  }
};
</script>
