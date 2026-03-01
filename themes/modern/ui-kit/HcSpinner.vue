<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcSpinner
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcSpinner.vue';
defineOptions({ name: 'ModernHcSpinner' });

const uiStyle = {
  base: "inline-block",
  svg: "animate-spin",
  circle: "opacity-25",
  path: "opacity-75",
  srOnly: "sr-only",
  sizes: {
    'xs': 'w-3 h-3',
    'sm': 'w-4 h-4',
    'md': 'w-6 h-6',
    'lg': 'w-8 h-8',
    'xl': 'w-12 h-12'
  },
  colors: {
    'primary': 'text-blue-600',
    'secondary': 'text-slate-600',
    'success': 'text-emerald-600',
    'danger': 'text-rose-600',
    'warning': 'text-amber-500',
    'info': 'text-sky-500',
    'white': 'text-white',
    'gray': 'text-gray-300'
  }
};
</script>
