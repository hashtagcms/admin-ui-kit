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
                class="text-xs font-black text-blue-700 cursor-pointer underline decoration-blue-300/50 decoration-2 underline-offset-4 hover:decoration-blue-500 transition-all"
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

  <div class="flex flex-row items-start gap-10 mt-8">
    <!-- Left Column: Hooks Dashboard -->
    <div class="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 homepage-modules content-start pl-2">
      <div
        v-for="hook in hooks"
        :key="hook.info.id"
        :ref="el => setPanelRef(el, hook.info.id)"
        v-show="onlyMeHookId === null || onlyMeHookId === hook.info.id"
        :class="['flex flex-col transition-all duration-300', onlyMeHookId === hook.info.id ? 'col-span-full sticky top-24 z-30 self-start' : !collapsedHooks.has(hook.info.id.toString()) ? 'h-full' : '']"
        :style="onlyMeHookId === hook.info.id ? 'height: calc(100vh - 7rem)' : ''"
      >
        <div 
          :class="['non-selectable rounded-2xl border overflow-hidden flex flex-col transition-all group hcms-hook-box', onlyMeHookId === hook.info.id ? 'shadow-2xl shadow-indigo-500/10 ring-2 ring-indigo-400/40 bg-white border-indigo-200 h-full' : !collapsedHooks.has(hook.info.id.toString()) ? 'shadow-lg bg-indigo-50/40 border-indigo-100/50 hover:shadow-xl hover:shadow-indigo-500/10 h-full' : 'shadow-lg bg-indigo-50/40 border-indigo-100/50 hover:shadow-xl hover:shadow-indigo-500/10']"
        >
          <div
            class="px-6 py-2 bg-indigo-100/30 border-b border-indigo-100/50 flex items-center justify-between cursor-pointer select-none"
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
                  @click="onlyMe(hook.info.id)"
                  :class="['w-8 h-8 flex items-center justify-center rounded-lg transition-all', onlyMeHookId === hook.info.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-blue-600 hover:bg-white']"
                  :title="onlyMeHookId === hook.info.id ? 'Show all hooks' : 'Only show this hook'"
                >
                  <i :class="['fa text-[10px]', onlyMeHookId === hook.info.id ? 'fa-compress' : 'fa-expand']"></i>
                </button>
                <button 
                  @click="showHideHookPanel(hook.info.id)"
                  class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all"
                  :title="collapsedHooks.has(hook.info.id.toString()) ? 'Expand hook' : 'Collapse hook'"
                >
                  <i :class="['fa text-[10px]', collapsedHooks.has(hook.info.id.toString()) ? 'fa-plus' : 'fa-minus']"></i>
                </button>
            </div>
          </div>

          <div
            :ref="el => setHookPanelRef(el, hook.info.id)"
            v-show="!collapsedHooks.has(hook.info.id.toString())"
            :class="['flex-1 p-4 bg-white js_modules overflow-y-auto', onlyMeHookId === hook.info.id ? 'min-h-0' : 'min-h-[150px]']"
          >
            <ul
              :data-hook-id="hook.info.id"
              class="space-y-2 js_modules js_hook_modules min-h-[100px] border border-blue-100/50 h-full"
            >
              <template v-if="hook.modules.length > 0">
                <li
                  v-for="module in hook.modules"
                  :key="module.layoutId"
                  :data-module-id="module.id"
                  :data-layout-id="module.layoutId"
                  draggable="true"
                  class="px-4 py-1 bg-gray-50/50 hover:bg-white border border-transparent hover:border-blue-100/50 rounded-xl flex items-center justify-between group/item transition-all js_item cursor-grab active:cursor-grabbing"
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
                    @click.stop="removeModules(module.layoutId, 'module_id', hook.info.id)"
                  >
                    <i class="fa fa-trash-o text-xs js_delete"></i>
                  </button>
                </li>
              </template>
              <li v-else class="h-[120px] border-2 border-dashed border-gray-100 rounded-lg flex items-center justify-center bg-gray-50/30 pointer-events-none">
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
      <!-- Save button inside the grid but col-span-full -->
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
    
    <!-- Right Column: Module Browser (Pool) -->
    <div class="w-80 shrink-0 flex flex-col gap-6" v-if="!hasError">
      <div class="bg-white rounded-lg shadow-lg border border-gray-100 p-6 space-y-6 sticky top-24 self-start">
          <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm">
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
              draggable="true"
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
              class="flex items-center cursor-pointer group leading-none"
              title="Delete from other platforms too"
            >
              <input v-model="applicableForAllPlatforms" type="checkbox" class="w-5 h-5 rounded-lg border-gray-300 text-red-600 focus:ring-red-500 transition-all cursor-pointer shadow-sm" /> 
              <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-red-600 transition-colors" :style="checkBoxAlignment">Apply deletion across all platforms</span>
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

