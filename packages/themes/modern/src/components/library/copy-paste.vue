<template>
  <div class="inline-flex items-center gap-2 p-1 bg-gray-50/50 rounded-lg border border-gray-100 shadow-inner">
    <button
      v-if="showCopy"
      aria-label="Copy"
      class="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-200 rounded-xl transition-all shadow-sm active:scale-90 group"
      title="Copy Configuration"
      type="button"
      @click="copyNow()"
    >
      <i aria-hidden="true" class="fa fa-copy text-sm group-hover:scale-110 transition-transform"></i>
    </button>
    <button
      v-if="showPaste"
      aria-label="Paste"
      class="w-10 h-10 flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 group"
      title="Paste Configuration"
      type="button"
      @click="pasteNow()"
    >
      <i aria-hidden="true" class="fa fa-paste text-sm group-hover:rotate-6 transition-transform"></i>
    </button>
  </div>
</template>

<script>
import {
  CopyToClipboard,
  PasteFromClipboard,
  Toast,
  IsJson,
} from "@hashtagcms/helpers/common";
import { EventBus } from "@hashtagcms/helpers/event-bus";
export default {
  props: [
    "dataIgnoreFields",
    "dataPasteElement",
    "dataForm",
    "dataBackUrl",
    "dataCopyPasteAutoInit",
    "dataShowCopy",
    "dataShowPaste",
  ],
  mounted() {
    if (this.autoInit) {
      this.init();
    }
  },
  created() {},
  data() {
    return {
      ignoreFields:
        typeof this.dataIgnoreFields === "undefined"
          ? [
              "id",
              "site_id",
              "backURL",
              "actionPerformed",
              "platform_id",
              "_token",
              "insert_by",
              "update_by",
            ]
          : JSON.parse(this.dataIgnoreFields),
      copyKey: "cms_copy_data",
      backURL:
        typeof this.dataBackUrl === "undefined" || this.dataBackUrl === ""
          ? ""
          : this.dataBackUrl,
      autoInit:
        this.dataCopyPasteAutoInit === undefined ||
        this.dataCopyPasteAutoInit?.toString() === "true",
      showCopy:
        this.dataShowCopy === undefined ||
        this.dataShowCopy.toString() === "true",
      showPaste:
        this.dataShowPaste === undefined ||
        this.dataShowPaste.toString() === "true",
    };
  },
  computed: {
    form() {
      let holder;
      if (
        typeof this.dataForm !== "undefined" &&
        document.getElementById(this.dataForm)
      ) {
        holder = document.getElementById(this.dataForm);
      } else {
        holder = document;
      }
      return holder;
    },
    pasteElement() {
      let holder;
      if (typeof this.dataPasteElement === "undefined") {
        holder = this.form.querySelectorAll("input[type='text']")[0];
      } else {
        holder = this.form.getElementById(this.dataPasteElement);
      }
      //console.log("holder", holder);
      return holder;
    },
  },
  methods: {
    init() {
      let $this = this;
      if (this.pasteElement) {
        this.pasteElement.addEventListener("blur", function () {
          if (IsJson(this.value)) {
            $this.pasteNow();
          }
        });
      }
    },
    copyNow() {
      let $this = this;

      let inputs = this.form.querySelectorAll("input");
      let textAreas = this.form.querySelectorAll("textarea");
      let selects = this.form.querySelectorAll("select");

      let allElements = [...inputs, ...textAreas, ...selects];

      let store = {};
      allElements.forEach(function (current) {
        let name = current.getAttribute("name") || current.getAttribute("id");

        if (
          name != null &&
          typeof name !== "object" &&
          shouldIgnore(name) === -1
        ) {
          store[name] =
            current.type === "checkbox" || current.type === "radio"
              ? current.checked
              : current.value;
        }
      });

      let data = JSON.stringify(store);
      CopyToClipboard(data);

      EventBus.emit("on-copy", data);
      Toast.show(this, "Copied...", 1000);

      function shouldIgnore(name) {
        return $this.ignoreFields.findIndex(function (nm) {
          return name === nm;
        });
      }
    },
    fillData: function (data) {
      let form = this.form;
      if (data) {
        for (let i in data) {
          try {
            let ele = form[i] || document.getElementById(i);
            let val = data[i];
            if (ele.type === "checkbox" || ele.type === "radio") {
              ele.checked = val;
            } else {
              ele.value = val;
            }
          } catch (e) {
            console.info("unable to set value @ " + i);
          }
        }
      }
    },
    pasteNow(cb) {
      PasteFromClipboard()
        .then((res) => {
          if (IsJson(res)) {
            this.fillData(JSON.parse(res));
          }
          if (cb) {
            cb(JSON.parse(res));
          }
          EventBus.emit("on-paste", res);
        })
        .catch((res) => {
          console.log("unable to paste");
        });
    },
  },
};
</script>
