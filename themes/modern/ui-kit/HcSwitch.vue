<template>
  <label :class="['hc-switch-container', disabled ? 'opacity-50 cursor-not-allowed' : '']">
    <div class="hc-switch-input-wrapper">
      <input 
        type="checkbox" 
        class="sr-only" 
        :checked="modelValue" 
        :disabled="disabled"
        @change="$emit('update:modelValue', $event.target.checked)"
      >
      <!-- Track -->
      <div 
        :class="[
          'hc-switch-track transition-all duration-300 rounded-full shadow-inner',
          trackSize,
          modelValue ? activeTrackColor : 'bg-gray-200 group-hover:bg-gray-300'
        ]"
      ></div>
      <!-- Thumb -->
      <div 
        :class="[
          'hc-switch-thumb absolute bg-white rounded-full shadow-md transition-all duration-300 transform flex items-center justify-center',
          thumbSize,
          modelValue ? thumbActivePosition : 'left-1'
        ]"
      >
        <i v-if="icon && modelValue" :class="[icon, 'text-[8px] text-blue-600 animate-in zoom-in duration-300']"></i>
      </div>
    </div>
    <span v-if="label || $slots.default" class="hc-switch-label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'HcSwitch',
  props: {
    modelValue: { type: Boolean, default: false },
    label: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    icon: { type: String, default: '' },
    variant: {
      type: String,
      default: 'primary',
      validator: (v) => ['primary', 'success', 'danger', 'info', 'dark'].includes(v)
    },
    size: {
      type: String,
      default: 'md',
      validator: (v) => ['sm', 'md', 'lg'].includes(v)
    }
  },
  emits: ['update:modelValue'],
  computed: {
    trackSize() {
      const sizes = { 'sm': 'w-8 h-4', 'md': 'w-11 h-6', 'lg': 'w-14 h-8' };
      return sizes[this.size];
    },
    thumbSize() {
      const sizes = { 'sm': 'w-3 h-3', 'md': 'w-4 h-4', 'lg': 'w-6 h-6' };
      return sizes[this.size];
    },
    thumbActivePosition() {
      const positions = { 'sm': 'translate-x-4', 'md': 'translate-x-5', 'lg': 'translate-x-6' };
      return positions[this.size];
    },
    activeTrackColor() {
      const variants = {
        'primary': 'bg-blue-600 shadow-blue-500/20',
        'success': 'bg-emerald-500 shadow-emerald-500/20',
        'danger': 'bg-rose-500 shadow-rose-500/20',
        'info': 'bg-sky-500 shadow-sky-500/20',
        'dark': 'bg-gray-900 shadow-gray-900/20'
      };
      return variants[this.variant];
    }
  }
};
</script>

<style scoped>
.hc-switch-container {
  display: inline-flex !important;
  align-items: center;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  position: relative;
}
.hc-switch-input-wrapper {
  display: inline-block !important;
  vertical-align: middle;
  position: relative;
  flex-shrink: 0;
}
.hc-switch-thumb {
  top: 50%;
  transform: translateY(-50%);
}
.hc-switch-label {
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
