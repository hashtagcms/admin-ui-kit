<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const getAllInputs = () => {
  console.log("all inputs");
};

onMounted(() => {
  // console.log("html slot mounted");
});
</script>

