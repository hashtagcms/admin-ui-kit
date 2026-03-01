<template>
  <div class="space-y-6">
    <!-- Top Filter Bar -->
    <div
      v-show="hasMicrosites || hasPlatformsMoreThanOne"
      class="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
    >
      <div v-show="hasMicrosites" class="w-full md:w-64">
        <select
          v-model="micrositeId"
          class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-inner cursor-pointer h-[46px]"
          @change="fetchNewData()"
        >
          <option value="0">Select a MicroSite</option>
          <option v-for="microsite in siteMicrosites" :key="microsite.id" :value="microsite.id">
            {{ microsite.name }}
          </option>
        </select>
      </div>
      <div v-show="hasPlatformsMoreThanOne" class="w-full md:w-64">
        <select
          v-model="platformId"
          class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-inner cursor-pointer h-[46px]"
          @change="fetchNewData()"
        >
          <option value="">Select a Platform</option>
          <option v-for="platform in sitePlatforms" :key="platform.id" :value="platform.id">
            {{ platform.name }}
          </option>
        </select>
      </div>
      <div v-show="hasPlatformsMoreThanOne" class="md:ml-auto">
        <label style="display: flex;"
          class="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-5 h-[46px] hover:bg-white hover:border-blue-400 transition-all cursor-pointer group shadow-inner"
          title="It will be inserted or deleted for all platforms if checked."
        >
          <input
            v-model="applicableForAllPlatforms"
            type="checkbox"
            class="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500/20 cursor-pointer transition-all"
          />
          <div class="flex flex-col items-start whitespace-nowrap select-none">
            <span class="text-[10px] font-black text-gray-600 uppercase tracking-widest leading-none group-hover:text-blue-600 transition-colors">Global Sync</span>
            <span class="text-[9px] font-bold text-gray-400 uppercase italic mt-1 leading-none">All Platforms</span>
          </div>
        </label>
      </div>
    </div>

    <!-- Read Only Warning -->
    <div v-if="!canEdit" class="animate-fadeIn">
        <div class="bg-amber-50 border border-amber-100 text-amber-700 px-6 py-4 rounded-lg flex items-center gap-3 shadow-sm font-bold text-sm">
            <i class="fa fa-lock text-lg text-amber-400"></i>
            <span>Read-only access mode enabled.</span>
        </div>
    </div>

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Left Column: Active Categories -->
      <div class="lg:col-span-7">
        <div class="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">
          <div class="px-8 py-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="h-8 w-1 bg-green-500 rounded-full"></div>
                <h3 class="text-base font-black text-gray-800 tracking-tight uppercase tracking-widest">Active Categories</h3>
            </div>
            
            <button
              v-if="showUpdateAllBtn"
              class="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-400 hover:text-gray-900 shadow-sm"
              @click="showUpdateAllDiv = !showUpdateAllDiv"
              title="Global Theme Update"
            >
              <i class="fa fa-ellipsis-v"></i>
            </button>
          </div>

          <!-- Global Update Panel -->
          <div v-if="showUpdateAllDiv" class="animate-slideDown bg-red-50 p-8 border-b border-red-100 border-dashed">
             <div class="flex flex-col gap-3">
                <p class="text-[11px] font-black text-red-700 uppercase leading-snug">
                    <i class="fa fa-exclamation-triangle mr-1 text-red-500"></i> Critical: Global Theme Override
                </p>
                <div class="flex gap-3">
                   <select
                      v-model="globalTheme"
                      class="flex-1 bg-white border border-red-200 text-sm rounded-xl px-4 py-2.5 outline-none focus:ring-4 focus:ring-red-500/10 shadow-sm font-bold text-red-900"
                      @change="updateThemeToAllCategories()"
                    >
                      <option value="">Select Theme for ALL categories</option>
                      <option v-for="theme in siteThemes" :key="theme.id" :value="theme.id">{{ theme.name }}</option>
                    </select>
                    <button @click="showUpdateAllDiv = false" class="text-xs font-black text-red-400 hover:text-red-700 transition-colors uppercase tracking-widest px-4 border border-red-100 rounded-xl hover:bg-red-100/50">Cancel</button>
                </div>
             </div>
          </div>

          <!-- Search Category -->
          <div v-if="showSearch('allCategories')" class="px-8 py-4 border-b border-gray-100 bg-gray-50/30">
              <div class="relative group">
                  <i class="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"></i>
                  <input
                    v-model="searchKeyPlatformCategory"
                    class="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
                    placeholder="Search by ID or Category name..."
                    type="text"
                  />
              </div>
          </div>

          <ul
            ref="droppableArea"
            class="flex-1 divide-y divide-gray-50 min-h-[200px] overflow-y-auto max-h-[600px] js_category scrollbar-thin scrollbar-thumb-gray-200"
          >
            <li
              v-for="pc in filterData('allCategories')"
              :key="pc.category_id"
              :data-cache-category="pc.cache_category"
              :data-category-id="pc.category_id"
              :data-theme-id="pc.theme_id"
              class="px-8 py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors group js_item cursor-pointer"
            >
              <div class="flex items-center gap-5">
                 <div class="flex items-center gap-3">
                     <i class="fa fa-grip-vertical text-gray-300 group-hover:text-blue-400 transition-colors cursor-grab active:cursor-grabbing text-lg"></i>
                     <input v-show="showCheckbox" v-model="pc.selected" type="checkbox" class="w-5 h-5 text-blue-600 rounded border-gray-300 shadow-sm" />
                 </div>
                  <div class="flex flex-col gap-0.5">
                    <div class="flex items-center gap-2">
                        <span class="text-sm font-black text-gray-800 tracking-tight">{{ pc.category_name }}</span>
                        <span class="text-[10px] font-bold text-gray-300">#{{ pc.category_id }}</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <div v-if="pc.theme_id > 0" class="flex items-center gap-1.5">
                            <div class="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50"></div>
                            <span class="text-[10px] font-black text-blue-600/60 uppercase tracking-widest">{{ getThemeName(pc.theme_id) }}</span>
                        </div>
                        <div v-else class="flex items-center gap-1.5">
                            <div class="w-1.5 h-1.5 rounded-full bg-rose-400"></div>
                            <span class="text-[10px] font-black text-rose-400 uppercase tracking-widest">No Theme</span>
                        </div>
                        
                        <div v-if="pc.cache_category" class="flex items-center gap-1.5">
                           <div class="w-1 h-1 rounded-full bg-gray-200"></div>
                           <span class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] italic">{{ pc.cache_category }}</span>
                        </div>
                    </div>
                  </div>
              </div>

              <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                  <button v-if="canDelete" class="p-2.5 text-gray-300 hover:text-red-600 hover:bg-red-100/50 hover:shadow-inner rounded-xl transition-all js_delete shadow-sm" title="Remove Category">
                      <i class="fa fa-trash-o js_delete"></i>
                  </button>
                  <button v-if="canEdit" class="p-2.5 text-gray-300 hover:text-blue-600 hover:bg-blue-100/50 hover:shadow-inner rounded-xl transition-all shadow-sm" title="Configure Category" @click.stop="setCurrentSelection(pc, $event)">
                      <i class="fa fa-ellipsis-v"></i>
                  </button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Right Column: Available Pool -->
      <div class="lg:col-span-5">
         <div class="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden flex flex-col h-full sticky top-4">
            <div class="px-8 py-6 bg-gray-50/50 border-b border-gray-100">
                <div class="space-y-1">
                    <div class="flex items-center gap-3">
                        <div class="h-8 w-1 bg-blue-500 rounded-full"></div>
                        <h3 class="text-base font-black text-gray-800 tracking-tight uppercase tracking-widest">Available Pool</h3>
                    </div>
                    <div class="text-xs text-gray-500 pl-4 italic">Drag and drop to the "Active Categories" section or click on + Icon to add</div>
                </div>
            </div>

            <!-- Search Available -->
            <div v-if="showSearch('allSiteCategories')" class="px-8 py-4 border-b border-gray-100 bg-gray-50/30">
                <div class="relative">
                    <i class="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      v-model="searchKeyCategory"
                      class="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 shadow-sm outline-none"
                      placeholder="Find category..."
                      type="text"
                    />
                </div>
            </div>

            <ul id="draggableItems" class="flex-1 divide-y divide-gray-50 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-200">
              <li
                v-for="category in filterData('allSiteCategories')"
                :key="category.category_id"
                :data-category-id="category.category_id"
                class="px-8 py-5 flex items-center justify-between hover:bg-blue-50/30 transition-all group js_item cursor-grab active:cursor-grabbing"
              >
                <div class="flex items-center gap-3">
                    <div class="w-6 h-6 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-100 text-[10px] font-black group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-700 transition-all">
                        {{ category.category_id }}
                    </div>
                    <span class="text-sm font-bold text-gray-600 group-hover:text-blue-900 transition-colors">{{ category.category_name }}</span>
                </div>
                <i class="fa fa-plus text-xs text-blue-300 group-hover:text-blue-600 transition-all translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 cursor-pointer" @click="addToCurrentPlatform(category)"></i>
              </li>
            </ul>
         </div>
      </div>
    </div>
    <!-- Singleton Popover Structure -->
    <div :style="popoverTriggerStyle" class="fixed pointer-events-none z-[9999]">
        <HcPopover ref="globalPopover" position="left-start" title="Configuration Tool">
            <div class="w-1 h-1"></div>
            <template #content>
                <div class="w-72 space-y-5 pointer-events-auto">
                    <div class="space-y-2">
                        <label class="text-[10px] font-black text-blue-500 ml-1 uppercase tracking-tighter">Target Theme Overlay</label>
                        <select v-model="currentSelection.theme_id" class="w-full bg-white border border-gray-200 text-sm rounded-lg px-5 py-4 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm cursor-pointer hover:border-blue-300">
                          <option value="">Select a Theme</option>
                          <option v-for="theme in siteThemes" :key="theme.id" :value="theme.id">{{ theme.name }}</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] font-black text-blue-500 ml-1 uppercase tracking-tighter">Custom Cache Partition</label>
                        <input v-model="currentSelection.cache_category" class="w-full bg-white border border-gray-200 text-sm rounded-lg px-5 py-4 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm hover:border-blue-300" placeholder="e.g. partition_01" />
                    </div>
                    <button class="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-lg shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-95 text-[10px] uppercase tracking-widest mt-2" @click="setThemeEtc()">
                      Save
                    </button>
                </div>
            </template>
        </HcPopover>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick, getCurrentInstance } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import Sortable from "sortablejs";
