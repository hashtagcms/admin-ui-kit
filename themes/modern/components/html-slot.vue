<template>
  <div class="w-full">
    <slot></slot>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // console.log("html slot mounted");
});

const getAllInputs = () => {
  console.log("all inputs");
};
</script>
