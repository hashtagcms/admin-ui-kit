<template>
  <select
    @click="init(true)"
    name="site_combo"
    class="form-select"
    id="site_combo"
    @change="setSite"
    v-model="currentSite"
  >
    <option v-for="site in sites" :value="site.id">
      {{ site.name }}
    </option>
  </select>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import SecureLS from "secure-ls";
import AdminConfig from "../../../helpers/admin-config";
import { SafeJsonParse } from "../../../helpers/common";

const props = defineProps(["dataSites", "dataCurrentSite", "dataSupportedSites", "dataIsAdmin"]);

// State
const sites = ref(SafeJsonParse(props.dataSites, []));
const currentSite = ref(
  props.dataCurrentSite === undefined ? 1 : parseInt(props.dataCurrentSite)
);
const supportedSite = ref(SafeJsonParse(props.dataSupportedSites, []));

// Methods
const init = (force = false) => {
  const ls = new SecureLS();
  const allSites = ls.get("allSites");

  if (allSites.length === 0 || force === true) {
    const siteController = AdminConfig.admin_path("site/getSitesForUsers");
    axios
      .get(siteController, { withCredentials: false })
      .then((response) => {
        sites.value = response.data;
        ls.set("allSites", JSON.stringify(sites.value));
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    sites.value = SafeJsonParse(allSites, []);
  }
};

const hasSites = () => sites.value != null && sites.value.length > 1;

const parseSite = (row) => ({ label: row.name, value: row.id });

const setSite = () => {
  const ajaxController = AdminConfig.admin_path(`ajax/setSiteId/${currentSite.value}`);
  axios
    .get(ajaxController)
    .then(() => {
      window.location.href = window.location.pathname;
    })
    .catch((error) => {
      console.error(error);
    });
};

onMounted(() => {
  init();
});
</script>

