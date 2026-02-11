<template>
  <div :class="config.classes.col12">
    <!-- Section Header -->
    <div :class="config.classes.sectionHeader.wrapper">
      <span :class="config.classes.sectionHeader.number">{{ number }}.</span>
      <h3 :class="config.classes.sectionHeader.title">{{ title }}</h3>
    </div>
    
    <!-- Left Nav Layout -->
    <div :class="config.classes.componentWrapper.leftNav">
      <!-- Sidebar -->
      <div :class="config.classes.componentWrapper.leftNavSidebar">
        <div :class="config.classes.componentWrapper.leftNavSidebarInner">
          <slot name="sidebar"></slot>
        </div>
      </div>
      
      <!-- Main Content Area -->
      <div :class="config.classes.componentWrapper.leftNavContent">
        <div class="text-center">
          <i :class="themeName === 'modern' ? 'fa fa-columns text-4xl text-gray-300 mb-4' : 'fa fa-columns fa-3x text-muted mb-3'"></i>
          <p :class="themeName === 'modern' ? 'text-gray-400 font-bold uppercase text-xs tracking-widest' : 'text-muted fw-bold text-uppercase small'">
            Main Layout Preview Area
          </p>
        </div>
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
  themeName: {
    type: String,
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
