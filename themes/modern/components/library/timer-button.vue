<template>
  <hc-button
    variant="soft"
    @click="goBack()"
    icon="fa fa-arrow-left"
  >
    <slot>Back in </slot>
    <span class="ml-1 font-bold">{{ totalTime - timeRemaining }} {{ seconds }}</span>
  </hc-button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import HcButton from "../../ui-kit/HcButton.vue";

const props = defineProps(["dataBackUrl", "dataTimeout"]);

const totalTime = ref(
    typeof props.dataTimeout == "undefined" ? 5 : parseInt(props.dataTimeout)
);
const timeRemaining = ref(0);
const intervalId = ref(0);
const seconds = ref("Seconds");

const goBack = () => {
    clearInterval(intervalId.value);
    if (props.dataBackUrl) {
       window.location.href = props.dataBackUrl;
    }
};

const updateTime = () => {
    if (timeRemaining.value >= totalTime.value) {
        clearInterval(intervalId.value);
        goBack();
    } else {
        timeRemaining.value++;
    }

    seconds.value =
        totalTime.value - timeRemaining.value <= 1 ? "Second" : "Seconds";
};

onMounted(() => {
    intervalId.value = setInterval(updateTime, 1000);
});

onBeforeUnmount(() => {
    clearInterval(intervalId.value);
});
</script>

