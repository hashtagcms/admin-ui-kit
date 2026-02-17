<template>
  <div 
    class="relative inline-block group"
    @mouseenter="show"
    @mouseleave="hide"
  >
    <slot></slot>
    <div 
      v-show="isVisible"
      :class="[
        'absolute z-[1200] px-3 py-2 text-[10px] font-black uppercase tracking-widest text-white bg-gray-900 rounded-md shadow-xl whitespace-nowrap transition-all duration-300 scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100',
        positionClasses
      ]"
    >
      {{ text }}
      <slot name="content"></slot>
      <!-- Arrow -->
      <div :class="['absolute w-2 h-2 bg-gray-900 rotate-45', arrowClasses]"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HcTooltip',
  props: {
    text: { type: String, default: '' },
    position: {
      type: String,
      default: 'top',
      validator: (v) => ['top', 'bottom', 'left', 'right'].includes(v)
    }
  },
  data() {
    return {
      isVisible: false
    };
  },
  computed: {
    positionClasses() {
      const pos = {
        'top': 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        'bottom': 'top-full left-1/2 -translate-x-1/2 mt-2',
        'left': 'right-full top-1/2 -translate-y-1/2 mr-2',
        'right': 'left-full top-1/2 -translate-y-1/2 ml-2'
      };
      return pos[this.position];
    },
    arrowClasses() {
      const pos = {
        'top': 'top-full left-1/2 -translate-x-1/2 -mt-1',
        'bottom': 'bottom-full left-1/2 -translate-x-1/2 -mb-1',
        'left': 'left-full top-1/2 -translate-y-1/2 -ml-1',
        'right': 'right-full top-1/2 -translate-y-1/2 -mr-1'
      };
      return pos[this.position];
    }
  },
  methods: {
    show() { this.isVisible = true; },
    hide() { this.isVisible = false; }
  }
};
</script>
