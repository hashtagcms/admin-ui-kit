<template>
  <split-button
    v-if="hasChild()"
    :data-options="allModules"
    @change="onChange"
    :data-parser="parseData"
    :data-selected="currentIndex"
    data-btn-css="btn-success"
  >
    {{ selectedModule }}
  </split-button>
</template>

<script setup>
import { ref, computed } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import { SafeJsonParse } from "../../../helpers/common";
import SplitButton from "./library/split-button.vue";

const props = defineProps(["dataModules", "dataCurrentModule"]);

// State
const modules = ref(SafeJsonParse(props.dataModules, []));
const selectedModule = ref(props.dataCurrentModule === undefined ? "" : props.dataCurrentModule);

// Computed
const allModules = computed(() => {
  const options = [...(modules.value.child || [])];
  options.splice(0, 0, {
    name: modules.value.name,
    controller_name: modules.value.controller_name,
  });
  return options;
});

const currentIndex = computed(() => {
  if (allModules.value.length > 0) {
    for (let i = 0; i < allModules.value.length; i++) {
      const item = allModules.value[i];
      if (item.controller_name.toLowerCase() === selectedModule.value.toLowerCase()) {
        return i;
      }
    }
  }
  return 0;
});

// Methods
const hasChild = () => modules.value.parent_id == 0 && allModules.value.length > 1;

const parseData = (row) => ({ label: row.name, value: row.controller_name });

const onChange = (data) => {
  const url = AdminConfig.admin_path(data.value);
  window.location = url;
};
</script>

