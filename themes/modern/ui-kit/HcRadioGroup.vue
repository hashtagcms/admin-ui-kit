<template>
  <div :class="['hc-radio-group', isStacked ? 'flex-col space-y-3' : 'flex-wrap gap-6']">
    <label 
      v-for="option in options" 
      :key="option.value"
      class="hc-radio-container"
      :class="{ 'opacity-50 cursor-not-allowed': disabled || option.disabled }"
    >
      <div class="hc-radio-input-wrapper">
        <input 
          type="radio" 
          :name="name"
          :value="option.value"
          class="sr-only" 
          :checked="modelValue === option.value" 
          :disabled="disabled || option.disabled"
          @change="$emit('update:modelValue', option.value)"
        >
        <!-- Custom Radio Circle -->
        <div :class="[
          'hc-radio-circle border-2 rounded-full transition-all duration-300 flex items-center justify-center group-hover:scale-110 active:scale-90',
          modelValue === option.value ? 'border-blue-600 shadow-sm shadow-blue-500/20' : 'bg-white border-gray-200 group-hover:border-blue-400'
        ]">
          <div v-if="modelValue === option.value" class="wc-inner-circle bg-blue-600 rounded-full animate-in zoom-in-50 duration-300"></div>
        </div>
      </div>
      <span class="hc-radio-label">
        {{ option.label }}
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'HcRadioGroup',
  props: {
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
.hc-radio-group {
  display: flex;
}
.hc-radio-container {
  display: inline-flex !important;
  align-items: center;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  margin-bottom: 0px;
}
.hc-radio-input-wrapper {
  display: inline-block !important;
  vertical-align: middle;
  flex-shrink: 0;
  position: relative;
}
.hc-radio-circle {
  width: 1.25rem;
  height: 1.25rem;
}
.wc-inner-circle {
  width: 0.625rem;
  height: 0.625rem;
}
.hc-radio-label {
  display: inline-block !important;
  vertical-align: middle;
  position: relative;
  top: -2px;
  margin-left: 0.75rem;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1;
  color: #374151;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
