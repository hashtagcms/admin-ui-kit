<template>
  <label :class="[ui.container, disabled ? ui.disabledContainer : '']">
    <div :class="ui.inputWrapper">
      <input 
        type="checkbox" 
        :class="ui.srOnly" 
        :checked="modelValue" 
        :disabled="disabled"
        @change="$emit('update:modelValue', $event.target.checked)"
      >
      <!-- Track -->
      <div 
        :class="[
          ui.track,
          trackSize,
          modelValue ? activeTrackColor : ui.inactiveTrack
        ]"
      ></div>
      <!-- Thumb -->
      <div 
        :class="[
          ui.thumb,
          thumbSize,
          modelValue ? thumbActivePosition : ui.thumbInactivePosition
        ]"
      >
        <i v-if="icon && modelValue" :class="[icon, ui.icon]"></i>
      </div>
    </div>
    <span v-if="label || $slots.default" :class="ui.label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'HcSwitch',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        container: '',
        disabledContainer: '',
        inputWrapper: '',
        srOnly: '',
        track: '',
        inactiveTrack: '',
        thumb: '',
        thumbInactivePosition: '',
        icon: '',
        label: '',
        trackSizes: {},
        thumbSizes: {},
        thumbActivePositions: {},
        activeTrackColors: {}
      })
    },
    modelValue: { type: Boolean, default: false },
    label: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    icon: { type: String, default: '' },
    variant: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'md'
    }
  },
  emits: ['update:modelValue'],
  computed: {
    trackSize() {
      return this.ui.trackSizes?.[this.size] || '';
    },
    thumbSize() {
      return this.ui.thumbSizes?.[this.size] || '';
    },
    thumbActivePosition() {
      return this.ui.thumbActivePositions?.[this.size] || '';
    },
    activeTrackColor() {
      return this.ui.activeTrackColors?.[this.variant] || '';
    }
  }
};
</script>

<style scoped>
/* These classes are necessary for the switch layout across themes */
</style>
