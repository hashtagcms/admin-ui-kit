<template>
  <div :class="ui.wrapper">
    <div v-if="showLabel" :class="ui.labelContainer">
      <span :class="ui.label">{{ label || (percentage + '%') }}</span>
      <span v-if="showPercentage" :class="ui.percentage">{{ percentage }}%</span>
    </div>
    <div :class="[ui.track, roundedClass, sizeClass]">
      <div 
        :class="[ui.barBase, colorClass, isAnimated ? ui.animated : '']" 
        :style="{ width: percentage + '%' }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HcProgress',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        wrapper: '',
        labelContainer: '',
        label: '',
        percentage: '',
        track: '',
        barBase: '',
        animated: '',
        colors: {},
        sizes: {},
        roundedFull: '',
        roundedNone: ''
      })
    },
    percentage: {
      type: [Number, String],
      default: 0
    },
    variant: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'md'
    },
    rounded: {
      type: Boolean,
      default: true
    },
    isAnimated: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    showPercentage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    colorClass() {
      return this.ui.colors?.[this.variant] || '';
    },
    sizeClass() {
      return this.ui.sizes?.[this.size] || '';
    },
    roundedClass() {
      return this.rounded ? this.ui.roundedFull : this.ui.roundedNone;
    }
  }
};
</script>
