<template>
  <div :class="[ui.base, isVertical ? (ui.vertical || 'flex-col') : '']">
    <slot></slot>
  </div>
</template>

<script>
/**
 * Note: Child buttons should have their radius managed.
 * We can apply classes to children in the mounted hook or via CSS.
 */
export default {
  name: 'HcButtonGroup',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        base: '',
        vertical: ''
      })
    },
    isVertical: { type: Boolean, default: false }
  }
};
</script>

<style scoped>
/* Remove radius between buttons */
:deep(button), :deep(.btn) {
  border-radius: 0;
  margin: 0 !important;
  box-shadow: none !important;
  transform: none !important; /* Disable hover lift inside group */
}

/* Horizontal logic */
:not(.flex-col) > :deep(button:first-child), :not(.flex-col) > :deep(.btn:first-child) {
  border-top-left-radius: 0.375rem; /* lg radius */
  border-bottom-left-radius: 0.375rem;
}
:not(.flex-col) > :deep(button:last-child), :not(.flex-col) > :deep(.btn:last-child) {
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

/* Vertical logic */
.flex-col > :deep(button:first-child), .flex-col > :deep(.btn:first-child) {
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
}
.flex-col > :deep(button:last-child), .flex-col > :deep(.btn:last-child) {
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

/* Add borders between buttons if they are outline or ghost */
:deep(button + button) {
  border-left-width: 0;
}
.flex-col > :deep(button + button) {
  border-left-width: 2px;
  border-top-width: 0;
}
</style>
