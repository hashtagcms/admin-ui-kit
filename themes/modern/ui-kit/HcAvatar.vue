<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcAvatar
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcAvatar.vue';
defineOptions({ name: 'ModernHcAvatar' });

const uiStyle = {
  base: "relative inline-flex flex-shrink-0 group",
  avatarWrapper: "flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg",
  image: "w-full h-full object-cover",
  imageBg: "bg-gray-100",
  initials: "font-black uppercase tracking-widest text-white mt-1.5",
  statusBase: "absolute bottom-0 right-0 border-2 border-white rounded-full transition-transform duration-300 group-hover:scale-110",
  roundedFull: "rounded-full",
  roundedLg: "rounded-lg",
  sizes: {
    'xs': { container: 'w-6 h-6', text: 'text-[8px]', status: 'w-2 h-2' },
    'sm': { container: 'w-8 h-8', text: 'text-[10px]', status: 'w-2.5 h-2.5' },
    'md': { container: 'w-10 h-10', text: 'text-xs', status: 'w-3 h-3' },
    'lg': { container: 'w-12 h-12', text: 'text-sm', status: 'w-3.5 h-3.5' },
    'xl': { container: 'w-16 h-16', text: 'text-base', status: 'w-4 h-4' },
    '2xl': { container: 'w-20 h-20', text: 'text-lg', status: 'w-5 h-5' }
  },
  statusColors: {
    'online': 'bg-emerald-500',
    'offline': 'bg-gray-400',
    'away': 'bg-amber-500',
    'busy': 'bg-rose-500'
  },
  fallbackColors: {
    'primary': 'bg-blue-600',
    'success': 'bg-emerald-500',
    'danger': 'bg-rose-500',
    'warning': 'bg-amber-500',
    'info': 'bg-sky-500',
    'dark': 'bg-gray-900'
  }
};
</script>
