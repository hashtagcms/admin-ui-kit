<template>
  <div class="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-100 bg-white/50 backdrop-blur-sm sticky top-0 z-40 px-2 pt-2">
    <div class="flex flex-wrap items-center gap-4">
        <!-- Selectors Group -->
        <div v-show="hasMicrosites" class="relative group">
          <select
            v-model="microSiteId"
            class="bg-white border border-gray-200 text-gray-700 text-[11px] font-black uppercase tracking-widest rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full px-5 py-3 outline-none transition-all shadow-sm cursor-pointer hover:border-blue-300"
            @change="fetchNewData()"
          >
            <option value="0">Select a MicroSite</option>
            <option v-for="microsite in microsites" :key="microsite.id" :value="microsite.id">
              {{ microsite.name }}
            </option>
          </select>
        </div>

        <div class="relative group">
          <select
            v-model="categoryId"
            class="bg-white border border-gray-200 text-gray-700 text-[11px] font-black uppercase tracking-widest rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full px-5 py-3 outline-none transition-all shadow-sm cursor-pointer hover:border-blue-300"
            @change="fetchNewData()"
          >
            <option>Select a Category</option>
            <option v-for="category in categories" :key="category.category_id" :value="category.category_id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div v-show="hasPlatformMoreThanOne" class="relative group">
          <select
            v-model="platformId"
            class="bg-white border border-gray-200 text-gray-700 text-[11px] font-black uppercase tracking-widest rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full px-5 py-3 outline-none transition-all shadow-sm cursor-pointer hover:border-blue-300"
            @change="fetchNewData()"
          >
            <option>Select a Platform</option>
            <option v-for="platform in platforms" :key="platform.id" :value="platform.id">
              {{ platform.name }}
            </option>
          </select>
        </div>

        <!-- Theme Info -->
        <div v-show="hasTheme" class="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl border border-blue-100/50">
            <span class="text-[9px] font-black text-blue-400 uppercase tracking-widest">Active Theme</span>
            <span
                class="text-xs font-black text-blue-700 cursor-help underline decoration-blue-300/50 decoration-2 underline-offset-4 hover:decoration-blue-500 transition-all"
                title="Click to see theme info"
                @click="showInfo('theme', themeInfo.id)"
            >{{ themeInfo.name }}</span>
        </div>
    </div>

    <!-- Actions Group -->
    <div class="flex items-center gap-3">
        <div v-if="hasTheme" class="flex items-center gap-2 p-1.5 bg-gray-50 rounded-lg border border-gray-100">
            <button
              v-if="canDelete"
              class="w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm hover:shadow-red-500/20 active:scale-95 group"
              title="Delete All Modules form this category"
              type="button"
              @click="showHideDeleteAlert(true)"
            >
              <i class="fa fa-trash-o text-lg"></i>
            </button>
            <button
              class="w-12 h-12 flex items-center justify-center bg-white text-gray-400 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm hover:shadow-blue-500/20 border border-gray-100 active:scale-95 group"
              title="Copy Data From"
              type="button"
              @click="showHideCopyAlert(true)"
            >
              <i class="fa fa-copy text-lg"></i>
            </button>
        </div>
    </div>
  </div>
  <div class="py-6" v-if="hasError">
      <div class="bg-red-50 border border-red-100 p-6 rounded-lg shadow-sm animate-fadeIn">
        <ul class="space-y-2">
          <li v-for="(error, idx) in errors" :key="idx" class="flex items-center gap-3 text-red-700 text-xs font-black uppercase tracking-widest">
              <i class="fa fa-exclamation-circle text-red-500"></i>
              <span v-html="error.message"></span>
          </li>
        </ul>
      </div>
  </div>

  <div class="flex flex-col xl:flex-row gap-10 mt-8">
    <div class="flex-1">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 homepage-modules">
        <div v-for="hook in hooks" :key="hook.info.id" :ref="'panel_' + hook.info.id" class="flex flex-col">
          <div class="non-selectable shadow-lg rounded-lg bg-white border border-gray-100 overflow-hidden flex flex-col h-full transition-all hover:shadow-lg hover:shadow-blue-500/10 group">
            <div
              class="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between cursor-pointer select-none"
              @dblclick="showHideHookPanel(hook.info.id)"
            >
              <div class="flex items-center gap-3">
                  <a
                    href="javascript:void(0)"
                    class="text-xs font-black text-gray-800 uppercase tracking-widest hover:text-blue-600 transition-colors"
                    @click="showInfo('hook', hook.info.id)"
                  >
                    {{ hook.info.name }}
                  </a>
              </div>
              
              <div class="flex items-center gap-2">
                  <button 
                    @click="onlyMe(hook.info.id, $event)"
                    class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all"
                  >
                    <i class="fa fa-expand text-[10px]"></i>
                  </button>
                  <button 
                    @click="showHideHookPanel(hook.info.id)"
                    class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all"
                  >
                    <i class="fa fa-minus text-[10px]"></i>
                  </button>
              </div>
            </div>

            <div
              :ref="'hook_panel_' + hook.info.id"
              class="flex-1 p-4 bg-white min-h-[150px] js_modules overflow-hidden"
            >
              <ul
                :data-hook-id="hook.info.id"
                class="space-y-2 js_modules js_hook_modules min-h-[100px]"
              >
                <template v-if="hook.modules.length > 0">
                  <li
                    v-for="module in hook.modules"
                    :key="module.id"
                    :data-module-id="module.id"
                    class="px-4 py-3 bg-gray-50/50 hover:bg-white border border-transparent hover:border-blue-100/50 rounded-xl flex items-center justify-between group/item transition-all js_item cursor-grab active:cursor-grabbing"
                  >
                    <div class="flex items-center gap-3">
                        <i class="fa fa-grip-lines text-[10px] text-gray-200 group-hover/item:text-blue-400 transition-colors"></i>
                        <a
                          href="javascript:void(0)"
                          @click="showInfo('module', module.id)"
                          class="text-xs font-bold text-gray-600 group-hover/item:text-blue-900 transition-colors"
                        >{{ module.name }}</a>
                    </div>
                    
                    <button
                      v-if="canDelete"
                      :data-hook-id="hook.info.id"
                      class="text-gray-300 hover:text-red-500 transition-colors js_delete"
                      title="Delete this module from the hook"
                    >
                      <i class="fa fa-trash-o text-xs"></i>
                    </button>
                  </li>
                </template>
                <li v-else class="h-[120px] border-2 border-dashed border-gray-100 rounded-lg flex items-center justify-center bg-gray-50/30">
                    <span class="text-[10px] font-black text-gray-300 uppercase tracking-widest text-center px-4">Ready for Modules</span>
                </li>
              </ul>
            </div>
            
            <div
              class="px-6 py-3 bg-gray-50/30 border-t border-gray-50 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity"
              v-if="hasAnyModulesInAHook(hook) && canDelete"
            >
              <button
                @click="deleteAllModuleFromHook(hook.info.id)"
                class="text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest flex items-center gap-2 js_delete_from_hook"
                :data-hook-id="hook.info.id"
              >
                  <i class="fa fa-trash-o"></i>
                  Flush Hook
              </button>
            </div>
          </div>
        </div>
        <div v-if="hasTheme" ref="savePanel" class="col-span-full pt-12 flex justify-center pb-20">
          <button 
            :class="[saveButtonCss, 'px-20 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-lg shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 active:scale-95 text-lg uppercase tracking-widest']" 
            type="button" 
            @click="saveModules()"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
    
    <!-- Right Module Browser -->
    <div class="w-full xl:w-80 flex flex-col gap-6" v-if="!hasError">
      <div class="bg-white rounded-lg shadow-lg border border-gray-100 p-6 space-y-6 sticky top-24">
          <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <i class="fa fa-cube"></i>
              </div>
              <div>
                  <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Module Pool</h3>
                  <p class="text-xs text-gray-500 font-bold">Drag to Hooks</p>
              </div>
          </div>

          <div class="relative group">
            <i class="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs transition-colors group-focus-within:text-blue-500"></i>
            <input
              v-model="searchKey"
              class="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-inner"
              placeholder="Search components..."
              type="text"
            />
          </div>

          <ul id="draggableModules" class="space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
            <li
              v-for="module in filterModules"
              :key="module.id"
              :data-module-id="module.id"
              class="px-4 py-3 bg-white border border-gray-100 rounded-xl flex items-center justify-between group/pool hover:border-blue-200 hover:shadow-md transition-all cursor-grab active:cursor-grabbing js_item"
            >
              <div class="flex items-center gap-3">
                  <i class="fa fa-grip-vertical text-gray-200 group-hover/pool:text-blue-400 transition-colors"></i>
                  <span class="text-xs font-bold text-gray-600 group-hover/pool:text-blue-900 transition-colors" v-html="module.name"></span>
              </div>
              <span class="delete opacity-0 group-hover/pool:opacity-100 transition-opacity text-red-300 hover:text-red-500 fa fa-trash-o cursor-pointer"></span>
            </li>
          </ul>
      </div>
    </div>
  </div>

  <modal-box ref="copyBox" data-show-footer="true" :data-modal-css="modalCss">
    <template #title>
        <div class="flex items-center gap-3">
            <i class="fa fa-copy text-blue-500"></i>
            <span class="font-black text-gray-800 tracking-tight uppercase text-sm">Clone Category Data</span>
        </div>
    </template>
    <template #content>
      <div class="space-y-8 p-4">
          <!-- From Section -->
          <div class="space-y-4">
              <div class="flex items-center gap-3">
                  <span class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400 uppercase">1</span>
                  <h4 class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Source Configuration</h4>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-50/50 p-6 rounded-lg border border-gray-100 shadow-inner">
                <div v-if="hasSiteMoreThanOne" class="space-y-1">
                  <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Site</label>
                  <select v-model="fromData.site_id" class="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm">
                    <option value="0">Select a MicroSite</option>
                    <option v-for="site in allSites" :key="site.id" :value="site.id">
                      {{ site.name }}
                    </option>
                  </select>
                </div>
                <div v-if="hasMicrosites" class="space-y-1">
                  <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Microsite</label>
                  <select v-model="fromData.microsite_id" class="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm">
                    <option value="0">Select a Microsite</option>
                    <option v-for="microsite in microsites" :key="microsite.id" :value="microsite.id">
                      {{ microsite.name }}
                    </option>
                  </select>
                </div>
                <div v-if="hasPlatformMoreThanOne" class="space-y-1">
                   <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Platform</label>
                  <select v-model="fromData.platform_id" class="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm">
                    <option value="0">Select a Platform</option>
                    <option v-for="platform in platforms" :key="platform.id" :value="platform.id">
                      {{ platform.name }}
                    </option>
                  </select>
                </div>
                <div class="space-y-1">
                  <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                  <select v-model="fromData.category_id" class="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm">
                    <option value="0">Select a Category</option>
                    <option
                      v-for="category in fromCategories"
                      :key="category.category_id"
                      :value="category.category_id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>
          </div>

          <!-- To Section -->
          <div class="space-y-4">
              <div class="flex items-center gap-3">
                  <span class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[10px] font-black text-blue-400 uppercase font-black">2</span>
                  <h4 class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Configuration</h4>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-blue-50/20 p-6 rounded-lg border border-blue-100/50 shadow-inner">
                <div v-if="hasSiteMoreThanOne" class="space-y-1">
                  <label class="text-[9px] font-black text-blue-400 uppercase tracking-widest ml-1">Site</label>
                  <select v-model="toData.site_id" class="w-full bg-white border border-blue-100 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm">
                    <option value="0">Select a MicroSite</option>
                    <option v-for="site in allSites" :key="site.id" :value="site.id">
                      {{ site.name }}
                    </option>
                  </select>
                </div>
                <div v-if="hasMicrosites" class="space-y-1">
                   <label class="text-[9px] font-black text-blue-400 uppercase tracking-widest ml-1">Microsite</label>
                  <select v-model="toData.microsite_id" class="w-full bg-white border border-blue-100 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm">
                    <option value="0">Select a MicroSite</option>
                    <option v-for="microsite in microsites" :key="microsite.id" :value="microsite.id">
                      {{ microsite.name }}
                    </option>
                  </select>
                </div>
                <div v-if="hasPlatformMoreThanOne" class="space-y-1">
                   <label class="text-[9px] font-black text-blue-400 uppercase tracking-widest ml-1">Platform</label>
                  <select v-model="toData.platform_id" class="w-full bg-white border border-blue-100 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm">
                    <option value="0">Select a Platform</option>
                    <option v-for="platform in platforms" :key="platform.id" :value="platform.id">
                      {{ platform.name }}
                    </option>
                  </select>
                </div>
                <div class="space-y-1">
                   <label class="text-[9px] font-black text-blue-400 uppercase tracking-widest ml-1">Category</label>
                  <select v-model="toData.category_id" class="w-full bg-white border border-blue-100 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm">
                    <option value="0">Select a Category</option>
                    <option
                      v-for="category in toCategories"
                      :key="category.category_id"
                      :value="category.category_id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>
          </div>

          <div v-show="hasPlatformMoreThanOne" class="bg-amber-50 border border-amber-100 rounded-lg p-6">
              <div class="flex gap-4">
                  <i class="fa fa-info-circle text-amber-500 mt-1"></i>
                  <p class="text-[10px] font-bold text-amber-700 leading-relaxed uppercase tracking-widest">
                    Pro tip: Do not select <span class="text-amber-900 font-black">source platform</span> if you want to copy modules into all platforms respectively.
                  </p>
              </div>
          </div>
      </div>
    </template>
    <template #footer>
      <div class="flex items-center gap-4">
          <div v-show="isWorking" class="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest animate-pulse">
            <i class="fa fa-spinner fa-spin"></i>
            Cloning Data...
          </div>
          <button
            class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            @click="copyDataFromCategory()"
          >
            Start Cloning
          </button>
          <button
            class="px-8 py-3 border border-gray-200 hover:bg-gray-50 text-gray-400 hover:text-gray-900 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-sm"
            @click="showHideCopyAlert(false)"
          >
            Cancel
          </button>
      </div>
    </template>
  </modal-box>

  <modal-box
    ref="deleteBox"
    data-show-footer="true"
    data-title-css="bg-red-50 text-red-600 rounded-t-[2rem]"
  >
    <template #title>
        <div class="flex items-center gap-3">
            <i class="fa fa-exclamation-triangle text-red-600"></i>
            <span class="font-black text-red-600 tracking-tight uppercase text-sm">Critical Warning</span>
        </div>
    </template>
    <template #content>
      <div class="p-4 space-y-6">
          <div class="text-center">
              <h5 class="text-lg font-black text-gray-800 leading-tight mb-2">Destructive Action Ahead</h5>
              <p class="text-gray-500 text-sm">Are you sure you want to delete <span class="text-red-600 font-bold underline decoration-2">all modules</span> from this category? This action is permanent and cannot be undone.</p>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-inner" v-show="hasPlatformMoreThanOne">
            <label              
              class="flex items-center gap-4 cursor-pointer group"
              title="Delete from other platforms too"
            >
              <input v-model="applicableForAllPlatforms" type="checkbox" class="w-6 h-6 rounded-lg border-gray-300 text-red-600 focus:ring-red-500 transition-all cursor-pointer shadow-sm" /> 
              <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-red-600 transition-colors">Apply deletion across all platforms</span>
            </label>
          </div>
      </div>
    </template>
    <template #footer>
      <div class="flex items-center gap-4">
          <button class="px-10 py-3 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-red-500/20 transition-all active:scale-95" @click="deleteAllFromCategory()">
            Confirm Delete
          </button>
          <button
            class="px-8 py-3 border border-gray-200 hover:bg-gray-50 text-gray-400 hover:text-gray-900 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-sm"
            @click="showHideDeleteAlert(false)"
          >
            No, Keep Data
          </button>
      </div>
    </template>
  </modal-box>

  <info-popup ref="infoPopup"></info-popup>
