<template>
  <div v-if="visible" :class="classes" role="alert">
    <div class="flex items-start">
      <div v-if="$slots.icon" class="flex-shrink-0 mr-3 mt-0.5">
        <slot name="icon"></slot>
      </div>
      <div v-else class="flex-shrink-0 mr-3 mt-0.5">
         <i :class="defaultIcon"></i>
      </div>
      <div class="flex-1 mt-1">
        <h4 v-if="title" class="text-xs font-black uppercase tracking-widest mb-1" v-html="title"></h4>
        <div class="text-[11px] font-bold leading-relaxed opacity-90">
          <slot></slot>
        </div>
      </div>
      <button v-if="dismissible" @click="dismiss" class="ml-4 flex-shrink-0 opacity-40 hover:opacity-100 transition-all hover:-translate-y-0.5 active:scale-90">
        <i class="fa fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HcAlert',
  props: {
    variant: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'danger', 'warning', 'info'].includes(value)
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
      const base = "p-5 rounded-lg border-l-4 shadow-md transition-all duration-300";
      const variants = {
        'success': 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-emerald-500/10',
        'danger': 'bg-rose-50 border-rose-500 text-rose-800 shadow-rose-500/10',
        'warning': 'bg-amber-50 border-amber-500 text-amber-800 shadow-amber-500/10',
        'info': 'bg-sky-50 border-sky-500 text-sky-800 shadow-sky-500/10'
      };
      return [base, variants[this.variant]].join(' ');
    },
    defaultIcon() {
      const icons = {
        'success': 'fa fa-check-circle',
        'danger': 'fa fa-exclamation-circle',
        'warning': 'fa fa-exclamation-triangle',
        'info': 'fa fa-info-circle'
      };
      return icons[this.variant];
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