import { Toast, SafeJsonParse } from "../../../helpers/common";
import HcPopover from "../ui-kit/HcPopover.vue";

const props = defineProps([
  "dataSiteId",
  "dataSitePlatforms",
  "dataSiteCategories",
  "dataSiteThemes",
  "dataSiteMicrosites",
  "dataPlatformId",
  "dataMicrositeId",
  "dataCategories",
  "dataUserRights",
]);

const instance = getCurrentInstance();

// State
const checkAll = ref(false);
const showCheckbox = ref(false);
const sitePlatforms = ref(SafeJsonParse(props.dataSitePlatforms, []));
const siteCategories = ref(SafeJsonParse(props.dataSiteCategories, []));
const siteThemes = ref(SafeJsonParse(props.dataSiteThemes, []));
const siteMicrosites = ref(SafeJsonParse(props.dataSiteMicrosites, []));
const categories = ref(SafeJsonParse(props.dataCategories, []));

const platformId = ref(
  typeof props.dataPlatformId === "undefined" || props.dataPlatformId === ""
    ? 1
    : parseInt(props.dataPlatformId)
);
const micrositeId = ref(
  typeof props.dataMicrositeId === "undefined" || props.dataMicrositeId === ""
    ? 0
    : parseInt(props.dataMicrositeId)
);

