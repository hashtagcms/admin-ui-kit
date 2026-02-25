<template>
  <a href="#" @click="goBack()" class="btn btn-outline-secondary"
    ><slot>Back in </slot
    ><span>{{ totalTime - timeRemaining }} {{ seconds }}</span></a
  >
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps(["dataBackUrl", "dataTimeout"]);

// State
const totalTime = ref(props.dataTimeout === undefined ? 5 : parseInt(props.dataTimeout));
const timeRemaining = ref(0);
const intervalId = ref(0);
const seconds = ref("Seconds");

// Methods
const goBack = () => {
  clearInterval(intervalId.value);
  window.location.href = props.dataBackUrl;
};

const updateTime = () => {
  if (timeRemaining.value >= totalTime.value) {
    clearInterval(intervalId.value);
    goBack();
  } else {
    timeRemaining.value++;
  }

  seconds.value = totalTime.value - timeRemaining.value <= 1 ? "Second" : "Seconds";
};

onMounted(() => {
  intervalId.value = setInterval(updateTime, 1000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});
</script>

