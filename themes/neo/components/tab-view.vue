<template>
  <ul role="tablist" class="nav nav-tabs flex-nowrap overflow-x-auto no-scrollbar">
    <li
      v-for="(tab, index) in tabs"
      :key="index"
      role="presentation"
      class="nav-item flex-shrink-0"
      @click="moveToTab(tab)"
    >
      <a 
        :href="getTabHref(tab)" 
        class="nav-link whitespace-nowrap"
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

<script setup>
import { computed } from "vue";
import { SafeJsonParse } from "../../../helpers/common";

const props = defineProps({
  // Array of tabs - can be strings or objects with {label, id, href}
  // Can also be a JSON string that will be parsed
  dataTabs: {
    type: [Array, String],
    required: true,
    default: () => [],
  },
  // Currently active tab (string or object)
  dataActiveTab: {
    type: [String, Object],
    default: null,
  },
  // Base URL for generating hrefs (optional)
  dataBaseUrl: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["tab-change"]);

// Computed
const tabs = computed(() => SafeJsonParse(props.dataTabs, []));
const activeTab = computed(() => props.dataActiveTab);
const baseUrl = computed(() => props.dataBaseUrl);

// Methods
const getTabId = (tab) => {
  if (typeof tab === "string") {
    return tab.replace(/\s/g, "").toLowerCase();
  }
  return tab.id || tab.label.replace(/\s/g, "").toLowerCase();
};

const getTabLabel = (tab) => {
  return typeof tab === "string" ? tab : tab.label;
};

const getTabHref = (tab) => {
  if (typeof tab === "object" && tab.href) {
    return tab.href;
  }
  if (baseUrl.value) {
    return `${baseUrl.value}/${getTabId(tab)}`;
  }
  return `#${getTabId(tab)}`;
};

const isActive = (tab) => {
  const tabId = getTabId(tab);
  const activeId = activeTab.value
    ? typeof activeTab.value === "string"
      ? activeTab.value.replace(/\s/g, "").toLowerCase()
      : getTabId(activeTab.value)
    : null;
  return tabId === activeId;
};

const moveToTab = (tab) => {
  emit("tab-change", tab);
  window.location.href = getTabHref(tab);
};

const selectTab = (tab) => {
  emit("tab-change", tab);
};
</script>


<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
