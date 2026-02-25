<template>
  <div>
    <div
      v-show="
        hasMicrosites || hasPlatformsMoreThanOne || hasPlatformsMoreThanOne
      "
      class="row"
    >
      <div v-show="hasMicrosites" class="col-auto">
        <select
          v-model="micrositeId"
          class="form-select select"
          @change="fetchNewData()"
        >
          <option value="0">Select a MicroSite</option>
          <option v-for="microsite in siteMicrosites" :value="microsite.id">
            {{ microsite.name }}
          </option>
        </select>
      </div>
      <div class="col-auto">
        <select
          v-show="hasPlatformsMoreThanOne"
          v-model="platformId"
          class="form-select select"
          @change="fetchNewData()"
        >
          <option>Select a Platform</option>
          <option v-for="platform in sitePlatforms" :value="platform.id">
            {{ platform.name }}
          </option>
        </select>
      </div>
      <div class="col-auto">
        <label
          v-show="hasPlatformsMoreThanOne"
          title="It will be inserted or deleted for all platforms if checks."
        >
          <input
            v-model="applicableForAllPlatforms"
            name="applicableForAll"
            type="checkbox"
          />
          Enable add/delete for all platforms</label
        >
      </div>
    </div>
    <div class="row mt-3" v-if="!canEdit">
      <div class="col-auto">
        <p class="alert alert-warning">You have read only access.</p>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-4">
        <div class="panel panel-success shadow border">
          <div class="panel-heading p-4">
            <input
              class="hide"
              type="checkbox"
              @click="selectAllData('allCategories', $event.target)"
            />
            Drop in below panel to enable the category for this site.
            <button
              v-if="showUpdateAllBtn"
              aria-label="More Info"
              class="btn btn-default js_info icon-btn pull-right"
              style="top: -7px; position: relative; right: -9px"
              title="Update in all categories"
              type="button"
              @click="showUpdateAllDiv = !showUpdateAllDiv"
            >
              <i aria-hidden="true" class="fa fa-ellipsis-v js_info"></i>
            </button>
          </div>
          <div
            v-if="showUpdateAllDiv"
            class="panel-body p-3"
            style="background-color: #f3f3f3"
          >
            <p class="text-danger">
              Be careful while using this. Changing this dropdown will effect to
              all categories.
            </p>
            <select
              v-model="globalTheme"
              class="form-select margin-bottom-05"
              @change="updateThemeToAllCategories()"
            >
              <option value="">Select a Theme</option>
              <option v-for="theme in siteThemes" :value="theme.id">
                {{ theme.name }}
              </option>
            </select>
          </div>
          <div
            v-if="showSearch('allCategories')"
            class="panel-sub-heading"
            style="padding: 4px"
          >
            <div class="input-group">
              <span class="input-group-addon">Search</span>
              <input
                v-model="searchKeyPlatformCategory"
                aria-describedby="basic-addon3"
                class="form-control"
                placeholder="Search by id or name"
                type="text"
              />
            </div>
          </div>
          <ul
            ref="droppableArea"
            class="list-group category-items js_category"
            style="min-height: 200px"
          >
            <li
              v-for="platformCategory in filterData('allCategories')"
              :data-cache-category="platformCategory.cache_category"
              :data-category-id="platformCategory.category_id"
              :data-theme-id="platformCategory.theme_id"
              class="list-group-item js_item"
              @click="setCurrentSelection($event)"
            >
              <input
                v-show="showCheckbox"
                v-model="platformCategory.selected"
                type="checkbox"
              />
              {{ platformCategory.category_name }}
              <small
                v-show="platformCategory.theme_id > 0"
                class="text-info"
                title="Theme"
              >
                -
                {{ getThemeName(platformCategory.theme_id) }}
              </small>
              <small
                v-show="platformCategory.theme_id <= 0"
                class="text-danger"
              >
                <br />Theme is missing</small
              >
              <span
                class="btn-toolbar pull-right toolbar-category"
                role="toolbar"
              >
                <span class="btn-group">
                  <button
                    v-if="canDelete"
                    aria-label="Delete from this platform"
                    class="btn btn-default icon-btn js_delete"
                    title="Delete from this platform"
                    type="button"
                  >
                    <span
                      aria-hidden="true"
                      class="fa fa-trash-o js_delete"
                    ></span>
                  </button>
                  <button
                    v-if="canEdit"
                    aria-label="More Info"
                    class="btn btn-default js_info icon-btn"
                    title="More Info"
                    type="button"
                  >
                    <i aria-hidden="true" class="fa fa-ellipsis-v js_info"></i>
                  </button>
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-info margin-top-20">
          <div class="panel-heading p-4">Drag and drop from here</div>
          <div
            v-if="showSearch('allSiteCategories')"
            class="panel-sub-heading"
            style="padding: 4px"
          >
            <div class="input-group">
              <span class="input-group-addon">Search</span>
              <input
                v-model="searchKeyCategory"
                aria-describedby="basic-addon3"
                class="form-control"
                placeholder="Search by id or name"
                type="text"
              />
            </div>
          </div>
          <ul id="draggableItems" class="list-group">
            <li
              v-for="category in filterData('allSiteCategories')"
              :data-category-id="category.category_id"
              class="list-group-item js_item"
            >
              {{ category.category_name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      ref="popover"
      class="popover hide bs-popover-end shadow"
      data-popper-placement="right"
      role="tooltip"
    >
      <p class="popover-header">
        Set theme etc for this category
        <span
          aria-label="Close"
          class="pull-right fa fa-close close"
          title="Close"
          @click="closePopup()"
        ></span>
      </p>
      <div class="popover-body">
        <select v-model="currentSelection.theme_id" class="form-select mb-2">
          <option value="">Select a Theme</option>
          <option v-for="theme in siteThemes" :value="theme.id">
            {{ theme.name }}
          </option>
        </select>
        <input
          v-model="currentSelection.cache_category"
          class="form-control mb-2"
          name="cache_category"
          placeholder="Enter cache category"
          type="text"
        />
        <div class="text-center">
          <button class="btn btn-primary text-center" @click="setThemeEtc()">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick, getCurrentInstance } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import Sortable from "sortablejs";
import { Toast, SafeJsonParse } from "../../../helpers/common";

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
const droppableArea = ref(null);
const popover = ref(null);

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
const currentSelection = reactive({ category_id: 0, theme_id: "", cache_category: "" });
const allCategories = ref([]);
const allCategoriesInfo = reactive({});
const allSiteCategories = ref([]);
const siteId = ref(typeof props.dataSiteId === "undefined" ? 1 : parseInt(props.dataSiteId));
const showUpdateAllBtn = ref(true);
const showUpdateAllDiv = ref(false);
const globalTheme = ref("");
const userRights = ref(SafeJsonParse(props.dataUserRights, []));

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

const getWhere = () => {
  return {
    microsite_id: micrositeId.value,
    platform_id: platformId.value,
    category_id: categoryId.value,
    site_id: siteId.value,
  };
};

const saveNow = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((response) => resolve(response))
      .catch((error) => reject(error.response));
  });
};