<script setup>
import { ref, reactive, computed, onMounted, nextTick, getCurrentInstance } from "vue";
import axios from "axios";
import AdminConfig from "../../../helpers/admin-config";
import { Toast, Modal, Loader, SafeErrorData, SafeJsonParse, CheckBoxAlignment } from "../../../helpers/common";
import HcmsSortable from "../../../helpers/hCmsSortable.js";
import InfoPopup from "./info-popup.vue";
import ModalBox from "./library/modal-box.vue";

const checkBoxAlignment = CheckBoxAlignment;

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

// Refs for components
const infoPopup = ref(null);
const copyBox = ref(null);
const deleteBox = ref(null);
const savePanel = ref(null);

// Dynamic refs
const panelRefs = reactive({});
const hookPanelRefs = reactive({});

const setPanelRef = (el, id) => {
    if (el) panelRefs[id] = el;
};
const setHookPanelRef = (el, id) => {
    if (el) hookPanelRefs[id] = el;
};

// State
const categoriesData = reactive({});
const onlyMeHookId = ref(null);
const categories = ref(SafeJsonParse(props.dataCategories, []));
const microsites = ref(SafeJsonParse(props.dataMicrosites, []));
const platforms = ref(SafeJsonParse(props.dataPlatforms, []));
const siteId = ref(
    typeof props.dataSiteId == "undefined" || props.dataSiteId === ""
        ? 1
        : parseInt(props.dataSiteId)
);
const microSiteId = ref(
    typeof props.dataMicrositeId == "undefined" || props.dataMicrositeId === ""
        ? 0
        : parseInt(props.dataMicrositeId)
);
const platformId = ref(
    typeof props.dataPlatformId == "undefined" || props.dataPlatformId === ""
        ? 1
        : parseInt(props.dataPlatformId)
);
const categoryId = ref(
    typeof props.dataCategoryId == "undefined" || props.dataCategoryId === ""
        ? 0
        : parseInt(props.dataCategoryId)
);
const siteInfo = ref(SafeJsonParse(props.dataSiteInfo, []));
const hookInfo = ref(SafeJsonParse(props.dataHookInfo, []));
const allModules = ref(SafeJsonParse(props.dataAllModules, []));
const categoryModules = ref(SafeJsonParse(props.dataCategoryModules, []));
const categoryInfo = ref(SafeJsonParse(props.dataCategoryInfo, []));
const themeInfo = ref(SafeJsonParse(props.dataThemeInfo, []));
const hooks = reactive([]);
const hooksInfoCache = reactive({});
const moduleInfoCache = reactive({});
const noHookFound = ref(false);
const errors = reactive([]);
const enableSave = ref(false);
const searchKey = ref("");
const applicableForAllPlatforms = ref(false);
const fromData = reactive({ site_id: 0, microsite_id: 0, platform_id: 0, category_id: 0 });
const toData = reactive({ site_id: 0, microsite_id: 0, platform_id: 0, category_id: 0 });
const isWorking = ref(false);
const sortableInstances = new Map();
const draggableInstance = ref(null);
const userRights = ref(SafeJsonParse(props.dataUserRights, []));
const isModuleReadonly = ref(props.dataIsModuleReadonly === "1");
const allSites = ref(SafeJsonParse(props.dataAllSites, []));
const copyForAllPlatforms = ref(false);
const collapsedHooks = reactive(new Set());

