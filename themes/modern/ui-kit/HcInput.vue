<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
      {{ label }}
    </label>
    <div class="relative group">
      <!-- Left Icon -->
      <div v-if="$slots['icon-left']" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-600">
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
          'w-full bg-white border transition-all duration-300 outline-none font-bold text-xs tracking-tight',
          $slots['icon-left'] ? 'pl-11' : 'pl-4',
          $slots['icon-right'] ? 'pr-11' : 'pr-4',
          sizeClasses,
          variantClasses,
          disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:border-gray-300'
        ]"
      />

      <!-- Right Icon -->
      <div v-if="$slots['icon-right']" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-600">
        <slot name="icon-right"></slot>
      </div>
    </div>
    <p v-if="hint" class="mt-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-tighter ml-1">
      {{ hint }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'HcInput',
  props: {
    modelValue: { type: [String, Number], default: '' },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' },
    variant: {
      type: String,
      default: 'primary',
      validator: (v) => ['primary', 'success', 'danger', 'info'].includes(v)
    },
    size: {
      type: String,
      default: 'md',
      validator: (v) => ['sm', 'md', 'lg'].includes(v)
    },
    hint: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    id: { type: String, default: () => `input-${Math.random().toString(36).substr(2, 9)}` }
  },
  emits: ['update:modelValue'],
  computed: {
    sizeClasses() {
      const sizes = {
        'sm': 'py-2 rounded-md',
        'md': 'py-3.5 rounded-lg',
        'lg': 'py-5 rounded-xl'
      };
      return sizes[this.size];
    },
    variantClasses() {
      const variants = {
        'primary': 'border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900',
        'success': 'border-emerald-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-emerald-900',
        'danger': 'border-rose-100 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 text-rose-900',
        'info': 'border-blue-100 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 text-blue-900'
      };
      return variants[this.variant];
    }
  }
};
</script>
