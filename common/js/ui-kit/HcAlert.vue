<template>
  <div v-if="visible" :class="ui.base" role="alert">
    <div :class="ui.container">
      <div v-if="$slots.icon" :class="ui.iconWrapper">
        <slot name="icon"></slot>
      </div>
      <div v-else :class="ui.iconWrapper">
         <i :class="[ui.icon, ui.variants?.[variant]?.icon]"></i>
      </div>
      <div :class="ui.contentWrapper">
        <h4 v-if="title" :class="ui.title" v-html="title"></h4>
        <div :class="ui.message">
          <slot></slot>
        </div>
      </div>
      <button v-if="dismissible" @click="dismiss" :class="ui.dismissButton">
        <i :class="ui.dismissIcon || 'fa fa-times'"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HcAlert',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        base: '',
        container: '',
        iconWrapper: '',
        icon: '',
        contentWrapper: '',
        title: '',
        message: '',
        dismissButton: '',
        dismissIcon: '',
        variants: {}
      })
    },
    variant: {
      type: String,
      default: 'info'
    },
    title: {
      type: String,
      default: ''
    },
    dismissible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: true
    };
  },
  computed: {
    classes() {
      const { ui, variant } = this;
      return [
        ui.base,
        ui.variants?.[variant]?.base || ''
      ].join(' ');
    }
  },
  methods: {
    dismiss() {
      this.visible = false;
      this.$emit('dismissed');
    }
  }
};
</script>
