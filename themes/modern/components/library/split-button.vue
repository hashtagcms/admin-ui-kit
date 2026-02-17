<template>
  <div class="relative inline-block text-left group">
    <div>
      <button
        type="button"
        :class="['inline-flex items-center justify-between w-full rounded-xl border border-gray-200 shadow-sm px-5 py-2.5 bg-white text-xs font-black uppercase tracking-widest text-gray-700 hover:text-blue-600 hover:border-blue-100 transition-all active:scale-95 outline-none focus:ring-4 focus:ring-blue-500/5', btnCss]"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        @click="toggleMenu()"
      >
        <slot>
            {{ current.label }}
        </slot>
        <!-- Heroicon: chevron-down -->
        <svg :class="['ml-2 h-4 w-4 transition-transform duration-300', display !== '' ? 'rotate-180' : '']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
    >
        <div
          v-show="display !== ''"
          class="origin-top-right absolute right-0 mt-3 w-64 rounded-lg shadow-lg bg-white border border-gray-100 focus:outline-none z-[100] p-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
          ref="dropdownMenu"
        >
          <div class="space-y-1" role="none">
            <a
              href="javascript:void(0)"
              v-for="(item, index) in lists"
              :key="index"
              :class="isActive(item)"
              role="menuitem"
              tabindex="-1"
              @click="setCurrent(index)"
            >
              {{ item.label }}
              <i v-if="current.value === item.value" class="fa fa-check text-[10px] ml-auto"></i>
            </a>
          </div>
        </div>
    </transition>
  </div>
</template>

<script>
import { SafeJsonParse } from "../../../../helpers/common";

export default {
  mounted() {
    this.normalizeData();
    //console.log(this.lists);
  },

  props: [
    "dataOptions",
    "dataSelected",
    "dataParser",
    "dataOnChange",
    "dataBtnCss",
  ],
  data() {
    return {
      display: "",
      formatter: this.dataParser,
      lists: SafeJsonParse(this.dataOptions, []),
      current: {},
      selectedIndex:
        typeof this.dataSelected == "undefined"
          ? 0
          : parseInt(this.dataSelected),
      openCSS: "",
      btnCss: typeof this.dataBtnCss == "undefined" ? "" : this.dataBtnCss,
    };
  },
  computed: {
    onChange() {
      let method =
        typeof this.dataOnChange == "undefined" ? null : this.dataOnChange;
      if (typeof method == "string") {
        return eval(method);
      }
      return method;
    },
  },
  methods: {
    toggleMenu() {
      this.display = this.display === "" ? "display:block" : "";
      if (this.display !== "") {
        //this.openCSS = 'animated slideInDown';
        this.bindDocumentClick();
      }
    },
    isActive(item) {
      if (this.current.value === item.value) {
        return "bg-blue-50 text-blue-700 block px-4 py-2 text-sm font-semibold";
      }
      return "text-gray-700 hover:bg-gray-100 block px-4 py-2 text-sm transition-colors";
    },
    normalizeData() {
      let formatter = this.formatter;
      let arr = [];
      this.lists.forEach(function (item, index) {
        if (typeof formatter == "function") {
          arr.push(formatter(item));
        } else if (typeof index == "number") {
          arr.push({ label: item, value: item });
        }
      });

      this.lists = arr;
      this.current = this.lists[this.selectedIndex];
    },
    setCurrent(index) {
      this.current = this.lists[index];
      this.current.index = index;

      if (this.onChange != null && typeof this.onChange == "function") {
        this.onChange(this.current);
      }

      this.$emit("change", this.current);
    },
    mangeShowHide(event) {
      let element = this.$refs.dropdownMenu;
      let target = event.target;

      if (element !== target && !element.contains(target)) {
        this.display = "";
        this.unBindDocumentClick();
      }
    },
    bindDocumentClick() {
      document.addEventListener("mouseup", this.mangeShowHide);
    },
    unBindDocumentClick() {
      document.removeEventListener("mouseup", this.mangeShowHide);
    },
    setData(data) {
      this.lists = [];
      this.lists = data;
      this.normalizeData();
    },
  },
};
</script>
