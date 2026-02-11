<template>
  <div :class="config.classes.col12">
    <!-- Section Header -->
    <div :class="config.classes.sectionHeader.wrapper">
      <span :class="config.classes.sectionHeader.number">{{ number }}.</span>
      <h3 :class="config.classes.sectionHeader.title">{{ title }}</h3>
    </div>
    
    <!-- Card Wrapper -->
    <div :class="config.classes.card.wrapper">
      <!-- Main Content -->
      <slot></slot>
      
      <!-- Card Footer (for pagination, etc) -->
      <div v-if="$slots.footer" :class="config.classes.card.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  config: {
    type: Object,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});
</script>
