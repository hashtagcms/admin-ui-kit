<template>
  <div>
    <select :name="name" :id="id" @change="setSite" v-model="selected">
      <option value="">Select Site</option>
      <option v-for="site in sites" :value="site.id">
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

// State
const sites = ref(SafeJsonParse(props.dataSites, []));
const selected = ref(typeof props.dataSelected === "undefined" ? 1 : parseInt(props.dataSelected));
const name = ref(typeof props.dataName === "undefined" ? "site_id" : props.dataName);
const id = ref(typeof props.dataId === "undefined" ? "site_id" : props.dataId);

// Methods
const setSite = () => {
  EventBus.emit("site_changed", selected.value);
};
</script>

