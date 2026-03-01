<template>
  <div :class="ui.wrapper" v-click-outside="closeSuggestions">
    <label v-if="label" :for="id" :class="ui.label">
      {{ label }}
    </label>
    
    <div :class="ui.container">
       <!-- Left Icon Slot -->
       <div v-if="$slots['icon-left']" :class="ui.iconLeftWrapper">
        <slot name="icon-left"></slot>
      </div>

      <input
        :id="id"
        type="text"
        :value="modelValue"
        @input="onInput"
        @keydown.down.prevent="onArrowDown"
        @keydown.up.prevent="onArrowUp"
        @keydown.enter.prevent="onEnter"
        @keydown.esc="closeSuggestions"
        :placeholder="placeholder"
        :disabled="disabled"
        autocomplete="off"
        :class="[
          ui.input,
          $slots['icon-left'] ? ui.paddingLeftWithIcon : ui.paddingLeft,
          disabled ? ui.disabled : ui.enabled
        ]"
      />

      <!-- Loading Spinner -->
      <div v-if="loading" :class="ui.loadingWrapper">
          <svg :class="ui.loadingIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
      </div>
    </div>

    <!-- Suggestions Dropdown -->
    <transition
      :enter-active-class="ui.transition?.enterActive"
      :enter-from-class="ui.transition?.enterFrom"
      :enter-to-class="ui.transition?.enterTo"
      :leave-active-class="ui.transition?.leaveActive"
      :leave-from-class="ui.transition?.leaveFrom"
      :leave-to-class="ui.transition?.leaveTo"
    >
        <div v-if="showSuggestions && suggestions.length > 0" 
             :class="ui.dropdown">
            <div
                v-for="(item, index) in suggestions"
                :key="index"
                @click="selectItem(item)"
                @mouseenter="selectedIndex = index"
                :class="[
                    ui.item,
                    index === selectedIndex ? ui.itemActive : ui.itemInactive
                ]"
            >
                <div :class="ui.itemContent">
                    <i :class="[ui.searchIcon, index === selectedIndex ? ui.searchIconActive : '']"></i>
                    <span>{{ getDisplayValue(item) }}</span>
                </div>
                <i v-if="index === selectedIndex" :class="ui.enterIcon"></i>
            </div>
        </div>
    </transition>

    <p v-if="hint" :class="ui.hint">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  // UI configuration passed by the theme wrapper
  ui: {
    type: Object,
    default: () => ({
      wrapper: '',
      label: '',
      container: '',
      iconLeftWrapper: '',
      input: '',
      paddingLeft: '',
      paddingLeftWithIcon: '',
      disabled: '',
      enabled: '',
      loadingWrapper: '',
      loadingIcon: '',
      dropdown: '',
      item: '',
      itemActive: '',
      itemInactive: '',
      itemContent: '',
      searchIcon: '',
      searchIconActive: '',
      enterIcon: '',
      hint: '',
      transition: {}
    })
  },
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  hint: { type: String, default: '' },
  endpoint: { type: String, required: true },
  displayField: { type: String, default: 'name' },
  searchParam: { type: String, default: 'q' },
  minChars: { type: Number, default: 2 },
  id: { type: String, default: () => `suggest-${Math.random().toString(36).substr(2, 9)}` }
});

const emit = defineEmits(['update:modelValue', 'select']);

const suggestions = ref([]);
const showSuggestions = ref(false);
const selectedIndex = ref(-1);
const loading = ref(false);
let debounceTimer = null;

const onInput = (event) => {
    const val = event.target.value;
    emit('update:modelValue', val);
    
    clearTimeout(debounceTimer);
    if (val.length < props.minChars) {
        suggestions.value = [];
        showSuggestions.value = false;
        return;
    }

    debounceTimer = setTimeout(() => {
        fetchSuggestions(val);
    }, 300);
};

const fetchSuggestions = async (query) => {
    loading.value = true;
    try {
        const connector = props.endpoint.includes('?') ? '&' : '?';
        const url = `${props.endpoint}${connector}${props.searchParam}=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data = await response.json();
        suggestions.value = Array.isArray(data) ? data : (data.data || []);
        showSuggestions.value = suggestions.value.length > 0;
        selectedIndex.value = -1;
    } catch (error) {
        console.error('Autocomplete fetch error:', error);
        suggestions.value = [];
    } finally {
        loading.value = false;
    }
};

const getDisplayValue = (item) => {
    return typeof item === 'object' ? item[props.displayField] : item;
};

const selectItem = (item) => {
    const value = getDisplayValue(item);
    emit('update:modelValue', value);
    emit('select', item);
    closeSuggestions();
};

const closeSuggestions = () => {
    showSuggestions.value = false;
    selectedIndex.value = -1;
};

const onArrowDown = () => {
    if (showSuggestions.value && suggestions.value.length > 0) {
        selectedIndex.value = (selectedIndex.value + 1) % suggestions.value.length;
    }
};

const onArrowUp = () => {
    if (showSuggestions.value && suggestions.value.length > 0) {
        selectedIndex.value = (selectedIndex.value - 1 + suggestions.value.length) % suggestions.value.length;
    }
};

const onEnter = () => {
    if (showSuggestions.value && selectedIndex.value >= 0) {
        selectItem(suggestions.value[selectedIndex.value]);
    }
};

// Simple click-outside directive logic inside script if not globally registered
const vClickOutside = {
    mounted(el, binding) {
        el.clickOutsideEvent = (event) => {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value();
            }
        };
        document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted(el) {
        document.removeEventListener("click", el.clickOutsideEvent);
    },
};

</script>