const searchKeyPlatformCategory = ref("");
const searchKeyCategory = ref("");
const applicableForAllPlatforms = ref(false);
const categoryId = ref(0);
const currentSelection = reactive({
  category_id: 0,
  theme_id: "",
  cache_category: "",
});

const allCategories = reactive([]);
const allCategoriesInfo = reactive({});
const allSiteCategories = reactive([]);

const siteId = ref(
  typeof props.dataSiteId === "undefined" ? 1 : parseInt(props.dataSiteId)
);
const showUpdateAllBtn = ref(true);
const showUpdateAllDiv = ref(false);
const globalTheme = ref("");
const userRights = ref(SafeJsonParse(props.dataUserRights, []));
const popoverTriggerStyle = ref({ top: "0px", left: "0px" });

// Refs
const droppableArea = ref(null);
const globalPopover = ref(null);

// Computed
const hasPlatformsMoreThanOne = computed(() => sitePlatforms.value.length > 1);
const hasMicrosites = computed(() => siteMicrosites.value.length > 0);
const canEdit = computed(() => userRights.value.indexOf("edit") >= 0);
const canDelete = computed(() => userRights.value.indexOf("delete") >= 0);

// Methods
const getThemeName = (id) => {
  for (let i = 0; i < siteThemes.value.length; i++) {
    if (siteThemes.value[i].id == id) {
      return siteThemes.value[i].name;
    }
  }
  return "";
};

