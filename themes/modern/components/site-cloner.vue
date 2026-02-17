<template>
  <div class="max-w-xl mx-auto space-y-8 py-4">
    <div class="bg-white shadow-lg rounded-lg border border-gray-100 overflow-hidden">
        <div class="px-10 py-8 border-b border-gray-100 bg-gray-50/50">
            <h2 class="text-2xl font-black text-gray-800 tracking-tight">Full Site Mirroring Tool</h2>
            <p class="text-sm text-gray-500 mt-1">Clone content, settings, and structure between sites</p>
        </div>

        <div class="p-10 space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-2">
                    <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Copy From (Source)</label>
                    <select class="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full px-5 py-4 outline-none transition-all shadow-sm cursor-pointer hover:border-blue-300" v-model="sourceSiteId">
                      <option value="">Select Origin Site</option>
                      <option v-for="site in allSites" :key="site.id" :value="site.id">
                        {{ getLabel(site) }}
                      </option>
                    </select>
                </div>

                <div class="space-y-2">
                    <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Copy To (Destination)</label>
                    <select class="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full px-5 py-4 outline-none transition-all shadow-sm cursor-pointer hover:border-blue-300" v-model="targetSiteId">
                      <option value="">Select Target Site</option>
                      <option v-for="site in allSites" :key="site.id" :value="site.id">
                        {{ getLabel(site) }}
                      </option>
                    </select>
                </div>
            </div>

            <!-- Feedback Section -->
            <div class="space-y-4">
                <div
                    v-show="errorMessage != '' && !isLoading"
                    class="bg-amber-50 border border-amber-100 text-amber-700 px-8 py-5 rounded-lg text-[11px] font-black shadow-sm flex items-center gap-4 animate-fadeIn"
                >
                  <i class="fa fa-exclamation-triangle text-amber-500 text-xl"></i>
                  <span>{{ errorMessage }}</span>
                </div>

                <div v-show="isLoading == 1" class="bg-blue-50 border border-blue-100 text-blue-700 px-8 py-5 rounded-lg text-[11px] font-black shadow-sm flex items-center gap-4 animate-pulse">
                    <i class="fa fa-spinner fa-spin text-xl"></i>
                    <span>Processing mirroring request... Please stay on this page.</span>
                </div>

                <div v-show="isLoading > 1" class="bg-gray-50/50 border border-gray-100 rounded-lg shadow-inner max-h-[300px] overflow-y-auto divide-y divide-gray-100/50 scrollbar-thin scrollbar-thumb-gray-200">
                    <div v-for="(msg, idx) in successMsg" :key="idx" class="px-6 py-4 text-[10px] flex items-center gap-4 transition-colors hover:bg-white">
                        <i v-if="msg.success !== false" class="fa fa-check-circle text-green-500 text-base"></i>
                        <i v-else class="fa fa-times-circle text-red-500 text-base"></i>
                        <span :class="msg.success === false ? 'text-red-600 font-black' : 'text-gray-600 font-bold'">{{ msg.message }}</span>
                    </div>
                </div>
            </div>

            <!-- Action Button -->
            <div class="pt-6">
                <button
                    @click="doAction()"
                    type="button"
                    class="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-lg shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-95 text-lg uppercase tracking-widest"
                >
                    Initialize Copy
                </button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import AdminConfig from "../../../helpers/admin-config";

import { Toast, SafeJsonParse } from "../../../helpers/common";

export default {
  mounted() {
    //console.log(this.allData);
    //  console.log(this.allData.data[0]);
    //console.log(this.cuurent);
    // this.initData();
  },
  created() {
    //this.initData();
  },

  props: ["dataAllSites"],
  data() {
    return {
      allSites: SafeJsonParse(this.dataAllSites, []),
      sourceSiteId: "",
      targetSiteId: "",
      isLoading: false,
      errorMsg: "",
      successMsg: [],
    };
  },
  computed: {
    errorMessage() {
      return this.errorMsg === ""
        ? "It's undoable. Please be careful."
        : this.errorMsg;
    },
  },
  methods: {
    getLabel(data) {
      var label = "";
      if (data.name || data.alias) {
        label = data.name || data.alias;
      } else if (data.lang) {
        label = typeof data.lang.name == "undefined" ? "" : data.lang.name;
      }
      return label;
    },
    loading(isLoading) {
      this.isLoading = isLoading;
    },
    cloneSite() {
      console.log("copying now...");
      //console.log(allData, seletedData, ids);
      //get all from
      this.loading(1);
      let $this = this;
      let postData = {
        sourceSiteId: this.sourceSiteId,
        tagetSiteId: this.targetSiteId,
      };

      let url = AdminConfig.admin_path("site/cloneSite");
      axios
        .post(url, postData)
        .then((response) => {
          console.log(response);
          feedback(response);
          this.loading(2);
        })
        .catch((error) => {
          console.log("Error: ", error.response);
          $this.errorMsg = error.response ? error.response.data.message : error.message;
          this.loading(0);
        });

      function feedback(response) {
        let data = response.data;
        $this.successMsg = data;
      }
    },
    doAction() {
      this.cloneSite();
    },
  },
};
</script>
