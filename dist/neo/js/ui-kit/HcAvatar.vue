<template>
  <div :class="ui.base">
    <div
      :class="[
        ui.avatarWrapper,
        ui.sizes?.[size]?.container,
        rounded ? (ui.roundedFull || 'rounded-full') : (ui.roundedLg || 'rounded-lg'),
        !src ? fallbackColorClass : ui.imageBg
      ]"
    >
      <img
        v-if="src && !hasError"
        :src="src"
        :alt="alt"
        @error="hasError = true"
        :class="ui.image"
      />
      <span v-else :class="[ui.initials, ui.sizes?.[size]?.text]">
        {{ initials }}
      </span>
    </div>

    <!-- Status Indicator -->
    <div
      v-if="status"
      :class="[
        ui.statusBase,
        statusColorClass,
        ui.sizes?.[size]?.status
      ]"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'HcAvatar',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        base: '',
        avatarWrapper: '',
        image: '',
        imageBg: '',
        initials: '',
        statusBase: '',
        roundedFull: '',
        roundedLg: '',
        sizes: {},
        statusColors: {},
        fallbackColors: {}
      })
    },
    src: { type: String, default: '' },
    name: { type: String, default: '' },
    alt: { type: String, default: '' },
    size: {
      type: String,
      default: 'md'
    },
    rounded: { type: Boolean, default: true },
    status: {
      type: String,
      default: ''
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
    statusColorClass() {
      return this.ui.statusColors?.[this.status] || '';
    },
    fallbackColorClass() {
      return this.ui.fallbackColors?.[this.variant] || this.ui.fallbackColors?.primary || '';
    }
  }
};
</script>
