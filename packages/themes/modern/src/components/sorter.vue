<template>
  <div class="mt-6">
    <ul id="sortableField" class="space-y-3">
      <li
        v-for="(current, idx) in allData"
        :key="current.id"
        class="parent bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden transition-all duration-300 group"
        v-if="current.module_pid == 0"
      >
        <div class="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 cursor-pointer" @click="toggleActive(idx)">
            <div class="flex items-center gap-4">
               <i class="fa fa-grip-vertical text-gray-300 group-hover:text-blue-500 transition-colors cursor-grab active:cursor-grabbing"></i>
               <span class="text-sm font-black text-gray-700 tracking-tight">{{ current.name }}</span>
            </div>
            
            <button v-if="hasChild(current)" class="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
               <i class="js_more fa fa-chevron-down text-[10px] transition-transform duration-300" :class="{'rotate-180': activeIndex === idx}"></i>
            </button>
        </div>

        <div v-if="hasChild(current)" v-show="activeIndex === idx" class="bg-gray-50/50 border-t border-gray-100 animate-slideDown">
            <ul class="divide-y divide-gray-100/50">
                <li v-for="child in current.child" :key="child.id" class="px-16 py-3 hover:bg-white transition-colors">
                    <div class="flex items-center gap-3">
                        <div class="w-1.5 h-1.5 rounded-full bg-blue-400/50"></div>
                        <span class="text-xs font-bold text-gray-500">{{ child.name }}</span>
                    </div>
                </li>
            </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import AdminConfig from "@hashtagcms/helpers/admin-config";

import Sortable from "sortablejs";
import { Toast, safeErrorData } from "@hashtagcms/helpers/common";

export default {
  mounted() {
    this.enableSorting();
  },

  props: ["dataAllModules", "dataControllerName"],

  data() {
    return {
      allData:
        this.dataAllModules && this.dataAllModules != "null"
          ? JSON.parse(this.dataAllModules)
          : [],
      sortable: null,
      sortingInterval: -1,
      updateIndexUrl: AdminConfig.admin_path(
        this.controllerName + "/updateIndex",
      ),
      activeIndex: null,
    };
  },
  computed: {
    controllerName() {
      let cName =
        typeof this.dataControllerName == "undefined"
          ? ""
          : this.dataControllerName.toLocaleLowerCase();
      return cName.replace(/\s/g, "");
    },
  },
  methods: {
    hasChild(data) {
      return data.child && data.child.length > 0;
    },
    toggleActive(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
    enableSorting() {
      this.$nextTick(function () {
        if (this.sortable != null) {
          this.sortable.destroy();
        }
        var el = document.getElementById("sortableField");
        this.sortable = Sortable.create(el, {
            animation: 300,
            ghostClass: "bg-blue-50",
            dragClass: "shadow-lg",
            onEnd: this.sortingCallback
        });
      });
    },
    sortingCallback(evt) {
      var $this = this;
      var data = [];
      const items = document.querySelectorAll(".parent");
      
      items.forEach((item, index) => {
          const text = item.querySelector(".text-sm").innerText;
          const found = this.allData.find(d => d.module_pid == 0 && d.name === text);
          if (found) {
              data.push({
                  id: found.id,
                  position: index,
                  name: found.name
              });
          }
      });
      
      this.updateIndex(data);
    },
    submit(requestType, url, data) {
      return new Promise((resolve, reject) => {
        axios[requestType](url, data)
          .then((response) => {
            this.onSuccess(response);
          })
          .catch((error) => {
            this.onFailure(safeErrorData(error));
          });
      });
    },
    updateIndex(data) {
      this.submit("post", this.updateIndexUrl, data)
        .then((response) => this.onSuccess(response))
        .catch((response) => this.onFailure(response));
    },
    onSuccess(res) {
      Toast.show(this, "Modules Sorted.");
    },
    onFailure(res) {
      console.log(res);
    },
  },
};
</script>
