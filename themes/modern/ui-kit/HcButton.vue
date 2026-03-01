<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcButton
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcButton.vue';
defineOptions({ name: 'ModernHcButton' });

const uiStyle = {
  base: "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:scale-95 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed group",
  variants: {
    'primary': 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30',
    'secondary': 'bg-slate-600 text-white shadow-lg shadow-slate-500/20 hover:bg-slate-700 hover:shadow-slate-500/30',
    'success': 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 hover:shadow-emerald-500/30',
    'danger': 'bg-rose-600 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-700 hover:shadow-rose-500/30',
    'warning': 'bg-amber-500 text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600 hover:shadow-amber-500/30',
    'info': 'bg-sky-500 text-white shadow-lg shadow-sky-500/20 hover:bg-sky-600 hover:shadow-sky-500/30',
    'ghost': 'bg-transparent text-slate-600 hover:bg-slate-100 shadow-none',
    'soft': 'bg-white border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-500 shadow-sm',
    'dark': 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 hover:bg-black',
  },
  active: 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-700',
  sizes: {
    'xs': 'px-3 py-1.5 text-[10px]',
    'sm': 'px-4 py-2 text-[10px]',
    'md': 'px-6 py-3 text-xs',
    'lg': 'px-8 py-4 text-sm',
    'xl': 'px-10 py-5 text-base'
  },
  squareSizes: {
    'xs': 'w-6 h-6 text-[10px]',
    'sm': 'w-8 h-8 text-[10px]',
    'md': 'w-10 h-10 text-xs',
    'lg': 'w-12 h-12 text-sm',
    'xl': 'w-14 h-14 text-base'
  },
  rounded: {
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'xl': 'rounded-xl',
    '2xl': 'rounded-2xl',
    'full': 'rounded-full'
  },
  fullWidth: 'w-full'
};
</script>
