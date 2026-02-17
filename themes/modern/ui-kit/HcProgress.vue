<template>
  <div class="w-full">
    <div v-if="showLabel" class="flex justify-between mb-1">
      <span class="text-[10px] font-black uppercase tracking-widest text-gray-500">{{ label || (percentage + '%') }}</span>
      <span v-if="showPercentage" class="text-[10px] font-black text-gray-400">{{ percentage }}%</span>
    </div>
    <div :class="['w-full bg-gray-100 overflow-hidden', roundedClass, sizeClass]">
      <div 
        :class="['h-full transition-all duration-500 ease-out', colorClass, isAnimated ? 'animate-pulse' : '']" 
        :style="{ width: percentage + '%' }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HcProgress',
  props: {
    percentage: {
      type: [Number, String],
      default: 0,
      validator: (v) => v >= 0 && v <= 100
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (v) => ['primary', 'success', 'danger', 'warning', 'info'].includes(v)
    },
    size: {
      type: String,
      default: 'md',
      validator: (v) => ['sm', 'md', 'lg'].includes(v)
    },
    rounded: {
      type: Boolean,
      default: true
    },
    isAnimated: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    showPercentage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    colorClass() {
      const colors = {
        'primary': 'bg-blue-600',
        'success': 'bg-emerald-500',
        'danger': 'bg-rose-500',
        'warning': 'bg-amber-500',
        'info': 'bg-sky-500'
      };
      return colors[this.variant];
    },
    sizeClass() {
      const sizes = {
        'sm': 'h-1',
        'md': 'h-2',
        'lg': 'h-4'
      };
      return sizes[this.size];
    },
    roundedClass() {
      return this.rounded ? 'rounded-full' : 'rounded-none';
    }
  }
};
</script>
