<template>
  <div class="inline-block">
    <split-button
      v-if="hasLanguage()"
      :data-options="dataLanguages"
      @change="setLanguage"
      :data-parser="parseLang"
      :data-selected="currentIndex"
      data-btn-css="bg-white border border-gray-200 text-gray-700 hover:border-blue-300 shadow-sm h-10 px-5"
    >
      <div class="flex items-center gap-2 px-1">
          <i class="fa fa-globe text-[10px] text-gray-400"></i>
          <span class="font-black text-[10px] uppercase tracking-widest">Switch Language</span>
      </div>
    </split-button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import { SafeJsonParse } from "../../../helpers/common";
import SplitButton from "./library/split-button.vue";

const props = defineProps(["dataLanguages", "dataSelectedLanguage"]);

const languages = ref(SafeJsonParse(props.dataLanguages, null));
const currentLang = ref(
  props.dataSelectedLanguage == "undefined"
    ? 1
    : parseInt(props.dataSelectedLanguage)
);

const currentIndex = computed(() => {
  if (languages.value != null) {
    for (let i = 0; i < languages.value.length; i++) {
      let item = languages.value[i];

      if (item.id == currentLang.value) {
        return i;
      }
    }
  }
  return 0;
});

const hasLanguage = () => {
  return languages.value != null && languages.value.length > 1;
};

const parseLang = (row) => {
  return { label: row.name, value: row.id };
};

const setLanguage = (data) => {
  let ajaxController = AdminConfig.admin_path(
    `ajax/setLanguage/${data.value}`
  );

  axios
    .get(ajaxController)
    .then(function (response) {
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
};
</script>