// Computed
const hasSiteMoreThanOne = computed(() => allSites.value.length > 1);
const hasMicrosites = computed(() => microsites.value.length > 0);
const hasPlatformMoreThanOne = computed(() => platforms.value.length > 1);
const hasTheme = computed(() => themeInfo.value && themeInfo.value["id"]);
const saveButtonCss = computed(() => {
    let disabled = enableSave.value === true ? "" : " disabled";
    return "btn btn-success btn-form-submit" + disabled;
});
const canEdit = computed(() => userRights.value.indexOf("edit") >= 0 && isModuleReadonly.value === false);
const canDelete = computed(() => userRights.value.indexOf("delete") >= 0 && isModuleReadonly.value === false);
const modalCss = computed(() => "modal-lg");
const fromCategories = computed(() => categoriesData[fromData.site_id] || []);
const toCategories = computed(() => categoriesData[toData.site_id] || []);
const hasError = computed(() => errors.length > 0);

const filterModules = computed(() => {
    let key = searchKey.value;
    if (key !== "" && key != null) {
        key = key.toLowerCase();
        return allModules.value.filter((current) => {
            let alias = current.alias.toLowerCase();
            let name = current.name.toLowerCase();
            let id = current.id;
            return id.toString() === key || alias.includes(key) || name.includes(key);
        });
    } else {
        return allModules.value;
    }
});

// Methods
const addErrorMessage = (message) => {
    errors.push({ message: message });
};

const showError = (response, reload = false) => {
    let message = "";
    if (typeof response == "string") {
        message = response;
    } else {
        message = response && response["data"] && response["data"]["message"] ? response.data.message : "Unknown error!";
    }
    Toast.show(instance.proxy, message, 5000);
    if (reload) {
        setTimeout(() => { window.location.reload(); }, 1000);
    }
};

const getHookInfoCache = (hookId) => hooksInfoCache[hookId?.toString()];
const setHookInfoCache = (hookId, data) => { hooksInfoCache[hookId?.toString()] = data; };

const getHookInfo = (hookValue, byKey = "alias") => {
    let hooksArr = hookInfo.value;
    for (let i = 0; i < hooksArr.length; i++) {
        let current = hooksArr[i];
        if (current[byKey] === hookValue) return current;
    }
    return null;
};

const getModuleInfo = (module_id) => {
    if (moduleInfoCache[module_id]) return moduleInfoCache[module_id];
    let found = null;
    for (let i = 0; i < allModules.value.length; i++) {
        let current = allModules.value[i];
        if (current.id.toString() === module_id.toString()) {
            moduleInfoCache[module_id] = current;
            found = current;
            break;
        }
    }
    return found;
};

const findModuleIndex = (hookIndex, module) => {
    if (hooks[hookIndex]) {
        let modules = hooks[hookIndex].modules;
        return modules.findIndex(current => module.id === current.id);
    }
    return -1;
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

const saveNow = (url, data) => {
    Loader.show(instance.proxy);
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(resolve)
            .catch(error => reject(SafeErrorData(error)))
            .finally(() => Loader.hide(instance.proxy));
    });
};

const addHook = (data) => { hooks.push(data); };

