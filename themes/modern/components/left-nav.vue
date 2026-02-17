<template>
  <div :class="['flex flex-col flex-shrink-0 bg-[#0F172A] text-white h-full js_left_menu overflow-y-auto border-r border-white/5 shadow-lg transition-all duration-300 ease-in-out', isCollapsed ? 'w-20' : 'w-72']">    
    
    <!-- Sidebar Toggle (Internal) -->
    <div :class="['flex items-center px-4 py-4 border-b border-white/5', isCollapsed ? 'justify-center' : 'justify-end']">
        <button 
           @click="toggleCollapse"
           class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all active:scale-95 group"
           title="Toggle Sidebar"
        >
            <i :class="['fa text-xs transition-transform duration-300', isCollapsed ? 'fa-angle-double-right group-hover:translate-x-0.5' : 'fa-angle-double-left group-hover:-translate-x-0.5']"></i>
        </button>
    </div>

    <nav class="flex-1 px-4 space-y-1 mt-3">
      <template v-for="current in allData">
        <div 
          v-if="current.parent_id === 0" 
          :key="current.id"
          @mouseenter="handleMouseEnter(current.id, $event)"
          @mouseleave="handleMouseLeave"
        >
          <a
            :title="current.sub_title || current.name"
            :href="getHref(current)"
            @mouseenter="handleLinkHover($event, current.name)"
            @mouseleave="handleLinkLeave"
            :class="[
               'relative group flex items-center rounded-lg transition-all duration-300',
               isCollapsed ? 'px-3 py-3 justify-center' : 'px-5 py-3.5 text-xs font-black tracking-widest',
               isActive(current.controller_name, current) ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            ]"
          >
            <!-- Icon / Initial -->
            <div :class="['flex-shrink-0 rounded-xl flex items-center justify-center transition-all duration-300', 
                isCollapsed ? 'w-10 h-10' : 'w-4 h-4 mr-3',
                isActive(current.controller_name, current) ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10 text-gray-400 group-hover:text-white'
            ]">
                <i v-if="current.icon_css && current.icon_css !== ''" :class="getIconClasses(current.icon_css)" aria-hidden="true"></i>
                <span v-else class="text-xs font-black uppercase">{{ getIconLabel(current) }}</span>
            </div>

            <!-- Label -->
            <span v-show="!isCollapsed" class="flex-1 truncate">{{ current.name }}</span>

            <!-- Arrow -->
            <i
              v-if="hasChild(current) && !isCollapsed"
              :class="[
                  'js_more fa fa-chevron-down text-[10px] transition-transform duration-300 ml-2',
                  expandedMenus.includes(current.id) ? 'rotate-180 text-white' : 'text-gray-500 group-hover:text-gray-300'
              ]"
              @click.stop="toggleSubmenu(current.id, $event)"
            ></i>

            <!-- Mini Tooltip (Hidden if not collapsed) -->
            <div 
              v-if="isCollapsed"
              class="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-xl border border-white/5 whitespace-nowrap"
            >
              {{ current.name }}
            </div>
          </a>

          <!-- Submenus - Only show if not collapsed -->
          <template v-if="hasChild(current) && !isCollapsed">
            <ul
              :class="[
                'js_child space-y-2 mt-2 py-2 border-l border-white/5 ml-9 transition-all duration-500',
                expandedMenus.includes(current.id) ? 'block opacity-100 translate-x-0' : 'hidden opacity-0 -translate-x-2'
              ]"
            >
              <li v-for="child in current.child" :key="child.id">
                <a
                  :title="child.sub_title || child.name"
                  :href="getHref(child)"
                  :class="[
                    'group flex items-center px-4 py-2 text-[10px] font-black tracking-widest rounded-xl transition-all duration-200',
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
    <div class="flex-shrink-0 p-4 mt-auto">
      <div :class="['bg-gray-800/50 backdrop-blur-sm rounded-lg border border-white/5 group cursor-pointer hover:bg-gray-800 transition-all overflow-hidden', isCollapsed ? 'p-3 text-center' : 'p-5']">
          <a :href="linkForHashtag" target="_blank" class="flex flex-col">
                <span :class="['font-black text-white tracking-widest uppercase', isCollapsed ? 'text-[8px]' : 'text-xs']">H<span v-show="!isCollapsed">ashtagCms</span></span>
                <span v-show="!isCollapsed" class="text-[9px] font-black text-blue-400/80 uppercase mt-1">Version {{ dataHashtagcmsVersion }}</span>
          </a>
      </div>
    </div>

    <!-- Floating Tooltip (Cursor Follower) -->
    <Teleport to="body">
      <div 
        class="fixed z-[10000] pointer-events-none px-3 py-1.5 bg-gray-900 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded shadow-xl transition-opacity duration-200"
        :style="{
           top: tooltipY + 'px',
           left: tooltipX + 'px',
           opacity: tooltipVisible ? 1 : 0,
           transform: `translate(12px, 12px)`
        }"
      >
        {{ tooltipText }}
      </div>
    </Teleport>

    <!-- Floating Submenu (Portal) -->
    <Teleport to="body">
      <div 
        v-if="isCollapsed && activeHoveredMenu && hasChild(activeHoveredMenu)"
        class="fixed z-[9999] w-56 bg-[#0F172A] border border-white/10 rounded-r-xl shadow-2xl py-2 pl-4 transition-all duration-200"
        :style="{ top: hoveredMenuTop + 'px', left: '5rem' }"
        @mouseenter="cancelLeave"
        @mouseleave="handleMouseLeave"
      >
         <!-- Arrow pointing left -->
         <div class="absolute top-4 -left-2 w-4 h-4 bg-[#0F172A] border-l border-b border-white/10 transform rotate-45"></div>

         <div class="relative z-10">
            <div class="px-4 py-2 border-b border-white/5 mb-2">
               <h4 class="text-xs font-black text-white uppercase tracking-widest">{{ activeHoveredMenu.name }}</h4>
               <p v-if="activeHoveredMenu.sub_title" class="text-[9px] text-gray-500 font-bold mt-0.5">{{ activeHoveredMenu.sub_title }}</p>
            </div>
            
            <ul class="space-y-1 pr-2 max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">
              <li v-for="child in activeHoveredMenu.child" :key="child.id">
                <a
                  :href="getHref(child)"
                  :class="[
                    'flex items-center px-4 py-2.5 text-[10px] font-black tracking-widest rounded-lg transition-all',
                    isActive(child.controller_name, child) ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  ]"
                >
                  <i v-if="child.icon_css" :class="[getIconClasses(child.icon_css, true), 'mr-3 opacity-70']"></i>
                  <span v-else class="mr-3 opacity-70 text-[8px] font-black">#</span>
                  {{ child.name }}
                </a>
              </li>
            </ul>
         </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import AdminConfig from "../../../helpers/admin-config";
