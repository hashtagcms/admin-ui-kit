<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcAlert
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcAlert.vue';
defineOptions({ name: 'ModernHcAlert' });

const uiStyle = {
  base: "p-5 rounded-lg border-l-4 shadow-md transition-all duration-300",
  container: "flex items-start",
  iconWrapper: "flex-shrink-0 mr-3 mt-0.5",
  contentWrapper: "flex-1 mt-1",
  title: "text-xs font-black uppercase tracking-widest mb-1",
  message: "text-[11px] font-bold leading-relaxed opacity-90",
  dismissButton: "ml-4 flex-shrink-0 opacity-40 hover:opacity-100 transition-all hover:-translate-y-0.5 active:scale-90",
  variants: {
    'success': {
      base: 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-emerald-500/10',
      icon: 'fa fa-check-circle'
    },
    'danger': {
      base: 'bg-rose-50 border-rose-500 text-rose-800 shadow-rose-500/10',
      icon: 'fa fa-exclamation-circle'
    },
    'warning': {
      base: 'bg-amber-50 border-amber-500 text-amber-800 shadow-amber-500/10',
      icon: 'fa fa-exclamation-triangle'
    },
    'info': {
      base: 'bg-sky-50 border-sky-500 text-sky-800 shadow-sky-500/10',
      icon: 'fa fa-info-circle'
    }
  }
};
</script>
