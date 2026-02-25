<template>
  <div class="w-full">
    <!-- Using HcTabs visual structure for consistency -->
    <div class="border-b border-gray-100 mb-6">
      <ul role="tablist" class="flex flex-nowrap overflow-x-auto no-scrollbar -mb-px">
        <li v-for="(tab, index) in tabs" :key="getTabId(tab)" role="presentation" class="mr-6 flex-shrink-0">
          <a
            ref="tabRefs"
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

<script setup>
import { computed, ref, onMounted, watch, nextTick } from "vue";
import { SafeJsonParse } from "../../../helpers/common";

const tabRefs = ref([]);


const props = defineProps({
  dataTabs: {
    type: [Array, String],
    required: true,
    default: () => [],
  },
  dataActiveTab: {
    type: [String, Object],
    default: null,
  },
  dataBaseUrl: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["tab-change"]);

const tabs = computed(() => {
  return SafeJsonParse(props.dataTabs, []);
});

const activeTab = computed(() => {
  return props.dataActiveTab;
});

const baseUrl = computed(() => {
  return props.dataBaseUrl;
});

const getTabId = (tab) => {
  if (typeof tab === "string") {
    return tab.replace(/\s/g, "").toLowerCase();
  }
  return (
    tab.id ||
    (tab.label
      ? tab.label.replace(/\s/g, "").toLowerCase()
      : Math.random().toString(36).substr(2, 9))
  );
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
  const href = getTabHref(tab);
  emit("tab-change", tab);
  if (href && href !== "#" && !href.startsWith("javascript")) {
    window.location.href = href;
  }
};

const scrollToActiveTab = () => {
  nextTick(() => {
    const activeIndex = tabs.value.findIndex((tab) => isActive(tab));
    if (activeIndex === -1) return;

    const el = tabRefs.value[activeIndex];
    if (!el) return;

    // Scroll only the tab bar horizontally — never affect the page's vertical scroll
    const tabBar = el.closest('ul');
    if (tabBar) {
      const elLeft   = el.offsetLeft;
      const elWidth  = el.offsetWidth;
      const barWidth = tabBar.offsetWidth;
      // Center the active tab within the scrollable strip
      tabBar.scrollLeft = elLeft - barWidth / 2 + elWidth / 2;
    }
  });
};

watch(
  () => props.dataActiveTab,
  () => {
    scrollToActiveTab();
  }
);

watch(
  () => tabs.value,
  () => {
    scrollToActiveTab();
  },
  { deep: true }
);

onMounted(() => {
  scrollToActiveTab();
});
</script>


<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
