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

<script setup>
import { ref } from "vue";
import HcToast from "../../ui-kit/HcToast.vue";

const toasts = ref([]);
let counter = 0;

/**
 * Show a new toast
 * @param {String} message
 * @param {Number} timeout
 * @param {Object|String} options - Can be a variant string or an object with title, variant, etc.
 */
const show = (message = "", timeout = 5000, options = {}) => {
    const id = ++counter;
    
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
    const offset = 32 + (toasts.value.length * 92);

    const newToast = {
        id,
        message,
        title,
        variant,
        duration: timeout,
        offset
    };

    toasts.value.push(newToast);
};

/**
 * Update offsets for all active toasts
 */
const updateOffsets = () => {
    toasts.value.forEach((toast, index) => {
        toast.offset = 32 + (index * 92);
    });
};

/**
 * Remove a toast from the list
 * @param {Number} id
 */
const removeToast = (id) => {
    const index = toasts.value.findIndex(t => t.id === id);
    if (index !== -1) {
        toasts.value.splice(index, 1);
        // Re-calculate offsets for remaining toasts to smoothly slide them up
        updateOffsets();
    }
};

const hide = () => {
    // Clear all toasts
    toasts.value = [];
};

defineExpose({
    show,
    hide
});
</script>

