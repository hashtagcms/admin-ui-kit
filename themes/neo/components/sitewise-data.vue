<template>
  <div class="col col-4">
    <div class="card border-0">
      <div class="card-header">
        <h5 class="card-title m-0" style="line-height: inherit">
          Available {{ title }}
          <span class="badge text-bg-secondary">{{ total }}</span>
          <button
            type="button"
            title="Add Selected"
            @click="doAction('add')"
            class="hand pull-right btn btn-sm btn-primary"
          >
            Add Selected
          </button>
        </h5>
      </div>
      <div class="card-body p-2">
        <div class="card-subtitle mb-2 text-muted" v-if="total > 0">
          <label class="inline"
            ><input
              type="checkbox"
              @click="selectAllData('table', $event.target)"
            />
            Select All</label
          >
        </div>
        <div class="panel-sub-heading" style="padding: 4px" v-if="showSearch">
          <div class="input-group">
            <input
              type="text"
              placeholder="Search"
              class="form-control"
              aria-describedby="basic-addon3"
              v-model="searchKey"
            />
          </div>
        </div>
        <ul class="list-group">
          <li v-for="(data, index) in filterData()" class="list-group-item">
            <label class="normal">
              <input type="checkbox" v-model="data.selected" />
              {{ getLabel(data) }}
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="col col-4">
    <div class="card border-0">
      <div class="card-body p-0" v-if="message.length > 0">
        <small
          :class="alertCss"
          v-html="message"
          style="display: block"
        ></small>
      </div>
      <div class="card-header">
        <h5 class="card-title text-success m-0" style="line-height: inherit">
          Added {{ title }}
          <span class="badge text-bg-secondary">{{ selectedTotal }}</span>
          <button
            title="Remove Selected"
            @click="doAction('remove')"
            class="btn btn-sm btn-danger pull-right"
          >
            Remove Selected
          </button>
        </h5>
      </div>
      <div class="card-body">
        <div v-if="selectedTotal > 0" class="card-subtitle mb-2 text-muted">
          <label class="inline"
            ><input
              type="checkbox"
              @click="selectAllData('sitewise', $event.target)"
            />
            Select All</label
          >
        </div>
        <ul class="list-group">
          <li v-for="(data, index) in siteData" class="list-group-item">
            <label class="normal">
              <input type="checkbox" v-model="data.selected" />
              {{ getLabelForSite(data) }}
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, getCurrentInstance } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import { Loader, Toast, SafeErrorData, SafeJsonParse } from "../../../helpers/common";

const props = defineProps([
  "dataMessage",
  "dataAllData",
  "dataSiteData",
  "dataCurrentKey",
  "dataSiteId",
  "dataDefaultActionForSave",
  "dataAlertCss",
  "dataControllerName",
]);

const instance = getCurrentInstance();

// State
const siteData = ref(SafeJsonParse(props.dataSiteData, []));
const allData = ref(SafeJsonParse(props.dataAllData, []));
const currentKey = ref(props.dataCurrentKey);
const searchKey = ref("");
const siteId = ref(parseInt(props.dataSiteId));
const message = ref(typeof props.dataMessage === "undefined" ? "" : props.dataMessage);
const defaultActionForSave = ref(
  typeof props.dataDefaultActionForSave === "undefined"
    ? "saveSettings"
    : props.dataDefaultActionForSave
);
const alertCss = ref(
  typeof props.dataAlertCss === "undefined" || props.dataAlertCss === ""
    ? "alert alert-info"
    : props.dataAlertCss
);
const controllerName = ref(
  typeof props.dataControllerName === "undefined" ? "site" : props.dataControllerName
);

// Computed
const title = computed(() => allData.value.label);
const total = computed(() => (allData.value.data ? allData.value.data.length : 0));
const selectedTotal = computed(() => (siteData.value == null ? 0 : siteData.value.length));
const showSearch = computed(() => allData.value.data && allData.value.data.length > 10);

// Methods
const saveNow = (url, data) => {
  Loader.show(instance.proxy, "Please wait. Making Changes...");
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((response) => resolve(response))
      .catch((error) => reject(SafeErrorData(error)))
      .finally(() => Loader.hide(instance.proxy));
  });
};

const doAction = (action = "add") => {
  const currentData = action === "add" ? allData.value.data : siteData.value;
  const ids = [];
  const selectedArr = [];

  if (currentData && currentData.length > 0) {
    currentData.forEach((current) => {
      if (current.selected === true) {
        ids.push(current.id);
        selectedArr.push(current);
      }
    });

    if (typeof defaultActionForSave.value === "function") {
      defaultActionForSave.value(action, currentData, selectedArr, ids);
      return false;
    }

    if (ids.length > 0) {
      const postParams = {
        key: currentKey.value,
        ids: ids,
        site_id: siteId.value,
        action: action,
      };

      saveNow(
        AdminConfig.admin_path(`${controllerName.value}/${defaultActionForSave.value}`),
        postParams
      )
        .then((res) => {
          if (action === "add") {
            selectedArr.forEach((current) => {
              const id = current.id;
              const found = siteData.value.findIndex((c) => c.id === id);
              if (found === -1) {
                siteData.value.push(current);
              }
            });
          } else {
            selectedArr.forEach((current) => {
              const id = current.id;
              const found = siteData.value.findIndex((c) => c.id === id);
              if (found !== -1) {
                siteData.value.splice(found, 1);
              }
            });
          }
        })
        .catch((err) => {
          console.error("error: ", err);
          Toast.show(instance.proxy, err?.data?.message || "I don't know what went wrong.", 5000);
        });
    }
  }
};

const selectAllData = (dataType, holder) => {
  const currentData = dataType === "table" ? allData.value.data : siteData.value;
  const selected = holder.checked;
  if (currentData && currentData.length > 0) {
    currentData.forEach((current) => {
      current.selected = selected;
    });
  }
};

const getLabel = (data) => {
  if (data.lang) {
    return typeof data.lang.name === "undefined" ? "" : data.lang.name;
  } else {
    return data.name || data.alias || "";
  }
};

const getLabelForSite = (data) => {
  if (typeof data.name !== "undefined" || typeof data.alias !== "undefined") {
    return data.name || data.alias;
  } else if (data.lang) {
    return typeof data.lang.name === "undefined" ? "" : data.lang.name;
  }

  if (allData.value.data && allData.value.data.length > 0) {
    const index = allData.value.data.findIndex((current) => {
      return (
        current.id === data.id ||
        (typeof data.link_rewrite !== "undefined" && data.link_rewrite === current.link_rewrite)
      );
    });
    return index === -1 ? "" : getLabel(allData.value.data[index]);
  }
  return "";
};

const filterData = () => {
  let key = searchKey.value;
  if (key !== "" && key != null) {
    key = key.toLowerCase();
    return allData.value.data.filter((current) => {
      return getLabel(current).toLowerCase().includes(key) || current.id.toString() === key;
    });
  } else {
    return allData.value.data;
  }
};

const setData = (key, data) => {
  allData.value[key] = data;
};

const setSiteData = (data) => {
  siteData.value = data;
};

defineExpose({
  setData,
  setSiteData,
});
</script>

