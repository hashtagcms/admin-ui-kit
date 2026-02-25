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

<script setup>
import { ref, computed, onMounted, nextTick, getCurrentInstance } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import Sortable from "sortablejs";
import { Toast, SafeErrorData, SafeJsonParse } from "../../../helpers/common";

const props = defineProps(["dataAllModules", "dataControllerName"]);

const instance = getCurrentInstance();

// State
const allData = ref(SafeJsonParse(props.dataAllModules, []));
const sortable = ref(null);
const sortingInterval = ref(-1);
const activeIndex = ref(null);

// Computed
const controllerName = computed(() => {
  let cName = typeof props.dataControllerName === "undefined" ? "" : props.dataControllerName.toLowerCase();
  return cName.replace(/\s/g, "");
});

const updateIndexUrl = computed(() => {
  return AdminConfig.admin_path(`${controllerName.value}/updateIndex`);
});

// Methods
const hasChild = (data) => data.child && data.child.length > 0;

const toggleActive = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const onSuccess = (res) => {
  Toast.show(instance, "Modules Sorted.");
};

const onFailure = (res) => {
  console.log(res);
};

const submit = (requestType, url, data) => {
  return new Promise((resolve, reject) => {
    axios[requestType](url, data)
      .then((response) => {
        onSuccess(response);
        resolve(response);
      })
      .catch((error) => {
        onFailure(SafeErrorData(error));
        reject(error);
      });
  });
};

const updateIndex = (data) => {
  submit("post", updateIndexUrl.value, data);
};

const sortingCallback = (evt) => {
  const data = [];
  const items = document.querySelectorAll(".parent");

  items.forEach((item, index) => {
    const textSpan = item.querySelector(".text-sm");
    const text = textSpan ? textSpan.innerText : "";
    const found = allData.value.find((d) => d.module_pid == 0 && d.name === text);
    if (found) {
      data.push({
        id: found.id,
        position: index,
        name: found.name,
      });
    }
  });

  updateIndex(data);
};

const enableSorting = () => {
  nextTick(() => {
    if (sortable.value != null) {
      sortable.value.destroy();
    }
    const el = document.getElementById("sortableField");
    if (el) {
      sortable.value = Sortable.create(el, {
        animation: 300,
        ghostClass: "bg-blue-50",
        dragClass: "shadow-lg",
        onEnd: sortingCallback,
      });
    }
  });
};

// Lifecycle
onMounted(() => {
  enableSorting();
});
</script>

