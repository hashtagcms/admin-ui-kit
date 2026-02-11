<template>
  <ul role="tablist" class="nav nav-tabs">
    <li
      v-for="(tab, index) in tabs"
      :key="index"
      role="presentation"
      class="nav-item"
      @click="moveToTab(tab)"
    >
      <a 
        :href="getTabHref(tab)" 
        class="nav-link"
        :class="{ 'active': isActive(tab) }"
        role="tab"
        :aria-controls="`panel-${getTabId(tab)}`"
        :aria-selected="isActive(tab)"        
      >
        {{ getTabLabel(tab) }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TabView',
  props: {
    // Array of tabs - can be strings or objects with {label, id, href}
    // Can also be a JSON string that will be parsed
    dataTabs: {
      type: [Array, String],
      required: true,
      default: () => []
    },
    // Currently active tab (string or object)
    dataActiveTab: {
      type: [String, Object],
      default: null
    },
    // Base URL for generating hrefs (optional)
    dataBaseUrl: {
      type: String,
      default: ''
    }
  },
  emits: ['tab-change'],
  computed: {
    tabs() {
      // If dataTabs is a string, parse it as JSON
      if (typeof this.dataTabs === 'string') {
        try {
          return JSON.parse(this.dataTabs);
        } catch (e) {
          console.warn('Failed to parse dataTabs JSON:', this.dataTabs, e);
          return [];
        }
      }
      return this.dataTabs;
    },
    activeTab() {
      return this.dataActiveTab;
    },
    baseUrl() {
      return this.dataBaseUrl;
    }
  },
  methods: {
    moveToTab(tab) {
      this.$emit('tab-change', tab);
      window.location.href = this.getTabHref(tab);
    },
    getTabId(tab) {
      if (typeof tab === 'string') {
        return tab.replace(/\s/g, '').toLowerCase();
      }
      return tab.id || tab.label.replace(/\s/g, '').toLowerCase();
    },
    
    getTabLabel(tab) {
      return typeof tab === 'string' ? tab : tab.label;
    },
    
    getTabHref(tab) {
      if (typeof tab === 'object' && tab.href) {
        return tab.href;
      }
      if (this.baseUrl) {
        return `${this.baseUrl}/${this.getTabId(tab)}`;
      }
      return `#${this.getTabId(tab)}`;
    },
    
    isActive(tab) {
      const tabId = this.getTabId(tab);
      const activeId = this.activeTab 
        ? (typeof this.activeTab === 'string' 
            ? this.activeTab.replace(/\s/g, '').toLowerCase()
            : this.getTabId(this.activeTab))
        : null;
      return tabId === activeId;
    },
    
    selectTab(tab) {
      this.$emit('tab-change', tab);
    }
  }
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
