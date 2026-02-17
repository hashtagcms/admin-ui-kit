<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="hc-drawer-fade">
      <div 
        v-if="modelValue" 
        @click="$emit('update:modelValue', false)"
        class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[1900]"
      ></div>
    </Transition>

    <!-- Drawer Panel -->
    <Transition :name="'hc-drawer-slide-' + position">
      <div 
        v-if="modelValue"
        :class="[
          'fixed bg-white shadow-2xl z-[2000] flex flex-col transition-all duration-400',
          positionClasses,
          sizeClasses
        ]"
      >
        <!-- Header -->
        <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
          <div>
            <h4 class="text-xs font-black uppercase tracking-[0.2em] text-gray-900">{{ title }}</h4>
            <p v-if="subtitle" class="text-[9px] font-bold text-gray-400 uppercase mt-1">{{ subtitle }}</p>
          </div>
          <button 
            @click="$emit('update:modelValue', false)"
            class="p-2 text-gray-300 hover:text-gray-900 transition-all hover:-translate-y-0.5 active:scale-90"
          >
            <i class="fa fa-times text-lg"></i>
          </button>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto p-6 scrollbar-premium">
          <slot></slot>
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer" class="px-6 py-5 border-t border-gray-100 bg-gray-50/30">
          <slot name="footer"></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  name: 'HcDrawer',
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: 'Panel' },
    subtitle: { type: String, default: '' },
    position: { 
      type: String, 
      default: 'right',
      validator: (v) => ['left', 'right'].includes(v)
    },
    size: {
      type: String,
      default: 'md',
      validator: (v) => ['sm', 'md', 'lg', 'xl', 'full'].includes(v)
    }
  },
  emits: ['update:modelValue'],
  computed: {
    positionClasses() {
      return this.position === 'right' ? 'top-0 right-0 h-full' : 'top-0 left-0 h-full';
    },
    sizeClasses() {
      const sizes = {
        'sm': 'w-[320px]',
        'md': 'w-[480px]',
        'lg': 'w-[640px]',
        'xl': 'w-[800px]',
        'full': 'w-full'
      };
      return sizes[this.size];
    }
  }
};
</script>

<style scoped>
.hc-drawer-fade-enter-active, .hc-drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}
.hc-drawer-fade-enter-from, .hc-drawer-fade-leave-to {
  opacity: 0;
}

/* Slide from Right */
.hc-drawer-slide-right-enter-active, .hc-drawer-slide-right-leave-active {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hc-drawer-slide-right-enter-from, .hc-drawer-slide-right-leave-to {
  transform: translateX(100%);
}

/* Slide from Left */
.hc-drawer-slide-left-enter-active, .hc-drawer-slide-left-leave-active {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hc-drawer-slide-left-enter-from, .hc-drawer-slide-left-leave-to {
  transform: translateX(-100%);
}

.scrollbar-premium::-webkit-scrollbar { width: 6px; }
.scrollbar-premium::-webkit-scrollbar-track { background: transparent; }
.scrollbar-premium::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.scrollbar-premium::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
</style>
