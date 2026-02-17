<template>
  <div class="max-w-3xl space-y-6">
    <div v-if="showGroups" class="flex items-center justify-between bg-white px-6 py-4 rounded-lg border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <i class="fa fa-layer-group"></i>
            </div>
            <h4 class="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">
              Arrange Menu Structure
            </h4>
        </div>
        <split-button
          :data-options="groups"
          @change="arrangeAgain"
          :data-selected="selectedIndex"
        ></split-button>
    </div>

    <ul class="divide-y divide-gray-50 bg-white shadow-lg rounded-lg border border-gray-100 overflow-hidden js_sortable">
      <template v-for="(item, index) in allData" :key="getId(item)">
        <li
          data-is-parent="true"
          v-if="isParent(item)"
          class="group"
          :data-id="getId(item)"
        >
          <div class="px-8 py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
              <div class="flex items-center gap-5">
                  <i class="fa fa-grip-vertical text-gray-300 group-hover:text-blue-500 transition-colors cursor-grab active:cursor-grabbing text-lg"></i>
                  <span class="text-sm font-black text-gray-700 tracking-tight" v-html="getName(item)"></span>
              </div>
              
              <div v-if="hasChild(item)" class="flex items-center">
                <label :for="'item_' + index" class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer">
                  <i class="fa fa-chevron-down text-xs transition-transform duration-300 opacity-50"></i>
                </label>
              </div>
          </div>
          
          <div v-if="hasChild(item)" class="overflow-hidden">
             <input :id="'item_' + index" type="checkbox" class="hidden peer" />
             <ul class="hidden peer-checked:block bg-gray-50/50 divide-y divide-gray-100 border-t border-gray-100 js_sortable animate-slideDown">
                <li
                    data-is-parent="false"
                    class="px-16 py-4 flex items-center justify-between group/child hover:bg-white transition-all js_item"
                    v-for="child in item.child"
                    :key="getId(child)"
                    :data-id="getId(child)"
                  >
                    <div class="flex items-center gap-4">
                        <i class="fa fa-grip-lines text-gray-200 group-hover/child:text-blue-400 transition-colors cursor-grab active:cursor-grabbing text-[10px]"></i>
                        <span class="text-xs font-bold text-gray-500 group-hover/child:text-blue-900 transition-colors">{{ getName(child) }}</span>
                    </div>
                </li>
             </ul>
          </div>
        </li>
      </template>
    </ul>

    <div class="flex justify-center pt-6" v-if="allData.length > 1">
      <button
        type="button"
        class="px-20 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-lg shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 active:scale-95 text-lg"
        @click="updateIndex()"
      >
        Save New Sequence
      </button>
    </div>
  </div>
</template>

<script>
import AdminConfig from "../../../helpers/admin-config";

import Sortable from "sortablejs";
import { Toast, Loader, SafeErrorData, SafeJsonParse } from "../../../helpers/common";

import SplitButton from "./library/split-button.vue";

