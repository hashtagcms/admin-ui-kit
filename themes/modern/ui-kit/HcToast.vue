<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcToast
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcToast.vue';
defineOptions({ name: 'ModernHcToast' });

const uiStyle = {
  toast: "fixed right-8 z-[10000] flex items-center p-4 min-w-[320px] bg-white border border-gray-100 rounded-lg shadow-2xl overflow-hidden",
  iconWrapper: "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mr-4",
  content: "flex-1 pr-4",
  title: "text-xs font-black uppercase tracking-widest text-gray-900 leading-tight mb-0.5",
  message: "font-bold uppercase leading-relaxed",
  messageWithTitle: "text-[10px] text-gray-400",
  messageWithoutTitle: "text-xs text-gray-600",
  closeButton: "p-2 text-gray-300 hover:text-gray-900 transition-all hover:-translate-y-0.5 active:scale-90",
  closeIcon: "fa fa-times",
  progressLine: "absolute bottom-0 left-0 h-1 bg-current opacity-20",
  transitionName: 'hc-toast-slide',
  borderColors: {
    'success': 'border-l-4 border-l-emerald-500',
    'error': 'border-l-4 border-l-rose-500',
    'warning': 'border-l-4 border-l-amber-500',
    'info': 'border-l-4 border-l-blue-500'
  },
  iconBgs: {
    'success': 'bg-emerald-50',
    'error': 'bg-rose-50',
    'warning': 'bg-amber-50',
    'info': 'bg-blue-50'
  },
  iconColors: {
    'success': 'text-emerald-600',
    'error': 'text-rose-600',
    'warning': 'text-amber-600',
    'info': 'text-blue-600'
  },
  progressColors: {
    'success': '#10b981',
    'error': '#ef4444',
    'warning': '#f59e0b',
    'info': '#2563eb'
  },
  icons: {
    'success': 'fa fa-check-circle',
    'error': 'fa fa-times-circle',
    'warning': 'fa fa-exclamation-triangle',
    'info': 'fa fa-info-circle'
  }
};
</script>
