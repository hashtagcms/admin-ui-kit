<template>
  <div class="relative inline-flex flex-shrink-0 group">
    <div
      :class="[
        'flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg',
        sizeClasses,
        rounded ? 'rounded-full' : 'rounded-lg',
        !src ? fallbackColor : 'bg-gray-100'
      ]"
    >
      <img
        v-if="src && !hasError"
        :src="src"
        :alt="alt"
        @error="hasError = true"
        class="w-full h-full object-cover"
      />
      <span v-else :class="['font-black uppercase tracking-widest text-white', textSizes]">
        {{ initials }}
      </span>
    </div>

    <!-- Status Indicator -->
    <div
      v-if="status"
      :class="[
        'absolute bottom-0 right-0 border-2 border-white rounded-full transition-transform duration-300 group-hover:scale-110',
        statusClasses,
        statusSizes
      ]"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'HcAvatar',
  props: {
    src: { type: String, default: '' },
    name: { type: String, default: '' },
    alt: { type: String, default: '' },
    size: {
      type: String,
      default: 'md',
      validator: (v) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(v)
    },
    rounded: { type: Boolean, default: true },
    status: {
      type: String,
      default: '',
      validator: (v) => ['', 'online', 'offline', 'away', 'busy'].includes(v)
    },
    variant: {
      type: String,
      default: 'primary'
    }
  },
  data() {
    return {
      hasError: false
    };
  },
  computed: {
    initials() {
      if (!this.name) return '?';
      return this.name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('');
    },
    sizeClasses() {
      const sizes = {
        'xs': 'w-6 h-6',
        'sm': 'w-8 h-8',
        'md': 'w-10 h-10',
        'lg': 'w-12 h-12',
        'xl': 'w-16 h-16',
        '2xl': 'w-20 h-20'
      };
      return sizes[this.size];
    },
    textSizes() {
      const sizes = {
        'xs': 'text-[8px]',
        'sm': 'text-[10px]',
        'md': 'text-xs',
        'lg': 'text-sm',
        'xl': 'text-base',
        '2xl': 'text-lg'
      };
      return sizes[this.size];
    },
    statusSizes() {
      const sizes = {
        'xs': 'w-2 h-2',
        'sm': 'w-2.5 h-2.5',
        'md': 'w-3 h-3',
        'lg': 'w-3.5 h-3.5',
        'xl': 'w-4 h-4',
        '2xl': 'w-5 h-5'
      };
      return sizes[this.size];
    },
    statusClasses() {
      const statuses = {
        'online': 'bg-emerald-500',
        'offline': 'bg-gray-400',
        'away': 'bg-amber-500',
        'busy': 'bg-rose-500'
      };
      return statuses[this.status];
    },
    fallbackColor() {
      const colors = {
        'primary': 'bg-blue-600',
        'success': 'bg-emerald-500',
        'danger': 'bg-rose-500',
        'warning': 'bg-amber-500',
        'info': 'bg-sky-500',
        'dark': 'bg-gray-900'
      };
      return colors[this.variant] || colors.primary;
    }
  }
};
</script>
