<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcBreadcrumbs
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcBreadcrumbs.vue';
defineOptions({ name: 'ModernHcBreadcrumbs' });

const uiStyle = {
  base: "flex overflow-x-auto no-scrollbar py-2",
  list: "flex items-center space-x-2 whitespace-nowrap",
  item: "flex items-center text-[10px] font-black uppercase tracking-widest",
  separatorWrapper: "mx-2 text-gray-300 font-light flex items-center",
  separatorIcon: "fa fa-chevron-right text-[8px]",
  contentWrapper: "flex items-center",
  link: "transition-all duration-300 hover:text-blue-600 hover:-translate-y-0.5 active:scale-95",
  activeLink: "text-gray-900 pointer-events-none",
  inactiveLink: "text-gray-400",
  text: "",
  activeText: "text-gray-900",
  inactiveText: "text-gray-400 font-bold",
  icon: "mr-1.5"
};
</script>
