<template>
  <div class="col mt-2">
    <div class="mb-2">
      Copy From:
      <select
        class="form-select inline width-auto"
        @change="getBySite()"
        v-model="currentSite"
      >
        <option value="">Select Site</option>
        <option v-for="site in allSites" :value="site.id">
          {{ getLabel(site) }}
        </option>
      </select>
    </div>
  </div>
  <div class="row">
    <SiteWiseData
      ref="siteWiseComponent"
      :data-message="dataMessage"
      :data-site-data="JSON.stringify(siteData)"
      :data-all-data="JSON.stringify(allData)"
      :data-current-key="currentKey"
      :data-site-id="siteId"
      :data-default-action-for-save="doAction"
      :data-alert-css="dataAlertCss"
    >
    </SiteWiseData>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
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
    const what = currentKey.value;
    const url = AdminConfig.admin_path(`${controllerName.value}/getBySite/${currentSite.value}/${what}`);
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

const actionAdd = (allDataArr, selectedData, ids) => {
  console.log("copying now...");
  const postData = {
    fromSite: {
      site_id: currentSite.value,
      data: selectedData,
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
        const msg = `${copied.length} Copied and ${ignored.length} ignored. Open console for details`;
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

const actionRemove = (allDataArr, selectedData, ids) => {
  const s_id = selectedData.length > 0 ? selectedData[0].site_id : null;
  if (s_id === null) return false;

  const postData = {
    site_id: s_id,
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

const doAction = (action, allDataArr, selectedData, ids) => {
  if (action === "add") {
    actionAdd(allDataArr, selectedData, ids);
  } else {
    actionRemove(allDataArr, selectedData, ids);
  }
};
</script>

