<template>
  <ul role="tablist" class="flex border-b-2 border-gray-200 text-xs">
    <li
      v-for="(tab, index) in tabs"
      :key="index"
      role="tab"
      :aria-controls="`panel-${getTabId(tab)}`"
      :aria-selected="isActive(tab)"
      :class="getTabClass(tab)"
      @click="moveToTab(tab)"
    >
      <a 
        :href="getTabHref(tab)" 
        class="block"        
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
    
    getTabClass(tab) {
      const baseClasses = "mx-0.5 px-4 py-2.5 text-xs font-bold tracking-wider rounded-t-lg border-t-2 border-l-2 border-r-2 -mb-0.5 transition-colors";
      
      if (this.isActive(tab)) {
        return `${baseClasses} bg-blue-600 text-white border-blue-600`;
      }
      
      return `${baseClasses} bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200 hover:text-gray-800`;
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