const getCategoryInfo = (catId, findIn = "allSiteCategories") => {
  let found = null;
  let whereArr = findIn === "allSiteCategories" ? allSiteCategories : allCategories;

  for (let i = 0; i < whereArr.length; i++) {
    let current = whereArr[i];
    if (parseInt(current.category_id) === parseInt(catId)) {
      found = current;
      break;
    }
  }
  return found;
};

const findIndex = (catId, findIn = "allCategories") => {
  let index = -1;
  let whereArr = findIn === "allCategories" ? allCategories : allSiteCategories;
  if (whereArr.length > 0) {
    for (let i = 0; i < whereArr.length; i++) {
      let current = whereArr[i];
      if (parseInt(current.category_id) === parseInt(catId)) {
        index = i;
        break;
      }
    }
  }
  return index;
};

const getWhere = () => {
  return {
    microsite_id: micrositeId.value,
    platform_id: platformId.value,
    category_id: categoryId.value,
    site_id: siteId.value,
  };
};

const saveNow = (url, dataToSend) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, dataToSend)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

const updateIndex = () => {
  let allCategoriesElems = document.querySelectorAll(".js_category li");
  let pId = platformId.value;
  let datas = [];
  for (let i = 0; i < allCategoriesElems.length; i++) {
    let current = allCategoriesElems[i];
    let catInfo = getCategoryInfo(
      current.getAttribute("data-category-id"),
      "allCategories"
    );
    let dataObj = { position: i + 1 };
    let where = {
      category_id: catInfo.category_id,
      platform_id: pId,
    };
    datas.push({ where, data: dataObj });
  }

  if (datas.length > 0) {
    let url = AdminConfig.admin_path("category/updateIndex");
    let postParams = { data: datas };
    saveNow(url, postParams)
      .then(() => {
        Toast.show(instance, "Saved...");
      })
      .catch((res) => {
        Toast.show(instance, res.data.message, 2000);
      });
  }
};

const removeCategory = (id) => {
  let index = findIndex(id);
  if (index !== -1) {
    let categoryInfo = allCategories.splice(index, 1);
    removeNow(categoryInfo[0]);
    return categoryInfo;
  }

  function removeNow(catInfo) {
    let url = AdminConfig.admin_path("category/deleteCategory");
    let postParams = {};
    let where = getWhere();

    postParams.where = {
      category_id: catInfo.category_id,
      microsite_id: where.microsite_id,
    };

    if (!applicableForAllPlatforms.value) {
      postParams.where.platform_id = where.platform_id;
    }
    saveNow(url, postParams)
      .then(() => {
        Toast.show(instance, "Deleted successfully!");
      })
      .catch((res) => {
        Toast.show(instance, res.data.message, 2000);
      });
  }
};

