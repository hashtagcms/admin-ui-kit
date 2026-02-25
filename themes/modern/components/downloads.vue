<template>
  <button
    @click="downloadNow()"
    type="button"
    class="px-6 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2"
  >
    <i class="fa fa-download text-[10px] opacity-70"></i>
    <slot>Download</slot>
  </button>
</template>

<script setup>
import AdminConfig from "../../../helpers/admin-config";

const props = defineProps(["dataControllerName"]);

const downloadNow = () => {
    window.location.href = AdminConfig.admin_path(
        props.dataControllerName + "/download"
    );
};
</script>

