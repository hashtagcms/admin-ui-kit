<template>
  <div class="w-full">
    <!-- Tab Headers -->
    <div class="border-b border-gray-100 mb-6">
      <ul class="flex flex-nowrap overflow-x-auto no-scrollbar -mb-px">
        <li v-for="tab in tabs" :key="tab.id" class="mr-6 flex-shrink-0">
          <button 
            @click="activeId = tab.id"
            :class="[
              'py-4 px-1 border-b-[3px] text-[11px] font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95',
              activeId === tab.id 
                ? 'border-blue-600 text-blue-600 rounded-t-sm' 
                : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200'
            ]"
          >
            {{ tab.label }}
          </button>
        </li>
      </ul>
    </div>

    <!-- Tab Content -->
    <div class="relative min-h-[100px]">
      <div 
        v-for="tab in tabs" 
        :key="tab.id"
        v-show="activeId === tab.id"
        class="animate-in fade-in slide-in-from-bottom-2 duration-300"
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
  }
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
