<template>
  <div class="space-y-6">
    <!-- Top Filter Bar -->
    <div
      v-show="hasMicrosites || hasPlatformsMoreThanOne"
      class="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
    >
      <div v-show="hasMicrosites" class="w-full md:w-64">
        <select
          v-model="micrositeId"
          class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-inner cursor-pointer"
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
          class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-inner cursor-pointer"
          @change="fetchNewData()"
        >
          <option value="">Select a Platform</option>
          <option v-for="platform in sitePlatforms" :key="platform.id" :value="platform.id">
            {{ platform.name }}
          </option>
        </select>
      </div>
      <div class="flex-1">
        <label
          v-show="hasPlatformsMoreThanOne"
          class="inline-flex items-center gap-2 cursor-pointer group"
          title="It will be inserted or deleted for all platforms if checked."
        >
          <input
            v-model="applicableForAllPlatforms"
            name="applicableForAll"
            type="checkbox"
            class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span class="text-xs font-bold text-gray-400 group-hover:text-blue-600 transition-colors uppercase tracking-widest ml-1">Global Add/Delete</span>
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
              @click="setCurrentSelection($event)"
            >
              <div class="flex items-center gap-5">
                 <div class="flex items-center gap-3">
                     <i class="fa fa-grip-vertical text-gray-300 group-hover:text-blue-400 transition-colors cursor-grab active:cursor-grabbing text-lg"></i>
                     <input v-show="showCheckbox" v-model="pc.selected" type="checkbox" class="w-5 h-5 text-blue-600 rounded border-gray-300 shadow-sm" />
                 </div>
                 <div class="flex flex-col gap-1">
                    <span class="text-sm font-black text-gray-700 leading-tight">{{ pc.category_name }}</span>
                    <div class="flex items-center gap-2">
                        <span v-if="pc.theme_id > 0" class="text-[9px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded shadow-sm border border-blue-100/50 tracking-tighter">
                            {{ getThemeName(pc.theme_id) }}
                        </span>
                        <span v-else class="text-[9px] font-black text-red-600 uppercase bg-red-50 px-2 py-0.5 rounded shadow-sm border border-red-100/50 tracking-tighter">
                            Missing Theme
                        </span>
                        <span v-if="pc.cache_category" class="text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                           {{ pc.cache_category }}
                        </span>
                    </div>
                 </div>
              </div>

              <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                  <button v-if="canDelete" class="p-2.5 text-gray-300 hover:text-red-600 hover:bg-red-100/50 hover:shadow-inner rounded-xl transition-all js_delete shadow-sm" title="Remove Category">
                      <i class="fa fa-trash-o js_delete"></i>
                  </button>
                  <button v-if="canEdit" class="p-2.5 text-gray-300 hover:text-blue-600 hover:bg-blue-100/50 hover:shadow-inner rounded-xl transition-all js_info shadow-sm" title="Configure Category">
                      <i class="fa fa-ellipsis-v js_info"></i>
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
                <div class="flex items-center gap-3">
                    <div class="h-8 w-1 bg-blue-500 rounded-full"></div>
                    <h3 class="text-base font-black text-gray-800 tracking-tight uppercase tracking-widest">Available Pool</h3>
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
                <i class="fa fa-plus text-xs text-blue-300 group-hover:text-blue-600 transition-all translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"></i>
              </li>
            </ul>
         </div>
      </div>
    </div>

    <!-- Configure Popover -->
    <div
      ref="popover"
      class="fixed z-[9999] hidden bg-white rounded-lg shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] border border-gray-100 w-80 overflow-hidden"
    >
      <div class="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <h4 class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Configuration Tool</h4>
          </div>
          <button @click="closePopup()" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"><i class="fa fa-close"></i></button>
      </div>
      <div class="p-6 space-y-5">
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
          <button class="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-lg shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-95 text-[10px] uppercase tracking-widest mt-2" @click="setThemeEtc()">
            Persist Configuration
          </button>
      </div>
    </div>
  </div>
</template>

<script>
import AdminConfig from "@hashtagcms/helpers/admin-config";

import Sortable from "sortablejs";
import { Toast } from "@hashtagcms/helpers/common";

