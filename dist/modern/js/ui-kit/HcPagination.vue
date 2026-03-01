<template>
  <nav :class="ui.base" aria-label="Pagination">
    <!-- Previous -->
    <button 
      @click="goToPage(modelValue - 1)" 
      :disabled="modelValue === 1"
      :class="[ui.button, modelValue === 1 ? ui.disabledButton : ui.enabledButton]"
    >
      <i :class="ui.prevIcon || 'fa fa-chevron-left text-[10px]'"></i>
    </button>

    <!-- Pages -->
    <template v-for="page in visiblePages" :key="page">
      <button 
        v-if="page !== '...'"
        @click="goToPage(page)"
        :class="[
          ui.pageButton,
          modelValue === page ? ui.activePage : ui.inactivePage
        ]"
      >
        {{ page }}
      </button>
      <span v-else :class="ui.ellipsis">...</span>
    </template>

    <!-- Next -->
    <button 
      @click="goToPage(modelValue + 1)" 
      :disabled="modelValue === totalPages"
      :class="[ui.button, modelValue === totalPages ? ui.disabledButton : ui.enabledButton]"
    >
      <i :class="ui.nextIcon || 'fa fa-chevron-right text-[10px]'"></i>
    </button>
  </nav>
</template>

<script>
export default {
  name: 'HcPagination',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        base: '',
        button: '',
        enabledButton: '',
        disabledButton: '',
        prevIcon: '',
        nextIcon: '',
        pageButton: '',
        activePage: '',
        inactivePage: '',
        ellipsis: ''
      })
    },
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
