<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcSwitch
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcSwitch.vue';
defineOptions({ name: 'ModernHcSwitch' });

const uiStyle = {
  container: "inline-flex items-center cursor-pointer user-select-none white-space-nowrap relative",
  disabledContainer: "opacity-50 cursor-not-allowed",
  inputWrapper: "inline-block vertical-align-middle relative flex-shrink-0",
  srOnly: "absolute width-[1px] height-[1px] p-0 -m-[1px] overflow-hidden clip-[rect(0,0,0,0)] white-space-nowrap border-0",
  track: "transition-all duration-300 rounded-full shadow-inner",
  inactiveTrack: "bg-gray-200 group-hover:bg-gray-300",
  thumb: "absolute bg-white rounded-full shadow-md transition-all duration-300 transform flex items-center justify-center top-1/2 -translate-y-1/2",
  thumbInactivePosition: "left-1",
  icon: "text-[8px] text-blue-600 animate-in zoom-in duration-300",
  label: "inline-block vertical-align-middle relative -top-[2px] ml-3 text-[10px] font-black uppercase tracking-widest leading-none text-gray-700",
  trackSizes: { 
    'sm': 'w-8 h-4', 
    'md': 'w-11 h-6', 
    'lg': 'w-14 h-8' 
  },
  thumbSizes: { 
    'sm': 'w-3 h-3', 
    'md': 'w-4 h-4', 
    'lg': 'w-6 h-6' 
  },
  thumbActivePositions: { 
    'sm': 'translate-x-4', 
    'md': 'translate-x-5', 
    'lg': 'translate-x-6' 
  },
  activeTrackColors: {
    'primary': 'bg-blue-600 shadow-blue-500/20',
    'success': 'bg-emerald-500 shadow-emerald-500/20',
    'danger': 'bg-rose-500 shadow-rose-500/20',
    'info': 'bg-sky-500 shadow-sky-500/20',
    'dark': 'bg-gray-900 shadow-gray-900/20'
  }
};
</script>
