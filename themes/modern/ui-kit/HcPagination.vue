<template>
  <nav class="flex items-center space-x-1" aria-label="Pagination">
    <!-- Previous -->
    <button 
      @click="goToPage(modelValue - 1)" 
      :disabled="modelValue === 1"
      class="p-2 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg border border-gray-100 bg-white text-gray-500 hover:border-blue-500 hover:text-blue-600 hover:-translate-y-0.5 active:scale-95 disabled:hover:translate-y-0 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
    >
      <i class="fa fa-chevron-left text-[10px]"></i>
    </button>

    <!-- Pages -->
    <template v-for="page in visiblePages" :key="page">
      <button 
        v-if="page !== '...'"
        @click="goToPage(page)"
        :class="[
          'px-3 py-1.5 min-w-[32px] text-[10px] font-black uppercase tracking-widest rounded-lg border transition-all duration-300 hover:-translate-y-0.5 active:scale-95',
          modelValue === page 
            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30' 
            : 'bg-white border-gray-100 text-gray-500 hover:border-blue-500 hover:text-blue-600'
        ]"
      >
        {{ page }}
      </button>
      <span v-else class="px-2 text-gray-300">...</span>
    </template>

    <!-- Next -->
    <button 
      @click="goToPage(modelValue + 1)" 
      :disabled="modelValue === totalPages"
      class="p-2 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg border border-gray-100 bg-white text-gray-500 hover:border-blue-500 hover:text-blue-600 hover:-translate-y-0.5 active:scale-95 disabled:hover:translate-y-0 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
    >
      <i class="fa fa-chevron-right text-[10px]"></i>
    </button>
  </nav>
</template>

<script>
export default {
  name: 'HcPagination',
  props: {
    modelValue: { type: Number, default: 1 },
    totalPages: { type: Number, required: true },
    maxVisible: { type: Number, default: 5 }
  },
  emits: ['update:modelValue', 'change'],
  computed: {
    visiblePages() {
      const total = this.totalPages;
      const current = this.modelValue;
      const max = this.maxVisible;

      if (total <= max) return Array.from({ length: total }, (_, i) => i + 1);

      let start = Math.max(1, current - Math.floor(max / 2));
      let end = Math.min(total, start + max - 1);

      if (end === total) {
        start = Math.max(1, total - max + 1);
      }

      const pages = [];
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < total) {
        if (end < total - 1) pages.push('...');
        pages.push(total);
      }

      return pages;
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('update:modelValue', page);
        this.$emit('change', page);
      }
    }
  }
};
</script>
