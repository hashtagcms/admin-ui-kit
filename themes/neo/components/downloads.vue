<template>
  <button @click="downloadNow()" type="button" class="btn btn-dark">
    <slot>Download</slot>
  </button>
</template>

<script setup>
import AdminConfig from "../../../helpers/admin-config";

const props = defineProps(["dataControllerName"]);

const downloadNow = () => {
  window.location.href = AdminConfig.admin_path(`${props.dataControllerName}/download`);
};
</script>

