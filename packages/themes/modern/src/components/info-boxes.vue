<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <template v-for="(module, index) in allModules">
      <div
        v-if="hasAccess(module.id)"
        :key="module.name + index"
        class="group cursor-pointer transition-all duration-300 hover:-translate-y-2"
        @click="navigate(module)"
        :title="module.name"
      >
        <info-box
          :data-title="module.name"
          :data-sub-title="module.sub_title"
          :data-icon-css="module.icon_css"
          class="h-full border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all rounded-lg overflow-hidden"
        >
        </info-box>
      </div>
    </template>
  </div>
</template>

<script>
import AdminConfig from "@hashtagcms/helpers/admin-config";

import InfoBox from "./library/info-box.vue";

export default {
  components: {
    "info-box": InfoBox,
  },
  mounted() {
    //console.log(this.modulesAllowed);
    //
  },
  props: ["dataModules", "dataModulesAllowed", "dataIsAdmin"],
  data() {
    return {
      modulesAllowed: this.dataModulesAllowed
        ? JSON.parse(this.dataModulesAllowed)
        : [],
    };
  },
  computed: {
    allModules() {
      let modules =
        typeof this.dataModules == "undefined"
          ? []
          : JSON.parse(this.dataModules);
      return modules.child;
    },
  },
  methods: {
    navigate(current) {
      window.location = AdminConfig.admin_path(current.controller_name);
    },
    hasAccess(module_id) {
      if (this.dataIsAdmin.toString() == "1") {
        return true;
      }
      for (let i = 0; i < this.modulesAllowed.length; i++) {
        let current = this.modulesAllowed[i];
        if (current.module_id == module_id) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>
