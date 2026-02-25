<template>
  <div class="relative min-w-[180px]">
    <select
      @click="init(true)"
      name="site_combo"
      id="site_combo"
      @change="setSite"
      v-model="currentSite"
      class="bg-white border border-gray-200 text-gray-700 text-[11px] font-black uppercase tracking-widest rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full px-4 py-2.5 outline-none transition-all shadow-sm cursor-pointer hover:border-blue-300"
    >
      <option v-for="site in sites" :key="site.id" :value="site.id">
        {{ site.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import { SafeJsonParse } from "../../../helpers/common";
import SplitButton from "./library/split-button.vue";
import SecureLS from "secure-ls";

const props = defineProps(["dataSites", "dataCurrentSite", "dataSupportedSites", "dataIsAdmin"]);

const sites = ref(SafeJsonParse(props.dataSites, []));
const currentSite = ref(
  props.dataCurrentSite == "undefined"
    ? 1
    : parseInt(props.dataCurrentSite)
);
const supportedSite = ref(SafeJsonParse(props.dataSupportedSites, []));

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

