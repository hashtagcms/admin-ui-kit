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
      <!-- Custom Checkbox Box -->
      <div :class="[
        ui.box,
        modelValue ? ui.checkedBox : ui.uncheckedBox
      ]">
        <svg v-if="modelValue" :class="ui.checkIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="4">
          <path d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
    </div>
    <span v-if="label || $slots.default" :class="ui.label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'HcCheckbox',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        container: '',
        disabledContainer: '',
        inputWrapper: '',
        srOnly: '',
        box: '',
        checkedBox: '',
        uncheckedBox: '',
        checkIcon: '',
        label: ''
      })
    },
    modelValue: { type: Boolean, default: false },
    label: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  },
  emits: ['update:modelValue']
};
</script>

<style scoped>
/* These are base layout styles that might be needed regardless of theme */
/* but could also be moved to the theme wrapper if we want full control */
</style>
