<template>
  <template v-for="(module, index) in allModules">
    <div
      v-if="hasAccess(module.id)"
      class="col-auto hand"
      @click="navigate(module)"
      :title="module.name"
    >
      <info-box
        :key="module.name + index"
        :data-title="module.name"
        :data-sub-title="module.sub_title"
        :data-icon-css="module.icon_css"
        :data-color-index="index + 1"
      >
      </info-box>
    </div>
  </template>
</template>

<script setup>
import { computed, ref } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import { SafeJsonParse } from "../../../helpers/common";
import InfoBox from "./library/info-box.vue";

const props = defineProps(["dataModules", "dataModulesAllowed", "dataIsAdmin"]);

// State
const modulesAllowed = ref(SafeJsonParse(props.dataModulesAllowed, []));

// Computed
const allModules = computed(() => {
  const modules = SafeJsonParse(props.dataModules, []);
  return modules.child || [];
});

// Methods
const navigate = (current) => {
  window.location = AdminConfig.admin_path(current.controller_name);
};

const hasAccess = (module_id) => {
  if (props.dataIsAdmin.toString() === "1") {
    return true;
  }
  for (let i = 0; i < modulesAllowed.value.length; i++) {
    if (modulesAllowed.value[i].module_id == module_id) {
      return true;
    }
  }
  return false;
};
</script>

