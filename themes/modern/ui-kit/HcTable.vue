<template>
  <div class="overflow-hidden bg-white rounded-lg border border-gray-100 shadow-md">
    <table class="w-full text-left border-collapse">
      <thead v-if="headers && headers.length">
        <tr class="bg-gray-50/50 border-b border-gray-100">
          <th v-for="header in headers" :key="header" class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-50 text-[11px] font-bold text-gray-700">
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HcTable',
  props: {
    headers: {
      type: Array,
      default: () => []
    }
  }
};
</script>
