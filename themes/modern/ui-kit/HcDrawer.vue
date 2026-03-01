<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcDrawer
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcDrawer.vue';
defineOptions({ name: 'ModernHcDrawer' });

const uiStyle = {
  backdrop: "fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[1900]",
  backdropTransition: 'hc-drawer-fade',
  panel: "fixed bg-white shadow-2xl z-[2000] flex flex-col transition-all duration-400",
  header: "px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30",
  title: "text-xs font-black uppercase tracking-[0.2em] text-gray-900",
  subtitle: "text-[9px] font-bold text-gray-400 uppercase mt-1",
  closeButton: "p-2 text-gray-300 hover:text-gray-900 transition-all hover:-translate-y-0.5 active:scale-90",
  closeIcon: "fa fa-times text-lg",
  body: "flex-1 overflow-y-auto p-6 scrollbar-premium",
  footer: "px-6 py-5 border-t border-gray-100 bg-gray-50/30",
  positions: {
    'right': 'top-0 right-0 h-full',
    'left': 'top-0 left-0 h-full'
  },
  sizes: {
    'sm': 'w-[320px]',
    'md': 'w-[480px]',
    'lg': 'w-[640px]',
    'xl': 'w-[800px]',
    'full': 'w-full'
  },
  transitionPrefix: 'hc-drawer-slide-'
};
</script>
