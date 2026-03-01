<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcAutoSuggest
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcAutoSuggest.vue';
defineOptions({ name: 'ModernHcAutoSuggest' });

const uiStyle = {
  wrapper: "w-full relative h-auto",
  label: "block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1",
  container: "relative group",
  iconLeftWrapper: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10",
  input: "w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight py-3.5 rounded-xl px-4",
  paddingLeft: "pl-4",
  paddingLeftWithIcon: "pl-11",
  disabled: "opacity-50 cursor-not-allowed bg-gray-50",
  enabled: "hover:border-gray-300 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900",
  loadingWrapper: "absolute right-4 top-1/2 -translate-y-1/2",
  loadingIcon: "animate-spin h-4 w-4 text-blue-500",
  dropdown: "absolute z-[100] w-full mt-2 bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden py-2 max-h-60 overflow-y-auto",
  item: "px-4 py-3 text-[11px] cursor-pointer transition-all flex items-center justify-between group",
  itemActive: "bg-blue-600 text-white font-bold",
  itemInactive: "text-slate-600 hover:bg-slate-50",
  itemContent: "flex items-center gap-3",
  searchIcon: "fa fa-search opacity-40 text-[9px]",
  searchIconActive: "text-white opacity-100",
  enterIcon: "fa fa-level-down rotate-90 text-[9px] opacity-70",
  hint: "mt-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-tighter ml-1",
  transition: {
    enterActive: "transition duration-200 ease-out",
    enterFrom: "transform scale-95 opacity-0 -translate-y-2",
    enterTo: "transform scale-100 opacity-100 translate-y-0",
    leaveActive: "transition duration-150 ease-in",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0"
  }
};
</script>