const getCategoryInfo = (catId, findIn = "allSiteCategories") => {
  let found = null;
  const whereArr = findIn === "allSiteCategories" ? allSiteCategories.value : allCategories.value;

  for (let i = 0; i < whereArr.length; i++) {
    const current = whereArr[i];
    if (parseInt(current.category_id) === parseInt(catId)) {
      found = current;
      break;
    }
  }
  return found;
};

const findIndex = (catId, findIn = "allCategories") => {
  let index = -1;
  const whereArr = findIn === "allCategories" ? allCategories.value : allSiteCategories.value;
  if (whereArr.length > 0) {
    for (let i = 0; i < whereArr.length; i++) {
      const current = whereArr[i];
      if (parseInt(current.category_id) === parseInt(catId)) {
        index = i;
        break;
      }
    }
  }
  return index;
};

const updateIndex = () => {
  const allCatsElements = document.querySelectorAll(".js_category li");
  const pId = platformId.value;
  const datas = [];
  for (let i = 0; i < allCatsElements.length; i++) {
    const current = allCatsElements[i];
    const categoryInfo = getCategoryInfo(current.getAttribute("data-category-id"), "allCategories");
    const data = { position: i + 1 };
    const where = {
      category_id: categoryInfo.category_id,
      platform_id: pId,
    };
    datas.push({ where, data });
  }

  if (datas.length > 0) {
    const url = AdminConfig.admin_path("category/updateIndex");
    const postParams = { data: datas };
    saveNow(url, postParams)
      .then(() => {
        Toast.show(instance, "Saved...");
      })
      .catch((res) => {
        Toast.show(instance, res.data.message, 2000);
      });
  }
};