const addCategory = (category) => {
  let index = findIndex(category.category_id);
  let isAddedAlreadyFlag = false;
  if (index === -1) {
    allCategoriesInfo[category.category_id.toString()] = {
      index: index,
      info: category,
    };

    setTimeout(function () {
      updateInDB();
    }, 1);

    isAddedAlreadyFlag = allCategories.push(category);
  }

  return isAddedAlreadyFlag;

  function updateInDB() {
    let url = AdminConfig.admin_path("category/insertCategory");
    let where = getWhere();
    let postParams = {};
    const categoryClone = { ...category };
    delete categoryClone["name"];
    categoryClone.platform_id = where.platform_id;
    postParams.data = {
      category_id: categoryClone.category_id,
      platform_id: where.platform_id,
      site_id: where.site_id,
    };
    postParams.applicableForAllPlatforms = applicableForAllPlatforms.value;
    saveNow(url, postParams)
      .then(() => {
        Toast.show(instance, "Saved...");
      })
      .catch((res) => {
        Toast.show(instance, res.data.message, 2000);
      });
  }
};

const highlightEagerDrop = (addRemove = "add") => {
  let js_hook_modules = document.querySelectorAll(".js_category");
  js_hook_modules.forEach(function (current) {
    current.classList[addRemove]("module-drop-eager");
  });
};

const enableSorting = () => {
  nextTick(function () {
    let list = document.querySelectorAll(".js_category");
    list.forEach(function (current) {
      Sortable.create(current, {
        animation: 200,
        filter: ".js_delete",
        group: {
          name: "droppable",
          put: "modulesBox",
        },
        onFilter: function (evt) {
          let item = evt.item,
            ctrl = evt.target;
          let id = item.getAttribute("data-category-id");
          if (Sortable.utils.is(ctrl, ".js_delete")) {
            removeCategory(id);
          }
        },
        onUpdate: function () {
          updateIndex();
        },
      });
    });

    let draggableModules = document.getElementById("draggableItems");
    Sortable.create(draggableModules, {
      animation: 200,
      draggable: ".js_item",
      group: {
        name: "modulesBox",
        pull: "clone",
        revertClone: true,
      },
      sort: false,
      ghostClass: ".js_category",
      onEnd: function (evt) {
        let item = evt.item;
        let catId = item.getAttribute("data-category-id");

        if (catId) {
          let catInfo = getCategoryInfo(catId, "allSiteCategories");
          let isAddedValue;
          if (catInfo !== null) {
            isAddedValue = addCategory(catInfo);
          }
          item.parentNode.removeChild(item);
          highlightEagerDrop("remove");

          if (isAddedValue === false) {
            Toast.show(instance, "Category is already added in this platform...");
          }
        }
      },
      onStart: function () {
        highlightEagerDrop("add");
      },
    });
  });
};

const makeData = () => {
  let cats = categories.value;
  let selected = false;
  if (cats.length > 0) {
    cats.forEach(function (current) {
      let catId = current.category_id;
      let catName = current.lang.name || current.category_name;
      let tId = current.theme_id;
      let cPart = current.cache_category;
      let obj = {
        category_id: catId,
        category_name: catName,
        theme_id: tId,
        cache_category: cPart,
        selected,
      };
      allCategories.push(obj);
      allCategoriesInfo[catId.toString()] = obj;
    });
  }

  cats = siteCategories.value;
  if (cats.length > 0) {
    cats.forEach(function (current) {
      let obj = {
        category_id: current.category_id,
        category_name: current.name,
        theme_id: "",
        cache_category: "",
        selected,
      };
      allSiteCategories.push(obj);
    });
  }
};

