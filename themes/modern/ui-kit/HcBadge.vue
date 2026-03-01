<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcBadge
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcBadge.vue';
defineOptions({ name: 'ModernHcBadge' });

const uiStyle = {
  base: "inline-flex items-center font-black uppercase tracking-widest leading-none",
  sizes: {
    'sm': 'px-2 py-1 text-[8px]',
    'md': 'px-2.5 py-1.5 text-[10px]',
    'lg': 'px-3 py-2 text-xs'
  },
  variants: {
    'primary': { base: 'bg-blue-100 text-blue-700', outline: 'border border-blue-600 text-blue-600' },
    'secondary': { base: 'bg-slate-100 text-slate-700', outline: 'border border-slate-600 text-slate-600' },
    'success': { base: 'bg-emerald-100 text-emerald-700', outline: 'border border-emerald-600 text-emerald-600' },
    'danger': { base: 'bg-rose-100 text-rose-700', outline: 'border border-rose-600 text-rose-600' },
    'warning': { base: 'bg-amber-100 text-amber-700', outline: 'border border-amber-500 text-amber-600' },
    'info': { base: 'bg-sky-100 text-sky-700', outline: 'border border-sky-500 text-sky-600' },
    'neutral': { base: 'bg-gray-100 text-gray-500', outline: 'border border-gray-400 text-gray-400' }
  },
  pill: 'rounded-full',
  rounded: 'rounded-md'
};
</script>
