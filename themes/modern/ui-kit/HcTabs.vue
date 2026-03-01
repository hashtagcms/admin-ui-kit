<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcTabs
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcTabs.vue';
defineOptions({ name: 'ModernHcTabs' });

const uiStyle = {
  wrapper: "w-full",
  headerContainer: "border-b border-gray-100 mb-6",
  tabList: "flex flex-nowrap overflow-x-auto no-scrollbar -mb-px",
  tabItem: "mr-6 flex-shrink-0",
  tabButton: "py-4 px-1 border-b-[3px] text-[11px] font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95",
  activeTab: "border-blue-600 text-blue-600 rounded-t-sm",
  inactiveTab: "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200",
  contentContainer: "relative min-h-[100px]",
  contentPanel: "animate-in fade-in slide-in-from-bottom-2 duration-300"
};
</script>