</template>

<script>
import AdminConfig from "../../../helpers/admin-config";

import { Toast, Modal, Loader, SafeErrorData, SafeJsonParse } from "../../../helpers/common";
import Sortable from "sortablejs";
import InfoPopup from "./info-popup.vue";
import ModalBox from "./library/modal-box.vue";

export default {
  components: {
    "info-popup": InfoPopup,
    "modal-box": ModalBox,
  },
  mounted() {
    /*console.log("siteInfo", this.siteInfo);
        console.log("allModules", this.allModules);
        console.log("categoryModules", this.categoryModules);
        console.log("categoryInfo", this.categoryInfo);
        console.log("themeInfo", this.themeInfo);
        */

    this.init();
  },
  created() {
    //this.initData();
  },

  props: [
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
  ],
  computed: {
    hasSiteMoreThanOne() {
      //return true;
      return this.allSites.length > 1;
    },
    hasMicrosites() {
      //return true;
      return this.microsites.length > 0;
    },
    hasPlatformMoreThanOne() {
      //return true;
      return this.platforms.length > 1;
    },
    hasTheme() {
      return this.themeInfo && this.themeInfo["id"];
    },
    saveButtonCss() {
      let disabled = this.enableDisableSave() === true ? "" : " disabled";
      return "btn btn-success btn-form-submit" + disabled;
    },
    canEdit() {
      return (
        this.userRights.indexOf("edit") >= 0 && this.isModuleReadonly === false
      );
    },
    canDelete() {
      return (
        this.userRights.indexOf("delete") >= 0 &&
        this.isModuleReadonly === false
      );
    },
    modalCss() {
      /*  if (this.hasSiteMoreThanOne && this.hasPlatformMoreThanOne) {
                return "modal-lg";
            }*/
      return "modal-lg";
    },
    fromCategories() {
      return this.categoriesData[this.fromData.site_id] || [];
    },
    toCategories() {
      return this.categoriesData[this.toData.site_id] || [];
    },
    hasError() {
      return this.errors.length > 0;
    },
    filterModules() {
      let key = this.searchKey;
      if (key !== "" && key != null) {
        key = key.toLowerCase();
        return this.allModules.filter((current) => {
          let alias = current.alias.toLowerCase();
          let name = current.name.toLowerCase();
          let id = current.id;
          if (
            id.toString() === key ||
            alias.includes(key) ||
            name.includes(key)
          ) {
            return true;
          }
        });
      } else {
        this.searchKey = "";
        // console.log("data", this.allData.data);
        return this.allModules;
      }
    },
  },
  data() {
    return {
      categoriesData: {},
      categories: SafeJsonParse(this.dataCategories, []),
      microsites: SafeJsonParse(this.dataMicrosites, []),
      platforms: SafeJsonParse(this.dataPlatforms, []),
      siteId:
        typeof this.dataSiteId == "undefined" || this.dataSiteId === ""
          ? 1
          : parseInt(this.dataSiteId),
      microSiteId:
        typeof this.dataMicrositeId == "undefined" ||
        this.dataMicrositeId === ""
          ? 0
          : parseInt(this.dataMicrositeId),
      platformId:
        typeof this.dataPlatformId == "undefined" || this.dataPlatformId === ""
          ? 1
          : parseInt(this.dataPlatformId),
      categoryId:
        typeof this.dataCategoryId == "undefined" || this.dataCategoryId === ""
          ? 0
          : parseInt(this.dataCategoryId),
      siteInfo: SafeJsonParse(this.dataSiteInfo, []),
      hookInfo: SafeJsonParse(this.dataHookInfo, []),
      allModules: SafeJsonParse(this.dataAllModules, []),
      categoryModules: SafeJsonParse(this.dataCategoryModules, []),
      categoryInfo: SafeJsonParse(this.dataCategoryInfo, []),
      themeInfo: SafeJsonParse(this.dataThemeInfo, []),
      hooks: [],
      hooksInfoCache: {},
      moduleInfoCache: {},
      noHookFound: false,
      errors: [],
      enableSave: false,
      searchKey: "",
      applicableForAllPlatforms: false,
      fromData: { site_id: 0, microsite_id: 0, platform_id: 0, category_id: 0 },
      toData: { site_id: 0, microsite_id: 0, platform_id: 0, category_id: 0 },
      isWorking: false,
      sortObj: { draggable: null },
      userRights: SafeJsonParse(this.dataUserRights, []),
      isModuleReadonly: this.dataIsModuleReadonly === "1" ? true : false,
      allSites: SafeJsonParse(this.dataAllSites, []),
      copyForAllPlatforms: false,
    };
  },
  methods: {
    init() {
      if (this.categories.length === 0) {
        this.addErrorMessage("No category found!");
      }
      if (this.categoryInfo.length === 0) {
        this.addErrorMessage(
          "There is a mismatch in site default category. Please fix that.",
        );
      }
      //console.log('this.themeInfo["id"] ', this.themeInfo["id"])
      if (this.hasTheme) {
        this.parseTheme();
        this.populateModules();
        this.enableSorting();
        this.makeCategories();
      } else {
        let path = AdminConfig.admin_path("category/settings", {
          platform_id: this.platformId,
        });
        this
          .addErrorMessage(`This category/platform/theme is not available in category_site table.
                         You need to drag and drop in <a href='${path}'>category settings</a>.`);
        this.addErrorMessage(`Dont' forget the set the theme there.`);
      }
    },
    makeCategories() {
      let totalSites = this.allSites.length;
      if (totalSites > 0) {
        for (let i = 0; i < totalSites; i++) {
          let current = this.allSites[i];
          this.categoriesData[current.id] = current.category;
        }
      }
      this.setDefaultFromTo();
    },
    setDefaultFromTo() {
      let totalSites = this.allSites.length;
      if (totalSites > 0) {
        this.fromData.site_id = this.allSites[0].id;
        this.toData.site_id = this.siteId; //current site id
      } else {
        this.fromData.site_id = this.siteId; //current site
        this.toData.site_id = this.siteId;
      }

      this.fromData.platform_id = this.platformId;
      this.toData.platform_id = this.platformId;
      this.toData.category_id = this.categoryId;
    },
    saveNow(url, data) {
      Loader.show(this);
      return new Promise((resolve, reject) => {
        axios
          .post(url, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(SafeErrorData(error));
          })
          .finally(() => {
            Loader.hide(this);
          });
      });
    },
    getWhere() {
      let where = {
        site_id: this.siteId,
        microsite_id: this.microSiteId,
        platform_id: this.platformId,
        category_id: this.categoryId,
      };
      return where;
    },
    saveModules() {
      if (this.enableDisableSave() === false) {
        return false;
      }
      //Save in DB
      let $this = this;
      //let currentData = (action == "add") ? this.allData.data : this.siteData;
      let postParams = {};

      //loop through all hooks
      let allHooks = document.querySelectorAll(".js_hook_modules");
      let datas = [];
      allHooks.forEach(function (current) {
        let allModules = current.querySelectorAll("li.js_item");
        let hook_id = current.getAttribute("data-hook-id");
        //console.log("hook_id: ", hook_id, allModules, allModules.length);
        if (allModules.length > 0) {
          let modules = [];
          for (let i = 0; i < allModules.length; i++) {
            //console.log(allModules[i]);
            let currentModule = allModules[i];
            let module_id = currentModule.getAttribute("data-module-id");
            modules.push({ module_id: module_id, position: i + 1 });
          }

          let data = { hook_id: hook_id, modules: modules };
          datas.push(data);
        }
        //console.log(datas);
      });

      if (datas.length > 0) {
        let where = $this.getWhere();
        postParams.data = datas;
        postParams.where = where;
        postParams.applicableForAllPlatforms = false;
        this.saveNow(
          AdminConfig.admin_path("homepage/saveSettings"),
          postParams,
        )
          .then(function (res) {
            //console.log(res);
            Toast.show($this, "Saved...");
            $this.enableDisableSave(false);
          })
          .catch(function (res) {
            $this.showError(res);
          });
      }
    },
    populateModules() {
      //Display module on init
      let $this = this;
      let modules = this.categoryModules;

      if (modules.length > 0) {
        for (let i = 0; i < modules.length; i++) {
          let current = modules[i];
          let hook = $this.getHookInfoCache(current.hook_id);
          try {
            let moduleInfo = $this.getModuleInfo(current.module_id);
            this.addModule(hook.hookIndex, moduleInfo);
          } catch (e) {
            console.error("@populateModules: " + e.message);
            $this.showError("@populateModules: " + e.message);
          }
        }
      } else {
        console.info("There is no module added for this category.");
        Toast.show(
          this,
          "There is no module added for this category. Drag from the right panel to the left boxes. ",
          5000,
        );
      }
    },
    parseTheme() {
      //console.log("this.themeInfo.length ",this.themeInfo);
      if (this.hasTheme) {
        let $this = this;
        let theme = this.themeInfo;
        let skeleton = theme.skeleton;
        let regx_ske = /(%{cms.+}%)/gim; //find cms key
        let conventions = skeleton.match(regx_ske);
        let modules = {};
        if (conventions && conventions.length > 0) {
          let regx_m = /(cms.+})/;
          let realIndex = 0;
          conventions.forEach(function (current, index) {
            let strcms = current.replace("%{cms.", "");
            strcms = strcms.replace("}%", "");
            let cms_arr = strcms.split(".");
            let conventionType = cms_arr[0]; //can be hook or can be module;
            let conventionName = cms_arr[1];

            if (conventionType === "hook") {
              let hookInfo = $this.getHookInfo(conventionName);
              if (hookInfo !== null) {
                $this.addHook({
                  name: conventionName,
                  modules: [],
                  info: hookInfo,
                });
                $this.setHookInfoCache(hookInfo.id, {
                  info: hookInfo,
                  hookIndex: realIndex,
                });
                realIndex++;
              } else {
                console.error(
                  "@parseTheme " +
                    conventionName +
                    ". You need to add in your site",
                );
              }
            }
            if (conventionType === "module") {
            }
          });
        } else {
          this.addErrorMessage(
            `There is no hook defined in for this theme (${this.themeInfo.name}})`,
          );
        }
      } else {
        this.addErrorMessage("There is no theme available for this category");
      }
    },
    addErrorMessage(message) {
      this.errors.push({ message: message });
    },
    findModuleIndex(hookIndex, module) {
      if (this.getHook(hookIndex) !== null) {
        let modules = this.getHook(hookIndex).modules;
        let found = modules.findIndex(function (current) {
          return module.id === current.id;
        });
        return found;
      }
      return -1;
    },
    removeModules(idOrWhere, byType = "module_id", hookId = null) {
      let $this = this;
      let where;
      if (Object.prototype.toString.call(idOrWhere) === "[object Object]") {
        where = idOrWhere; // where is passed by param
      } else {
        where = this.getWhere();
        where[byType] = parseInt(idOrWhere);
      }

      //hook and module
      if (hookId !== null) {
        where["hook_id"] = parseInt(hookId);
        //remove from the hook->module array
        let hookInfo = this.getHookInfoCache(hookId);
        let module = this.getModuleInfo(idOrWhere);
        let moduleIndex = this.findModuleIndex(hookInfo.hookIndex, module);
        //remove module - refactor it
        this.getHook(hookInfo.hookIndex).modules.splice(moduleIndex, 1);
      }
      let postParams = {};
      postParams.where = where;
      postParams.applicableForAllPlatforms = this.applicableForAllPlatforms;
      this.enableDisableSave(true);

      //Disable auto save on remove
      /*return this.saveNow(AdminConfig.admin_path("homepage/removeModules"), postParams).then(function (res) {
                console.log(res);
                //Toast.show($this, res.message);
                Toast.show($this, "Removed...");

            }).catch(function (res) {
                $this.showError(res, true);
            });*/
    },
    addModule(hookIndex, module) {
      //console.log("1: addModule ", hookIndex, module);
      let found = this.findModuleIndex(hookIndex, module);

      if (found === -1) {
        let hook = this.getHook(hookIndex);
        hook.modules.push(module);

        //$this.refreshRightSide();
        return hook.modules.length;
      }

      return false;
    },
    refreshRightSide() {
      this.allModules.push(this.allModules[0]);
      this.allModules.pop();
    },
    highlightEagerDrop(addRemove = "add") {
      let js_hook_modules = document.querySelectorAll(".js_hook_modules");
      js_hook_modules.forEach(function (current) {
        current.classList[addRemove]("module-drop-eager");
        current.closest("div.js_modules").classList[addRemove]("p-0", "m-0");
      });
    },
    setHookInfoCache(hookId, data) {
      return (this.hooksInfoCache[hookId] = data);
    },
    getHookInfoCache(hookId) {
      return this.hooksInfoCache[hookId];
    },
    getHookInfo(hookValue, byKey = "alias") {
      let hooks = this.hookInfo;

      for (let i = 0; i < hooks.length; i++) {
        let current = hooks[i];
        if (current[byKey] === hookValue) {
          return current;
        }
      }
      return null;
    },
    addHook(data) {
      this.hooks.push(data);
    },
    getHook(hookIndex) {
      return this.hooks[hookIndex] || null;
    },
    getModuleInfo(module_id) {
      if (this.moduleInfoCache[module_id]) {
        return this.moduleInfoCache[module_id];
      }
      let found = null;
      for (let i = 0; i < this.allModules.length; i++) {
        let current = this.allModules[i];
        if (current.id.toString() === module_id.toString()) {
          this.moduleInfoCache[module_id] = current;
          found = current;
          break;
        }
      }
      return found;
    },
    enableDragging() {
      if (!this.canEdit) {
        return false;
      }
      let $this = this;

      //Right Side module
      let draggableModules = document.getElementById("draggableModules");
      this.sortObj.draggable = Sortable.create(draggableModules, {
        animation: 200,
        draggable: ".js_item",
        group: {
          name: "modulesBox" /*,
                    pull: 'clone',
                    revertClone: true*/,
        },
        sort: false,
        ghostClass: "js_modules",
        onEnd: function (/**Event*/ evt) {
          let to = evt.to;
          let item = evt.item; // dragged HTMLElement

          let hookId = to.getAttribute("data-hook-id");
          let moduleId = item.getAttribute("data-module-id");

          if (hookId) {
            let hookInfo = $this.getHookInfoCache(hookId);
            //console.log(hookInfo);
            let moduleInfo = $this.getModuleInfo(moduleId);

            let isAdded = $this.addModule(hookInfo.hookIndex, moduleInfo);

            //remove original dropped, because it is populated by reactive hook->modules
            item.parentNode.removeChild(item);

            $this.highlightEagerDrop("remove");

            //we can send feedback
            if (isAdded === false) {
              Toast.show($this, "Module is already added in this hook...");
            }
          }

          //Enable Drag

          $this.enableDisableSave(true);
        },
        onStart: function (/**Event*/ evt) {
          //console.log("on start");
          $this.highlightEagerDrop("add");
        },
      });
    },
    enableSorting() {
      if (!this.canEdit) {
        return false;
      }
      let $this = this;
      this.$nextTick(function () {
        let list = document.querySelectorAll(".js_modules");
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
              let parent = item.parentNode;
              let hookId = parent.getAttribute("data-hook-id");
              let id = item.getAttribute("data-module-id");

              if (Sortable.utils.is(ctrl, ".js_delete")) {
                // Click on remove button
                $this.removeModules(id, "module_id", hookId);
              }
            },
            onUpdate: function (/**Event*/ evt) {
              //console.log("@onUpdate: ", evt);
              $this.enableDisableSave(true);
              //reindex
            },
          });
        });

        $this.enableDragging(true);
      });
    },
    deleteAllModuleFromHook(hookId) {
      let hookInfo = this.getHookInfoCache(hookId);
      let hook = this.getHook(hookInfo.hookIndex);
      hook.modules = [];
      this.removeModules(hookId, "hook_id");
    },
    hasAnyModulesInAHook(hook) {
      return typeof hook.modules != "undefined" && hook.modules.length > 0;
    },
    enableDisableSave(val) {
      if (val === undefined) {
        return this.enableSave;
      }
      this.enableSave = val;
    },
    showHideDeleteAlert(isShow) {
      if (isShow) {
        Modal.open(this, "deleteBox");
      } else {
        Modal.close(this, "deleteBox");
      }
    },
    deleteAllFromCategory() {
      this.showHideDeleteAlert(false);

      let allHooks = this.hooks;
      for (let i = 0; i < allHooks.length; i++) {
        allHooks[i].modules = [];
      }
      this.removeModules(this.categoryId, "category_id");
    },
    showHideCopyAlert(isShow = true) {
      if (isShow) {
        this.setDefaultFromTo();
        Modal.open(this, "copyBox");
      } else {
        Modal.close(this, "copyBox");
      }
    },
    copyDataFromCategory() {
      this.isWorking = true;
      let $this = this;
      let fromData = this.fromData;
      let toData = this.toData;
      let data = {
        fromData,
        toData,
      };
      let url = AdminConfig.admin_path("homepage/copyData");
      this.saveNow(url, data)
        .then(function (res) {
          //console.log(res)
          if (res.data.error) {
            Toast.show($this, res.data.message, 5000);
          } else if (res.data.success) {
            $this.showHideCopyAlert(false);
            Toast.show($this, "Copied. Reloading...");
            window.location.href = window.location.href;
          }
          $this.isWorking = false;
        })
        .catch(function (res) {
          $this.showHideCopyAlert(false);
          $this.isWorking = false;
          $this.showError(res);
        });
    },
    setWorking() {},
    isValidModule(module) {
      let isValid =
        module != null && typeof module != "undefined" && module.id > 0;
      if (isValid === false) {
        console.error(
          "There is some error in db entries for this category. " +
            "This can be fixed by deleting all modules and drag and drop again.",
        );
      }
      return isValid;
    },
    fetchNewData() {
      let where = this.getWhere();
      delete where.site_id;
      if (where.microsite_id === 0) {
        delete where.microsite_id;
      }
      let url = "homepage/ui";
      window.location.href = AdminConfig.admin_path(url, where);
    },
    showInfo(type, id) {
      this.$refs.infoPopup.showInfo(type, id);
    },
    showHideHookPanel(id) {
      //console.log(id, this.$refs["hook_panel_"+id]);
      let target = this.$refs["hook_panel_" + id][0];
      if (target.className.indexOf("hide") === -1) {
        target.classList.add("hide");
      } else {
        target.classList.remove("hide");
      }
    },
    onlyMe(id, evt) {
      let $this = this;

      let target = this.$refs["panel_" + id][0];
      if (target.className.indexOf("fixed") === -1) {
        hideAllHooks(true);
        //show current and fixed it
        target.classList.remove("hide");
        target.classList.add("fixed");
        //evt.target.classList.add("fa-compress");
      } else {
        hideAllHooks(false);
      }

      function hideAllHooks(shouldHide) {
        let savePanel = $this.$refs.savePanel;

        //hide old one
        for (let i = 0; i < $this.hooks.length; i++) {
          let current = $this.hooks[i];
          let current_ele = $this.$refs["panel_" + current.info.id][0];

          if (shouldHide === true) {
            current_ele.classList.add("hide");
            current_ele.classList.remove("fixed");
          } else {
            current_ele.classList.remove("hide");
            current_ele.classList.remove("fixed");
          }
        }

        if (shouldHide === true) {
          savePanel.classList.add("hide");
        } else {
          savePanel.classList.remove("hide");
        }
      }
    },
    showError(response, reload = false) {
      let message = "";
      if (typeof response == "string") {
        message = response;
      } else {
        message =
          response && response["data"] && response["data"]["message"]
            ? response.data.message
            : "Unknown error!";
      }
      Toast.show(this, message, 5000);
      if (reload) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    },
  },
};
</script>
