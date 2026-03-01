<template>
  <Teleport to="body">
    <Transition :name="ui.transitionName || 'hc-toast-slide'">
      <div 
        v-if="visible"
        :class="[
          ui.toast,
          borderClass
        ]"
        :style="{ top: offset + 'px' }"
        role="alert"
      >
        <!-- Icon -->
        <div :class="[ui.iconWrapper, iconBgClass]">
          <i :class="[iconClass, iconColorClass]"></i>
        </div>

        <!-- Content -->
        <div :class="ui.content">
          <p v-if="title" :class="ui.title">{{ title }}</p>
          <p :class="[ui.message, title ? ui.messageWithTitle : ui.messageWithoutTitle]">{{ message }}</p>
        </div>

        <!-- Close -->
        <button @click="close" :class="ui.closeButton">
          <i :class="ui.closeIcon || 'fa fa-times'"></i>
        </button>

        <!-- Progress Line -->
        <div 
          :class="ui.progressLine" 
          :style="{ width: progress + '%', color: progressColor }"
        ></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  name: 'HcToast',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        toast: '',
        iconWrapper: '',
        content: '',
        title: '',
        message: '',
        messageWithTitle: '',
        messageWithoutTitle: '',
        closeButton: '',
        closeIcon: '',
        progressLine: '',
        transitionName: '',
        borderColors: {},
        iconBgs: {},
        iconColors: {},
        progressColors: {},
        icons: {}
      })
    },
    title: { type: String, default: '' },
    message: { type: String, required: true },
    variant: {
      type: String,
      default: 'info'
    },
    duration: { type: Number, default: 5000 },
    offset: { type: Number, default: 32 }
  },
  data() {
    return {
      visible: true,
      progress: 100,
      timer: null
    };
  },
  mounted() {
    this.startTimer();
  },
  computed: {
    borderClass() {
      return this.ui.borderColors?.[this.variant] || '';
    },
    iconBgClass() {
      return this.ui.iconBgs?.[this.variant] || '';
    },
    iconColorClass() {
      return this.ui.iconColors?.[this.variant] || '';
    },
    progressColor() {
      return this.ui.progressColors?.[this.variant] || '';
    },
    iconClass() {
      return this.ui.icons?.[this.variant] || '';
    }
  },
  methods: {
    startTimer() {
        if (this.duration <= 0) return;
        const interval = 50;
        const totalSteps = this.duration / interval;
        const step = 100 / totalSteps;

        this.timer = setInterval(() => {
            this.progress -= step;
            if (this.progress <= 0) {
              clearInterval(this.timer);
              this.close();
            }
        }, interval);
    },
    close() {
      this.visible = false;
      this.$emit('close');
    }
  },
  beforeUnmount() {
    if (this.timer) clearInterval(this.timer);
  }
};
</script>

<style scoped>
.hc-toast-slide-enter-active,
.hc-toast-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.3s ease;
}

.hc-toast-slide-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.hc-toast-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}
</style>
