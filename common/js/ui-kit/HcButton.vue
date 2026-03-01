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
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        base: '',
        variants: {},
        sizes: {},
        rounded: {},
        active: ''
      })
    },
    as: { type: String, default: 'button' },
    href: { type: String, default: '#' },
    type: { type: String, default: 'button' },
    variant: { type: String, default: 'primary' },
    size: { type: String, default: 'md' },
    icon: { type: String, default: '' },
    iconRight: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    fullWidth: { type: Boolean, default: false },
    isSquare: { type: Boolean, default: false },
    rounded: { type: String, default: 'lg' },
    showLabelOnLoading: { type: Boolean, default: true },
    active: { type: Boolean, default: false }
  },
  emits: ['click'],
  computed: {
    tag() {
        return this.as === 'a' ? 'a' : 'button';
    },
    classes() {
      const { ui } = this;
      return [
        ui.base || '',
        this.active ? (ui.active || '') : (ui.variants?.[this.variant] || ''),
        this.isSquare ? (ui.squareSizes?.[this.size] || '') : (ui.sizes?.[this.size] || ''),
        ui.rounded?.[this.rounded] || '',
        this.fullWidth ? (ui.fullWidth || 'w-full') : ''
      ].join(' ');
    }
  }
};
</script>
