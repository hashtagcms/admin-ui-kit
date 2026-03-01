<template>
  <Teleport to="body">
    <Transition :name="ui.transitionName || 'hc-modal-fade'">
      <div v-if="modelValue" :class="ui.wrapper">
        <!-- Backdrop -->
        <div :class="ui.backdrop" @click="close"></div>
        
        <!-- Modal Content -->
        <div :class="[ui.content, sizeClasses]">
          <!-- Header -->
          <div :class="ui.header">
            <h3 :class="ui.title">
              <slot name="title">{{ title }}</slot>
            </h3>
            <button @click="close" :class="ui.closeButton">
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
      </div>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  name: 'HcModal',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        wrapper: '',
        backdrop: '',
        content: '',
        header: '',
        title: '',
        closeButton: '',
        closeIcon: '',
        body: '',
        footer: '',
        sizes: {},
        transitionName: ''
      })
    },
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
      default: 'md'
    }
  },
  emits: ['update:modelValue'],
  computed: {
    sizeClasses() {
      return this.ui.sizes?.[this.size] || '';
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
