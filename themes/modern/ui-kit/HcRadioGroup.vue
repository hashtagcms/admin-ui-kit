<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcRadioGroup
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcRadioGroup.vue';
defineOptions({ name: 'ModernHcRadioGroup' });

const uiStyle = {
  group: "flex",
  stacked: "flex-col space-y-3",
  inline: "flex-wrap gap-6",
  container: "inline-flex items-center cursor-pointer user-select-none white-space-nowrap mb-0 group",
  disabled: "opacity-50 cursor-not-allowed",
  inputWrapper: "inline-block vertical-align-middle flex-shrink-0 relative",
  srOnly: "absolute width-[1px] height-[1px] p-0 -m-[1px] overflow-hidden clip-[rect(0,0,0,0)] white-space-nowrap border-0",
  circle: "w-5 h-5 border-2 rounded-full transition-all duration-300 flex items-center justify-center group-hover:scale-110 active:scale-90",
  checkedCircle: "border-blue-600 shadow-sm shadow-blue-500/20",
  uncheckedCircle: "bg-white border-gray-200 group-hover:border-blue-400",
  innerCircle: "w-2.5 h-2.5 bg-blue-600 rounded-full animate-in zoom-in-50 duration-300",
  label: "inline-block vertical-align-middle relative -top-[2px] ml-3 text-[10px] font-black uppercase tracking-widest leading-none text-gray-700"
};
</script>
