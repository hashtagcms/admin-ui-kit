<template>
  <div :class="['bg-white border transition-all duration-300', shadowClass, roundedClass, borderClass]">
    <!-- Header -->
    <div v-if="$slots.header || title" class="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
      <slot name="header">
        <h3 class="text-xs font-black uppercase tracking-widest text-gray-900">{{ title }}</h3>
        <p v-if="subtitle" class="text-[10px] font-bold text-gray-400 mt-0.5">{{ subtitle }}</p>
      </slot>
      <slot name="header-actions"></slot>
    </div>

    <!-- Media/Image -->
    <div v-if="$slots.media" class="relative">
      <slot name="media"></slot>
    </div>

    <!-- Body -->
    <div :class="[p ? p : (px + ' ' + py), bodyClass]">
      <slot></slot>
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" class="px-6 py-4 bg-gray-50/30 border-t border-gray-50">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HcCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    shadow: {
      type: String,
      default: 'md',
      validator: (v) => ['none', 'sm', 'md', 'lg', 'xl'].includes(v)
    },
    rounded: {
      type: String,
      default: 'lg',
      validator: (v) => ['none', 'sm', 'md', 'lg', 'xl', '2xl'].includes(v)
    },
    bodyClass: {
      type: String,
      default: ''
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    p: {
      type: String,
      default: ''
    },
    px: {
      type: String,
      default: 'px-6'
    },
    py: {
      type: String,
      default: 'py-5'
    }
  },
  computed: {
    shadowClass() {
      const shadows = {
        'none': 'shadow-none',
        'sm': 'shadow-sm',
        'md': 'shadow-md',
        'lg': 'shadow-lg',
        'xl': 'shadow-xl'
      };
      return shadows[this.shadow];
    },
    roundedClass() {
      const radii = {
        'none': 'rounded-none',
        'sm': 'rounded-sm',
        'md': 'rounded-md',
        'lg': 'rounded-lg',
        'xl': 'rounded-xl',
        '2xl': 'rounded-2xl'
      };
      return radii[this.rounded];
    },
    borderClass() {
      return this.noBorder ? 'border-transparent' : 'border-gray-100';
    }
  }
};
</script>
