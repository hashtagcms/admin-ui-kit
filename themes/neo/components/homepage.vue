<template>
  <div class="row mt-2 pb-2 border-bottom">
    <div v-show="hasMicrosites" class="col-auto">
      <select
        v-model="microSiteId"
        class="form-select select"
        @change="fetchNewData()"
      >
        <option value="0">Select a MicroSite</option>
        <option v-for="microsite in microsites" :value="microsite.id">
          {{ microsite.name }}
        </option>
      </select>
    </div>
    <div class="col-auto">
      <select
        v-model="categoryId"
        class="form-select select"
        @change="fetchNewData()"
      >
        <option>Select a Category</option>
        <option v-for="category in categories" :value="category.category_id">
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="col-auto">
      <select
        v-show="hasPlatformMoreThanOne"
        v-model="platformId"
        class="form-select select"
        @change="fetchNewData()"
      >
        <option>Select a Platform</option>
        <option v-for="platform in platforms" :value="platform.id">
          {{ platform.name }}
        </option>
      </select>
    </div>
    <div class="col-auto" v-show="hasTheme">
      <span
        class="hand"
        title="Click to see theme info"
        @click="showInfo('theme', themeInfo.id)"
        >Theme: <u>{{ themeInfo.name }}</u></span
      >
    </div>
    <div class="col d-flex justify-content-end">
      <div v-if="hasTheme" class="btn-group">
        <button
          v-if="canDelete"
          aria-label="Delete All Modules form this category"
          class="btn btn-danger"
          title="Delete All Modules form this category"
          type="button"
          @click="showHideDeleteAlert(true)"
        >
          <span aria-hidden="true" class="fa fa-trash-o"></span>
        </button>
        <button
          aria-label="Copy Data From"
          class="btn btn-outline-secondary"
          title="Copy Data From"
          type="button"
          @click="showHideCopyAlert(true)"
        >
          <span aria-hidden="true" class="fa fa-copy"></span>
        </button>
      </div>
    </div>
  </div>
  <div class="row mt-3" v-if="hasError">
    <div class="col left-zero">
      <div class="alert alert-danger col-md-8">
        <ul>
          <li v-for="error in errors" v-html="error.message"></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col col-9">
      <div class="row homepage-modules">
        <div v-for="hook in hooks" :ref="setPanelRef(hook.info.id)" class="col-4">
          <div class="non-selectable shadow-sm card mb-3">
            <div
              class="card-header hook-header"
              @dblclick="showHideHookPanel(hook.info.id)"
            >
              <span class="pull-right small"
                ><span
                  :class="'fa hand fa-expand'"
                  title="Expand/Contract"
                  @click="onlyMe(hook.info.id)"
                ></span>
                &nbsp;<span
                  class="fa fa-minus hand"
                  title="Minimize/Maximize"
                  @click="showHideHookPanel(hook.info.id)"
                ></span
              ></span>
              <a
                href="javascript:void(0)"
                @click="showInfo('hook', hook.info.id)"
              >
                {{ hook.info.name }}</a
              >
            </div>
            <div
              :ref="setHookPanelRef(hook.info.id)"
              class="card-body hook_modules js_modules"
            >

              <ul
                :data-hook-id="hook.info.id"
                class="list-group list-group-flush modules-list js_modules js_hook_modules"
              >
                <template v-if="hook.modules.length > 0">
                  <li
                    v-for="module in hook.modules"
                    :data-module-id="module.id"
                    class="js_item"
                  >
                    <a
                      href="javascript:void(0)"
                      @click="showInfo('module', module.id)"
                      >{{ module.name }}</a
                    >
                    <span
                      v-if="canDelete"
                      :data-hook-id="hook.info.id"
                      class="js_delete delete hand pull-right fa fa-trash-o"
                      title="Delete this module from the hook"
                    ></span>
                  </li>
                </template>
              </ul>
            </div>
            <div
              class="card-footer bg-gradient border-light"
              v-if="hasAnyModulesInAHook(hook) && canDelete"
            >
              <span
                @click="deleteAllModuleFromHook(hook.info.id)"
                class="js_delete_from_hook hand pull-right fa fa-trash-o"
                title="Delete all module from this hook"
                :data-hook-id="hook.info.id"
              ></span>
            </div>
          </div>
        </div>
        <div v-if="hasTheme" ref="savePanel" class="clearboth text-center pt-5">
          <button :class="saveButtonCss" type="button" @click="saveModules()">
            Save Now!
          </button>
        </div>
      </div>
    </div>
    <div class="col col-3" v-if="!hasError">
      <div class="panel-sub-heading">
        <div class="input-group">
          <input
            v-model="searchKey"
            aria-describedby="basic-addon3"
            class="form-control"
            placeholder="Search by id, name or alias"
            type="text"
          />
        </div>
      </div>
      <ul id="draggableModules" class="modules-list all-modules-right">
        <li
          v-for="module in filterModules"
          :data-module-id="module.id"
          class="js_item"
        >
          <span v-html="module.name"></span>
          <span class="delete hand pull-right fa fa-trash-o"></span>
        </li>
      </ul>
    </div>
  </div>

  <modal-box ref="copyBox" data-show-footer="true" :data-modal-css="modalCss">
    <template #title> Copy Data </template>
    <template #content>
      <div class="row">
        <div class="col-1 p-1">
          <label class="col-md-3 d-flex">From:</label>
        </div>
        <div class="col-auto p-1" v-if="hasSiteMoreThanOne">
          <select v-model="fromData.site_id" class="form-select select-sm">
            <option value="0">Select a MicroSite</option>
            <option v-for="site in allSites" :value="site.id">
              {{ site.name }}
            </option>
          </select>
        </div>
        <div class="col-auto p-1" v-if="hasMicrosites">
          <select v-model="fromData.microsite_id" class="form-select select-sm">
            <option value="0">Select a Microsite</option>
            <option v-for="microsite in microsites" :value="microsite.id">
              {{ microsite.name }}
            </option>
          </select>
        </div>
        <div class="col-auto p-1" v-if="hasPlatformMoreThanOne">
          <select v-model="fromData.platform_id" class="form-select select-sm">
            <option value="0">Select a Platform</option>
            <option v-for="platform in platforms" :value="platform.id">
              {{ platform.name }}
            </option>
          </select>
        </div>
        <div class="col-auto p-1">
          <select class="form-select select-sm" v-model="fromData.category_id">
            <option value="0">Select a Category</option>
            <option
              v-for="category in fromCategories"
              :value="category.category_id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-1 p-1">
          <label class="col-md-3 d-flex">To:</label>
        </div>
        <div class="col-auto p-1" v-if="hasSiteMoreThanOne">
          <select v-model="toData.site_id" class="form-select select-sm">
            <option value="0">Select a MicroSite</option>
            <option v-for="site in allSites" :value="site.id">
              {{ site.name }}
            </option>
          </select>
        </div>
        <div class="col-auto p-1" v-if="hasMicrosites">
          <select v-model="toData.microsite_id" class="form-select select-sm">
            <option value="0">Select a MicroSite</option>
            <option v-for="microsite in microsites" :value="microsite.id">
              {{ microsite.name }}
            </option>
          </select>
        </div>
        <div class="col-auto p-1" v-if="hasPlatformMoreThanOne">
          <select v-model="toData.platform_id" class="form-select select-sm">
            <option value="0">Select a Platform</option>
            <option v-for="platform in platforms" :value="platform.id">
              {{ platform.name }}
            </option>
          </select>
        </div>
        <div class="col-auto p-1">
          <select v-model="toData.category_id" class="form-select select-sm">
            <option value="0">Select a Category</option>
            <option
              v-for="category in toCategories"
              :value="category.category_id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div v-show="hasPlatformMoreThanOne" class="plr5 v-space">
          <div class="alert alert-info">
            Please do not select <strong>source platform</strong> if you want to
            copy modules in all platforms respectively.
          </div>
        </div>
      </div>
    </template>
    <template #footer class="center-align">
      <div v-show="isWorking" class="loader">
        Please wait... <span class="fa fa-loader"></span>
      </div>
      <button
        class="btn btn-success btn-from-submit"
        @click="copyDataFromCategory()"
      >
        Copy Now
      </button>
      <button
        class="btn btn-outline-secondary"
        @click="showHideCopyAlert(false)"
      >
        Cancel
      </button>
    </template>
  </modal-box>

  <modal-box
    ref="deleteBox"
    data-show-footer="true"
    data-title-css="alert-danger"
  >
    <template #title> Warning!!! </template>
    <template #content>
      <span class="text-danger"
        >Are you sure to delete all modules from this category? Can't be
        undone.</span
      >
      <div>
        <label
          v-show="hasPlatformMoreThanOne"
          class="p-2"
          title="Delete from other platforms too"
        >
          <input v-model="applicableForAllPlatforms" type="checkbox" /> Delete
          from other platforms too</label
        >
      </div>
    </template>
    <template #footer class="center-align">
      <button class="btn btn-danger" @click="deleteAllFromCategory()">
        Yes
      </button>
      <button
        class="btn btn-outline-secondary"
        @click="showHideDeleteAlert(false)"
      >
        No
      </button>
    </template>
  </modal-box>

  <info-popup ref="infoPopup"></info-popup>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick, getCurrentInstance } from "vue";
