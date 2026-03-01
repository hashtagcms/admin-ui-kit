<template>
  <div :class="ui.wrapper">
    <table :class="ui.table">
      <thead v-if="headers && headers.length" :class="ui.thead">
        <tr :class="ui.headerRow">
          <th v-for="header in headers" :key="header" :class="ui.headerCell">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody :class="ui.tbody">
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HcTable',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        wrapper: '',
        table: '',
        thead: '',
        headerRow: '',
        headerCell: '',
        tbody: ''
      })
    },
    headers: {
      type: Array,
      default: () => []
    }
  }
};
</script>
