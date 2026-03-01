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
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        base: '',
        variants: {},
        sizes: {},
        pill: '',
        rounded: '',
        outline: ''
      })
    },
    variant: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'md'
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
      const { ui, variant, size, isPill, isOutline } = this;
      
      const variantStyle = ui.variants?.[variant] || {};
      const variantClass = isOutline 
        ? (variantStyle.outline || '') 
        : (variantStyle.base || '');

      return [
        ui.base || '',
        ui.sizes?.[size] || '',
        variantClass,
        isPill ? (ui.pill || '') : (ui.rounded || '')
      ].join(' ');
    }
  }
};
</script>
