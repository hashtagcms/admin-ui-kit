<template>
  <div :class="[ui.base, sizeClasses, colorClasses]" role="status">
    <svg :class="ui.svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle :class="ui.circle" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path :class="ui.path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span :class="ui.srOnly || 'sr-only'">Loading...</span>
  </div>
</template>

<script>
export default {
  name: 'HcSpinner',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        base: '',
        svg: '',
        circle: '',
        path: '',
        srOnly: '',
        sizes: {},
        colors: {}
      })
    },
    size: {
      type: String,
      default: 'md'
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    sizeClasses() {
      return this.ui.sizes?.[this.size] || '';
    },
    colorClasses() {
      return this.ui.colors?.[this.color] || '';
    }
  }
};
</script>
