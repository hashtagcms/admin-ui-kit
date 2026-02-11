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
            <label class="inline-flex items-center gap-2 cursor-pointer group text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <input
                type="checkbox"
                class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all font-black"
                @click="selectAllData('table', $event.target)"
              />
              <span class="group-hover:text-blue-600 transition-colors">Select All Pool</span>
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
                <span class="text-[9px] font-black text-gray-300 uppercase tracking-widest">Entry ID: {{ data.id }}</span>
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
            <label class="inline-flex items-center gap-2 cursor-pointer group text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <input
                type="checkbox"
                class="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 transition-all font-black"
                @click="selectAllData('sitewise', $event.target)"
              />
              <span class="group-hover:text-red-600 transition-colors">Deselect All Attached</span>
            </label>
        </div>

        <ul class="flex-1 divide-y divide-gray-50 min-h-[300px] max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 pr-2">
          <li v-for="(data, index) in siteData" :key="data.id" class="py-3 flex items-center gap-4 transition-colors hover:bg-gray-50/50 rounded-xl group px-3">
            <input type="checkbox" v-model="data.selected" class="w-5 h-5 rounded border-gray-200 text-green-600 focus:ring-green-500 transition-all cursor-pointer shadow-sm" />
            <div class="flex flex-col gap-0.5">
                <span class="text-xs font-black text-gray-700 group-hover:text-green-700 transition-colors">{{ getLabelForSite(data) }}</span>
                <span class="text-[9px] font-black text-gray-300 uppercase tracking-widest">Link ID: {{ data.id }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AdminConfig from "@hashtagcms/helpers/admin-config";

import { Loader, Toast, safeErrorData, parseProp } from "@hashtagcms/helpers/common";

export default {
  mounted() {
    //console.log(this.siteData);
    //  console.log(this.allData.data[0]);
    //console.log(this.cuurent);
    // this.initData();
  },
  created() {
    //this.initData();
  },

  props: [
    "dataMessage",
    "dataAllData",
    "dataSiteData",
    "dataCurrentKey",
    "dataSiteId",
    "dataDefaultActionForSave",
    "dataAlertCss",
    "dataControllerName",
  ],
  data() {
    return {
      siteData:
        typeof this.dataSiteData == "undefined" || this.dataSiteData === ""
          ? []
          : JSON.parse(this.dataSiteData),
      allData:
        typeof this.dataAllData == "undefined" || this.dataAllData === ""
          ? []
          : JSON.parse(this.dataAllData),
      currentKey: this.dataCurrentKey,
      searchKey: "",
      siteId: parseInt(this.dataSiteId),
      message: typeof this.dataMessage == "undefined" ? "" : this.dataMessage,
      defaultActionForSave:
        typeof this.dataDefaultActionForSave === "undefined"
          ? "saveSettings"
          : this.dataDefaultActionForSave,
      alertCss:
        typeof this.dataAlertCss == "undefined" || this.dataAlertCss === ""
          ? "alert alert-info"
          : this.dataAlertCss,
      controllerName:
        typeof this.dataControllerName === "undefined"
          ? "site"
          : this.dataControllerName,
    };
  },
  computed: {
    title() {
      return this.allData.label;
    },
    total() {
      return this.allData.data ? this.allData.data.length : 0;
    },
    selectedTotal() {
      return this.siteData == null ? 0 : this.siteData.length;
    },
    showSearch() {
      //return true;
      return this.allData.data && this.allData.data.length > 10;
    },
  },
  methods: {
    saveNow(url, data) {
      Loader.show(this, "Please wait. Making Changes...");
      return new Promise((resolve, reject) => {
        axios
          .post(url, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(safeErrorData(error));
          })
          .finally(() => {
            Loader.hide(this);
          });
      });
    },
    doAction(action = "add") {
      let $this = this;
      //if action is add use left data to copy/reference to the right side
      let currentData = action === "add" ? this.allData.data : this.siteData;
      let ids = [];
      let selectedArr = [];

      if (currentData && currentData.length > 0) {
        currentData.forEach(function (current) {
          if (current.selected === true) {
            ids.push(current.id);
            selectedArr.push(current);
          }
        });

        //if action is method/function. means it is being called from another component
        if (typeof this.defaultActionForSave === "function") {
          this.defaultActionForSave(action, currentData, selectedArr, ids);
          return false;
        }

        if (ids.length > 0) {
          let postParams = {};
          postParams.key = this.currentKey;
          postParams.ids = ids;
          postParams.site_id = this.siteId;
          postParams.action = action;
          this.saveNow(
            AdminConfig.admin_path(
              this.controllerName + "/" + this.defaultActionForSave,
            ),
            postParams,
          )
            .then(function (res) {
              feedback(res);
            })
            .catch(function (res) {
              console.error("error: ", res);
              Toast.show(
                $this,
                res?.data?.message || "I don't know what went wrong.",
                5000,
              );
            });
        }
      }

      function hasInArr(element, onwhat, value) {
        return element[onwhat] === value;
      }
      //console.log(ids);
      function feedback(res) {
        console.log(res);
        if (action === "add") {
          //console.log("adding");
          //console.log(selectedArr);
          selectedArr.forEach(function (current) {
            let id = current.id;

            let found = $this.siteData.findIndex(function (c) {
              return c.id === id;
            });

            if (found === -1) {
              $this.siteData.push(current);
            }
          });
        } else {
          //remove from right side
          selectedArr.forEach(function (current) {
            let id = current.id;

            let found = $this.siteData.findIndex(function (c) {
              return c.id === id;
            });

            if (found !== -1) {
              $this.siteData.splice(found, 1);
            }
          });
        }
      }
    },
    selectAllData(dataType, holder) {
      let $this = this;
      let currentData =
        dataType === "table" ? this.allData.data : this.siteData;
      let selected = holder.checked;
      if (currentData && currentData.length > 0) {
        currentData.forEach(function (current) {
          //$this.$set(current, "selected", selected);
          current.selected = selected;
        });
      }
    },
    getLabel(data) {
      let label = "";
      if (data.lang) {
        label = typeof data.lang.name == "undefined" ? "" : data.lang.name;
      } else {
        label = data.name || data.alias || "";
      }
      return label;
    },
    getLabelForSite(data) {
      //console.log(data);

      if (typeof data.name != "undefined" || typeof data.alias != "undefined") {
        return data.name || data.alias;
      } else if (data.lang) {
        return typeof data.lang.name == "undefined" ? "" : data.lang.name;
      }

      //Lang data can be found from the source too. Borrow it from left side if right side does not have it.
      //fallback - get from source/left side data  compare id or link_rewrite

      if (this.allData.data && this.allData.data.length > 0) {
        let index = this.allData.data.findIndex(function (current) {
          return (
            current.id === data.id ||
            (typeof data.link_rewrite != "undefined" &&
              data.link_rewrite === current.link_rewrite)
          );
        });

        return index === -1 ? "" : this.getLabel(this.allData.data[index]);
      }

      return "";
    },
    filterData() {
      let $this = this;

      let data = [];

      let key = this.searchKey;

      if (key !== "" && key != null) {
        key = key.toLowerCase();

        return this.allData.data.filter(function (current) {
          return (
            $this.getLabel(current).toLowerCase().includes(key) ||
            current.id === key
          );
        });
      } else {
        //console.log("data ", this.allData.data);
        return this.allData.data;
      }
    },
    setData(key, data) {
      //this.allData[key] = data;
      //console.log(key, data);
      this.allData[key] = data;
      //this.$set(this.allData, key, data);
    },
    setSiteData(data) {
      //this.allData[key] = data;
      this.siteData = {};
      this.siteData = data;
      //this.$set(this, 'siteData', data);
    },
  },
};
</script>
