<template>
  <div :class="ui.wrapper">
    <label v-if="label" :for="id" :class="ui.label">
      {{ label }}
    </label>
    <div :class="ui.container">
      <!-- Left Icon -->
      <div v-if="$slots['icon-left']" :class="ui.iconLeftWrapper">
        <slot name="icon-left"></slot>
      </div>

      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="[
          ui.input,
          $slots['icon-left'] ? ui.paddingLeftWithIcon : ui.paddingLeft,
          $slots['icon-right'] ? ui.paddingRightWithIcon : ui.paddingRight,
          sizeClasses,
          variantClasses,
          disabled ? ui.disabled : ui.enabled
        ]"
      />

      <!-- Right Icon -->
      <div v-if="$slots['icon-right']" :class="ui.iconRightWrapper">
        <slot name="icon-right"></slot>
      </div>
    </div>
    <p v-if="hint" :class="ui.hint">
      {{ hint }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'HcInput',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        wrapper: '',
        label: '',
        container: '',
        iconLeftWrapper: '',
        iconRightWrapper: '',
        input: '',
        paddingLeft: '',
        paddingLeftWithIcon: '',
        paddingRight: '',
        paddingRightWithIcon: '',
        hint: '',
        disabled: '',
        enabled: '',
        sizes: {},
        variants: {}
      })
    },
    modelValue: { type: [String, Number], default: '' },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' },
    variant: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'md'
    },
    hint: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    id: { type: String, default: () => `input-${Math.random().toString(36).substr(2, 9)}` }
  },
  emits: ['update:modelValue'],
  computed: {
    sizeClasses() {
      return this.ui.sizes?.[this.size] || '';
    },
    variantClasses() {
      return this.ui.variants?.[this.variant] || '';
    }
  }
};
</script>
