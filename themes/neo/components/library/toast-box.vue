<template>
  <div class="toasterHolder jsToast shadow" v-show="showMe" ref="toastElement">
    <div class="toasterContent">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onBeforeUnmount } from "vue";

// State
const showMe = ref(false);
const message = ref("Toast Content");
const intervalId = ref(0);
const toastElement = ref(null);

// Methods
const align = (position) => {
  if (!toastElement.value) return;
  const left = position !== undefined
    ? position.left
    : window.innerWidth / 2 - toastElement.value.offsetWidth / 2;
  const top = position !== undefined
    ? position.top
    : window.innerHeight / 2 - toastElement.value.offsetHeight / 2 + window.scrollY;
  toastElement.value.style.top = `${top}px`;
  toastElement.value.style.left = `${left}px`;
};

const hide = () => {
  showMe.value = false;
  if (intervalId.value) {
    clearTimeout(intervalId.value);
  }
};

const show = (msg = "", timeout = 3000, position) => {
  hide();
  showMe.value = true;
  message.value = msg !== "" ? msg : "";
  nextTick(() => {
    align(position);
  });

  intervalId.value = setTimeout(() => {
    hide();
  }, timeout);
};

defineExpose({ show, hide });

onBeforeUnmount(() => {
  hide();
});
</script>

