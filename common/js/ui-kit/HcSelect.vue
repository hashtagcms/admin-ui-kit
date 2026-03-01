<template>
  <div :class="ui.wrapper">
    <label v-if="label" :for="id" :class="ui.label">
      {{ label }}
    </label>
    <div :class="ui.container">
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        @change="$emit('update:modelValue', $event.target.value)"
        :class="[
          ui.select,
          sizeClasses,
          variantClasses,
          disabled ? ui.disabled : ui.enabled
        ]"
      >
        <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      
      <!-- Custom Arrow -->
      <div :class="ui.arrowWrapper">
        <i :class="ui.arrowIcon || 'fa fa-chevron-down'"></i>
      </div>
    </div>
    <p v-if="hint" :class="ui.hint">
      {{ hint }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'HcSelect',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        wrapper: '',
        label: '',
        container: '',
        select: '',
        arrowWrapper: '',
        arrowIcon: '',
        hint: '',
        disabled: '',
        enabled: '',
        sizes: {},
        variants: {}
      })
    },
    modelValue: { type: [String, Number], default: '' },
    options: { type: Array, required: true },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
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
    id: { type: String, default: () => `select-${Math.random().toString(36).substr(2, 9)}` }
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
