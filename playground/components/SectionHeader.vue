<template>
  <div :class="config.classes.col12">
    <!-- Section Header -->
    <div :class="config.classes.sectionHeader.wrapper">
      <span :class="config.classes.sectionHeader.number">{{ number }}.</span>
      <h3 :class="config.classes.sectionHeader.title">{{ title }}</h3>
    </div>
    
    <!-- Component Slot -->
    <slot></slot>
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