const parseTheme = () => {
    if (hasTheme.value) {
        let theme = themeInfo.value;
        let skeleton = theme.skeleton;
        let regx_ske = /(%{cms.+}%)/gim;
        let conventions = skeleton.match(regx_ske);
        if (conventions && conventions.length > 0) {
            let realIndex = 0;
            conventions.forEach(current => {
                let strcms = current.replace("%{cms.", "").replace("}%", "");
                let cms_arr = strcms.split(".");
                let conventionType = cms_arr[0];
                let conventionName = cms_arr[1];

                if (conventionType === "hook") {
                    let hookInfoData = getHookInfo(conventionName);
                    if (hookInfoData !== null) {
                        addHook({ name: conventionName, modules: [], info: hookInfoData });
                        setHookInfoCache(hookInfoData.id, { info: hookInfoData, hookIndex: realIndex });
                        realIndex++;
                    } else {
                        console.error("@parseTheme " + conventionName + ". You need to add in your site");
                    }
                }
            });
        } else {
            addErrorMessage(`There is no hook defined in for this theme (${themeInfo.value.name}})`);
        }
    } else {
        addErrorMessage("There is no theme available for this category");
    }
};

const populateModules = () => {
    let modulesArr = categoryModules.value;
    if (modulesArr.length > 0) {
        for (let i = 0; i < modulesArr.length; i++) {
            let current = modulesArr[i];
            let hookCache = getHookInfoCache(current.hook_id);
            try {
                let moduleInfoData = getModuleInfo(current.module_id);
                if (moduleInfoData) {
                    const targetHook = hooks[hookCache.hookIndex];
                    // Give initial items a layoutId so they can be reordered safely
                    targetHook.modules.push({ 
                        ...moduleInfoData, 
                        layoutId: `hcms_init_${current.module_id}_${Math.random().toString(36).substr(2, 5)}` 
                    });
                }
            } catch (e) {
                console.error("@populateModules: " + e.message);
                showError("@populateModules: " + e.message);
            }
        }
    } else {
        Toast.show(instance.proxy, "There is no module added for this category. Drag from the right panel to the left boxes. ", 5000);
    }
};

const highlightEagerDrop = (addRemove = "add") => {
    const js_hook_modules = document.querySelectorAll(".js_hook_modules");
    const dashboard = document.querySelector(".homepage-modules");
    
    if (dashboard) {
        dashboard.classList[addRemove]("is-dragging-active");
    }

    js_hook_modules.forEach(current => {
        current.classList[addRemove]("module-drop-eager");
    });
};

const enableDragging = () => {
    if (!canEdit.value) return false;
    let draggableModules = document.getElementById("draggableModules");
    if (!draggableModules) return;

    if (draggableInstance.value) draggableInstance.value.destroy();

    draggableInstance.value = HcmsSortable.create(draggableModules, {
        draggable: ".js_item",
        onStart: () => highlightEagerDrop("add"),
        onEnd: () => {
            highlightEagerDrop("remove");
        },
        onAdd: (evt) => {
            // Dragging FROM a hook BACK to the pool
            const moduleId = evt.item.getAttribute("data-module-id");
            const layoutId = evt.item.getAttribute("data-layout-id");
            moveModuleState(moduleId, null, null, false, layoutId); 
            enableDisableSave(true);
        }
    });
};