import axios from "axios";
import AdminConfig from "../../../helpers/admin-config";
import { Toast, Modal, Loader, SafeErrorData, SafeJsonParse } from "../../../helpers/common";
import Sortable from "sortablejs";
import InfoPopup from "./info-popup.vue";
import ModalBox from "./library/modal-box.vue";

const props = defineProps([
  "dataCategories",
  "dataMicrosites",
  "dataPlatforms",
  "dataSiteId",
  "dataMicrositeId",
  "dataCategoryId",
  "dataPlatformId",
  "dataSiteInfo",
  "dataHookInfo",
  "dataAllModules",
  "dataCategoryModules",
  "dataCategoryInfo",
  "dataThemeInfo",
  "dataUserRights",
  "dataIsModuleReadonly",
  "dataAllSites",
]);

const instance = getCurrentInstance();

// Template Refs
const infoPopup = ref(null);
const copyBox = ref(null);
const deleteBox = ref(null);
const savePanel = ref(null);
const hookPanels = reactive({});
const panels = reactive({});

const setHookPanelRef = (id) => (el) => {
  if (el) hookPanels[id] = el;
};
const setPanelRef = (id) => (el) => {
  if (el) panels[id] = el;
};

// State
const categoriesData = reactive({});
const categories = ref(SafeJsonParse(props.dataCategories, []));
const microsites = ref(SafeJsonParse(props.dataMicrosites, []));
const platforms = ref(SafeJsonParse(props.dataPlatforms, []));
const siteId = ref(
  props.dataSiteId === undefined || props.dataSiteId === "" ? 1 : parseInt(props.dataSiteId)
);
const microSiteId = ref(
  props.dataMicrositeId === undefined || props.dataMicrositeId === "" ? 0 : parseInt(props.dataMicrositeId)
);
const platformId = ref(
  props.dataPlatformId === undefined || props.dataPlatformId === "" ? 1 : parseInt(props.dataPlatformId)
);
const categoryId = ref(
  props.dataCategoryId === undefined || props.dataCategoryId === "" ? 0 : parseInt(props.dataCategoryId)
);
const siteInfo = ref(SafeJsonParse(props.dataSiteInfo, []));
const hookInfo = ref(SafeJsonParse(props.dataHookInfo, []));
const allModules = ref(SafeJsonParse(props.dataAllModules, []));
const categoryModules = ref(SafeJsonParse(props.dataCategoryModules, []));
const categoryInfo = ref(SafeJsonParse(props.dataCategoryInfo, []));
const themeInfo = ref(SafeJsonParse(props.dataThemeInfo, []));
const hooks = ref([]);
const hooksInfoCache = reactive({});
const moduleInfoCache = reactive({});
const noHookFound = ref(false);
const errors = ref([]);
const enableSave = ref(false);
const searchKey = ref("");
const applicableForAllPlatforms = ref(false);
const fromData = reactive({ site_id: 0, microsite_id: 0, platform_id: 0, category_id: 0 });
const toData = reactive({ site_id: 0, microsite_id: 0, platform_id: 0, category_id: 0 });
const isWorking = ref(false);
const sortObj = reactive({ draggable: null });
const userRights = ref(SafeJsonParse(props.dataUserRights, []));
const isModuleReadonly = ref(props.dataIsModuleReadonly === "1");
const allSites = ref(SafeJsonParse(props.dataAllSites, []));
const copyForAllPlatforms = ref(false);

