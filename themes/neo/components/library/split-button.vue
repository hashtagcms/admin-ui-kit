<template>
  <div class="dropdown">
    <a
      :class="'btn btn-secondary dropdown-toggle ' + btnCss"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      @click="toggleMenu()"
    >
      {{ current.label }}
    </a>
    <ul class="dropdown-menu shadow" :style="display" ref="dropdownMenu">
      <li
        :class="isActive(item)"
        v-for="(item, index) in lists"
        @click="setCurrent(index)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { SafeJsonParse } from "../../../../helpers/common";

const props = defineProps([
  "dataOptions",
  "dataSelected",
  "dataParser",
  "dataOnChange",
  "dataBtnCss",
]);

const emit = defineEmits(["change"]);

// Template Refs
const dropdownMenu = ref(null);

// State
const display = ref("");
const formatter = ref(props.dataParser);
const lists = ref(SafeJsonParse(props.dataOptions, []));
const current = ref({});
const selectedIndex = ref(props.dataSelected === undefined ? 0 : parseInt(props.dataSelected));
const openCSS = ref("");
const btnCss = ref(props.dataBtnCss || "");

// Computed
const onChange = computed(() => {
  const method = props.dataOnChange === undefined ? null : props.dataOnChange;
  if (typeof method === "string") {
    try {
      // eslint-disable-next-line no-eval
      return eval(method);
    } catch (e) {
      console.error("SplitButton: Error evaluating onChange method", e);
      return null;
    }
  }
  return method;
});

// Methods
const isActive = (item) => {
  if (current.value.value === item.value) {
    return "dropdown-item active hand";
  }
  return "dropdown-item hand";
};

const normalizeData = () => {
  const f = formatter.value;
  const arr = [];
  lists.value.forEach((item, index) => {
    if (typeof f === "function") {
      arr.push(f(item));
    } else {
      arr.push({ label: item, value: item });
    }
  });

  lists.value = arr;
  current.value = lists.value[selectedIndex.value] || {};
};

const mangeShowHide = (event) => {
  const element = dropdownMenu.value;
  const target = event.target;

  if (element && element !== target && !element.contains(target)) {
    display.value = "";
    unBindDocumentClick();
  }
};

const bindDocumentClick = () => {
  document.addEventListener("mouseup", mangeShowHide);
};

const unBindDocumentClick = () => {
  document.removeEventListener("mouseup", mangeShowHide);
};

const toggleMenu = () => {
  display.value = display.value === "" ? "display:block" : "";
  if (display.value !== "") {
    bindDocumentClick();
  }
};

const setCurrent = (index) => {
  current.value = lists.value[index];
  current.value.index = index;

  if (onChange.value != null && typeof onChange.value === "function") {
    onChange.value(current.value);
  }

  emit("change", current.value);
};

const setData = (data) => {
  lists.value = data;
  normalizeData();
};

defineExpose({ setData });

onMounted(() => {
  normalizeData();
});

onBeforeUnmount(() => {
  unBindDocumentClick();
});
</script>

