<template>
  <div :class="[ui.group, isStacked ? ui.stacked : ui.inline]">
    <label 
      v-for="option in options" 
      :key="option.value"
      :class="[ui.container, (disabled || option.disabled) ? ui.disabled : '']"
    >
      <div :class="ui.inputWrapper">
        <input 
          type="radio" 
          :name="name"
          :value="option.value"
          :class="ui.srOnly" 
          :checked="modelValue === option.value" 
          :disabled="disabled || option.disabled"
          @change="$emit('update:modelValue', option.value)"
        >
        <!-- Custom Radio Circle -->
        <div :class="[
          ui.circle,
          modelValue === option.value ? ui.checkedCircle : ui.uncheckedCircle
        ]">
          <div v-if="modelValue === option.value" :class="ui.innerCircle"></div>
        </div>
      </div>
      <span :class="ui.label">
        {{ option.label }}
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'HcRadioGroup',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        group: '',
        stacked: '',
        inline: '',
        container: '',
        disabled: '',
        inputWrapper: '',
        srOnly: '',
        circle: '',
        checkedCircle: '',
        uncheckedCircle: '',
        innerCircle: '',
        label: ''
      })
    },
    modelValue: { type: [String, Number, Boolean], default: null },
    options: { type: Array, required: true },
    name: { type: String, required: true },
    isStacked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  emits: ['update:modelValue']
};
</script>

<style scoped>
/* Base logic styles */
</style>
