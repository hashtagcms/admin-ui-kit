<template>
  <div class="relative min-w-[180px]">
    <hc-select
      @click="init(true)"
      name="site_combo"
      id="site_combo"
      @change="setSite"
      v-model="currentSite"
      :options="parsedSites"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import { SafeJsonParse } from "../../../helpers/common";
import HcSelect from "../ui-kit/HcSelect.vue";
import SecureLS from "secure-ls";

const props = defineProps(["dataSites", "dataCurrentSite", "dataSupportedSites", "dataIsAdmin"]);

const sites = ref(SafeJsonParse(props.dataSites, []));
const currentSite = ref(
  props.dataCurrentSite == "undefined"
    ? 1
    : parseInt(props.dataCurrentSite)
);
const supportedSite = ref(SafeJsonParse(props.dataSupportedSites, []));

const parsedSites = computed(() => {
  return sites.value.map(site => ({
    value: site.id,
    label: site.name
  }));
});

const init = (force = false) => {
  let ls = new SecureLS();
  let allSites = ls.get("allSites");

  if (allSites.length === 0 || force === true) {
    let siteController = AdminConfig.admin_path(`site/getSitesForUsers`);
    axios
      .get(siteController, { withCredentials: false })
      .then(function (response) {
        sites.value = response.data;

        ls.set("allSites", JSON.stringify(sites.value));
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    sites.value = SafeJsonParse(allSites, []);
  }
};

const hasSites = () => {
    return sites.value != null && sites.value.length > 1;
};

const parseSite = (row) => {
    return { label: row.name, value: row.id };
};

const setSite = () => {
    let ajaxController = AdminConfig.admin_path(
        `ajax/setSiteId/${currentSite.value}`
    );
    axios
        .get(ajaxController)
        .then(function (response) {
            window.location.href = window.location.pathname;
        })
        .catch(function (error) {
            console.log(error);
        });
};

onMounted(() => {
    init();
});
</script>

