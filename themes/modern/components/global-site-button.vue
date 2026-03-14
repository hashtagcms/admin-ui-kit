<template>
  <div class="relative min-w-[180px]">
    <div v-if="setupError" style="font-size:16px; color:red; padding: 20px; background:white; z-index:999999; position:fixed; top:0; left:0; width:100%;">
        SETUP ERROR: {{ setupError }}
    </div>
    <hc-select
      v-else
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
import axios from "axios";

const props = defineProps(["dataSites", "dataCurrentSite", "dataSupportedSites", "dataIsAdmin"]);

const setupError = ref("");
let sites = ref([]);
let currentSite = ref(1);
let supportedSite = ref([]);
let parsedSites = computed(() => []);
let hasSites = () => false;

try {
  sites.value = SafeJsonParse(props.dataSites, []);
  currentSite.value = props.dataCurrentSite == "undefined" ? 1 : parseInt(props.dataCurrentSite);
  supportedSite.value = SafeJsonParse(props.dataSupportedSites, []);

  parsedSites = computed(() => {
    let s = sites.value;
    if (!Array.isArray(s)) s = [];
    return s.map(site => ({
      value: site.id,
      label: site.name
    }));
  });

  hasSites = () => {
      return Array.isArray(sites.value) && sites.value.length > 1;
  };
} catch (e) {
  setupError.value = e.toString() + "\n" + e.stack;
}

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