const moveModuleState = (moduleId, targetHookId, nextLayoutId = null, isCopy = false, existingLayoutId = null) => {
    let moduleInfo = getModuleInfo(moduleId);
    if (!moduleInfo) return;

    // Use existing layoutId if moving, otherwise generate new one if adding from pool
    const lid = existingLayoutId || `hcms_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newInstance = { ...moduleInfo, layoutId: lid };

    // 1. Remove from its current location using layoutId if it's a move (not a copy)
    if (!isCopy) {
        hooks.forEach(h => {
            const idx = h.modules.findIndex(m => m.layoutId === lid);
            if (idx !== -1) h.modules.splice(idx, 1);
        });
    }

    // 2. If targetHookId is null, we just wanted to remove it
    if (targetHookId === null) return;

    // 3. Find target hook
    const hookCache = getHookInfoCache(targetHookId);
    if (!hookCache) return;
    const targetHook = hooks[hookCache.hookIndex];

    // 4. Prevent duplicates within the SAME hook
    //    Check by module_id (not layoutId) so the same component can't appear twice in one hook
    const alreadyInHook = targetHook.modules.some(m => m.id.toString() === moduleId.toString());
    if (alreadyInHook) {
        Toast.show(instance.proxy, `"${moduleInfo.name}" is already in this hook.`);
        return;
    }

    // 5. Find insertion index using nextLayoutId
    let targetIndex = targetHook.modules.length;
    if (nextLayoutId) {
        const foundIndex = targetHook.modules.findIndex(m => m.layoutId === nextLayoutId);
        if (foundIndex !== -1) targetIndex = foundIndex;
    }

    // 6. Insert at new position
    targetHook.modules.splice(targetIndex, 0, newInstance);
};


const removeModules = (idOrWhere, byType = "module_id", hookId = null) => {
    let $this = instance.proxy;
    let where;
    let layoutId = null;

    if (Object.prototype.toString.call(idOrWhere) === "[object Object]") {
        where = idOrWhere;
    } else {
        where = getWhere();
        const isLayoutId = typeof idOrWhere === 'string' && idOrWhere.startsWith('hcms_');
        where[byType] = isLayoutId ? idOrWhere : parseInt(idOrWhere);
    }

    if (hookId !== null) {
        where["hook_id"] = parseInt(hookId);
        let hookCache = getHookInfoCache(hookId);
        
        // If sorting via custom engine, we might have a specific layout item to remove
        if (typeof idOrWhere === 'string' && idOrWhere.startsWith('hcms_')) {
            layoutId = idOrWhere;
        }

        if (hooks[hookCache.hookIndex]) {
            const modules = hooks[hookCache.hookIndex].modules;
            const idx = layoutId ? modules.findIndex(m => m.layoutId === layoutId) : modules.findIndex(m => m.id.toString() === idOrWhere.toString());
            if (idx !== -1) modules.splice(idx, 1);
        }
    }
    enableDisableSave(true);
};

const enableSorting = () => {
    if (!canEdit.value) return false;
    nextTick(() => {
        let lists = document.querySelectorAll(".js_hook_modules");
        lists.forEach(current => {
            const hookId = current.getAttribute("data-hook-id");
            
            if (sortableInstances.has(hookId)) {
                sortableInstances.get(hookId).destroy();
            }

            const s = HcmsSortable.create(current, {
                draggable: ".js_item",
                filter: ".js_delete",
                onFilter: (evt) => {
                    // Delete button clicked — use layoutId for precision targeting
                    const item = evt.item;
                    const layoutId = item.getAttribute("data-layout-id");
                    const moduleId = item.getAttribute("data-module-id");
                    // Use layoutId if available (for unique instance targeting), else fall back to moduleId
                    removeModules(layoutId || moduleId, "module_id", hookId);
                },
                onAdd: (evt) => {
                    // Drop from pool (copy) or from another hook (move)
                    const moduleId = evt.item.getAttribute("data-module-id");
                    const isFromPool = evt.from && evt.from.id === "draggableModules";
                    moveModuleState(moduleId, hookId, evt.nextLayoutId, isFromPool, evt.layoutId);
                    enableDisableSave(true);
                },
                onUpdate: (evt) => {
                    // Reorder within the same hook
                    const moduleId = evt.item.getAttribute("data-module-id");
                    moveModuleState(moduleId, hookId, evt.nextLayoutId, false, evt.layoutId);
                    enableDisableSave(true);
                },
            });
            sortableInstances.set(hookId, s);
        });
        enableDragging();
    });
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
    let totalSites = allSites.value.length;
    if (totalSites > 0) {
        for (let i = 0; i < totalSites; i++) {
            let current = allSites.value[i];
            categoriesData[current.id] = current.category;
        }
    }
    setDefaultFromTo();
};

const init = () => {
    if (categories.value.length === 0) addErrorMessage("No category found!");
    if (categoryInfo.value.length === 0) addErrorMessage("There is a mismatch in site default category. Please fix that.");
    if (hasTheme.value) {
        parseTheme();
        populateModules();
        enableSorting();
        makeCategories();
    } else {
        let path = AdminConfig.admin_path("category/settings", { platform_id: platformId.value });
        addErrorMessage(`This category/platform/theme is not available in category_site table.
                         You need to drag and drop in <a href='${path}'>category settings</a>.`);
        addErrorMessage(`Dont' forget the set the theme there.`);
    }
};

