<template>
  <div class="space-y-6">
    <div
      class="bg-white p-6 rounded-lg border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 transition-all hover:border-gray-200">
      <div class="flex items-center gap-4">
        <div
          class="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
          <i class="fa fa-copy text-lg"></i>
        </div>
        <div>
          <p class="text-xs text-gray-500 font-bold">Select the site to migrate data from</p>
          <p class="text-xs text-gray-500 font-bold mt-2">
            <select
              class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full px-5 py-3 outline-none transition-all shadow-sm cursor-pointer hover:border-blue-300 font-bold"
              @change="getBySite()" v-model="currentSite">
              <option value="">Select a Site</option>
              <option v-for="site in allSites" :key="site.id" :value="site.id">
                {{ getLabel(site) }}
              </option>
            </select>
          </p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg border border-gray-100 overflow-hidden min-h-[400px] p-2">
      <SiteWiseData ref="siteWiseComponent" :data-message="dataMessage" :data-site-data="JSON.stringify(siteData)"
        :data-all-data="JSON.stringify(allData)" :data-current-key="currentKey" :data-site-id="siteId"
        :data-default-action-for-save="doAction" :data-alert-css="dataAlertCss">
      </SiteWiseData>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import { Toast, Loader, SafeErrorData, SafeJsonParse } from "../../../helpers/common";
import SiteWiseData from "./sitewise-data.vue";

const props = defineProps([
  "dataAllSites",
  "dataMessage",
  "dataAllData",
  "dataSiteData",
  "dataCurrentKey",
  "dataSiteId",
  "dataAlertCss",
  "dataControllerName",
]);

const instance = getCurrentInstance();
const siteWiseComponent = ref(null);

// State
const siteId = ref(parseInt(props.dataSiteId));
const allSites = ref(SafeJsonParse(props.dataAllSites, []).filter((s) => s.id !== siteId.value));
const siteData = ref(SafeJsonParse(props.dataSiteData, []));
const allData = ref(SafeJsonParse(props.dataAllData, []));
const currentKey = ref(props.dataCurrentKey);
const searchKey = ref("");
const currentSite = ref("");
const controllerName = ref(typeof props.dataControllerName === "undefined" ? "site" : props.dataControllerName);

// Methods
const showHdeLoader = (show) => {
  if (show) {
    Loader.show(instance.proxy, "Please wait...");
  } else {
    Loader.hide(instance.proxy);
  }
};

const getLabel = (data) => {
  let label = "";
  if (data.name || data.alias) {
    label = data.name || data.alias;
  } else if (data.lang) {
    label = typeof data.lang.name === "undefined" ? "" : data.lang.name;
  }
  return label;
};

const populateData = (data) => {    
  allData.value = data;
  if (siteWiseComponent.value) {
    siteWiseComponent.value.setData("data", data);
  }
};

const getBySite = () => {
  if (currentSite.value !== "") {
    const url = AdminConfig.admin_path(
      `${controllerName.value}/getBySite/${currentSite.value}/${currentKey.value}`
    );
    showHdeLoader(true);
    axios
      .get(url)
      .then((response) => {
        populateData(response.data);
      })
      .catch((error) => {
        console.error("getBySite error:", SafeErrorData(error));
      })
      .finally(() => {
        showHdeLoader(false);
      });
  } else {
    populateData([]);
  }
};

const actionAdd = (allDataArr, seletedData, ids) => {
  console.log("copying now...");
  const postData = {
    fromSite: {
      site_id: currentSite.value,
      data: seletedData,
    },
    toSite: { site_id: siteId.value },
    type: currentKey.value,
  };
  showHdeLoader(true);
  const url = AdminConfig.admin_path(`${controllerName.value}/copySettings`);
  axios
    .post(url, postData)
    .then((response) => {
      const data = response.data;
      if (data.inserted === false) {
        Toast.show(instance.proxy, data.message || "Nothing happened.", 5000);
      } else {
        const ignored = data.ignored;
        const copied = data.copied;
        if (siteWiseComponent.value) {
          siteWiseComponent.value.setSiteData(data.siteData);
        }
        const msg = `${copied.length} Copied and ${ignored.length} ignored.`;
        Toast.show(instance.proxy, msg, 7000);
        console.info("Copied: ", copied);
        console.info("Ignored: ", ignored);        
      }
    })
    .catch((error) => {
      console.error("actionAdd error:", SafeErrorData(error));
    })
    .finally(() => {
      showHdeLoader(false);
    });
};

const actionRemove = (allDataArr, seletedData, ids) => {
  const siteIdToRemove = seletedData.length > 0 ? seletedData[0].site_id : null;
  if (siteIdToRemove === null) return false;

  const postData = {
    site_id: siteIdToRemove,
    ids: ids,
    type: currentKey.value,
  };

  const url = AdminConfig.admin_path(`${controllerName.value}/removeSettings`);
  showHdeLoader(true);
  axios
    .post(url, postData)
    .then((response) => {
      const data = response.data;
      if (data.deleted === 0) {
        Toast.show(instance.proxy, "Sorry!, Somehow it's not deleted.", 5000);
      }
      if (siteWiseComponent.value) {
        siteWiseComponent.value.setSiteData(data.siteData);
      }
    })
    .catch((error) => {
      console.error("actionRemove error:", SafeErrorData(error));
    })
    .finally(() => {
      showHdeLoader(false);
    });
};

const doAction = (action, allDataArr, seletedData, ids) => {
  if (action === "add") {
    actionAdd(allDataArr, seletedData, ids);
  } else {
    actionRemove(allDataArr, seletedData, ids);
  }
};
</script>
