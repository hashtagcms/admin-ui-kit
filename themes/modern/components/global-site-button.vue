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

<script>
import AdminConfig from "../../../helpers/admin-config";
import { SafeJsonParse } from "../../../helpers/common";
import SplitButton from "./library/split-button.vue";

import SecureLS from "secure-ls";

export default {
  components: {
    "split-button": SplitButton,
  },
  props: ["dataSites", "dataCurrentSite", "dataSupportedSites", "dataIsAdmin"],
  mounted() {
    this.init();
  },
  data() {
    return {
      sites: SafeJsonParse(this.dataSites, []),
      currentSite:
        typeof this.dataCurrentSite == "undefined"
          ? 1
          : parseInt(this.dataCurrentSite),
      supportedSite: SafeJsonParse(this.dataSupportedSites, []),
    };
  },
  methods: {
    init(force = false) {
      let $this = this;
      //$this.sites = [{name:"Please wait...", id:0}];
      let ls = new SecureLS();
      let allSites = ls.get("allSites");

      if (allSites.length === 0 || force === true) {
        let siteController = AdminConfig.admin_path(`site/getSitesForUsers`);
        axios
          .get(siteController, { withCredentials: false })
          .then(function (response) {
            $this.sites = response.data;

            ls.set("allSites", JSON.stringify($this.sites));
            //  $this.$refs.site_combo.setData($this.sites);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        $this.sites = SafeJsonParse(allSites, []);
      }
    },
    hasSites() {
      //has language greater than one
      return this.sites != null && this.sites.length > 1;
    },
    parseSite: function (row) {
      // console.log("parseSite");
      //console.log(row);
      return { label: row.name, value: row.id };
    },
    setSite(data) {
      let ajaxController = AdminConfig.admin_path(
        `ajax/setSiteId/${this.currentSite}`,
      );
      axios
        .get(ajaxController)
        .then(function (response) {
          //console.log(response);
          //window.location.reload();
          window.location.href = window.location.pathname;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
