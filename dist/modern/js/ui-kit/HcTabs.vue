<template>
  <div :class="ui.wrapper">
    <!-- Tab Headers -->
    <div :class="ui.headerContainer">
      <ul :class="ui.tabList">
        <li v-for="tab in tabs" :key="tab.id" :class="ui.tabItem">
          <button 
            ref="tabButtons"
            @click="activeId = tab.id"
            :class="[
              ui.tabButton,
              activeId === tab.id ? ui.activeTab : ui.inactiveTab
            ]"
          >
            {{ tab.label }}
          </button>
        </li>
      </ul>
    </div>

    <!-- Tab Content -->
    <div :class="ui.contentContainer">
      <div 
        v-for="tab in tabs" 
        :key="tab.id"
        v-show="activeId === tab.id"
        :class="ui.contentPanel"
      >
        <slot :name="tab.id">{{ tab.content }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HcTabs',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        wrapper: '',
        headerContainer: '',
        tabList: '',
        tabItem: '',
        tabButton: '',
        activeTab: '',
        inactiveTab: '',
        contentContainer: '',
        contentPanel: ''
      })
    },
    tabs: {
      type: Array,
      required: true,
      // Expected: [{ id: 'general', label: 'General', content: '...' }]
    },
    initialTab: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeId: this.initialTab || (this.tabs.length ? this.tabs[0].id : '')
    };
  },
  watch: {
    activeId() {
      this.scrollToActiveTab();
    },
    tabs: {
      handler() {
        this.$nextTick(() => this.scrollToActiveTab());
      },
      deep: true
    }
  },
  mounted() {
    this.scrollToActiveTab();
  },
  methods: {
    scrollToActiveTab() {
      this.$nextTick(() => {
        const index = this.tabs.findIndex(t => t.id === this.activeId);
        if (index !== -1 && this.$refs.tabButtons && this.$refs.tabButtons[index]) {
          this.$refs.tabButtons[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
