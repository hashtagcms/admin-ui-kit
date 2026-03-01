<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition :name="ui.backdropTransition || 'hc-drawer-fade'">
      <div 
        v-if="modelValue" 
        @click="$emit('update:modelValue', false)"
        :class="ui.backdrop"
      ></div>
    </Transition>

    <!-- Drawer Panel -->
    <Transition :name="transitionName">
      <div 
        v-if="modelValue"
        :class="[
          ui.panel,
          positionClasses,
          sizeClasses
        ]"
      >
        <!-- Header -->
        <div :class="ui.header">
          <div>
            <h4 :class="ui.title">{{ title }}</h4>
            <p v-if="subtitle" :class="ui.subtitle">{{ subtitle }}</p>
          </div>
          <button 
            @click="$emit('update:modelValue', false)"
            :class="ui.closeButton"
          >
            <i :class="ui.closeIcon || 'fa fa-times text-lg'"></i>
          </button>
        </div>

        <!-- Body -->
        <div :class="ui.body">
          <slot></slot>
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer" :class="ui.footer">
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
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        backdrop: '',
        backdropTransition: '',
        panel: '',
        header: '',
        title: '',
        subtitle: '',
        closeButton: '',
        closeIcon: '',
        body: '',
        footer: '',
        positions: {},
        sizes: {},
        transitionPrefix: ''
      })
    },
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: 'Panel' },
    subtitle: { type: String, default: '' },
    position: { 
      type: String, 
      default: 'right'
    },
    size: {
      type: String,
      default: 'md'
    }
  },
  emits: ['update:modelValue'],
  computed: {
    transitionName() {
      return (this.ui.transitionPrefix || 'hc-drawer-slide-') + this.position;
    },
    positionClasses() {
      return this.ui.positions?.[this.position] || '';
    },
    sizeClasses() {
      return this.ui.sizes?.[this.size] || '';
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
