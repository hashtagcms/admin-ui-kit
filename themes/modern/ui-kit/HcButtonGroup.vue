<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcButtonGroup
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcButtonGroup.vue';
defineOptions({ name: 'ModernHcButtonGroup' });

const uiStyle = {
  base: "inline-flex rounded-lg shadow-md",
  vertical: "flex-col"
};
</script>