export default {
  components: {
    "split-button": SplitButton,
  },

  mounted() {
    this.enableSorting();
    //console.log(this.controllerName);
    //console.log(this.allData);
  },

  props: [
    "dataAllData",
    "dataFields",
    "dataControllerName",
    "dataControllerChildName",
    "dataGroups",
    "dataGroupName",
    "dataShowGroups",
  ],

  data() {
    return {
      allData: SafeJsonParse(this.dataAllData, []),
      groups: SafeJsonParse(this.dataGroups, []),
      groupName:
        this.dataGroupName && this.dataGroupName !== ""
          ? this.dataGroupName
          : "",
      showGroups: !!(this.dataShowGroups && this.dataShowGroups === "true"),
    };
  },
  computed: {
    fields() {
      let fields = SafeJsonParse(this.dataFields, null);
      if (fields === null) {
        fields = {};
        fields.id = "id";
        fields.label = "name";
        fields.isImage = false;
      }
      return fields;
    },
    controllerName() {
      let cName =
        typeof this.dataControllerName == "undefined"
          ? ""
          : this.dataControllerName.toLowerCase();
      return cName.replace(/\s/g, "");
    },
    controlerChildName() {
      let cName =
        typeof this.dataControllerChildName == "undefined"
          ? ""
          : this.dataControllerChildName.toLowerCase();
      return cName.replace(/\s/g, "");
    },
    selectedIndex() {
      let index = 0;
      for (let i = 0; i < this.groups.length; i++) {
        if (this.groups[i] === this.groupName) {
          index = i;
          break;
        }
      }
      return index;
    },
  },
  methods: {
    isParent(data) {
      return data.parent_id === 0 || !data.parent_id;
    },
    arrangeAgain(data) {
      window.location.href = AdminConfig.admin_path(
        this.controllerName + "/sort/" + data.value,
      );
    },
    hasChild(data) {
      return data.child && data.child.length > 0;
    },
    getName(data) {
      //Added media support
      if (this.fields.isImage === true) {
        let path = data[this.fields.label]
          ? AdminConfig.get_media(data[this.fields.label])
          : AdminConfig.get_media(data.lang[this.fields.label]);
        return `<a href='${path}' target='_blank'><img height='30' src='${path}' /></a>`;
      } else {
        return data[this.fields.label]
          ? data[this.fields.label]
          : data.lang[this.fields.label];
      }
    },
    getId(data) {
      return data[this.fields.id];
    },
    enableSorting() {
      let $this = this;
      this.$nextTick(function () {
        let list = document.querySelectorAll(".js_sortable");
        list.forEach(function (current) {
          Sortable.create(current, {
            animation: 500,
            ghostClass: "text-danger",
            onUpdate: function (/**Event*/ evt) {
              //console.log("onUpdate ", evt.item);
              //let item = evt.item;
              //let isParent = (item.getAttribute("data-is-parent") === "true");
              //$this.updateIndex(isParent);
            },
          });
        });
      });
    },
    submit(requestType, url, data, controllerName) {
      Loader.show(this, "Please wait. Saving sorting data...");
      return new Promise((resolve, reject) => {
        axios[requestType](url, data)
          .then((response) => {
            this.onSuccess(response, controllerName);
          })
          .catch((error) => {
            this.onFailure(SafeErrorData(error));
          })
          .finally(() => {
            Loader.hide(this);
          });
      });
    },
    updateIndex(isParent = false) {
      let items = document.querySelectorAll(".item");
      let datas = [];

      let controllerName = this.controllerName;

      let saveAll = true;

      if (this.controlerChildName !== "") {
        saveAll = false;
      }

      controllerName =
        isParent === true
          ? this.controllerName
          : this.controlerChildName !== ""
            ? this.controlerChildName
            : this.controllerName;

      let counter = 1;

      console.log("saveAll " + saveAll);

      items.forEach(function (current, index) {
        if (saveAll === true) {
          let id = current.getAttribute("data-id");
          let position = counter;
          datas.push({ position: position, where: { id: parseInt(id) } });
          counter = counter + 1;
        } else {
          let isParentElement = current.getAttribute("data-is-parent");
          let id = current.getAttribute("data-id");

          if (isParent.toString() === isParentElement.toString()) {
            let id = current.getAttribute("data-id");
            let position = counter;
            datas.push({ position: position, where: { id: parseInt(id) } });
            counter = counter + 1;
          }
        }
      });

      let updateIndexUrl = AdminConfig.admin_path(
        controllerName + "/updateIndex",
      );

      this.submit("post", updateIndexUrl, datas, controllerName);
    },
    onSuccess(res, controllerName) {
      Toast.show(this, controllerName.toUpperCase() + " Sorted.");
    },
    onFailure(res) {
      Toast.show(
        this,
        res?.statusText || "There is some error! Don't know the reason",
        5000,
      );
      console.log(res);
    },
    setData(data) {
      this.allData = data;
    },
  },
};
</script>
