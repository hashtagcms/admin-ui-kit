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

    <ul v-if="allData.length > 0" class="divide-y divide-gray-50 bg-white shadow-lg rounded-lg border border-gray-100 overflow-hidden js_sortable">
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

    <div v-else class="bg-amber-50 border border-amber-100 text-amber-700 px-8 py-6 rounded-xl flex items-center gap-4 shadow-sm animate-fadeIn">
        <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 shrink-0">
            <i class="fa fa-exclamation-circle text-lg"></i>
        </div>
        <div class="flex flex-col gap-1">
            <span class="text-sm font-black uppercase tracking-widest">Nothing to sort</span>
            <span class="text-xs font-bold opacity-70">There are no records found to arrange in this group.</span>
        </div>
    </div>

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

<script setup>
import { ref, computed, onMounted, nextTick, getCurrentInstance } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import Sortable from "sortablejs";
import { Toast, Loader, SafeErrorData, SafeJsonParse } from "../../../helpers/common";
import SplitButton from "./library/split-button.vue";

const props = defineProps([
  "dataAllData",
  "dataFields",
  "dataControllerName",
  "dataControllerChildName",
  "dataGroups",
  "dataGroupName",
  "dataShowGroups",
]);

const instance = getCurrentInstance();

// State
const allData = ref(SafeJsonParse(props.dataAllData, []));
const groups = ref(SafeJsonParse(props.dataGroups, []));
const groupName = ref(props.dataGroupName && props.dataGroupName !== "" ? props.dataGroupName : "");
const showGroups = ref(!!(props.dataShowGroups && props.dataShowGroups === "true"));

// Computed
const fields = computed(() => {
  let fConfig = SafeJsonParse(props.dataFields, null);
  if (fConfig === null) {
    fConfig = {
      id: "id",
      label: "name",
      isImage: false,
    };
  }
  return fConfig;
});

const controllerName = computed(() => {
  let cName = typeof props.dataControllerName === "undefined" ? "" : props.dataControllerName.toLowerCase();
  return cName.replace(/\s/g, "");
});

const controlerChildName = computed(() => {
  let cName = typeof props.dataControllerChildName === "undefined" ? "" : props.dataControllerChildName.toLowerCase();
  return cName.replace(/\s/g, "");
});

const selectedIndex = computed(() => {
  let index = 0;
  for (let i = 0; i < groups.value.length; i++) {
    if (groups.value[i] === groupName.value) {
      index = i;
      break;
    }
  }
  return index;
});

// Methods
const getId = (data) => data[fields.value.id];

const getName = (data) => {
  if (fields.value.isImage === true) {
    let path = data[fields.value.label]
      ? AdminConfig.get_media(data[fields.value.label])
      : AdminConfig.get_media(data.lang[fields.value.label]);
    return `<a href='${path}' target='_blank'><img height='30' src='${path}' /></a>`;
  } else {
    return data[fields.value.label] ? data[fields.value.label] : data.lang[fields.value.label];
  }
};

const isParent = (data) => data.parent_id === 0 || !data.parent_id;
const hasChild = (data) => data.child && data.child.length > 0;

const arrangeAgain = (data) => {
  window.location.href = AdminConfig.admin_path(controllerName.value + "/sort/" + data.value);
};

const enableSorting = () => {
  nextTick(() => {
    let list = document.querySelectorAll(".js_sortable");
    list.forEach((current) => {
      Sortable.create(current, {
        animation: 500,
        ghostClass: "text-danger",
        onUpdate: () => {
          // Update logic if needed
        },
      });
    });
  });
};

const onSuccess = (res, cName) => {
  Toast.show(instance.proxy, cName.toUpperCase() + " Sorted.");
};

const onFailure = (res) => {
  Toast.show(
    instance.proxy,
    res?.statusText || "There is some error! Don't know the reason",
    5000
  );
  console.log(res);
};

const submit = (requestType, url, data, cName) => {
  Loader.show(instance.proxy, "Please wait. Saving sorting data...");
  return new Promise((resolve, reject) => {
    axios[requestType](url, data)
      .then((response) => {
        onSuccess(response, cName);
        resolve(response);
      })
      .catch((error) => {
        onFailure(SafeErrorData(error));
        reject(error);
      })
      .finally(() => {
        Loader.hide(instance.proxy);
      });
  });
};

const updateIndex = (isParentFlag = false) => {
  // Keeping .item as per original but it might be a bug in original code
  let items = document.querySelectorAll(".item");
  let datas = [];
  let nameToUse = isParentFlag === true
    ? controllerName.value
    : controlerChildName.value !== ""
      ? controlerChildName.value
      : controllerName.value;

  let saveAll = controlerChildName.value === "";
  let counter = 1;

  items.forEach((current) => {
    if (saveAll === true) {
      let id = current.getAttribute("data-id");
      datas.push({ position: counter, where: { id: parseInt(id) } });
      counter++;
    } else {
      let isParentElement = current.getAttribute("data-is-parent");
      let id = current.getAttribute("data-id");
      if (isParentFlag.toString() === isParentElement.toString()) {
        datas.push({ position: counter, where: { id: parseInt(id) } });
        counter++;
      }
    }
  });

  let updateIndexUrl = AdminConfig.admin_path(nameToUse + "/updateIndex");
  submit("post", updateIndexUrl, datas, nameToUse);
};

const setData = (data) => {
  allData.value = data;
};

onMounted(() => {
  enableSorting();
});
</script>

