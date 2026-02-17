<template>
  <component
    :is="tag"
    :type="tag === 'button' ? type : null"
    :href="tag === 'a' ? href : null"
    :class="[classes, isSquare ? 'p-0' : '']"
    :disabled="tag === 'button' ? (disabled || loading) : null"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="mr-2">
      <svg class="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    
    <!-- Left Icon -->
    <span v-if="$slots['icon-left'] || icon" :class="['inline-flex transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12', active ? 'scale-110 rotate-12' : '', $slots.default || iconRight ? 'mr-2' : '']">
      <slot name="icon-left">
        <i v-if="icon" :class="icon"></i>
      </slot>
    </span>

    <!-- Label -->
    <span v-if="$slots.default" :class="{ 'opacity-0': loading && !showLabelOnLoading }">
      <slot></slot>
    </span>

    <!-- Right Icon -->
    <span v-if="$slots['icon-right'] || iconRight" :class="['inline-flex transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12', active ? 'scale-110 -rotate-12' : '', $slots.default || icon ? 'ml-2' : '']">
      <slot name="icon-right">
        <i v-if="iconRight" :class="iconRight"></i>
      </slot>
    </span>
  </component>
</template>

<script>
export default {
  name: 'HcButton',
  props: {
    as: {
      type: String,
      default: 'button'
    },
    href: {
      type: String,
      default: '#'
    },
    type: {
      type: String,
      default: 'button'
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'ghost', 'soft', 'dark'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
    icon: {
      type: String,
      default: ''
    },
    iconRight: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    isSquare: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: String,
      default: 'lg', 
    },
    showLabelOnLoading: {
      type: Boolean,
      default: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  computed: {
    tag() {
        return this.as === 'a' ? 'a' : 'button';
    },
    classes() {
      const base = "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:scale-95 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:translate-y-0 group";
      
      const sizes = {
        'xs': this.isSquare ? 'w-8 h-8 text-[10px]' : 'px-3 py-1.5 text-[10px]',
        'sm': this.isSquare ? 'w-10 h-10 text-[10px]' : 'px-4 py-2 text-[10px]',
        'md': this.isSquare ? 'w-12 h-12 text-xs' : 'px-6 py-3 text-xs',
        'lg': this.isSquare ? 'w-14 h-14 text-sm' : 'px-8 py-4 text-sm',
        'xl': this.isSquare ? 'w-16 h-16 text-base' : 'px-10 py-5 text-base'
      };

      const variants = {
        'primary': this.outline 
            ? 'bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-50 shadow-none'
            : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30',
        'secondary': this.outline
            ? 'bg-transparent text-slate-600 border-2 border-slate-600 hover:bg-slate-50 shadow-none'
            : 'bg-slate-600 text-white shadow-lg shadow-slate-500/20 hover:bg-slate-700 hover:shadow-slate-500/30',
        'success': this.outline
            ? 'bg-transparent text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-50 shadow-none'
            : 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 hover:shadow-emerald-500/30',
        'danger': this.outline
            ? 'bg-transparent text-rose-600 border-2 border-rose-600 hover:bg-rose-50 shadow-none'
            : 'bg-rose-600 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-700 hover:shadow-rose-500/30',
        'warning': this.outline
            ? 'bg-transparent text-amber-500 border-2 border-amber-500 hover:bg-amber-50 shadow-none'
            : 'bg-amber-500 text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600 hover:shadow-amber-500/30',
        'info': this.outline
            ? 'bg-transparent text-sky-500 border-2 border-sky-500 hover:bg-sky-50 shadow-none'
            : 'bg-sky-500 text-white shadow-lg shadow-sky-500/20 hover:bg-sky-600 hover:shadow-sky-500/30',
        'ghost': 'bg-transparent text-slate-600 hover:bg-slate-100 shadow-none',
        'soft': 'bg-white border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-500 shadow-sm',
        'dark': 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 hover:bg-black'
      };

      const roundedOptions = {
        'sm': 'rounded-sm',
        'md': 'rounded-md',
        'lg': 'rounded-lg',
        'xl': 'rounded-xl',
        '2xl': 'rounded-2xl',
        'full': 'rounded-full'
      };

      const activeVariant = 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-700';

      return [
        base,
        this.active ? activeVariant : variants[this.variant],
        sizes[this.size],
        roundedOptions[this.rounded] || 'rounded-lg',
        this.fullWidth ? 'w-full' : ''
      ].join(' ');
    }
  }
};
</script>
