<template>
  <Teleport to="body">
    <Transition name="hc-toast-slide">
      <div 
        v-if="visible"
        :class="[
          'fixed right-8 z-[10000] flex items-center p-4 min-w-[320px] bg-white border border-gray-100 rounded-lg shadow-2xl overflow-hidden',
          borderClass
        ]"
        :style="{ top: offset + 'px' }"
        role="alert"
      >
        <!-- Icon -->
        <div :class="['flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mr-4', iconBgClass]">
          <i :class="[iconClass, iconColorClass]"></i>
        </div>

        <!-- Content -->
        <div class="flex-1 pr-4">
          <p v-if="title" class="text-xs font-black uppercase tracking-widest text-gray-900 leading-tight mb-0.5">{{ title }}</p>
          <p :class="['font-bold text-gray-400 uppercase leading-relaxed', title ? 'text-[10px]' : 'text-xs text-gray-600']">{{ message }}</p>
        </div>

        <!-- Close -->
        <button @click="close" class="p-2 text-gray-300 hover:text-gray-900 transition-all hover:-translate-y-0.5 active:scale-90">
          <i class="fa fa-times"></i>
        </button>

        <!-- Progress Line -->
        <div 
          class="absolute bottom-0 left-0 h-1 bg-current opacity-20" 
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
    title: { type: String, default: '' },
    message: { type: String, required: true },
    variant: {
      type: String,
      default: 'info',
      validator: (v) => ['success', 'error', 'warning', 'info'].includes(v)
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
      const colors = {
        'success': 'border-l-4 border-l-emerald-500',
        'error': 'border-l-4 border-l-rose-500',
        'warning': 'border-l-4 border-l-amber-500',
        'info': 'border-l-4 border-l-blue-500'
      };
      return colors[this.variant];
    },
    iconBgClass() {
      const bgs = {
        'success': 'bg-emerald-50',
        'error': 'bg-rose-50',
        'warning': 'bg-amber-50',
        'info': 'bg-blue-50'
      };
      return bgs[this.variant];
    },
    iconColorClass() {
      const colors = {
        'success': 'text-emerald-600',
        'error': 'text-rose-600',
        'warning': 'text-amber-600',
        'info': 'text-blue-600'
      };
      return colors[this.variant];
    },
    progressColor() {
      const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#2563eb'
      };
      return colors[this.variant];
    },
    iconClass() {
      const icons = {
        'success': 'fa fa-check-circle',
        'error': 'fa fa-times-circle',
        'warning': 'fa fa-exclamation-triangle',
        'info': 'fa fa-info-circle'
      };
      return icons[this.variant];
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
