<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcTable
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcTable.vue';
defineOptions({ name: 'ModernHcTable' });

const uiStyle = {
  wrapper: "overflow-hidden bg-white rounded-lg border border-gray-100 shadow-md",
  table: "w-full text-left border-collapse",
  thead: "",
  headerRow: "bg-gray-50/50 border-b border-gray-100",
  headerCell: "px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400",
  tbody: "divide-y divide-gray-50 text-[11px] font-bold text-gray-700"
};
</script>
