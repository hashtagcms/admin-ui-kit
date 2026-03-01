<template>
  <div :class="ui.wrapper" v-click-outside="close">
    <div @click="toggle" :class="ui.trigger">
      <slot></slot>
    </div>

    <Transition :name="ui.transitionName || 'hc-popover-fade'">
      <div 
        v-if="isOpen"
        ref="popoverContent"
        :class="[
          ui.popover,
          positionClasses
        ]"
        :style="adjustmentStyle"
      >
        <div v-if="title" :class="ui.header">
          <h5 :class="ui.title">{{ title }}</h5>
        </div>
        <div :class="ui.content">
          <slot name="content"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'HcPopover',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        wrapper: '',
        trigger: '',
        popover: '',
        header: '',
        title: '',
        content: '',
        positions: {},
        transitionName: ''
      })
    },
    title: { type: String, default: '' },
    position: {
      type: String,
      default: 'bottom'
    }
  },
  data() {
    return {
      isOpen: false,
      xOffset: 0,
      yOffset: 0
    };
  },
  directives: {
    'click-outside': {
      mounted(el, binding) {
        el.clickOutsideEvent = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value();
          }
        };
        document.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent);
      }
    }
  },
  computed: {
    positionClasses() {
      return this.ui.positions?.[this.position] || '';
    },
    adjustmentStyle() {
      return {
        marginLeft: `${this.xOffset}px`,
        marginTop: `${this.yOffset}px`
      };
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.checkOverflow();
      }
    },
    close() {
      this.isOpen = false;
      this.xOffset = 0;
      this.yOffset = 0;
    },
    async checkOverflow() {
      this.xOffset = 0;
      this.yOffset = 0;
      await this.$nextTick();
      if (!this.$refs.popoverContent) return;

      const rect = this.$refs.popoverContent.getBoundingClientRect();
      const padding = 16;
      const winW = window.innerWidth;
      const winH = window.innerHeight;

      // X-Axis adjustment
      if (rect.right > winW - padding) {
        this.xOffset = (winW - padding) - rect.right;
      } else if (rect.left < padding) {
        this.xOffset = padding - rect.left;
      }

      // Y-Axis adjustment
      if (rect.bottom > winH - padding) {
        this.yOffset = (winH - padding) - rect.bottom;
      } else if (rect.top < padding) {
        this.yOffset = padding - rect.top;
      }
    }
  }
};
</script>

<style scoped>
.hc-popover-fade-enter-active,
.hc-popover-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hc-popover-fade-enter-from,
.hc-popover-fade-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
