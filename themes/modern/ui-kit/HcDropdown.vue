<template>
  <div class="relative inline-block" v-click-outside="close">
    <div @click="toggle" class="cursor-pointer">
      <slot name="trigger">
        <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-lg shadow-sm hover:border-gray-200 transition-all font-black text-[10px] uppercase tracking-widest text-gray-600">
          {{ label || 'Actions' }}
          <i :class="['fa fa-chevron-down text-[8px] transition-transform duration-300', isOpen ? 'rotate-180' : '']"></i>
        </button>
      </slot>
    </div>

    <Transition name="hc-dropdown-zoom">
      <div 
        v-if="isOpen"
        :class="[
          'absolute z-[1200] mt-2 py-2 bg-white border border-gray-100 rounded-xl shadow-2xl min-w-[200px] overflow-hidden',
          positionClasses
        ]"
      >
        <div v-for="(item, index) in items" :key="index">
          <!-- Divider -->
          <div v-if="item.divider" class="my-1 border-t border-gray-50"></div>
          
          <!-- Item -->
          <button
            v-else
            @click="handleItemClick(item)"
            :class="[
              'w-full flex items-center px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all duration-200',
              item.variant === 'danger' ? 'text-rose-600 hover:bg-rose-50' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
            ]"
          >
            <i v-if="item.icon" :class="[item.icon, 'mr-3 text-xs w-4 text-center']"></i>
            {{ item.label }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'HcDropdown',
  props: {
    label: { type: String, default: '' },
    items: {
      type: Array, // [{ label: 'Edit', icon: 'fa fa-edit', onClick: () => {}, divider: false, variant: 'primary' }]
      required: true
    },
    position: {
      type: String,
      default: 'bottom-end',
      validator: (v) => ['bottom-start', 'bottom-end', 'top-start', 'top-end'].includes(v)
    }
  },
  data() {
    return {
      isOpen: false
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
        'bottom-start': 'top-full left-0',
        'bottom-end': 'top-full right-0',
        'top-start': 'bottom-full left-0 mb-4',
        'top-end': 'bottom-full right-0 mb-4'
      };
      return pos[this.position];
    }
  },
  methods: {
    toggle() { this.isOpen = !this.isOpen; },
    close() { this.isOpen = false; },
    handleItemClick(item) {
      if (item.onClick) item.onClick();
      this.$emit('select', item);
      this.close();
    }
  }
};
</script>

<style scoped>
.hc-dropdown-zoom-enter-active,
.hc-dropdown-zoom-leave-active {
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hc-dropdown-zoom-enter-from,
.hc-dropdown-zoom-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}
</style>
