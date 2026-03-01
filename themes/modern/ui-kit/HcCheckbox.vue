<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcCheckbox
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcCheckbox.vue';
defineOptions({ name: 'ModernHcCheckbox' });

const uiStyle = {
  container: "flex items-center cursor-pointer user-select-none white-space-nowrap group",
  disabledContainer: "opacity-50 cursor-not-allowed",
  inputWrapper: "inline-block vertical-align-middle flex-shrink-0 relative",
  srOnly: "absolute width-[1px] height-[1px] p-0 -m-[1px] overflow-hidden clip-[rect(0,0,0,0)] white-space-nowrap border-0",
  box: "w-5 h-5 border-2 rounded-md transition-all duration-300 flex items-center justify-center group-hover:scale-110 active:scale-90",
  checkedBox: "bg-blue-600 border-blue-600 shadow-sm shadow-blue-500/30",
  uncheckedBox: "bg-white border-gray-200 group-hover:border-blue-400",
  checkIcon: "w-3.5 h-3.5 text-white",
  label: "inline-block vertical-align-middle relative -top-[2px] ml-3 text-[10px] font-black uppercase tracking-widest leading-none"
};
</script>
