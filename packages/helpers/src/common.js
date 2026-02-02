/**
 * Created by marghoob.suleman on 8/23/17.
 */
import { EventBus } from "./event-bus";
import {
  queryBuilder,
  Storage,
  Utils,
  Fetcher,
  CopyToClipboard,
  PasteFromClipboard,
  IsJson,
  LeftMenu,
  TitleCase
} from "@hashtagcms/admin-sdk";

// Initialize SDK LeftMenu with EventBus
if (LeftMenu && typeof LeftMenu.init === 'function') {
  LeftMenu.init(EventBus);
}

export {
  queryBuilder,
  Storage,
  Utils,
  Fetcher,
  CopyToClipboard,
  PasteFromClipboard,
  IsJson,
  LeftMenu,
  TitleCase
};

/**
 * Toast
 * Dependecy: library/toastBox.vue
 *
 */
export class Toast {
  static show(vm, message = "", timeout = 1000, position) {
    vm.$root.$refs.globalToaster.show(message, timeout, position);
  }
  static hide(vm) {
    vm.$root.$refs.globalToaster.hide();
  }
}

/**
 * Loader
 * Dependecy: library/loader.vue
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
 * Dependency: library/modalBox.vue
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





