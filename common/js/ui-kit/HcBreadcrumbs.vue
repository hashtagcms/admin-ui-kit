<template>
  <nav :class="ui.base" aria-label="Breadcrumb">
    <ol :class="ui.list">
      <li v-for="(item, index) in items" :key="index" :class="ui.item">
        <!-- Separator -->
        <div v-if="index > 0" :class="ui.separatorWrapper">
          <slot name="separator">
            <i :class="ui.separatorIcon"></i>
          </slot>
        </div>

        <div :class="ui.contentWrapper">
          <a
            v-if="item.href"
            :href="item.href"
            :class="[
              ui.link,
              index === items.length - 1 ? ui.activeLink : ui.inactiveLink
            ]"
          >
            <i v-if="item.icon" :class="[item.icon, ui.icon]"></i>
            {{ item.label }}
          </a>
          <span
            v-else
            :class="[
              ui.text,
              index === items.length - 1 ? ui.activeText : ui.inactiveText
            ]"
          >
            <i v-if="item.icon" :class="[item.icon, ui.icon]"></i>
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
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        base: '',
        list: '',
        item: '',
        separatorWrapper: '',
        separatorIcon: '',
        contentWrapper: '',
        link: '',
        activeLink: '',
        inactiveLink: '',
        text: '',
        activeText: '',
        inactiveText: '',
        icon: ''
      })
    },
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
