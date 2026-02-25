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

<script setup>
import { ref } from "vue";
import { EventBus } from "../../../helpers/event-bus";
import { SafeJsonParse } from "../../../helpers/common";

const props = defineProps(["dataName", "dataId", "dataSites", "dataSelected"]);

const sites = ref(SafeJsonParse(props.dataSites, []));
const selected = ref(
  typeof props.dataSelected === "undefined" ? 1 : parseInt(props.dataSelected)
);
const name = ref(typeof props.dataName === "undefined" ? "site_id" : props.dataName);
const id = ref(typeof props.dataId === "undefined" ? "site_id" : props.dataId);

const setSite = () => {
  EventBus.emit("site_changed", selected.value);
};
</script>

