<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcModal
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcModal.vue';
defineOptions({ name: 'ModernHcModal' });

const uiStyle = {
  wrapper: "fixed inset-0 z-[9999] flex items-center justify-center p-4",
  backdrop: "absolute inset-0 bg-slate-900/60 backdrop-blur-sm",
  content: "relative bg-white rounded-xl shadow-2xl overflow-hidden w-full transform transition-all",
  header: "px-8 py-6 border-b border-gray-50 flex items-center justify-between",
  title: "text-sm font-black uppercase tracking-[0.15em] text-gray-900",
  closeButton: "p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-all hover:-translate-y-0.5 active:scale-90",
  closeIcon: "fa fa-times text-lg",
  body: "px-8 py-8 max-h-[70vh] overflow-y-auto custom-scrollbar",
  footer: "px-8 py-6 bg-gray-50/50 border-t border-gray-50 flex justify-end gap-3",
  sizes: {
    'sm': 'max-w-sm',
    'md': 'max-w-lg',
    'lg': 'max-w-2xl',
    'xl': 'max-w-4xl',
    'full': 'max-w-[95vw]'
  },
  transitionName: 'hc-modal-fade'
};
</script>
