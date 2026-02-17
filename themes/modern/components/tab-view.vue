<template>
  <div class="w-full">
    <!-- Using HcTabs visual structure for consistency -->
    <div class="border-b border-gray-100 mb-6">
      <ul role="tablist" class="flex flex-nowrap overflow-x-auto no-scrollbar -mb-px">
        <li v-for="tab in tabs" :key="getTabId(tab)" role="presentation" class="mr-6 flex-shrink-0">
          <a
            :href="getTabHref(tab)"
            @click.prevent="moveToTab(tab)"
            role="tab"
            :aria-selected="isActive(tab)"
            :aria-controls="`panel-${getTabId(tab)}`"
            :class="[
              'inline-block py-4 px-1 border-b-[3px] text-[11px] font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95',
              isActive(tab) 
                ? 'border-blue-600 text-blue-600 rounded-t-sm' 
                : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200'
            ]"
          >
            {{ getTabLabel(tab) }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { SafeJsonParse } from "../../../helpers/common";

export default {
  name: 'TabView',
  props: {
    dataTabs: {
      type: [Array, String],
      required: true,
      default: () => []
    },
    dataActiveTab: {
      type: [String, Object],
      default: null
    },
    dataBaseUrl: {
      type: String,
      default: ''
    }
  },
  emits: ['tab-change'],
  computed: {
    tabs() {
      return SafeJsonParse(this.dataTabs, []);
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
      const href = this.getTabHref(tab);
      this.$emit('tab-change', tab);
      if (href && href !== '#' && !href.startsWith('javascript')) {
        window.location.href = href;
      }
    },
    getTabId(tab) {
      if (typeof tab === 'string') {
        return tab.replace(/\s/g, '').toLowerCase();
      }
      return tab.id || (tab.label ? tab.label.replace(/\s/g, '').toLowerCase() : Math.random().toString(36).substr(2, 9));
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
    }
  }
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
