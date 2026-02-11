<template>
  <div :class="config.classes.infoCards.wrapper">
    <!-- Component Suite Card -->
    <div :class="config.classes.infoCards.colWrapper">
      <div :class="config.classes.infoCards.card">
        <div v-if="config.features.showBackgroundIcon" class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <i class="fa fa-paint-brush text-8xl"></i>
        </div>
        <div :class="config.classes.infoCards.cardBody">
          <h2 :class="config.classes.infoCards.title">Component Suite</h2>
          <p :class="config.classes.infoCards.text">
            Explore our library of premium Vue 3 components. Switch between the 
            <b>Modern</b> (Tailwind v4) and <b>Neo</b> (Bootstrap 5) themes to see the visual transformation.
          </p>
          <div :class="config.classes.infoCards.badgeWrapper">
            <span v-for="view in views" :key="view.id" :class="config.classes.infoCards.badge">
              #{{ view.id }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Environment Card -->
    <div :class="config.classes.infoCards.colWrapper">
      <div :class="config.classes.infoCards.cardBlue">
        <div :class="config.classes.infoCards.cardBlueBody">
          <h3 :class="config.classes.infoCards.titleBlue">Environment: Playground</h3>
          <p :class="config.classes.infoCards.textBlue">
            Testing components with real-world hydrated data patterns. 
            All components use the latest @hashtagcms/admin-sdk logic.
          </p>
          <div :class="config.classes.infoCards.iconWrapper">
            <div :class="config.classes.infoCards.iconGroup">
              <div :class="[config.classes.infoCards.icon, themeName === 'modern' ? 'bg-blue-400' : '']" style="width: 32px; height: 32px;">
                <span :class="themeName === 'neo' ? 'fw-bold small' : ''">V</span>
              </div>
              <div :class="[config.classes.infoCards.icon, themeName === 'modern' ? 'bg-blue-500' : '']" style="width: 32px; height: 32px;">
                <span :class="themeName === 'neo' ? 'fw-bold small' : ''">T</span>
              </div>
              <div :class="[config.classes.infoCards.icon, themeName === 'modern' ? 'bg-blue-700' : '']" style="width: 32px; height: 32px;">
                <span :class="themeName === 'neo' ? 'fw-bold small' : ''">B</span>
              </div>
            </div>
            <span :class="config.classes.infoCards.iconText">Vue 3 + Tailwind + Bootstrap</span>
          </div>
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
  views: {
    type: Array,
    required: true
  }
});
</script>
