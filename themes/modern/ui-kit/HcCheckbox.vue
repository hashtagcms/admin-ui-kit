<template>
  <label :class="['hc-checkbox-container', disabled ? 'opacity-50 cursor-not-allowed' : '']">
    <div class="hc-checkbox-input-wrapper">
      <input 
        type="checkbox" 
        class="sr-only" 
        :checked="modelValue" 
        :disabled="disabled"
        @change="$emit('update:modelValue', $event.target.checked)"
      >
      <!-- Custom Checkbox Box -->
      <div :class="[
        'hc-checkbox-box border-2 rounded-md transition-all duration-300 flex items-center justify-center group-hover:scale-110 active:scale-90',
        modelValue ? 'bg-blue-600 border-blue-600 shadow-sm shadow-blue-500/30' : 'bg-white border-gray-200 group-hover:border-blue-400'
      ]">
        <svg v-if="modelValue" class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="4">
          <path d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
    </div>
    <span v-if="label || $slots.default" class="hc-checkbox-label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'HcCheckbox',
  props: {
    modelValue: { type: Boolean, default: false },
    label: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  },
  emits: ['update:modelValue']
};
</script>

<style scoped>
.hc-checkbox-container {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}
.hc-checkbox-input-wrapper {
  display: inline-block !important;
  vertical-align: middle;
  flex-shrink: 0;
  position: relative;
}
.hc-checkbox-box {
  width: 1.25rem; /* w-5 */
  height: 1.25rem; /* h-5 */
}
.hc-checkbox-label {
  display: inline-block !important;
  vertical-align: middle;
  position: relative;
  top: -2px;
  margin-left: 0.75rem; /* ml-3 */
  font-size: 10px;
  font-weight: 900; /* font-black */
  text-transform: uppercase;
  letter-spacing: 0.05em; /* tracking-widest */
  line-height: 1;  
}

/* Ensure sr-only is correctly handled if not in global css */
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
