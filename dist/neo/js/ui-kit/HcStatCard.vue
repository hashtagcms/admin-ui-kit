<template>
  <div :class="ui.wrapper">
    <div :class="ui.contentContainer">
      <div>
        <p :class="ui.title">
          {{ title }}
        </p>
        <h3 :class="ui.value">
          {{ value }}
        </h3>
      </div>
      <div v-if="icon" :class="[ui.iconWrapper, iconBgClass]">
        <i :class="[icon, iconColorClass, ui.iconSize]"></i>
      </div>
    </div>
    
    <div v-if="trend || trendText" :class="ui.trendContainer">
      <div v-if="trend" :class="[ui.trendBadge, trendClasses]">
        <i :class="trendIcon"></i>
        {{ trend }}%
      </div>
      <span :class="ui.trendText">
        {{ trendText || 'vs last month' }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HcStatCard',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        wrapper: '',
        contentContainer: '',
        title: '',
        value: '',
        iconWrapper: '',
        iconSize: '',
        trendContainer: '',
        trendBadge: '',
        trendText: '',
        iconBgs: {},
        iconColors: {},
        trends: {},
        trendIcons: {}
      })
    },
    title: { type: String, required: true },
    value: { type: [String, Number], required: true },
    icon: { type: String, default: '' },
    trend: { type: [String, Number], default: '' }, // e.g. "12.5"
    trendDirection: { 
      type: String, 
      default: 'up'
    },
    trendText: { type: String, default: '' },
    variant: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    iconBgClass() {
      return this.ui.iconBgs?.[this.variant] || '';
    },
    iconColorClass() {
      return this.ui.iconColors?.[this.variant] || '';
    },
    trendClasses() {
      return this.ui.trends?.[this.trendDirection] || this.ui.trends?.['neutral'] || '';
    },
    trendIcon() {
      return this.ui.trendIcons?.[this.trendDirection] || this.ui.trendIcons?.['neutral'] || '';
    }
  }
};
</script>
