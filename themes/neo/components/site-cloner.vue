<template>
  <div>
    <div class="row">
      <div class="form-group">
        <div class="col-sm-2">Copy From:</div>
        <div class="col-sm-4">
          <select class="form-select" v-model="sourceSiteId">
            <option value="">Select Site</option>
            <option v-for="site in allSites" :value="site.id">
              {{ getLabel(site) }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="row margin-top-20">
      <div class="form-group">
        <div class="col-sm-2">Copy To:</div>
        <div class="col-sm-4">
          <select class="form-select" v-model="targetSiteId">
            <option value="">Select Site</option>
            <option v-for="site in allSites" :value="site.id">
              {{ getLabel(site) }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="row margin-top-20">
      <div class="form-group">
        <div class="col-sm-2">&nbsp;</div>
        <div class="col-sm-4">
          <div
            v-show="errorMsg != '' && !isLoading"
            class="alert alert-danger text-center"
          >
            {{ errorMessage }}
          </div>
          <div v-show="isLoading == 1" class="alert alert-info text-center">
            <span class="fa fa-spinner fa-pulse fa-fw">&nbsp;</span>&nbsp;Please
            wait and don't close this window. It's not running in thread :)
          </div>
          <div v-show="isLoading > 1" class="alert alert-info">
            <ul>
              <li v-for="msg in successMsg">
                <span :class="msg.success === false ? 'text-danger' : ''">
                  {{ msg.message }}
                </span>
              </li>
            </ul>
          </div>
          <input
            @click="doAction()"
            type="button"
            name="submit"
            value="Copy Now!"
            class="btn btn-block btn-success"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import { SafeJsonParse } from "../../../helpers/common";

const props = defineProps(["dataAllSites"]);

// State
const allSites = ref(SafeJsonParse(props.dataAllSites, []));
const sourceSiteId = ref("");
const targetSiteId = ref("");
const isLoading = ref(false);
const errorMsg = ref("");
const successMsg = ref([]);

// Computed
const errorMessage = computed(() => {
  return errorMsg.value === "" ? "It's undoable. Please be careful." : errorMsg.value;
});

// Methods
const getLabel = (data) => {
  let label = "";
  if (data.name || data.alias) {
    label = data.name || data.alias;
  } else if (data.lang) {
    label = typeof data.lang.name === "undefined" ? "" : data.lang.name;
  }
  return label;
};

const loading = (val) => {
  isLoading.value = val;
};

const cloneSite = () => {
  console.log("copying now...");
  loading(1);
  const postData = {
    sourceSiteId: sourceSiteId.value,
    tagetSiteId: targetSiteId.value,
  };

  const url = AdminConfig.admin_path("site/cloneSite");
  axios
    .post(url, postData)
    .then((response) => {
      console.log(response);
      successMsg.value = response.data;
      loading(2);
    })
    .catch((error) => {
      console.log("Error: ", error.response);
      errorMsg.value = error.response ? error.response.data.message : error.message;
      loading(0);
    });
};

const doAction = () => {
  cloneSite();
};
</script>