const modalCss = "modal-lg";

// Computed
const hasSiteMoreThanOne = computed(() => allSites.value.length > 1);
const hasMicrosites = computed(() => microsites.value.length > 0);
const hasPlatformMoreThanOne = computed(() => platforms.value.length > 1);
const hasTheme = computed(() => themeInfo.value && themeInfo.value.id);
const canEdit = computed(() => userRights.value.indexOf("edit") >= 0 && isModuleReadonly.value === false);
const canDelete = computed(() => userRights.value.indexOf("delete") >= 0 && isModuleReadonly.value === false);

const fromCategories = computed(() => categoriesData[fromData.site_id] || []);
const toCategories = computed(() => categoriesData[toData.site_id] || []);
const hasError = computed(() => errors.value.length > 0);

const saveButtonCss = computed(() => {
  const disabled = enableSave.value === true ? "" : " disabled";
  return "btn btn-success btn-form-submit" + disabled;
});

const filterModules = computed(() => {
  let key = searchKey.value;
  if (key !== "" && key != null) {
    key = key.toLowerCase();
    return allModules.value.filter((current) => {
      const alias = current.alias.toLowerCase();
      const name = current.name.toLowerCase();
      const id = current.id;
      return id.toString() === key || alias.includes(key) || name.includes(key);
    });
  } else {
    return allModules.value;
  }
});