export default {
  mounted() {
    this.init();
  },
  props: [
    "dataSiteId",
    "dataSitePlatforms",
    "dataSiteCategories",
    "dataSiteThemes",
    "dataSiteMicrosites",
    "dataPlatformId",
    "dataMicrositeId",
    "dataCategories",
    "dataUserRights",
  ],
  data() {
    return {
      checkAll: false,
      showCheckbox: false,
      sitePlatforms:
        typeof this.dataSitePlatforms === "undefined" ||
        this.dataSitePlatforms === ""
          ? []
          : JSON.parse(this.dataSitePlatforms),
      siteCategories:
        typeof this.dataSiteCategories === "undefined" ||
        this.dataSiteCategories === ""
          ? []
          : JSON.parse(this.dataSiteCategories),
      siteThemes:
        typeof this.dataSiteThemes === "undefined" || this.dataSiteThemes === ""
          ? []
          : JSON.parse(this.dataSiteThemes),
      siteMicrosites:
        typeof this.dataSiteMicrosites === "undefined" ||
        this.dataSiteMicrosites === ""
          ? []
          : JSON.parse(this.dataSiteMicrosites),
      categories:
        typeof this.dataCategories === "undefined" || this.dataCategories === ""
          ? []
          : JSON.parse(this.dataCategories),
      platformId:
        typeof this.dataPlatformId === "undefined" || this.dataPlatformId === ""
          ? 1
          : parseInt(this.dataPlatformId),
      micrositeId:
        typeof this.dataMicrositeId === "undefined" ||
        this.dataMicrositeId === ""
          ? 0
          : parseInt(this.dataMicrositeId),
      searchKeyPlatformCategory: "",
      searchKeyCategory: "",
      applicableForAllPlatforms: false,
      categoryId: 0,
      currentSelection: { category_id: 0, theme_id: "", cache_category: "" },
      allCategories: [],
      allCategoriesInfo: {},
      allSiteCategories: [],
      siteId:
        typeof this.dataSiteId === "undefined" ? 1 : parseInt(this.dataSiteId),
      showUpdateAllBtn: true,
      showUpdateAllDiv: false,
      globalTheme: "",
      userRights: this.dataUserRights ? JSON.parse(this.dataUserRights) : [],
    };
  },
  computed: {
    hasPlatformsMoreThanOne() {
      return this.sitePlatforms.length > 1;
    },
    hasMicrosites() {
      return this.siteMicrosites.length > 0;
    },
    canEdit() {
      return this.userRights.indexOf("edit") >= 0;
    },
    canDelete() {
      return this.userRights.indexOf("delete") >= 0;
    },
  },
  methods: {
    init() {
      this.makeData();
      if (this.canEdit) {
        this.enableSorting();
      }
    },
    selectAllData(findIn = "allCategories", holder) {
      let $this = this;
      let whereArr =
        findIn === "allCategories"
          ? this.allCategories
          : this.allSiteCategories;
      let selected = holder.checked;
      whereArr.forEach(function (current) {
        $this.$set(current, "selected", selected);
      });
    },
    makeData() {
      let $this = this;
      //this.allCategories = this.categories;
      let categories = this.categories;
      let selected = false;
      if (categories.length > 0) {
        categories.forEach(function (current) {
          let category_id = current.category_id;
          let category_name = current.lang.name || current.category_name;
          let theme_id = current.theme_id;
          let cache_category = current.cache_category;
          let obj = {
            category_id,
            category_name,
            theme_id,
            cache_category,
            selected,
          };
          $this.allCategories.push(obj);
          $this.allCategoriesInfo[category_id.toString()] = obj;
        });
      }
      //Site Categories
      categories = this.siteCategories;
      //console.log("categories ", categories);
      if (categories.length > 0) {
        categories.forEach(function (current) {
          let category_id = current.category_id;
          let category_name = current.name;
          let theme_id = "";
          let cache_category = "";
          let obj = {
            category_id,
            category_name,
            theme_id,
            cache_category,
            selected,
          };
          $this.allSiteCategories.push(obj);
        });
      }

      //console.log($this.allSiteCategories);
    },
    getWhere() {
      let where = {
        microsite_id: this.micrositeId,
        platform_id: this.platformId,
        category_id: this.categoryId,
        site_id: this.siteId,
      };
      return where;
    },
    saveNow(url, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(url, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },
    updateIndex() {
      let $this = this;
      let allCategories = document.querySelectorAll(".js_category li");
      let platformId = this.platformId;
      let datas = [];
      for (let i = 0; i < allCategories.length; i++) {
        let current = allCategories[i];
        //console.log("current ", current);
        let categoryInfo = this.getCategoryInfo(
          current.getAttribute("data-category-id"),
          "allCategories",
        );
        //console.log("categoryInfo ", categoryInfo);
        let data = { position: i + 1 };
        let where = {
          category_id: categoryInfo.category_id,
          platform_id: platformId,
        }; //microsite_id:
        datas.push({ where, data });
      }

      if (datas.length > 0) {
        let url = AdminConfig.admin_path("category/updateIndex");
        let postParams = {};
        postParams.data = datas;
        //postParams.applicableForAllPlatforms = $this.applicableForAllPlatforms;
        this.saveNow(url, postParams)
          .then(function (res) {
            //console.log(res);
            Toast.show($this, "Saved...");
          })
          .catch(function (res) {
            Toast.show($this, res.data.message, 2000);
          });
      }
    },
    showSearch(findIn = "allCategories") {
      let whereArr =
        findIn === "allCategories"
          ? this.allCategories
          : this.allSiteCategories;
      return whereArr.length > 10;
    },
    filterData(findIn = "allCategories") {
      let key =
        findIn === "allCategories"
          ? this.searchKeyPlatformCategory
          : this.searchKeyCategory;
      let whereArr =
        findIn === "allCategories"
          ? this.allCategories
          : this.allSiteCategories;
      if (key !== "" && key != null) {
        key = key.toLowerCase();

        return whereArr.filter(function (current) {
          let name = current.category_name.toLowerCase();
          let id = current.category_id;
          if (id.toString() === key.toString() || name.includes(key)) {
            return current;
          }
        });
      } else {
        // console.log("data", this.allData.data);
        return findIn === "allCategories"
          ? this.allCategories
          : this.allSiteCategories;
      }
    },
    setCurrentSelection(evt) {
      let target = evt.currentTarget;
      let span = evt.target;

      let category_id = target.getAttribute("data-category-id");
      let theme_id = target.getAttribute("data-theme-id");

      let categoryInfo = this.getCategoryInfo(category_id, "allCategories");

      this.currentSelection.theme_id = theme_id;
      this.currentSelection.category_id = category_id;
      this.currentSelection.cache_category = categoryInfo.cache_category;

      let action;
      if (span.classList.contains("js_info")) {
        action = "info";
        showInfo(target, this.$refs.popover);
      }
      if (span.classList.contains("js_delete")) {
        action = "delete";
      }

      // console.log(this.currentSelection);

      function showInfo(source, target, where = "center-right") {
        target.classList.remove(...["animated", "fadeOut", "hide"]);
        let src = source;
        let tgt = target;
        let srcOpt = src.getBoundingClientRect();
        let tgtOpt = tgt.getBoundingClientRect();

        let left = srcOpt.left + srcOpt.width;
        let top = srcOpt.top + srcOpt.height - tgtOpt.height / 2;

        target.classList.add(...["animated", "jello"]);

        switch (where) {
          case "center-right":
            tgt.style.position = "absolute";
            tgt.style.left = left + "px";
            tgt.style.top = top + "px";
            break;
        }
      }
    },
    closePopup() {
      this.$refs.popover.classList.add(...["animated", "fadeOut", "hide"]);
      setTimeout(() => {});
    },
    fetchNewData() {
      let where = this.getWhere();
      delete where.category_id;
      if (where.microsite_id === 0) {
        delete where.microsite_id;
      }
      let url = "category/settings";
      window.location.href = AdminConfig.admin_path(url, where);
    },
    enableSorting() {
      let $this = this;
      this.$nextTick(function () {
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
                // Click on remove button
                $this.removeCategory(id);
              }
            },
            onUpdate: function (/**Event*/ evt) {
              //console.log("onUpdate ", evt);
              $this.updateIndex();
            },
          });
        });
      });

      //Right Side module
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
        onEnd: function (/**Event*/ evt) {
          let to = evt.to;
          let item = evt.item; // dragged HTMLElement

          let categoryId = item.getAttribute("data-category-id");

          if (categoryId) {
            let categoryInfo = $this.getCategoryInfo(
              categoryId,
              "allSiteCategories",
            );

            //console.log("onEnd: categoryInfo ",categoryInfo);

            let isAdded;
            if (categoryInfo !== null) {
              isAdded = $this.addCategory(categoryInfo);
            }

            item.parentNode.removeChild(item);

            $this.highlightEagerDrop("remove");

            //we can send feedback
            if (isAdded === false) {
              Toast.show(
                $this,
                "Category is already added in this platform...",
              );
            }
          }
        },
        onStart: function (/**Event*/ evt) {
          $this.highlightEagerDrop("add");
        },
      });
    },
    highlightEagerDrop(addRemove = "add") {
      let js_hook_modules = document.querySelectorAll(".js_category");
      js_hook_modules.forEach(function (current) {
        current.classList[addRemove]("module-drop-eager");
      });
    },
    getCategoryInfo(categoryId, findIn = "allSiteCategories") {
      let found = null;
      let whereArr =
        findIn === "allSiteCategories"
          ? this.allSiteCategories
          : this.allCategories;

      for (let i = 0; i < whereArr.length; i++) {
        let current = whereArr[i];
        if (parseInt(current.category_id) === parseInt(categoryId)) {
          found = current;
          break;
        }
      }
      return found;
    },
    findIndex(categoryId, findIn = "allCategories") {
      //allCategories is left site
      let index = -1;
      let whereArr =
        findIn === "allCategories"
          ? this.allCategories
          : this.allSiteCategories;
      if (whereArr.length > 0) {
        for (let i = 0; i < whereArr.length; i++) {
          let current = whereArr[i];
          if (parseInt(current.category_id) === parseInt(categoryId)) {
            index = i;
            break;
          }
        }
      }
      return index;
    },
    addCategory(category) {
      let $this = this;
      let index = this.findIndex(category.category_id);
      let isAdded = false;
      if (index === -1) {
        //add in info
        this.allCategoriesInfo[category.category_id.toString()] = {
          index: index,
          info: category,
        };

        //save in db
        setTimeout(function () {
          updateInDB();
        }, 1);

        isAdded = this.allCategories.push(category);

        //console.log("isAdded 2 ",isAdded);
      }

      return isAdded;

      function updateInDB() {
        let url = AdminConfig.admin_path("category/insertCategory");
        let where = $this.getWhere();
        let postParams = {};
        delete category["name"];
        category.platform_id = where.platform_id;
        postParams.data = {
          category_id: category.category_id,
          platform_id: where.platform_id,
          site_id: where.site_id,
        };
        postParams.applicableForAllPlatforms = $this.applicableForAllPlatforms;
        $this
          .saveNow(url, postParams)
          .then(function (res) {
            Toast.show($this, "Saved...");
          })
          .catch(function (res) {
            Toast.show($this, res.data.message, 2000);
          });
      }
    },
    setThemeEtc() {
      let $this = this;
      let current = this.currentSelection;
      //set them in array
      let index = this.findIndex(current.category_id);

      if (index !== -1) {
        this.allCategories[index].theme_id = current.theme_id;
        this.allCategories[index].cache_category = current.cache_category;
        this.categoryId = parseInt(current.category_id);

        let postParams = {};
        postParams.where = this.getWhere();
        postParams.data = {
          cache_category: current.cache_category || "",
          theme_id: current.theme_id,
        };
        postParams.applicableForAllPlatforms = $this.applicableForAllPlatforms;

        let url = AdminConfig.admin_path("category/updateThemeAndEtc");
        this.saveNow(url, postParams)
          .then(function (res) {
            Toast.show($this, "Saved...");
          })
          .catch(function (res) {
            Toast.show($this, res.data.message, 2000);
          });
      }
      this.closePopup();
    },
    removeCategory(id) {
      let $this = this;
      let index = this.findIndex(id);
      if (index !== -1) {
        let categoryInfo = this.allCategories.splice(index, 1);
        removeNow(categoryInfo[0]);
        return categoryInfo;
      }

      function removeNow(categoryInfo) {
        let url = AdminConfig.admin_path("category/deleteCategory");
        let postParams = {};
        let where = $this.getWhere();

        postParams.where = {
          category_id: categoryInfo.category_id,
          microsite_id: where.microsite_id,
        };

        if (!$this.applicableForAllPlatforms) {
          postParams.where.platform_id = where.platform_id;
        }
        $this
          .saveNow(url, postParams)
          .then(function (res) {
            Toast.show($this, "Saved...");
          })
          .catch(function (res) {
            Toast.show($this, res.data.message, 2000);
          });
      }
    },
    getThemeName(id) {
      for (let i = 0; i < this.siteThemes.length; i++) {
        if (this.siteThemes[i].id == id) {
          return this.siteThemes[i].name;
        }
      }
      return "";
    },
    updateThemeToAllCategories() {
      let $this = this;
      let url = AdminConfig.admin_path("category/updateThemeForAllCategories");
      let categories = this.filterData("allCategories");

      if (this.globalTheme !== "") {
        if (categories.length > 0) {
          let where = this.getWhere();
          delete where.category_id;
          delete where.microsite_id;

          let postParams = {
            data: { theme_id: this.globalTheme },
            where: where,
          };
          Toast.show($this, "Please wait...");
          this.saveNow(url, postParams)
            .then(function (res) {
              //console.log(res);
              if (res.data["error"]) {
                Toast.show($this, res.data.message, 5000);
              } else {
                Toast.show($this, "Saved");
                for (let i = 0; i < categories.length; i++) {
                  categories[i].theme_id = $this.globalTheme;
                  //console.log(categories[i]);
                }
              }
            })
            .catch(function (res) {
              Toast.show($this, res.data.message, 2000);
            });
        }
      }
    },
  },
};
</script>
