<template>
  <div class="relative inline-flex">
    <slot></slot>
    <div 
      :class="[
        'absolute z-10 transform translate-x-1/2 -translate-y-1/2 top-0 right-0',
        offsetClasses
      ]"
    >
      <slot name="badge">
        <span 
          v-if="count !== null"
          :class="[
            'flex items-center justify-center px-1.5 py-0.5 min-w-[18px] h-[18px] text-[8px] font-black leading-none bg-rose-600 text-white rounded-full border-2 border-white',
          ]"
        >
          {{ formattedCount }}
        </span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HcBadgeContainer',
  props: {
    count: { type: [Number, String], default: null },
    maxCount: { type: Number, default: 99 },
    offset: { type: Array, default: () => [0, 0] }
  },
  computed: {
    formattedCount() {
      if (typeof this.count === 'string') return this.count;
      return this.count > this.maxCount ? `${this.maxCount}+` : this.count;
    },
    offsetClasses() {
      // Custom offsets can be handled here if needed, 
      // but standard placement is top-right.
      return '';
    }
  }
};
</script>
