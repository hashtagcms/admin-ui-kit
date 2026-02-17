<template>
  <button @click="downloadNow()" type="button" class="btn btn-dark">
    <slot>Download</slot>
  </button>
</template>

<script>
import AdminConfig from "../../../helpers/admin-config";

export default {
  mounted() {},
  props: ["dataControllerName"],
  methods: {
    downloadNow() {
      window.location.href = AdminConfig.admin_path(
        this.dataControllerName + "/download",
      );
    },
  },
};
</script>
