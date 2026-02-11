<template>
  <div class="flex flex-col flex-shrink-0 w-72 bg-[#0F172A] text-white h-full js_left_menu overflow-y-auto border-r border-white/5 shadow-lg">
    <!-- Header/Brand Area -->
    <div class="px-8 py-10 flex flex-col items-start gap-1">
        <h2 class="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Management</h2>
        <p class="text-lg font-black tracking-tighter text-white">Dashboard</p>
    </div>

    <nav class="flex-1 px-4 space-y-1">
      <template v-for="current in allData">
        <div v-if="current.parent_id === 0" :key="current.id" class="mb-4">
          <a
            :title="current.sub_title"
            :href="getHref(current)"
            :class="[
               'group flex items-center px-5 py-3.5 text-xs font-black uppercase tracking-widest rounded-lg transition-all duration-300',
               isActive(current.controller_name, current) ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            ]"
            aria-expanded="true"
          >
            <div :class="['w-8 h-8 rounded-xl flex items-center justify-center mr-3 transition-colors', isActive(current.controller_name, current) ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10 text-gray-400 group-hover:text-white']">
                <i v-if="current.icon_css && current.icon_css !== ''" :class="getIconClasses(current.icon_css)" aria-hidden="true"></i>
                <span v-else class="text-xs font-black">{{ getIconLabel(current) }}</span>
            </div>
            <span class="flex-1">{{ current.name }}</span>
            <i
              v-if="hasChild(current)"
              :class="[
                  'js_more fa fa-chevron-down text-[10px] transition-transform duration-300',
                  expandedMenus.includes(current.id) ? 'rotate-180 text-white' : 'text-gray-500 group-hover:text-gray-300'
              ]"
              @click.stop="toggleSubmenu(current.id, $event)"
            ></i>
          </a>
          <template v-if="hasChild(current)">
            <ul
              :class="[
                'js_child space-y-2 mt-2 py-2 border-l border-white/5 ml-9 transition-all duration-500',
                expandedMenus.includes(current.id) ? 'block opacity-100 translate-x-0' : 'hidden opacity-0 -translate-x-2'
              ]"
            >
              <li v-for="child in current.child" :key="child.id">
                <a
                  :title="child.sub_title"
                  :href="getHref(child)"
                  :class="[
                    'group flex items-center px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-200',
                    isActive(child.controller_name, child) ? 'bg-white/10 text-blue-400' : 'text-gray-500 hover:text-white hover:bg-white/5'
                  ]"
                >
                  <div :class="['w-6 h-6 rounded-lg flex items-center justify-center mr-3 transition-all', isActive(child.controller_name, child) ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-500 group-hover:text-white']">
                    <i v-if="child.icon_css && child.icon_css !== ''" :class="getIconClasses(child.icon_css, true)" aria-hidden="true"></i>
                    <span v-else class="text-[9px] font-black">{{ getIconLabel(child) }}</span>
                  </div>
                  {{ child.name }}
                </a>
              </li>
            </ul>
          </template>
        </div>
      </template>
    </nav>

    <!-- Sidebar Footer -->
    <div class="flex-shrink-0 p-6 mt-auto">
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg p-5 border border-white/5 group cursor-pointer hover:bg-gray-800 transition-colors">
          <a :href="linkForHashtag" target="_blank" class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-110">
                HC
            </div>
            <div class="flex flex-col">
                <span class="text-xs font-black text-white tracking-widest uppercase">HashtagCMS</span>
                <span class="text-[9px] font-black text-blue-400/80 uppercase">Version {{ dataHashtagcmsVersion }}</span>
            </div>
          </a>
      </div>
    </div>
  </div>
</template>

<script>
import AdminConfig from "@hashtagcms/helpers/admin-config";
export default {
  mounted() {
    // Auto-expand menus that have active children on page load
    this.allData.forEach(current => {
      if (this.isActive(current.controller_name, current)) {
        this.expandedMenus.push(current.id);
      }
    });
  },
  props: [
    "dataList",
    "dataControllerName",
    "dataModulesAllowed",
    "dataIsAdmin",
    "dataHashtagcmsVersion",
  ],
  data() {
    return {
      allData: this.dataList ? JSON.parse(this.dataList) : [],
      modulesAllowed: this.dataModulesAllowed
        ? JSON.parse(this.dataModulesAllowed)
        : [],
      expandedMenus: [], // Track which menus are manually expanded
    };
  },
  computed: {
    linkForHashtag() {
      return `https://www.hashtagcms.org/?utm_src=${window.location.href}`;
    },
  },
  methods: {
    toggleSubmenu(menuId, event) {
      // Prevent the parent link from navigating
      event.preventDefault();
      const index = this.expandedMenus.indexOf(menuId);
      if (index > -1) {
        // Menu is expanded, collapse it
        this.expandedMenus.splice(index, 1);
      } else {
        // Menu is collapsed, expand it
        this.expandedMenus.push(menuId);
      }
    },
    getIconClasses(iconCss, isChild = false) {
      // Ensure FontAwesome base class is present
      const classes = iconCss.trim();
      const hasFA = classes.includes('fa-') || classes.startsWith('fa ');
      const baseSize = isChild ? 'text-[10px]' : 'text-sm';
      
      // If it doesn't have 'fa' prefix, add it
      if (hasFA && !classes.includes(' fa ') && !classes.startsWith('fa ')) {
        return ['fa', classes, baseSize];
      }
      return [classes, baseSize];
    },
    getIconLabel(data) {
      const hasIcon = data.icon_css && data.icon_css !== '';
      console.log('Icon debug:', {
        name: data.name,
        icon_css: data.icon_css,
        hasIcon: hasIcon,
        label: !hasIcon ? data.controller_name.charAt(0).toUpperCase() : ''
      });
      return data.icon_css === "" || !data.icon_css
        ? data.controller_name.charAt(0).toUpperCase()
        : "";
    },
    getIconCss(data) {
      return data.icon_css === "" || !data.icon_css
        ? "badge badge-info text-small"
        : data.icon_css;
    },
    hasChild(data) {
      return data.child.length > 0;
    },
    getActiveCss(controller_name, data) {
      return this.isActive(controller_name, data) ? "active" : "";
    },
    isActive(controller_name, data) {
      if (this.dataControllerName === controller_name) {
        return true;
      }

      if (data && data.child && data.child.length > 0) {
        let controllerName = this.dataControllerName;
        return data.child.find(function (c) {
          return c.controller_name === controllerName;
        });
      }
    },
    getHref(data) {
      return AdminConfig.admin_path(data.controller_name);
    },
    hideAll() {
      let $this = this;
      document
        .querySelectorAll(".js_left_menu .js_child")
        .forEach(function (ele) {
          ele.classList.remove("active", "animated", "fadeIn");
        });
    },
    showHide(event) {
      this.hideAll();
      let ele = event.target;
      if (ele.classList.contains("js_more")) {
        event.preventDefault();
        //ele.nextSibling.style.display = "block";
        ele.parentElement.nextElementSibling.classList.add(
          "active",
          "animated",
          "fadeIn",
        );
      }
    },
    hasAccess(module_id) {
      if (this.dataIsAdmin.toString() === "1") {
        return true;
      }
      for (let i = 0; i < this.modulesAllowed.length; i++) {
        let current = this.modulesAllowed[i];
        if (current.module_id === module_id) {
          return true;
        }
      }
      return false;
    },
    getMinHeight() {
      return `height:${window.innerHeight}px;`;
    },
  },
};
</script>