import { LeftMenu, SafeJsonParse } from "../../../helpers/common";
import { EventBus } from "../../../helpers/event-bus";

export default {
  name: "LeftNav",
  props: [
    "dataList",
    "dataControllerName",
    "dataModulesAllowed",
    "dataIsAdmin",
    "dataHashtagcmsVersion",
  ],
  data() {
    return {
      allData: SafeJsonParse(this.dataList, []),
      modulesAllowed: SafeJsonParse(this.dataModulesAllowed, []),
      expandedMenus: [],
      isCollapsed: false,
      hoveredMenu: null,
      hoveredMenuTop: 0,
      hoverTimeout: null,
      tooltipText: '',
      tooltipVisible: false,
      tooltipX: 0,
      tooltipY: 0
    };
  },
  mounted() {
    window.addEventListener('mousemove', this.updateTooltipPosition);
    // Sync with global state
    this.isCollapsed = LeftMenu.isCollapsed();
    
    // Auto-expand menus that have active children on page load (only if not collapsed)
    if (!this.isCollapsed) {
        this.allData.forEach(current => {
          if (this.isActive(current.controller_name, current)) {
            this.expandedMenus.push(current.id);
          }
        });
    }

    // Listen for global collapse events
    EventBus.on("left-menu-on-collapse", () => {
        this.isCollapsed = true;
        this.expandedMenus = []; // Collapse all when minimizing
    });
    EventBus.on("left-menu-on-expand", () => {
        this.isCollapsed = false;
    });
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.updateTooltipPosition);
  },
  computed: {
    linkForHashtag() {
        return `https://www.hashtagcms.org/?utm_src=${window.location.host}`;
    },
    activeHoveredMenu() {
      if (!this.hoveredMenu) return null;
      return this.allData.find(m => m.id === this.hoveredMenu);
    }
  },
  methods: {
    updateTooltipPosition(e) {
      if (this.tooltipVisible) {
        this.tooltipX = e.clientX;
        this.tooltipY = e.clientY;
      }
    },
    handleLinkHover(e, text) {
      if(this.isCollapsed) {
          this.tooltipText = text;
          this.tooltipVisible = true;
          this.tooltipX = e.clientX;
          this.tooltipY = e.clientY;
      }
    },
    handleLinkLeave() {
      this.tooltipVisible = false;
    },
    handleMouseEnter(id, event) {
        if (!this.isCollapsed) return;
        this.cancelLeave();
        this.hoveredMenu = id;
        
        // Calculate top position ensuring it doesn't go off-screen
        const rect = event.currentTarget.getBoundingClientRect();
        let top = rect.top;
        
        // Basic viewport check could be added here if needed
        this.hoveredMenuTop = top;
    },
    handleMouseLeave() {
        this.hoverTimeout = setTimeout(() => {
            this.hoveredMenu = null;
        }, 150);
    },
    cancelLeave() {
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
            this.hoverTimeout = null;
        }
    },
    toggleCollapse() {
        this.isCollapsed = LeftMenu.toggleCollapse();
    },
    toggleSubmenu(menuId, event) {
      event.preventDefault();
      if (this.isCollapsed) return;

      const index = this.expandedMenus.indexOf(menuId);
      if (index > -1) {
        this.expandedMenus.splice(index, 1);
      } else {
        this.expandedMenus.push(menuId);
      }
    },
    getIconClasses(iconCss, isChild = false) {
      const classes = iconCss.trim();
      const hasFA = classes.includes('fa-') || classes.startsWith('fa ');
      const baseSize = isChild ? 'text-[10px]' : (this.isCollapsed ? 'text-lg' : 'text-sm');
      
      if (hasFA && !classes.includes(' fa ') && !classes.startsWith('fa ')) {
        return ['fa', classes, baseSize];
      }
      return [classes, baseSize];
    },
    getIconLabel(data) {
      return data.icon_css === "" || !data.icon_css
        ? data.controller_name.charAt(0).toUpperCase()
        : "";
    },
    isActive(controller_name, data) {
      if (this.dataControllerName === controller_name) {
        return true;
      }
      if (data && data.child && data.child.length > 0) {
        let controllerName = this.dataControllerName;
        return data.child.find(c => c.controller_name === controllerName);
      }
      return false;
    },
    hasChild(data) {
      return data && data.child && data.child.length > 0;
    },
    getHref(data) {
      return AdminConfig.admin_path(data.controller_name);
    }
  },
};
</script>
