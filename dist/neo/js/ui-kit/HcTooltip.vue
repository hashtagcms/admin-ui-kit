<template>
  <div 
    :class="ui.wrapper"
    @mouseenter="show"
    @mouseleave="hide"
  >
    <slot></slot>
    <div 
      v-show="isVisible"
      :class="[
        ui.tooltip,
        positionClasses
      ]"
    >
      {{ text }}
      <slot name="content"></slot>
      <!-- Arrow -->
      <div :class="[ui.arrow, arrowClasses]"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HcTooltip',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        wrapper: '',
        tooltip: '',
        arrow: '',
        positions: {},
        arrowPositions: {}
      })
    },
    text: { type: String, default: '' },
    position: {
      type: String,
      default: 'top'
    }
  },
  data() {
    return {
      isVisible: false
    };
  },
  computed: {
    positionClasses() {
      return this.ui.positions?.[this.position] || '';
    },
    arrowClasses() {
      return this.ui.arrowPositions?.[this.position] || '';
    }
  },
  methods: {
    show() { this.isVisible = true; },
    hide() { this.isVisible = false; }
  }
};
</script>