// Helper Methods
const getHookInfo = (hookValue, byKey = "alias") => {
  const hks = hookInfo.value;
  for (let i = 0; i < hks.length; i++) {
    if (hks[i][byKey] === hookValue) return hks[i];
  }
  return null;
};

const getHook = (hookIndex) => hooks.value[hookIndex] || null;

const addErrorMessage = (message) => {
  errors.value.push({ message });
};

const showError = (response, reload = false) => {
  let message = "";
  if (typeof response === "string") {
    message = response;
  } else {
    message = response?.data?.message || "Unknown error!";
  }
  Toast.show(instance.proxy, message, 5000);
  if (reload) {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
};

const showInfo = (type, id) => {
  if (infoPopup.value) infoPopup.value.showInfo(type, id);
};

const getWhere = () => ({
  site_id: siteId.value,
  microsite_id: microSiteId.value,
  platform_id: platformId.value,
  category_id: categoryId.value,
});

const enableDisableSave = (val) => {
  if (val === undefined) return enableSave.value;
  enableSave.value = val;
};

const findModuleIndex = (hookIndex, module) => {
  const hk = getHook(hookIndex);
  if (hk !== null) {
    return hk.modules.findIndex((current) => module.id === current.id);
  }
  return -1;
};

const getModuleInfo = (module_id) => {
  if (moduleInfoCache[module_id]) return moduleInfoCache[module_id];
  let found = null;
  for (let i = 0; i < allModules.value.length; i++) {
    if (allModules.value[i].id.toString() === module_id.toString()) {
      moduleInfoCache[module_id] = allModules.value[i];
      found = allModules.value[i];
      break;
    }
  }
  return found;
};

const addModule = (hookIndex, module) => {
  const found = findModuleIndex(hookIndex, module);
  if (found === -1) {
    const hk = getHook(hookIndex);
    hk.modules.push(module);
    return hk.modules.length;
  }
  return false;
};

const removeModules = (idOrWhere, byType = "module_id", hookId = null) => {
  let where;
  if (Object.prototype.toString.call(idOrWhere) === "[object Object]") {
    where = idOrWhere;
  } else {
    where = getWhere();
    where[byType] = parseInt(idOrWhere);
  }

  if (hookId !== null) {
    where["hook_id"] = parseInt(hookId);
    const hkInfo = hooksInfoCache[hookId];
    const module = getModuleInfo(idOrWhere);
    const moduleIndex = findModuleIndex(hkInfo.hookIndex, module);
    if (moduleIndex !== -1) {
      getHook(hkInfo.hookIndex).modules.splice(moduleIndex, 1);
    }
  }
  enableDisableSave(true);
};

const highlightEagerDrop = (addRemove = "add") => {
  const js_hook_modules = document.querySelectorAll(".js_hook_modules");
  js_hook_modules.forEach((current) => {
    current.classList[addRemove]("module-drop-eager");
    current.closest("div.js_modules").classList[addRemove]("p-0", "m-0");
  });
};

const enableDragging = () => {
  if (!canEdit.value) return false;

  const draggableModules = document.getElementById("draggableModules");
  sortObj.draggable = Sortable.create(draggableModules, {
    animation: 200,
    draggable: ".js_item",
    group: { name: "modulesBox" },
    sort: false,
    ghostClass: "js_modules",
    onEnd: (evt) => {
      const { to, item } = evt;
      const hookId = to.getAttribute("data-hook-id");
      const moduleId = item.getAttribute("data-module-id");

      if (hookId) {
        const hkInfo = hooksInfoCache[hookId];
        const moduleInfo = getModuleInfo(moduleId);
        const isAdded = addModule(hkInfo.hookIndex, moduleInfo);

        if (item.parentNode) item.parentNode.removeChild(item);
        highlightEagerDrop("remove");

        if (isAdded === false) {
          Toast.show(instance.proxy, "Module is already added in this hook...");
        }
      }
      enableDisableSave(true);
    },
    onStart: () => {
      highlightEagerDrop("add");
    },
  });
};

const enableSorting = () => {
  if (!canEdit.value) return false;
  nextTick(() => {
    const list = document.querySelectorAll(".js_modules");
    list.forEach((current) => {
      Sortable.create(current, {
        animation: 200,
        filter: ".js_delete",
        group: { name: "droppable", put: "modulesBox" },
        onFilter: (evt) => {
          const { item, target } = evt;
          const parent = item.parentNode;
          const hookId = parent.getAttribute("data-hook-id");
          const id = item.getAttribute("data-module-id");

          if (Sortable.utils.is(target, ".js_delete")) {
            removeModules(id, "module_id", hookId);
          }
        },
        onUpdate: () => {
          enableDisableSave(true);
        },
      });
    });
    enableDragging();
  });
};

const parseTheme = () => {
  if (hasTheme.value) {
    const theme = themeInfo.value;
    const skeleton = theme.skeleton;
    const regx_ske = /(%{cms.+}%)/gim;
    const conventions = skeleton.match(regx_ske);
    if (conventions && conventions.length > 0) {
      let realIndex = 0;
      conventions.forEach((current) => {
        let strcms = current.replace("%{cms.", "").replace("}%", "");
        const cms_arr = strcms.split(".");
        const conventionType = cms_arr[0];
        const conventionName = cms_arr[1];

        if (conventionType === "hook") {
          const hkInfo = getHookInfo(conventionName);
          if (hkInfo !== null) {
            hooks.value.push({
              name: conventionName,
              modules: [],
              info: hkInfo,
            });
            hooksInfoCache[hkInfo.id] = { info: hkInfo, hookIndex: realIndex };
            realIndex++;
          } else {
            console.error(`@parseTheme ${conventionName}. You need to add in your site`);
          }
        }
      });
    } else {
      addErrorMessage(`There is no hook defined in for this theme (${theme.name})`);
    }
  } else {
    addErrorMessage("There is no theme available for this category");
  }
};

const populateModules = () => {
  const mods = categoryModules.value;
  if (mods.length > 0) {
    mods.forEach((current) => {
      const hk = hooksInfoCache[current.hook_id];
      try {
        const moduleInfo = getModuleInfo(current.module_id);
        if (moduleInfo) {
          addModule(hk.hookIndex, moduleInfo);
        }
      } catch (e) {
        console.error(`@populateModules: ${e.message}`);
        showError(`@populateModules: ${e.message}`);
      }
    });
  } else {
    Toast.show(instance.proxy, "There is no module added for this category. Drag from the right panel to the left boxes. ", 5000);
  }
};

const setDefaultFromTo = () => {
  if (allSites.value.length > 0) {
    fromData.site_id = allSites.value[0].id;
    toData.site_id = siteId.value;
  } else {
    fromData.site_id = siteId.value;
    toData.site_id = siteId.value;
  }
  fromData.platform_id = platformId.value;
  toData.platform_id = platformId.value;
  toData.category_id = categoryId.value;
};

const makeCategories = () => {
  if (allSites.value.length > 0) {
    allSites.value.forEach((current) => {
      categoriesData[current.id] = current.category;
    });
  }
  setDefaultFromTo();
};

const init = () => {
  if (categories.value.length === 0) {
    addErrorMessage("No category found!");
  }
  if (categoryInfo.value.length === 0) {
    addErrorMessage("There is a mismatch in site default category. Please fix that.");
  }
  if (hasTheme.value) {
    parseTheme();
    populateModules();
    enableSorting();
    makeCategories();
  } else {
    const path = AdminConfig.admin_path("category/settings", { platform_id: platformId.value });
    addErrorMessage(`This category/platform/theme is not available in category_site table. You need to drag and drop in <a href='${path}'>category settings</a>.`);
    addErrorMessage("Dont' forget the set the theme there.");
  }
};

const saveNow = (url, data) => {
  Loader.show(instance.proxy);
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((response) => resolve(response))
      .catch((error) => reject(SafeErrorData(error)))
      .finally(() => Loader.hide(instance.proxy));
  });
};

