<template>
  <div class="fixed top-0 right-0 z-[10000] p-6 space-y-4">
    <hc-toast
      v-for="toast in toasts"
      :key="toast.id"
      :title="toast.title"
      :message="toast.message"
      :variant="toast.variant"
      :duration="toast.duration"
      :offset="toast.offset"
      @close="removeToast(toast.id)"
    />
  </div>
</template>

<script>
import HcToast from "../../ui-kit/HcToast.vue";

export default {
  name: "ToastBox",
  components: {
    "hc-toast": HcToast
  },
  data() {
    return {
      toasts: [],
      counter: 0
    };
  },
  methods: {
    /**
     * Show a new toast
     * @param {String} message
     * @param {Number} timeout
     * @param {Object|String} options - Can be a variant string or an object with title, variant, etc.
     */
    show(message = "", timeout = 5000, options = {}) {
      const id = ++this.counter;
      
      // Handle legacy calls where options might be a position or just missing
      let variant = 'info';
      let title = null;
      
      if (typeof options === 'string') {
        variant = options;
      } else if (typeof options === 'object' && options !== null) {
        variant = options.variant || 'info';
        title = options.title;
      }

      // Calculate offset based on current toasts
      // Each toast is roughly 80px high including gap
      const offset = 32 + (this.toasts.length * 92);

      const newToast = {
        id,
        message,
        title,
        variant,
        duration: timeout,
        offset
      };

      this.toasts.push(newToast);
    },

    /**
     * Remove a toast from the list
     * @param {Number} id
     */
    removeToast(id) {
      const index = this.toasts.findIndex(t => t.id === id);
      if (index !== -1) {
        this.toasts.splice(index, 1);
        // Re-calculate offsets for remaining toasts to smoothly slide them up
        this.updateOffsets();
      }
    },

    /**
     * Update offsets for all active toasts
     */
    updateOffsets() {
      this.toasts.forEach((toast, index) => {
        toast.offset = 32 + (index * 92);
      });
    },

    hide() {
      // Clear all toasts
      this.toasts = [];
    }
  }
};
</script>
