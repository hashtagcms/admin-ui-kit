<template>
  <button
    v-if="showCopy"
    aria-label="Copy"
    class="btn btn-outline-secondary"
    title="Copy"
    type="button"
    @click="copyNow()"
  >
    <i aria-hidden="true" class="fa fa-copy"></i>
  </button>
  <button
    v-if="showPaste"
    aria-label="Paste"
    class="btn btn-outline-secondary"
    title="Paste"
    type="button"
    @click="pasteNow()"
  >
    <i aria-hidden="true" class="fa fa-paste"></i>
  </button>
</template>

<script setup>
import { ref, computed, onMounted, getCurrentInstance } from "vue";
import {
  CopyToClipboard,
  PasteFromClipboard,
  Toast,
  IsJson,
  SafeJsonParse,
} from "../../../../helpers/common";
import { EventBus } from "../../../../helpers/event-bus";

const props = defineProps([
  "dataIgnoreFields",
  "dataPasteElement",
  "dataForm",
  "dataBackUrl",
  "dataCopyPasteAutoInit",
  "dataShowCopy",
  "dataShowPaste",
]);

const instance = getCurrentInstance();

// State
const ignoreFields = ref(
  SafeJsonParse(props.dataIgnoreFields, [
    "id",
    "site_id",
    "backURL",
    "actionPerformed",
    "platform_id",
    "_token",
    "insert_by",
    "update_by",
  ])
);
const copyKey = ref("cms_copy_data");
const backURL = ref(props.dataBackUrl || "");
const autoInit = ref(
  props.dataCopyPasteAutoInit === undefined || props.dataCopyPasteAutoInit?.toString() === "true"
);
const showCopy = ref(props.dataShowCopy === undefined || props.dataShowCopy.toString() === "true");
const showPaste = ref(props.dataShowPaste === undefined || props.dataShowPaste.toString() === "true");

// Computed
const form = computed(() => {
  let holder;
  if (typeof props.dataForm !== "undefined" && document.getElementById(props.dataForm)) {
    holder = document.getElementById(props.dataForm);
  } else {
    holder = document;
  }
  return holder;
});

const pasteElement = computed(() => {
  let holder;
  if (typeof props.dataPasteElement === "undefined") {
    holder = form.value.querySelectorAll("input[type='text']")[0];
  } else {
    holder = form.value.getElementById(props.dataPasteElement);
  }
  return holder;
});

// Methods
const fillData = (data) => {
  const f = form.value;
  if (data) {
    for (const i in data) {
      try {
        const ele = f[i] || document.getElementById(i);
        const val = data[i];
        if (ele.type === "checkbox" || ele.type === "radio") {
          ele.checked = val;
        } else {
          ele.value = val;
        }
      } catch (e) {
        console.info(`unable to set value @ ${i}`);
      }
    }
  }
};

const pasteNow = (cb) => {
  PasteFromClipboard()
    .then((res) => {
      if (IsJson(res)) {
        const data = SafeJsonParse(res, {});
        fillData(data);
        if (cb) {
          cb(data);
        }
      }
      EventBus.emit("on-paste", res);
    })
    .catch((res) => {
      console.error("unable to paste", res);
    });
};

const init = () => {
  if (pasteElement.value) {
    pasteElement.value.addEventListener("blur", function () {
      if (IsJson(this.value)) {
        pasteNow();
      }
    });
  }
};

const copyNow = () => {
  const inputs = form.value.querySelectorAll("input");
  const textAreas = form.value.querySelectorAll("textarea");
  const selects = form.value.querySelectorAll("select");

  const allElements = [...inputs, ...textAreas, ...selects];

  const store = {};
  const shouldIgnore = (name) => ignoreFields.value.findIndex((nm) => name === nm);

  allElements.forEach((current) => {
    const name = current.getAttribute("name") || current.getAttribute("id");

    if (name != null && typeof name !== "object" && shouldIgnore(name) === -1) {
      store[name] = current.type === "checkbox" || current.type === "radio" ? current.checked : current.value;
    }
  });

  const data = JSON.stringify(store);
  CopyToClipboard(data);

  EventBus.emit("on-copy", data);
  Toast.show(instance, "Copied...", 1000);
};

onMounted(() => {
  if (autoInit.value) {
    init();
  }
});
</script>

