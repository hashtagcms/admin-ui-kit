/**
 * Created by marghoob.suleman on 8/23/17.
 */
import { EventBus } from "./event-bus";
import {
  QueryBuilder,
  Storage,
  Utils,
  Fetcher,
  CopyToClipboard,
  PasteFromClipboard,
  IsJson,
  LeftMenu,
  TitleCase,
  SafeJsonParse,
  SafeErrorData,
  Store,
  CleanForUrl
} from "@hashtagcms/admin-sdk";

/**
 * Maps UI actions to system permissions
 * @type {Object}
 */
const ACTION_MAP = {
  "edit": "edit",
  "delete": "delete",
  "publish": "publish",
  "approve": "approve",
  "settings": "edit",
  "showinfo": "read",
  "info": "read",
  "create": "add",
  "add": "add"
};

// Initialize SDK LeftMenu with EventBus
if (LeftMenu && typeof LeftMenu.init === 'function') {
  LeftMenu.init(EventBus);
  
  // Fallback for missing methods in case SDK build is not updated
  if (typeof LeftMenu.isCollapsed !== 'function') {
      LeftMenu.collapsed = false;
      LeftMenu.storageKey = 'htcms_sidebar_collapsed';
      
      LeftMenu.isCollapsed = function() {
          return this.collapsed;
      };
      
      // Check initial state
      if (typeof localStorage !== 'undefined') {
          const stored = localStorage.getItem(LeftMenu.storageKey);
          if (stored !== null) {
              LeftMenu.collapsed = SafeJsonParse(stored, false);
          }
      }

      // Sync DOM on init
      if (typeof document !== 'undefined') {
          const leftElem = document.querySelector('.js_left_panel');
          if (leftElem) {
              if (LeftMenu.collapsed) {
                 leftElem.classList.add('is-collapsed');
              } else {
                 leftElem.classList.remove('is-collapsed');
              }
              // Final check if DOM has it forced
              if (leftElem.classList.contains('is-collapsed')) {
                  LeftMenu.collapsed = true;
              }
          }
      }
  }
  
  if (typeof LeftMenu.toggleCollapse !== 'function') {
      LeftMenu.toggleCollapse = function(collapsed) {
          if (typeof document === 'undefined') return;
          let leftElem = document.querySelector('.js_left_panel');
          if (!leftElem) return;

          this.collapsed = (collapsed !== undefined) ? collapsed : !this.collapsed;
          
          // Persist
          if (typeof localStorage !== 'undefined') {
              localStorage.setItem(this.storageKey, JSON.stringify(this.collapsed));
          }

          if (this.collapsed) {
              leftElem.classList.add('is-collapsed');
              if (this.emit) this.emit("left-menu-on-collapse");
          } else {
              leftElem.classList.remove('is-collapsed');
              if (this.emit) this.emit("left-menu-on-expand");
          }
          return this.collapsed;
      };
  }
}

export {
  QueryBuilder,
  Storage,
  Utils,
  Fetcher,
  CopyToClipboard,
  PasteFromClipboard,
  IsJson,
  LeftMenu,
  TitleCase,
  SafeJsonParse,
  SafeErrorData,
  Store,
  CleanForUrl,
  ACTION_MAP
};

/**
 * Toast
 * Dependency: library/toast-box.vue
 *
 */
export class Toast {
  static getRoot(vm) {
    if (!vm) return null;
    return vm.$root || (vm.proxy && vm.proxy.$root) || (vm.root && vm.root.proxy) || vm;
  }
  static show(vm, message = "", timeout = 3000, options) {
    const root = this.getRoot(vm);
    if (root && root.$refs && root.$refs.globalToaster) {
      root.$refs.globalToaster.show(message, timeout, options);
    } else {
      console.warn("Toast.show: globalToaster not found. root:", root);
    }
  }
  static hide(vm) {
    const root = this.getRoot(vm);
    if (root && root.$refs && root.$refs.globalToaster) {
      root.$refs.globalToaster.hide();
    }
  }
}

/**
 * Loader
 * Dependency: library/loader.vue
 *
 */
export class Loader {
  static getRoot(vm) {
    if (!vm) return null;
    return vm.$root || (vm.proxy && vm.proxy.$root) || (vm.root && vm.root.proxy) || vm;
  }
  static show(vm, message = null, position = null) {
    const root = this.getRoot(vm);
    if (root && root.$refs && root.$refs.globalLoader) {
      root.$refs.globalLoader.show(message, position);
    } else {
      console.warn("Loader.show: globalLoader not found. root:", root);
    }
  }
  static hide(vm) {
    const root = this.getRoot(vm);
    if (root && root.$refs && root.$refs.globalLoader) {
      root.$refs.globalLoader.hide();
    }
  }
}

/**
 * Modal
 * Dependency: library/modal-box.vue
 *
 */
export class Modal {
  static getRoot(vm) {
    if (!vm) return null;
    return vm.$root || (vm.proxy && vm.proxy.$root) || (vm.root && vm.root.proxy) || vm;
  }
  static show(vm, message = "", position, callback, timeout) {
    const root = this.getRoot(vm);
    if (root && root.$refs && root.$refs.globalModalBox) {
      root.$refs.globalModalBox.show(message, position, callback, timeout);
    } else {
      console.warn("Modal.show: globalModalBox not found. root:", root);
    }
  }
  static hide(vm) {
    const root = this.getRoot(vm);
    if (root && root.$refs && root.$refs.globalModalBox) {
      root.$refs.globalModalBox.hide();
    }
  }
  static open(vm = null, modalRef = null, callback = null) {
    if (vm != null && modalRef != null) {
      const instance = vm.proxy || vm;
      if (instance && instance.$refs && instance.$refs[modalRef]) {
        instance.$refs[modalRef].open(callback);
      } else if (vm.refs && vm.refs[modalRef]) {
        vm.refs[modalRef].open(callback);
      } else {
        console.warn(`Modal.open: ref '${modalRef}' not found.`);
      }
    }
  }
  static close(vm = null, modalRef = null) {
    if (vm != null && modalRef != null) {
      const instance = vm.proxy || vm;
      if (instance && instance.$refs && instance.$refs[modalRef]) {
        instance.$refs[modalRef].hide();
      } else if (vm.refs && vm.refs[modalRef]) {
        vm.refs[modalRef].hide();
      } else {
        console.warn(`Modal.close: ref '${modalRef}' not found.`);
      }
    }
  }
}

/** Some UI Alignments */
export const CheckBoxAlignment = { position: 'relative', top: '-5px', left: '3px' };