const closePopup = () => {
  if (popover.value) {
    popover.value.classList.add(...["animated", "fadeOut", "hide"]);
  }
};

const showInfo = (source, target, where = "center-right") => {
  target.classList.remove(...["animated", "fadeOut", "hide"]);
  const srcOpt = source.getBoundingClientRect();
  const tgtOpt = target.getBoundingClientRect();

  const left = srcOpt.left + srcOpt.width;
  const top = srcOpt.top + srcOpt.height - tgtOpt.height / 2;

  target.classList.add(...["animated", "jello"]);

  switch (where) {
    case "center-right":
      target.style.position = "absolute";
      target.style.left = left + "px";
      target.style.top = top + "px";
      break;
  }
};

const setCurrentSelection = (evt) => {
  const target = evt.currentTarget;
  const span = evt.target;

  const catId = target.getAttribute("data-category-id");
  const tId = target.getAttribute("data-theme-id");

  const categoryInfo = getCategoryInfo(catId, "allCategories");

  currentSelection.theme_id = tId;
  currentSelection.category_id = catId;
  currentSelection.cache_category = categoryInfo.cache_category;

  if (span.classList.contains("js_info")) {
    showInfo(target, popover.value);
  }
};

const fetchNewData = () => {
  const where = getWhere();
  delete where.category_id;
  if (where.microsite_id === 0) {
    delete where.microsite_id;
  }
  const url = "category/settings";
  window.location.href = AdminConfig.admin_path(url, where);
};

const highlightEagerDrop = (addRemove = "add") => {
  const js_hook_modules = document.querySelectorAll(".js_category");
  js_hook_modules.forEach((current) => {
    current.classList[addRemove]("module-drop-eager");
  });
};

const removeCategory = (id) => {
  const index = findIndex(id);
  if (index !== -1) {
    const categoryInfo = allCategories.value.splice(index, 1)[0];
    
    const url = AdminConfig.admin_path("category/deleteCategory");
    const where = getWhere();
    const postParams = {
      where: {
        category_id: categoryInfo.category_id,
        microsite_id: where.microsite_id,
      },
    };

    if (!applicableForAllPlatforms.value) {
      postParams.where.platform_id = where.platform_id;
    }
    
    saveNow(url, postParams)
      .then(() => {
        Toast.show(instance, "Saved...");
      })
      .catch((res) => {
        Toast.show(instance, res.data.message, 2000);
      });
    return [categoryInfo];
  }
};

