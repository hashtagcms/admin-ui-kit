<template>
  <div :class="[ui.base, shadowClass, roundedClass, borderClass]">
    <!-- Header -->
    <div v-if="$slots.header || title" :class="ui.header">
      <slot name="header">
        <h3 :class="ui.title">{{ title }}</h3>
        <p v-if="subtitle" :class="ui.subtitle">{{ subtitle }}</p>
      </slot>
      <slot name="header-actions"></slot>
    </div>

    <!-- Media/Image -->
    <div v-if="$slots.media" :class="ui.media">
      <slot name="media"></slot>
    </div>

    <!-- Body -->
    <div :class="[p ? p : (px + ' ' + py), bodyClass]">
      <slot></slot>
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" :class="ui.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HcCard',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        base: '',
        header: '',
        title: '',
        subtitle: '',
        media: '',
        footer: '',
        shadows: {},
        rounded: {},
        border: '',
        noBorder: ''
      })
    },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    shadow: { type: String, default: 'md' },
    rounded: { type: String, default: 'lg' },
    bodyClass: { type: String, default: '' },
    noBorder: { type: Boolean, default: false },
    p: { type: String, default: '' },
    px: { type: String, default: 'px-6' },
    py: { type: String, default: 'py-5' }
  },
  computed: {
    shadowClass() {
      return this.ui.shadows?.[this.shadow] || '';
    },
    roundedClass() {
      return this.ui.rounded?.[this.rounded] || '';
    },
    borderClass() {
      return this.noBorder ? this.ui.noBorder : this.ui.border;
    }
  }
};
</script>
