<template>
  <span :class="classes">
    <slot name="icon-left"></slot>
    <slot></slot>
    <slot name="icon-right"></slot>
  </span>
</template>

<script>
export default {
  name: 'HcBadge',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    isPill: {
      type: Boolean,
      default: false
    },
    isOutline: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      const base = "inline-flex items-center font-black uppercase tracking-widest leading-none";
      
      const sizes = {
        'sm': 'px-2 py-1 text-[8px]',
        'md': 'px-2.5 py-1.5 text-[10px]',
        'lg': 'px-3 py-2 text-xs'
      };

      const variants = {
        'primary': this.isOutline ? 'border border-blue-600 text-blue-600' : 'bg-blue-100 text-blue-700',
        'secondary': this.isOutline ? 'border border-slate-600 text-slate-600' : 'bg-slate-100 text-slate-700',
        'success': this.isOutline ? 'border border-emerald-600 text-emerald-600' : 'bg-emerald-100 text-emerald-700',
        'danger': this.isOutline ? 'border border-rose-600 text-rose-600' : 'bg-rose-100 text-rose-700',
        'warning': this.isOutline ? 'border border-amber-500 text-amber-600' : 'bg-amber-100 text-amber-700',
        'info': this.isOutline ? 'border border-sky-500 text-sky-600' : 'bg-sky-100 text-sky-700',
        'neutral': this.isOutline ? 'border border-gray-400 text-gray-400' : 'bg-gray-100 text-gray-500'
      };

      return [
        base,
        sizes[this.size],
        variants[this.variant],
        this.isPill ? 'rounded-full' : 'rounded-md'
      ].join(' ');
    }
  }
};
</script>
