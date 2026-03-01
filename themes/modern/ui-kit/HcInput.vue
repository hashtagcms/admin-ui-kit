<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcInput
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcInput.vue';
defineOptions({ name: 'ModernHcInput' });

const uiStyle = {
  wrapper: "w-full",
  label: "block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1",
  container: "relative group",
  iconLeftWrapper: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-600",
  iconRightWrapper: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-600",
  input: "w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight",
  paddingLeft: "pl-4",
  paddingLeftWithIcon: "pl-11",
  paddingRight: "pr-4",
  paddingRightWithIcon: "pr-11",
  hint: "mt-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-tighter ml-1",
  disabled: "opacity-50 cursor-not-allowed bg-gray-50",
  enabled: "hover:border-gray-300",
  sizes: {
    'sm': 'py-2 rounded-md',
    'md': 'py-3.5 rounded-lg',
    'lg': 'py-5 rounded-xl'
  },
  variants: {
    'primary': 'border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900',
    'success': 'border-emerald-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-emerald-900',
    'danger': 'border-rose-100 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 text-rose-900',
    'info': 'border-blue-100 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 text-blue-900'
  }
};
</script>
