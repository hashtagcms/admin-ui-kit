<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-1 w-full">
    <!-- Available Resources Column -->
    <div class="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden flex flex-col">
      <div class="px-8 py-6 bg-white border-b border-gray-100 flex items-center justify-between">
          <div class="flex items-center gap-3">
              <h3 class="text-xs font-black text-gray-800 uppercase tracking-widest">Available {{ title }}</h3>
              <span class="bg-gray-100 text-gray-600 text-[10px] font-black px-2 py-0.5 rounded-full shadow-inner">{{ total }}</span>
          </div>
          <button
            type="button"
            @click="doAction('add')"
            class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            Add Selected
          </button>
      </div>

      <div class="p-8 space-y-4 flex-1 flex flex-col">
        <div v-if="total > 0" class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <label class="inline-flex items-center cursor-pointer group text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
              <input
                type="checkbox"
                class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all font-black"
                @click="selectAllData('table', $event.target)"
              />
              <span class="group-hover:text-blue-600 transition-colors" style="position: relative; top: -5px; left: 7px;">Select All Pool</span>
            </label>

            <!-- Search Field -->
            <div v-if="showSearch" class="relative w-full sm:w-48">
                <i class="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs"></i>
                <input
                  type="text"
                  placeholder="Filter available..."
                  class="w-full bg-gray-50 border border-gray-100 rounded-lg pl-9 pr-3 py-2 text-xs outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                  v-model="searchKey"
                />
            </div>
        </div>

        <ul class="flex-1 divide-y divide-gray-50 min-h-[300px] max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 pr-2">
          <li v-for="(data, index) in filterData()" :key="data.id" class="py-3 flex items-center gap-4 transition-colors hover:bg-gray-50/50 rounded-xl group px-3">
            <input type="checkbox" v-model="data.selected" class="w-5 h-5 rounded border-gray-200 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer shadow-sm" />
            <div class="flex flex-col gap-0.5">
                <span class="text-xs font-black text-gray-500 group-hover:text-gray-900 transition-colors">{{ getLabel(data) }}</span>
                <span class="text-[9px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-2">
                  <span>ID: {{ data.id }}</span>
                  <span v-if="data.module || data.alias">
                    &bullet; Alias: {{ data.module?.alias || data.alias }}
                  </span>
                  <span v-if="data.platform_id">
                    &bullet; Platform ID: {{ data.platform_id }}
                  </span>
                </span>                
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Added Resources Column -->
    <div class="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden flex flex-col">
      <!-- Message Overlay -->
      <div v-if="message.length > 0" class="px-8 pt-6">
        <div 
          :class="['px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border animate-fadeIn', 
                  alertCss.includes('info') ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-red-50 border-red-100 text-red-600']"
          v-html="message"
        ></div>
      </div>

      <div class="px-8 py-6 bg-white border-b border-gray-100 flex items-center justify-between">
          <div class="flex items-center gap-3">
              <h3 class="text-xs font-black text-green-600 uppercase tracking-widest">Attached {{ title }}</h3>
              <span class="bg-green-50 text-green-600 text-[10px] font-black px-2 py-0.5 rounded-full shadow-inner">{{ selectedTotal }}</span>
          </div>
          <button
            @click="doAction('remove')"
            class="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-sm border border-red-100/50"
          >
            Remove Selected
          </button>
      </div>

      <div class="p-8 space-y-4 flex-1 flex flex-col">
        <div v-if="selectedTotal > 0">
            <label class="inline-flex items-center cursor-pointer group text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
              <input
                type="checkbox"
                class="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 transition-all font-black"
                @click="selectAllData('sitewise', $event.target)"
              />
              <span class="group-hover:text-red-600 transition-colors" style="position: relative; top: -5px; left: 7px;">Deselect All Attached</span>
            </label>            
        </div>

        <ul class="flex-1 divide-y divide-gray-50 min-h-[300px] max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 pr-2">
          <li v-for="(sData, index) in siteData" :key="sData.id" class="py-3 flex items-center gap-4 transition-colors hover:bg-gray-50/50 rounded-xl group px-3">
            <input type="checkbox" v-model="sData.selected" class="w-5 h-5 rounded border-gray-200 text-green-600 focus:ring-green-500 transition-all cursor-pointer shadow-sm" />
            <div class="flex flex-col gap-0.5">
                <span class="text-xs font-black text-gray-700 group-hover:text-green-700 transition-colors">{{ getLabelForSite(sData) }}</span>
                <span class="text-[9px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-2">
                  <span>ID: {{ sData.id }}</span> 
                   <span v-if="sData.module || sData.alias">
                    &bullet; Alias: {{ sData.module?.alias || sData.alias }}
                  </span>
                  <span v-if="sData.platform_id">
                    &bullet; Platform ID: {{ sData.platform_id }}
                  </span>               
                </span>
            </div>
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
const defaultActionForSave = ref(typeof props.dataDefaultActionForSave === "undefined" ? "saveSettings" : props.dataDefaultActionForSave);
const alertCss = ref(typeof props.dataAlertCss === "undefined" || props.dataAlertCss === "" ? "alert alert-info" : props.dataAlertCss);
const controllerName = ref(typeof props.dataControllerName === "undefined" ? "site" : props.dataControllerName);

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

const getLabel = (data) => {
  let label = "";
  if (data.lang) {
    label = typeof data.lang.name === "undefined" ? "" : data.lang.name;
  } else {
    label = data.name || data.alias || "";
  }
  return label;
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
  if (!allData.value.data) return [];
  if (key !== "" && key != null) {
    key = key.toLowerCase();
    return allData.value.data.filter((current) => {
      return getLabel(current).toLowerCase().includes(key) || current.id.toString() === key;
    });
  } else {
    return allData.value.data;
  }
};

const doAction = (action = "add") => {
  const currentDataArr = action === "add" ? allData.value.data : siteData.value;
  const ids = [];
  const selectedArr = [];

  if (currentDataArr && currentDataArr.length > 0) {
    currentDataArr.forEach((current) => {
      if (current.selected === true) {
        ids.push(current.id);
        selectedArr.push(current);
      }
    });

    if (typeof defaultActionForSave.value === "function") {
      defaultActionForSave.value(action, currentDataArr, selectedArr, ids);
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
          if (res.data && res.data.error) {
            Toast.show(instance.proxy, res.data.message || "Operation failed", 5000);
            return;
          }
          if (action === "add") {
            selectedArr.forEach((current) => {
              const found = siteData.value.findIndex((c) => c.id === current.id);
              if (found === -1) {
                siteData.value.push(current);
              }
            });
          } else {
            selectedArr.forEach((current) => {
              const found = siteData.value.findIndex((c) => c.id === current.id);
              if (found !== -1) {
                siteData.value.splice(found, 1);
              }
            });
          }
        })
        .catch((err) => {
          console.error("error: ", err);
          const message = err?.message || err?.data?.message || "Operation failed";
          Toast.show(instance.proxy, message, 5000);
        });
    }
  }
};

const selectAllData = (dataType, holder) => {
  const currentDataArr = dataType === "table" ? allData.value.data : siteData.value;
  const selected = holder.checked;
  if (currentDataArr && currentDataArr.length > 0) {
    currentDataArr.forEach((current) => {
      current.selected = selected;
    });
  }
};

const setData = (key, val) => {
  allData.value[key] = val;
};

const setSiteData = (val) => {
  siteData.value = val;
};

defineExpose({
  setData,
  setSiteData,
});
</script>

