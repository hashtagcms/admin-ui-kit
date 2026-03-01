<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcDropdown
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcDropdown.vue';
defineOptions({ name: 'ModernHcDropdown' });

const uiStyle = {
  wrapper: "relative inline-block",
  triggerWrapper: "cursor-pointer",
  trigger: "flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-lg shadow-sm hover:border-gray-200 transition-all font-black text-[10px] uppercase tracking-widest text-gray-600",
  arrow: "fa fa-chevron-down text-[8px] transition-transform duration-300",
  arrowOpen: "rotate-180",
  menu: "absolute z-[1200] mt-2 py-2 bg-white border border-gray-100 rounded-xl shadow-2xl min-w-[200px] overflow-hidden",
  divider: "my-1 border-t border-gray-50",
  item: "w-full flex items-center px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all duration-200",
  itemPrimary: "text-gray-600 hover:bg-gray-50 hover:text-blue-600",
  itemDanger: "text-rose-600 hover:bg-rose-50",
  itemIcon: "mr-3 text-xs w-4 text-center",
  positions: {
    'bottom-start': 'top-full left-0',
    'bottom-end': 'top-full right-0',
    'top-start': 'bottom-full left-0 mb-4',
    'top-end': 'bottom-full right-0 mb-4'
  }
};
</script>
