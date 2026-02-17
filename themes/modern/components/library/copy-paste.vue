<template>
  <div class="inline-flex items-center gap-2 p-1 bg-gray-50/50 rounded-lg border border-gray-100 shadow-inner">
    <hc-button
      v-if="showCopy"
      variant="secondary"
      outline
      is-square
      icon="fa fa-copy"
      title="Copy Configuration"
      @click="copyNow"
    />
    <hc-button
      v-if="showPaste"
      variant="primary"
      is-square
      icon="fa fa-paste"
      title="Paste Configuration"
      @click="pasteNow"
    />
  </div>
</template>

<script>
import {
  CopyToClipboard,
  PasteFromClipboard,
  Toast,
  IsJson,
  SafeJsonParse
} from "../../../../helpers/common";
import { EventBus } from "../../../../helpers/event-bus";
import HcButton from "../../ui-kit/HcButton.vue";

export default {
  name: "CopyPaste",
  components: {
    "hc-button": HcButton,
  },
  props: [
    "dataIgnoreFields",
    "dataPasteElement",
    "dataForm",
    "dataBackUrl",
    "dataCopyPasteAutoInit",
    "dataShowCopy",
    "dataShowPaste",
  ],

  data() {
    return {
      defaultIgnoreFields: [
        "id",
        "site_id",
        "backURL",
        "actionPerformed",
        "platform_id",
        "_token",
        "insert_by",
        "update_by",
      ],
      copyKey: "cms_copy_data",
      spinnerCss: ["fa-spinner", "fa-pulse", "fa-fw"],
    };
  },

  computed: {
    ignoreFields() {
      return SafeJsonParse(this.dataIgnoreFields, this.defaultIgnoreFields);
    },
    autoInit() {
      return this.dataCopyPasteAutoInit === undefined || this.dataCopyPasteAutoInit?.toString() === "true";
    },
    showCopy() {
      return this.dataShowCopy === undefined || this.dataShowCopy.toString() === "true";
    },
    showPaste() {
      return this.dataShowPaste === undefined || this.dataShowPaste.toString() === "true";
    },
    form() {
      if (typeof this.dataForm !== "undefined") {
        const el = document.getElementById(this.dataForm);
        if (el) return el;
      }
      return document;
    },
    pasteElement() {
      if (typeof this.dataPasteElement !== "undefined") {
        return document.getElementById(this.dataPasteElement);
      }
      // Default to first text input if auto-init is on
      return this.form.querySelectorAll?.("input[type='text'], input:not([type])")[0];
    }
  },

  mounted() {
    if (this.autoInit) {
      this.initAutoPaste();
    }
  },

  methods: {
    initAutoPaste() {
      if (this.pasteElement) {
        this.pasteElement.addEventListener("blur", (e) => {
          if (IsJson(e.target.value)) {
            this.pasteNow();
          }
        });
      }
    },

    /**
     * Copy form data to clipboard
     */
    copyNow() {
      // Find all relevant form elements
      const inputs = Array.from(this.form.querySelectorAll("input, textarea, select"));
      const store = {};

      inputs.forEach(el => {
        const name = el.getAttribute("name") || el.getAttribute("id");
        
        // Skip if ignored or no identifier
        if (!name || typeof name === "object" || this.ignoreFields.includes(name)) {
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
        Toast.show(this, "Copied to clipboard!", 1000);
      }
    },

    /**
     * Paste data and fill form
     */
    pasteNow(cb) {
      PasteFromClipboard()
        .then((res) => {
          if (!res) {
            Toast.show(this, "Clipboard is empty", 2000, "warning");
            return;
          }

          if (!IsJson(res)) {
            Toast.show(this, "Invalid data in clipboard", 2000, "warning");
            return;
          }
          
          const data = SafeJsonParse(res, {});
          this.fillData(data);
          
          if (typeof cb === 'function') cb(data);
          EventBus.emit("on-paste", res);
          Toast.show(this, "Data pasted and forms updated", 2000);
        })
        .catch((err) => {
          console.error("Paste failed:", err);
          Toast.show(this, "Unable to access clipboard. Try copying something first.", 4000, "error");
        });
    },

    /**
     * Fill form elements with data
     */
    fillData(data) {
      if (!data) return;

      Object.entries(data).forEach(([key, value]) => {
        try {
          // Try finding by name (works best for radio groups) or ID
          const elements = this.form.querySelectorAll(`[name="${key}"], #${key}`);
          
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
              this.highlightElement(el);
            }
          });
        } catch (e) {
          console.warn(`Could not fill field: ${key}`, e);
        }
      });
    },

    /**
     * Visual feedback for changed elements
     */
    highlightElement(el) {
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
    },
  },
};
</script>
