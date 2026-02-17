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
  SafeErrorData
} from "@hashtagcms/admin-sdk";

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
  SafeErrorData
};

/**
 * Toast
 * Dependency: library/toast-box.vue
 *
 */
export class Toast {
  static show(vm, message = "", timeout = 3000, options) {
    vm.$root.$refs.globalToaster.show(message, timeout, options);
  }
  static hide(vm) {
    vm.$root.$refs.globalToaster.hide();
  }
}

/**
 * Loader
 * Dependency: library/loader.vue
 *
 */
export class Loader {
  static show(vm, message = null, position = null) {
    vm.$root.$refs.globalLoader.show(message, position);
  }
  static hide(vm) {
    vm.$root.$refs.globalLoader.hide();
  }
}

/**
 * Modal
 * Dependency: library/modal-box.vue
 *
 */
export class Modal {
  static show(vm, message = "", position, callback, timeout) {
    vm.$root.$refs.globalModalBox.show(message, position, callback, timeout);
  }
  static hide(vm) {
    vm.$root.$refs.globalModalBox.hide();
  }
  static open(vm = null, modalRef = null, callback = null) {
    if (vm != null && modalRef != null) {
      vm.$refs[modalRef].open(callback);
    }
  }
  static close(vm = null, modalRef = null) {
    if (vm != null && modalRef != null) {
      vm.$refs[modalRef].hide();
    }
  }
}





