<template>
  <div :class="ui.base">
    <slot></slot>
    <div :class="ui.badgeWrapper">
      <slot name="badge">
        <span 
          v-if="count !== null"
          :class="ui.badge"
        >
          {{ formattedCount }}
        </span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HcBadgeContainer',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        base: '',
        badgeWrapper: '',
        badge: ''
      })
    },
    count: { type: [Number, String], default: null },
    maxCount: { type: Number, default: 99 },
    offset: { type: Array, default: () => [0, 0] }
  },
  computed: {
    formattedCount() {
      if (typeof this.count === 'string') return this.count;
      return this.count > this.maxCount ? `${this.maxCount}+` : this.count;
    }
  }
};
</script>
