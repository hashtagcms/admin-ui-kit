<template>
  <div class="inline-flex items-center gap-2 p-1 bg-gray-50/50 rounded-lg border border-gray-100 shadow-inner">
    <hc-button
      v-if="showCopy"
      variant="secondary"
      outline
      is-square
      size="md"
      icon="fa fa-copy"
      title="Copy Configuration"
      @click="copyNow"
    />
    <hc-button
      v-if="showPaste"
      variant="primary"
      is-square
      size="md"
      icon="fa fa-paste"
      title="Paste Configuration"
      @click="pasteNow"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, getCurrentInstance } from "vue";
import {
  CopyToClipboard,
  PasteFromClipboard,
  Toast,
  IsJson,
  SafeJsonParse
} from "../../../../helpers/common";
import { EventBus } from "../../../../helpers/event-bus";
import HcButton from "../../ui-kit/HcButton.vue";

const props = defineProps({
  dataIgnoreFields: [String, Array],
  dataPasteElement: String,
  dataForm: String,
  dataBackUrl: String,
  dataCopyPasteAutoInit: [String, Boolean],
  dataShowCopy: [String, Boolean],
  dataShowPaste: [String, Boolean],
});

const instance = getCurrentInstance();

const defaultIgnoreFields = [
  "id",
  "site_id",
  "backURL",
  "actionPerformed",
  "platform_id",
  "_token",
  "insert_by",
  "update_by",
];

const copyKey = "cms_copy_data";
const spinnerCss = ["fa-spinner", "fa-pulse", "fa-fw"];

const ignoreFields = computed(() => SafeJsonParse(props.dataIgnoreFields, defaultIgnoreFields));

const autoInit = computed(() => {
  return props.dataCopyPasteAutoInit === undefined || props.dataCopyPasteAutoInit?.toString() === "true";
});

const showCopy = computed(() => {
  return props.dataShowCopy === undefined || props.dataShowCopy.toString() === "true";
});

const showPaste = computed(() => {
  return props.dataShowPaste === undefined || props.dataShowPaste.toString() === "true";
});

const form = computed(() => {
  if (typeof props.dataForm !== "undefined") {
    const el = document.getElementById(props.dataForm);
    if (el) return el;
  }
  return document;
});

const pasteElement = computed(() => {
  if (typeof props.dataPasteElement !== "undefined") {
    return document.getElementById(props.dataPasteElement);
  }
  // Default to first text input if auto-init is on
  return form.value.querySelectorAll?.("input[type='text'], input:not([type])")[0];
});

onMounted(() => {
  if (autoInit.value) {
    initAutoPaste();
  }
});

const initAutoPaste = () => {
  if (pasteElement.value) {
    pasteElement.value.addEventListener("blur", (e) => {
      if (IsJson(e.target.value)) {
        pasteNow();
      }
    });
  }
};

/**
 * Copy form data to clipboard
 */
const copyNow = () => {
  // Find all relevant form elements
  const inputs = Array.from(form.value.querySelectorAll("input, textarea, select"));
  const store = {};

  inputs.forEach(el => {
    const name = el.getAttribute("name") || el.getAttribute("id");
    
    // Skip if ignored or no identifier
    if (!name || typeof name === "object" || ignoreFields.value.includes(name)) {
      return;
    }

    // Handle different input types
    if (el.type === "checkbox") {
      store[name] = el.checked;
    } else if (el.type === "radio") {
      // Only store the value of the checked radio in the group
      if (el.checked) {
        store[name] = el.value;
      }
    } else {
      store[name] = el.value;
    }
  });

  const data = JSON.stringify(store);
  if (CopyToClipboard(data)) {
    EventBus.emit("on-copy", data);
    Toast.show(instance.proxy, "Copied to clipboard!", 1000);
  }
};

/**
 * Paste data and fill form
 */
const pasteNow = (cb) => {
  PasteFromClipboard()
    .then((res) => {
      if (!res) {
        Toast.show(instance.proxy, "Clipboard is empty", 2000, "warning");
        return;
      }

      if (!IsJson(res)) {
        Toast.show(instance.proxy, "Invalid data in clipboard", 2000, "warning");
        return;
      }
      
      const data = SafeJsonParse(res, {});
      fillData(data);
      
      if (typeof cb === 'function') cb(data);
      EventBus.emit("on-paste", res);
      Toast.show(instance.proxy, "Data pasted and forms updated", 2000);
    })
    .catch((err) => {
      console.error("Paste failed:", err);
      Toast.show(instance.proxy, "Unable to access clipboard. Try copying something first.", 4000, "error");
    });
};

/**
 * Fill form elements with data
 */
const fillData = (data) => {
  if (!data) return;

  Object.entries(data).forEach(([key, value]) => {
    try {
      // Try finding by name (works best for radio groups) or ID
      const elements = form.value.querySelectorAll(`[name="${key}"], #${key}`);
      
      if (elements.length === 0) return;

      elements.forEach(el => {
        let changed = false;

        if (el.type === "checkbox") {
          if (el.checked !== !!value) {
            el.checked = !!value;
            changed = true;
          }
        } else if (el.type === "radio") {
          // For radios, we only check the one that matches the value
          const shouldBeChecked = el.value.toString() === (value || "").toString();
          if (el.checked !== shouldBeChecked) {
            el.checked = shouldBeChecked;
            changed = true;
          }
        } else {
          if (el.value !== value) {
            el.value = value || "";
            changed = true;
          }
        }

        // Trigger events so Vue/other listeners pick up the change
        if (changed) {
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
          highlightElement(el);
        }
      });
    } catch (e) {
      console.warn(`Could not fill field: ${key}`, e);
    }
  });
};

/**
 * Visual feedback for changed elements
 */
const highlightElement = (el) => {
  const originalTransition = el.style.transition;
  const originalBackground = el.style.backgroundColor;
  
  el.style.transition = 'background-color 0.5s ease';
  el.style.backgroundColor = '#dbeafe'; // Light blue highlight
  
  setTimeout(() => {
    el.style.backgroundColor = originalBackground;
    setTimeout(() => {
      el.style.transition = originalTransition;
    }, 500);
  }, 1000);
};

defineExpose({
  copyNow,
  pasteNow
});
</script>

