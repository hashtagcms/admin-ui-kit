<template>
  <Teleport to="body">
    <Transition name="hc-modal-fade">
      <div v-if="modelValue" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="close"></div>
        
        <!-- Modal Content -->
        <div :class="['relative bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-lg transform transition-all', sizeClasses]">
          <!-- Header -->
          <div class="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
            <h3 class="text-sm font-black uppercase tracking-[0.15em] text-gray-900">
              <slot name="title">{{ title }}</slot>
            </h3>
            <button @click="close" class="p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-all hover:-translate-y-0.5 active:scale-90">
              <i class="fa fa-times text-lg"></i>
            </button>
          </div>
          
          <!-- Body -->
          <div class="px-8 py-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <slot></slot>
          </div>
          
          <!-- Footer -->
          <div v-if="$slots.footer" class="px-8 py-6 bg-gray-50/50 border-t border-gray-50 flex justify-end gap-3">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  name: 'HcModal',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'md',
      validator: (v) => ['sm', 'md', 'lg', 'xl', 'full'].includes(v)
    }
  },
  emits: ['update:modelValue'],
  computed: {
    sizeClasses() {
      const sizes = {
        'sm': 'max-w-sm',
        'md': 'max-w-lg',
        'lg': 'max-w-2xl',
        'xl': 'max-w-4xl',
        'full': 'max-w-[95vw]'
      };
      return sizes[this.size];
    }
  },
  methods: {
    close() {
      this.$emit('update:modelValue', false);
    }
  }
};
</script>

<style scoped>
.hc-modal-fade-enter-active,
.hc-modal-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hc-modal-fade-enter-from,
.hc-modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 99px;
}
</style>
