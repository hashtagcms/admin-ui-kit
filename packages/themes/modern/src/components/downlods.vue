<template>
  <button
    @click="downloadNow()"
    type="button"
    class="px-6 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2"
  >
    <i class="fa fa-download text-[10px] opacity-70"></i>
    <slot>Download Resources</slot>
  </button>
</template>

<script>
import AdminConfig from "@hashtagcms/helpers/admin-config";

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