const saveModules = () => {
  if (enableDisableSave() === false) return false;
  const allHooks = document.querySelectorAll(".js_hook_modules");
  const datas = [];
  allHooks.forEach((current) => {
    const allMods = current.querySelectorAll("li.js_item");
    const hook_id = current.getAttribute("data-hook-id");
    if (allMods.length > 0) {
      const modules = Array.from(allMods).map((m, i) => ({
        module_id: m.getAttribute("data-module-id"),
        position: i + 1,
      }));
      datas.push({ hook_id, modules });
    }
  });

  if (datas.length > 0) {
    const postParams = {
      data: datas,
      where: getWhere(),
      applicableForAllPlatforms: false,
    };
    saveNow(AdminConfig.admin_path("homepage/saveSettings"), postParams)
      .then(() => {
        Toast.show(instance.proxy, "Saved...");
        enableDisableSave(false);
      })
      .catch((err) => showError(err));
  }
};

const fetchNewData = () => {
  const where = getWhere();
  delete where.site_id;
  if (where.microsite_id === 0) delete where.microsite_id;
  window.location.href = AdminConfig.admin_path("homepage/ui", where);
};

const showHideHookPanel = (id) => {
  const target = hookPanels[id];
  if (target) {
    target.classList.toggle("hide");
  }
};