const saveModules = () => {
    if (enableDisableSave() === false) return false;
    let postParams = {};
    
    // Use synced reactive state for final module order (reliable Source of Truth)
    let datas = [];
    hooks.forEach(hook => {
        if (hook.modules && hook.modules.length > 0) {
            let modulesArr = hook.modules.map((m, index) => {
                return { module_id: m.id, position: index + 1 };
            });
            datas.push({ hook_id: hook.info.id, modules: modulesArr });
        }
    });

    if (datas.length > 0) {
        postParams.data = datas;
        postParams.where = getWhere();
        postParams.applicableForAllPlatforms = false;
        saveNow(AdminConfig.admin_path("homepage/saveSettings"), postParams)
            .then(() => {
                Toast.show(instance.proxy, "Saved...");
                enableDisableSave(false);
            })
            .catch(res => showError(res));
    }
};

const fetchNewData = () => {
    let where = getWhere();
    delete where.site_id;
    if (where.microsite_id === 0) delete where.microsite_id;
    window.location.href = AdminConfig.admin_path("homepage/ui", where);
};

const deleteAllModuleFromHook = (hookId) => {
    let hookCache = getHookInfoCache(hookId);
    if (hooks[hookCache.hookIndex]) hooks[hookCache.hookIndex].modules = [];
    removeModules(hookId, "hook_id");
};

const showHideDeleteAlert = (isShow) => {
    if (isShow) Modal.open(instance.proxy, "deleteBox");
    else Modal.close(instance.proxy, "deleteBox");
};

const deleteAllFromCategory = () => {
    showHideDeleteAlert(false);
    hooks.forEach(h => h.modules = []);
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
    let data = { fromData, toData };
    saveNow(AdminConfig.admin_path("homepage/copyData"), data)
        .then(res => {
            if (res.data.error) showError(res.data.message);
            else if (res.data.success) {
                showHideCopyAlert(false);
                Toast.show(instance.proxy, "Copied. Reloading...");
                window.location.reload();
            }
            isWorking.value = false;
        })
        .catch(res => {
            showHideCopyAlert(false);
            isWorking.value = false;
            showError(res);
        });
};

const showInfo = (type, id) => infoPopup.value?.showInfo(type, id);

const showHideHookPanel = (id) => {
    const key = id.toString();
    if (collapsedHooks.has(key)) {
        collapsedHooks.delete(key);
    } else {
        collapsedHooks.add(key);
    }
};

const onlyMe = (id) => {
    const isExpanding = onlyMeHookId.value !== id;
    onlyMeHookId.value = isExpanding ? id : null;
    // Always ensure the hook is open when entering expand mode
    if (isExpanding) {
        collapsedHooks.delete(id.toString());
    }
};

const hasAnyModulesInAHook = (hook) => hook.modules && hook.modules.length > 0;

onMounted(() => init());
</script>

<style scoped>
.is-dragging-active .js_delete_from_hook,
.is-dragging-active .js_delete {
    pointer-events: none !important;
    opacity: 0.3;
}
.module-drop-eager {
    outline: 2px dashed #6366f1 !important;
    outline-offset: -2px;
    background-color: rgba(99, 102, 241, 0.03);
}
</style>
