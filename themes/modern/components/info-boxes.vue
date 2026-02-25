<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <template v-for="(module, index) in allModules" >
      <a
        v-if="hasAccess(module.id)"
        :key="module.name + index"
        :href="getLink(module)"
        class="group block transition-all duration-300 hover:-translate-y-2"        
        :title="module.name"
      >
        <info-box
          :data-title="module.name"
          :data-sub-title="module.sub_title"
          :data-icon-css="module.icon_css"
          :data-color-index="index + 1"
          class="h-full"
        >
        </info-box>
      </a>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import { SafeJsonParse } from "../../../helpers/common";
import InfoBox from "./library/info-box.vue";

const props = defineProps(["dataModules", "dataModulesAllowed", "dataIsAdmin"]);

const modulesAllowed = ref(SafeJsonParse(props.dataModulesAllowed, []));

const allModules = computed(() => {
  let modules = SafeJsonParse(props.dataModules, []);
  return modules.child || [];
});

const getLink = (current) => {
  return AdminConfig.admin_path(current.controller_name);
};

const hasAccess = (module_id) => {
  if (props.dataIsAdmin.toString() == "1") {
    return true;
  }
  for (let i = 0; i < modulesAllowed.value.length; i++) {
    let current = modulesAllowed.value[i];
    if (current.module_id == module_id) {
      return true;
    }
  }
  return false;
};
</script>

