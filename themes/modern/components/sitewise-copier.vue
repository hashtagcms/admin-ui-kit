<template>
  <div class="space-y-6">
    <div class="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 transition-all hover:border-gray-200">
        <div class="flex items-center gap-4">
             <div class="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
                 <i class="fa fa-copy text-lg"></i>
             </div>
             <div>
                 <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-1.5">Source Filter</h3>
                 <p class="text-xs text-gray-500 font-bold">Select the site to migrate data from</p>
             </div>
        </div>
        
        <div class="w-full md:w-80">
          <select
            class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full px-5 py-3 outline-none transition-all shadow-sm cursor-pointer hover:border-blue-300 font-bold"
            @change="getBySite()"
            v-model="currentSite"
          >
            <option value="">Select Origin Context...</option>
            <option v-for="site in allSites" :key="site.id" :value="site.id">
              {{ getLabel(site) }}
            </option>
          </select>
        </div>
    </div>

    <div class="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden min-h-[400px]">
        <site-wise
          ref="siteWiseComponent"
          :data-message="dataMessage"
          :data-site-data="JSON.stringify(siteData)"
          :data-all-data="JSON.stringify(allData)"
          :data-current-key="currentKey"
          :data-site-id="siteId"
          :data-default-action-for-save="doAction"
          :data-alert-css="dataAlertCss"
        >
        </site-wise>
    </div>
  </div>
</template>

<script>
import AdminConfig from "../../../helpers/admin-config";

import { Toast, Loader, SafeErrorData, SafeJsonParse } from "../../../helpers/common";
import SiteWiseData from "./sitewise-data.vue";

export default {
  mounted() {
    //console.log(this.allData);
    //  console.log(this.allData.data[0]);
    //console.log(this.cuurent);
    // this.initData();
  },
  components: {
    "site-wise": SiteWiseData,
  },
  created() {
    //this.initData();
  },

  props: [
    "dataAllSites",
    "dataMessage",
    "dataAllData",
    "dataSiteData",
    "dataCurrentKey",
    "dataSiteId",
    "dataAlertCss",
    "dataControllerName",
  ],
  data() {
    return {
      allSites: SafeJsonParse(this.dataAllSites, []),
      siteData: SafeJsonParse(this.dataSiteData, []),
      allData: SafeJsonParse(this.dataAllData, []),
      currentKey: this.dataCurrentKey,
      searchKey: "",
      siteId: parseInt(this.dataSiteId),
      currentSite: "",
      controllerName:
        typeof this.dataControllerName === "undefined"
          ? "site"
          : this.dataControllerName,
    };
  },
  methods: {
    showHdeLoader: function (show) {
      if (show) {
        Loader.show(this, "Please wait...");
      } else {
        Loader.hide(this);
      }
    },
    saveNow(url, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(url, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(SafeErrorData(error));
          });
      });
    },
    getLabel(data) {
      let label = "";
      if (data.name || data.alias) {
        label = data.name || data.alias;
      } else if (data.lang) {
        label = typeof data.lang.name == "undefined" ? "" : data.lang.name;
      }
      return label;
    },
    populateData(data) {
      this.allData = data;
      //console.log("this.$refs.siteWiseComponent ",this.$refs.siteWiseComponent);
      this.$refs.siteWiseComponent.setData("data", data);
    },
    getBySite() {
      if (this.currentSite !== "") {
        let what = this.currentKey;
        let url = AdminConfig.admin_path(
          this.controllerName + "/getBySite/" + this.currentSite + "/" + what,
        );
        this.showHdeLoader(true);
        axios
          .get(url)
          .then((response) => {
            this.populateData(response.data);
          })
          .catch((error) => {
            console.error('getBySite error:', SafeErrorData(error));
          })
          .finally(() => {
            this.showHdeLoader(false);
          });
      } else {
        this.populateData([]);
      }
    },
    actionAdd(allData, seletedData, ids) {
      console.log("copying now...");
      //console.log(allData, seletedData, ids);
      //get all from
      let $this = this;
      let postData = {
        fromSite: {
          site_id: this.currentSite,
          data: seletedData,
        },
        toSite: { site_id: this.siteId },
        type: this.currentKey,
      };
      this.showHdeLoader(true);
      let url = AdminConfig.admin_path(this.controllerName + "/copySettings");
      axios
        .post(url, postData)
        .then((response) => {
          console.log(response);
          feedback(response);
        })
        .catch((error) => {
          console.error('actionAdd error:', SafeErrorData(error));
        })
        .finally(() => {
          this.showHdeLoader(false);
        });

      function feedback(response) {
        let data = response.data;
        //console.log("data.inserted ",data.inserted);
        if (data.inserted === false) {
          Toast.show($this, data.message || "Nothing happened.", 5000);
        } else {
          let ignored = data.ignored;
          let copied = data.copied;
          $this.$refs.siteWiseComponent.setSiteData(data.siteData);

          //Showing some manners - giving feedback
          let msg = `${copied.length} Copied and ${ignored.length} ignored. Open console for details`;
          Toast.show($this, msg, 7000);
          console.info("Copied: ", copied);
          console.info("Ignored: ", ignored);
        }
      }
    },
    actionRemove(allData, seletedData, ids) {
      let site_id = seletedData.length > 0 ? seletedData[0].site_id : null;

      if (site_id === null) {
        return false;
      }

      let $this = this;
      let postData = {
        site_id: site_id,
        ids: ids,
        type: this.currentKey,
      };

      let url = AdminConfig.admin_path(this.controllerName + "/removeSettings");
      this.showHdeLoader(true);
      axios
        .post(url, postData)
        .then((response) => {
          feedback(response);
        })
        .catch((error) => {
          console.error('actionRemove error:', SafeErrorData(error));
        })
        .finally(() => {
          this.showHdeLoader(false);
        });

      function feedback(response) {
        //console.log(response);
        let data = response.data;
        if (data.deleted === 0) {
          Toast.show($this, "Sorry!, Somehow it's not deleted.", 5000);
        }
        $this.$refs.siteWiseComponent.setSiteData(data.siteData);
      }
    },
    doAction(action, allData, seletedData, ids) {
      if (action === "add") {
        this.actionAdd(allData, seletedData, ids);
      } else {
        this.actionRemove(allData, seletedData, ids);
      }
    },
  },
};
</script>
