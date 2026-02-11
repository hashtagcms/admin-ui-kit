<template>
  <div class="relative group">
    <select
      :name="name"
      :id="id"
      @change="setSite"
      v-model="selected"
      class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-2.5 outline-none transition-all shadow-sm cursor-pointer hover:border-blue-300"
    >
      <option value="">Select Target Site</option>
      <option v-for="site in sites" :key="site.id" :value="site.id">
        {{ site.name }}
      </option>
    </select>
  </div>
</template>

<script>
import SplitButton from "./library/split-button.vue";
import { EventBus } from "@hashtagcms/helpers/event-bus";

export default {
  components: {
    "split-button": SplitButton,
  },
  props: ["dataName", "dataId", "dataSites", "dataSelected"],
  mounted() {
    //this.init();
  },
  data() {
    return {
      sites:
        typeof this.dataSites === "undefined" ? [] : JSON.parse(this.dataSites),
      selected:
        typeof this.dataSelected === "undefined"
          ? 1
          : parseInt(this.dataSelected),
      name: typeof this.dataName === "undefined" ? "site_id" : this.dataName,
      id: typeof this.dataId === "undefined" ? "site_id" : this.dataId,
    };
  },
  methods: {
    setSite() {
      EventBus.$emit("site_changed", this.selected);
    },
  },
};
</script>
