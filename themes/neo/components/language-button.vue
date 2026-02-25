<template>
  <split-button
    v-if="hasLanguage()"
    :data-options="dataLanguages"
    @change="setLanguage"
    :data-parser="parseLang"
    :data-selected="currentIndex"
    data-btn-css="lang"
    >English</split-button
  >
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import AdminConfig from "../../../helpers/admin-config";
import { SafeJsonParse } from "../../../helpers/common";
import SplitButton from "./library/split-button.vue";

const props = defineProps(["dataLanguages", "dataSelectedLanguage"]);

// State
const languages = ref(SafeJsonParse(props.dataLanguages, null));
const currentLang = ref(
  props.dataSelectedLanguage === undefined ? 1 : parseInt(props.dataSelectedLanguage)
);

// Computed
const currentIndex = computed(() => {
  if (languages.value != null) {
    for (let i = 0; i < languages.value.length; i++) {
      if (languages.value[i].id == currentLang.value) {
        return i;
      }
    }
  }
  return 0;
});

// Methods
const hasLanguage = () => languages.value != null && languages.value.length > 1;

const parseLang = (row) => ({ label: row.name, value: row.id });

const setLanguage = (data) => {
  const ajaxController = AdminConfig.admin_path(`ajax/setLanguage/${data.value}`);
  axios
    .get(ajaxController)
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>

