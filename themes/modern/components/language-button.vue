<template>
  <div v-if="hasLanguage()" class="inline-block relative min-w-[150px]">
    <hc-select
      :options="parsedLanguages"
      v-model="currentLang"
      @update:modelValue="setLanguage"
      size="md"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import { SafeJsonParse } from "../../../helpers/common";
import HcSelect from "../ui-kit/HcSelect.vue";

const props = defineProps(["dataLanguages", "dataSelectedLanguage"]);

const languages = ref(SafeJsonParse(props.dataLanguages, null));
const currentLang = ref(
  props.dataSelectedLanguage == "undefined"
    ? 1
    : parseInt(props.dataSelectedLanguage)
);

const parsedLanguages = computed(() => {
  if (!languages.value) return [];
  return languages.value.map(lang => ({
    label: lang.name,
    value: lang.id
  }));
});

const hasLanguage = () => {
  return languages.value != null && languages.value.length > 1;
};

const setLanguage = (value) => {
  let ajaxController = AdminConfig.admin_path(
    `ajax/setLanguage/${value}`
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

