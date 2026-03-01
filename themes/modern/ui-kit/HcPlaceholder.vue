<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcPlaceholder
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcPlaceholder.vue';
defineOptions({ name: 'ModernHcPlaceholder' });

const uiStyle = {
  base: "relative overflow-hidden bg-gray-100 hc-shimmer",
  rounded: {
    'none': 'rounded-none',
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'full': 'rounded-full'
  },
  shimmer: "hc-shimmer"
};
</script>
