<template>
  <div class="relative inline-block" v-click-outside="close">
    <div @click="toggle" class="cursor-pointer">
      <slot></slot>
    </div>

    <Transition name="hc-popover-fade">
      <div 
        v-if="isOpen"
        ref="popoverContent"
        :class="[
          'absolute z-[1200] bg-white border border-gray-100 rounded-lg shadow-2xl min-w-[240px] overflow-hidden',
          positionClasses
        ]"
        :style="adjustmentStyle"
      >
        <div v-if="title" class="px-5 py-3 border-b border-gray-50 bg-gray-50/50">
          <h5 class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">{{ title }}</h5>
        </div>
        <div class="px-5 py-4 text-xs font-bold text-gray-600 leading-relaxed">
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
    title: { type: String, default: '' },
    position: {
      type: String,
      default: 'bottom',
      validator: (v) => [
        'top', 'top-start', 'top-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end',
        'right', 'right-start', 'right-end'
      ].includes(v)
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
      const pos = {
        // Top row
        'top': 'bottom-full left-1/2 -translate-x-1/2 mb-3',
        'top-start': 'bottom-full left-0 mb-3',
        'top-end': 'bottom-full right-0 mb-3',
        
        // Bottom row
        'bottom': 'top-full left-1/2 -translate-x-1/2 mt-3',
        'bottom-start': 'top-full left-0 mt-3',
        'bottom-end': 'top-full right-0 mt-3',

        // Left row
        'left': 'right-full top-1/2 -translate-y-1/2 mr-3',
        'left-start': 'right-full top-0 mr-3',
        'left-end': 'right-full bottom-0 mr-3',

        // Right row
        'right': 'left-full top-1/2 -translate-y-1/2 ml-3',
        'right-start': 'left-full top-0 ml-3',
        'right-end': 'left-full bottom-0 ml-3'
      };
      return pos[this.position];
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