const addCategory = (category) => {
  const index = findIndex(category.category_id);
  let isAdded = false;
  if (index === -1) {
    const catIdStr = category.category_id.toString();
    allCategoriesInfo[catIdStr] = {
      index: index,
      info: category,
    };

    const updateInDB = () => {
      const url = AdminConfig.admin_path("category/insertCategory");
      const where = getWhere();
      const postParams = {};
      const categoryData = { ...category };
      delete categoryData["name"];
      categoryData.platform_id = where.platform_id;
      postParams.data = {
        category_id: categoryData.category_id,
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
    };

    setTimeout(updateInDB, 1);
    isAdded = allCategories.value.push(category);
  }
  return isAdded;
};

const enableSorting = () => {
  nextTick(() => {
    const list = document.querySelectorAll(".js_category");
    list.forEach((current) => {
      Sortable.create(current, {
        animation: 200,
        filter: ".js_delete",
        group: {
          name: "droppable",
          put: "modulesBox",
        },
        onFilter: (evt) => {
          const item = evt.item;
          const ctrl = evt.target;
          const id = item.getAttribute("data-category-id");
          if (Sortable.utils.is(ctrl, ".js_delete")) {
            removeCategory(id);
          }
        },
        onUpdate: () => {
          updateIndex();
        },
      });
    });

    const draggableModules = document.getElementById("draggableItems");
    if (draggableModules) {
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
        onEnd: (evt) => {
          const item = evt.item;
          const catId = item.getAttribute("data-category-id");
          if (catId) {
            const categoryInfo = getCategoryInfo(catId, "allSiteCategories");
            let isAddSuccess;
            if (categoryInfo !== null) {
              isAddSuccess = addCategory(categoryInfo);
            }
            item.parentNode.removeChild(item);
            highlightEagerDrop("remove");
            if (isAddSuccess === false) {
              Toast.show(instance, "Category is already added in this platform...");
            }
          }
        },
        onStart: () => {
          highlightEagerDrop("add");
        },
      });
    }
  });
};

const makeData = () => {
  if (categories.value.length > 0) {
    categories.value.forEach((current) => {
      const obj = {
        category_id: current.category_id,
        category_name: current.lang.name || current.category_name,
        theme_id: current.theme_id,
        cache_category: current.cache_category,
        selected: false,
      };
      allCategories.value.push(obj);
      allCategoriesInfo[current.category_id.toString()] = obj;
    });
  }

  if (siteCategories.value.length > 0) {
    siteCategories.value.forEach((current) => {
      const obj = {
        category_id: current.category_id,
        category_name: current.name,
        theme_id: "",
        cache_category: "",
        selected: false,
      };
      allSiteCategories.value.push(obj);
    });
  }
};

const selectAllData = (findIn = "allCategories", holder) => {
  const whereArr = findIn === "allCategories" ? allCategories.value : allSiteCategories.value;
  const selected = holder.checked;
  whereArr.forEach((current) => {
    current.selected = selected;
  });
};

const showSearch = (findIn = "allCategories") => {
  const whereArr = findIn === "allCategories" ? allCategories.value : allSiteCategories.value;
  return whereArr.length > 10;
};

const filterData = (findIn = "allCategories") => {
  let key = findIn === "allCategories" ? searchKeyPlatformCategory.value : searchKeyCategory.value;
  const whereArr = findIn === "allCategories" ? allCategories.value : allSiteCategories.value;
  if (key !== "" && key != null) {
    key = key.toLowerCase();
    return whereArr.filter((current) => {
      const name = current.category_name.toLowerCase();
      const id = current.category_id;
      return id.toString() === key.toString() || name.includes(key);
    });
  }
  return whereArr;
};

const setThemeEtc = () => {
  const current = currentSelection;
  const index = findIndex(current.category_id);

  if (index !== -1) {
    allCategories.value[index].theme_id = current.theme_id;
    allCategories.value[index].cache_category = current.cache_category;
    categoryId.value = parseInt(current.category_id);

    const postParams = {
      where: getWhere(),
      data: {
        cache_category: current.cache_category || "",
        theme_id: current.theme_id,
      },
      applicableForAllPlatforms: applicableForAllPlatforms.value,
    };

    const url = AdminConfig.admin_path("category/updateThemeAndEtc");
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
  const url = AdminConfig.admin_path("category/updateThemeForAllCategories");
  const filteredCats = filterData("allCategories");

  if (globalTheme.value !== "") {
    if (filteredCats.length > 0) {
      const where = getWhere();
      delete where.category_id;
      delete where.microsite_id;

      const postParams = {
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
            filteredCats.forEach((cat) => {
              cat.theme_id = globalTheme.value;
            });
          }
        })
        .catch((res) => {
          Toast.show(instance, res.data.message, 2000);
        });
    }
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

