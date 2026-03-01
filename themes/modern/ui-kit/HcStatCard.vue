<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcStatCard
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcStatCard.vue';
defineOptions({ name: 'ModernHcStatCard' });

const uiStyle = {
  wrapper: "p-6 bg-white border border-gray-100 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 group",
  contentContainer: "flex items-start justify-between",
  title: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 group-hover:text-blue-500 transition-colors",
  value: "text-2xl font-black text-gray-900 tracking-tight",
  iconWrapper: "w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6",
  iconSize: "text-lg",
  trendContainer: "mt-4 flex items-center gap-2",
  trendBadge: "flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter",
  trendText: "text-[10px] font-bold text-gray-400 uppercase tracking-tighter",
  iconBgs: {
    'primary': 'bg-blue-50',
    'success': 'bg-emerald-50',
    'danger': 'bg-rose-50',
    'warning': 'bg-amber-50',
    'info': 'bg-sky-50'
  },
  iconColors: {
    'primary': 'text-blue-600',
    'success': 'text-emerald-600',
    'danger': 'text-rose-600',
    'warning': 'text-amber-600',
    'info': 'text-sky-600'
  },
  trends: {
    'up': 'bg-emerald-50 text-emerald-600',
    'down': 'bg-rose-50 text-rose-600',
    'neutral': 'bg-gray-50 text-gray-600'
  },
  trendIcons: {
    'up': 'fa fa-arrow-up',
    'down': 'fa fa-arrow-down',
    'neutral': 'fa fa-minus'
  }
};
</script>
