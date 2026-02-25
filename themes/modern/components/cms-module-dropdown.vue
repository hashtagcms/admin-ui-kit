<template>
  <div class="inline-block">
    <split-button
      v-if="hasChild()"
      :data-options="allModules"
      @change="onChange"
      :data-parser="parseData"
      :data-selected="currentIndex"
      data-btn-css="bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30"
    >
      <span class="font-black tracking-tight uppercase text-[10px]">{{ selectedModule }}</span>
    </split-button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import { SafeJsonParse } from "../../../helpers/common";
import SplitButton from "./library/split-button.vue";

const props = defineProps(["dataModules", "dataCurrentModule"]);

const modules = ref(SafeJsonParse(props.dataModules, []));
const selectedModule = ref(
    typeof props.dataCurrentModule == "undefined"
        ? ""
        : props.dataCurrentModule
);

const allModules = computed(() => {
    let options = [...(modules.value.child || [])];
    options.unshift({
        name: modules.value.name,
        controller_name: modules.value.controller_name,
    });
    return options;
});

const currentIndex = computed(() => {
    if (allModules.value.length > 0) {
        for (var i = 0; i < allModules.value.length; i++) {
            var item = allModules.value[i];
            if (
                item.controller_name.toLowerCase() ==
                selectedModule.value.toLowerCase()
            ) {
                return i;
            }
        }
    }

    return 0;
});

const hasChild = () => {
    return modules.value.parent_id == 0 && allModules.value.length > 1;
};

const parseData = (row) => {
    return { label: row.name, value: row.controller_name };
};

const onChange = (data) => {
    let url = AdminConfig.admin_path(data.value);
    window.location = url;
};
</script>

