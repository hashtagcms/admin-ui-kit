<template>
  <div :class="['relative overflow-hidden bg-gray-100 hc-shimmer', roundedClass, widthClass, heightClass]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HcPlaceholder',
  props: {
    width: {
      type: String,
      default: 'w-full'
    },
    height: {
      type: String,
      default: 'h-4'
    },
    rounded: {
      type: String,
      default: 'lg'
    }
  },
  computed: {
    widthClass() { return this.width; },
    heightClass() { return this.height; },
    roundedClass() {
      const radii = {
        'none': 'rounded-none',
        'sm': 'rounded-sm',
        'md': 'rounded-md',
        'lg': 'rounded-lg',
        'full': 'rounded-full'
      };
      return radii[this.rounded] || this.rounded;
    }
  }
};
</script>

<style scoped>
.hc-shimmer::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.4) 20%,
    rgba(255, 255, 255, 0.7) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
