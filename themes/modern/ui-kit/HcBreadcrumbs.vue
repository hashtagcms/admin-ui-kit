<template>
  <nav class="flex overflow-x-auto no-scrollbar py-2" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2 whitespace-nowrap">
      <li v-for="(item, index) in items" :key="index" class="flex items-center">
        <!-- Separator -->
        <div v-if="index > 0" class="mx-2 text-gray-300 font-light flex items-center">
          <slot name="separator">
            <i class="fa fa-chevron-right text-[8px]"></i>
          </slot>
        </div>

        <div class="flex items-center">
          <a
            v-if="item.href"
            :href="item.href"
            :class="[
              'text-[10px] font-black uppercase tracking-widest transition-all duration-300 hover:text-blue-600 hover:-translate-y-0.5 active:scale-95',
              index === items.length - 1 ? 'text-gray-900 pointer-events-none' : 'text-gray-400'
            ]"
          >
            <i v-if="item.icon" :class="[item.icon, 'mr-1.5']"></i>
            {{ item.label }}
          </a>
          <span
            v-else
            :class="[
              'text-[10px] font-black uppercase tracking-widest',
              index === items.length - 1 ? 'text-gray-900' : 'text-gray-400 font-bold'
            ]"
          >
            <i v-if="item.icon" :class="[item.icon, 'mr-1.5']"></i>
            {{ item.label }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'HcBreadcrumbs',
  props: {
    items: {
      type: Array, // [{ label: 'Home', href: '/', icon: 'fa fa-home' }]
      required: true
    }
  }
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