const onlyMe = (id) => {
  const target = panels[id];
  if (!target) return;

  const isFixed = target.classList.contains("fixed");

  const hideAllHooks = (shouldHide) => {
    hooks.value.forEach((hook) => {
      const el = panels[hook.info.id];
      if (el) {
        if (shouldHide) {
          el.classList.add("hide");
          el.classList.remove("fixed");
        } else {
          el.classList.remove("hide");
          el.classList.remove("fixed");
        }
      }
    });

    if (savePanel.value) {
      if (shouldHide) savePanel.value.classList.add("hide");
      else savePanel.value.classList.remove("hide");
    }
  };

  if (!isFixed) {
    hideAllHooks(true);
    target.classList.remove("hide");
    target.classList.add("fixed");
  } else {
    hideAllHooks(false);
  }
};

const deleteAllModuleFromHook = (hookId) => {
  const hkInfo = hooksInfoCache[hookId];
  const hook = getHook(hkInfo.hookIndex);
  hook.modules = [];
  removeModules(hookId, "hook_id");
};

const showHideDeleteAlert = (isShow) => {
  if (isShow) Modal.open(instance.proxy, "deleteBox");
  else Modal.close(instance.proxy, "deleteBox");
};

const deleteAllFromCategory = () => {
  showHideDeleteAlert(false);
  hooks.value.forEach((hk) => {
    hk.modules = [];
  });
  removeModules(categoryId.value, "category_id");
};

const showHideCopyAlert = (isShow = true) => {
  if (isShow) {
    setDefaultFromTo();
    Modal.open(instance.proxy, "copyBox");
  } else {
    Modal.close(instance.proxy, "copyBox");
  }
};

const copyDataFromCategory = () => {
  isWorking.value = true;
  const data = { fromData, toData };
  const url = AdminConfig.admin_path("homepage/copyData");
  saveNow(url, data)
    .then((res) => {
      if (res.data.error) {
        Toast.show(instance.proxy, res.data.message, 5000);
      } else if (res.data.success) {
        showHideCopyAlert(false);
        Toast.show(instance.proxy, "Copied. Reloading...");
        window.location.reload();
      }
      isWorking.value = false;
    })
    .catch((err) => {
      showHideCopyAlert(false);
      isWorking.value = false;
      showError(err);
    });
};

const hasAnyModulesInAHook = (hook) => hook.modules && hook.modules.length > 0;

onMounted(() => {
  init();
});
</script>

