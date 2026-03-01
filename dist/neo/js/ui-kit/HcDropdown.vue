<template>
  <div :class="ui.wrapper" v-click-outside="close">
    <div @click="toggle" :class="ui.triggerWrapper">
      <slot name="trigger">
        <button :class="ui.trigger">
          {{ label || 'Actions' }}
          <i :class="[ui.arrow, isOpen ? ui.arrowOpen : '']"></i>
        </button>
      </slot>
    </div>

    <Transition :name="ui.transitionName || 'hc-dropdown-zoom'">
      <div 
        v-if="isOpen"
        :class="[
          ui.menu,
          positionClasses
        ]"
      >
        <div v-for="(item, index) in items" :key="index">
          <!-- Divider -->
          <div v-if="item.divider" :class="ui.divider"></div>
          
          <!-- Item -->
          <button
            v-else
            @click="handleItemClick(item)"
            :class="[
              ui.item,
              item.variant === 'danger' ? ui.itemDanger : ui.itemPrimary
            ]"
          >
            <i v-if="item.icon" :class="[item.icon, ui.itemIcon]"></i>
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
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        wrapper: '',
        triggerWrapper: '',
        trigger: '',
        arrow: '',
        arrowOpen: '',
        transitionName: '',
        menu: '',
        divider: '',
        item: '',
        itemPrimary: '',
        itemDanger: '',
        itemIcon: '',
        positions: {}
      })
    },
    label: { type: String, default: '' },
    items: {
      type: Array, // [{ label: 'Edit', icon: 'fa fa-edit', onClick: () => {}, divider: false, variant: 'primary' }]
      required: true
    },
    position: {
      type: String,
      default: 'bottom-end'
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
      return this.ui.positions?.[this.position] || '';
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