const selectAllData = (findIn = "allCategories", holder) => {
  let whereArr = findIn === "allCategories" ? allCategories : allSiteCategories;
  let selectedValue = holder.checked;
  whereArr.forEach(function (current) {
    current.selected = selectedValue;
  });
};

const showSearch = (findIn = "allCategories") => {
  let whereArr = findIn === "allCategories" ? allCategories : allSiteCategories;
  return whereArr.length > 10;
};

const filterData = (findIn = "allCategories") => {
  let key =
    findIn === "allCategories"
      ? searchKeyPlatformCategory.value
      : searchKeyCategory.value;
  let whereArr = findIn === "allCategories" ? allCategories : allSiteCategories;
  if (key !== "" && key != null) {
    key = key.toLowerCase();
    return whereArr.filter(function (current) {
      let name = current.category_name.toLowerCase();
      let id = current.category_id;
      return id.toString() === key.toString() || name.includes(key);
    });
  } else {
    return whereArr;
  }
};

const setCurrentSelection = (pc, event) => {
  if (globalPopover.value) {
    globalPopover.value.close();
  }

  currentSelection.theme_id = pc.theme_id;
  currentSelection.category_id = pc.category_id;
  currentSelection.cache_category = pc.cache_category;

  const rect = event.currentTarget.getBoundingClientRect();
  popoverTriggerStyle.value = {
    top: `${rect.top}px`,
    left: `${rect.left}px`,
  };

  setTimeout(() => {
    if (globalPopover.value) {
      globalPopover.value.isOpen = true;
      globalPopover.value.checkOverflow();
    }
  }, 50);
};

const closePopup = () => {
  if (globalPopover.value) {
    globalPopover.value.close();
  }
};

const fetchNewData = () => {
  let where = getWhere();
  delete where.category_id;
  if (where.microsite_id === 0) {
    delete where.microsite_id;
  }
  let url = "category/settings";
  window.location.href = AdminConfig.admin_path(url, where);
};

const setThemeEtc = () => {
  let current = currentSelection;
  let index = findIndex(current.category_id);

  if (index !== -1) {
    allCategories[index].theme_id = current.theme_id;
    allCategories[index].cache_category = current.cache_category;
    categoryId.value = parseInt(current.category_id);

    let postParams = {};
    postParams.where = getWhere();
    postParams.data = {
      cache_category: current.cache_category || "",
      theme_id: current.theme_id,
    };
    postParams.applicableForAllPlatforms = applicableForAllPlatforms.value;

    let url = AdminConfig.admin_path("category/updateThemeAndEtc");
    saveNow(url, postParams)
      .then(() => {
        Toast.show(instance, "Saved...");
      })
      .catch((res) => {
        Toast.show(instance, res.data.message, 2000);
      });
  }
  closePopup();
};

const updateThemeToAllCategories = () => {
  let url = AdminConfig.admin_path("category/updateThemeForAllCategories");
  let cats = filterData("allCategories");

  if (globalTheme.value !== "") {
    if (cats.length > 0) {
      let where = getWhere();
      delete where.category_id;
      delete where.microsite_id;

      let postParams = {
        data: { theme_id: globalTheme.value },
        where: where,
      };
      Toast.show(instance, "Please wait...");
      saveNow(url, postParams)
        .then((res) => {
          if (res.data["error"]) {
            Toast.show(instance, res.data.message, 5000);
          } else {
            Toast.show(instance, "Saved");
            for (let i = 0; i < cats.length; i++) {
              cats[i].theme_id = globalTheme.value;
            }
          }
        })
        .catch((res) => {
          Toast.show(instance, res.data.message, 2000);
        });
    }
  }
};

const addToCurrentPlatform = (category) => {
  if (canEdit.value) {
    addCategory(category);
  } else {
    Toast.show(instance, "You don't have permission", { error: true });
  }
};

const init = () => {
  makeData();
  if (canEdit.value) {
    enableSorting();
  }
};

onMounted(() => {
  init();
});
</script>

