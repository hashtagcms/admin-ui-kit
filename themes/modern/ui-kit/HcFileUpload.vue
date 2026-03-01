<template>
  <RawComponent v-bind="$attrs" :ui="uiStyle">
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </RawComponent>
</template>

<script setup>
/**
 * Modern Theme Wrapper for HcFileUpload
 * Injects Tailwind styles into the theme-blind common component.
 */
import RawComponent from '../../../common/js/ui-kit/HcFileUpload.vue';
defineOptions({ name: 'ModernHcFileUpload' });

const uiStyle = {
  wrapper: "w-full",
  dropzone: "relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer group hover:-translate-y-1 active:scale-[0.98]",
  dropzoneIdle: "border-gray-200 hover:border-blue-400 bg-gray-50/30",
  dropzoneDragging: "border-blue-500 bg-blue-50/50",
  srOnly: "hidden",
  iconWrapper: "mb-4 w-12 h-12 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12",
  uploadIcon: "fa fa-cloud-upload text-xl",
  label: "text-xs font-black uppercase tracking-widest text-gray-900 mb-1",
  subLabel: "text-[10px] font-bold text-gray-400 uppercase tracking-tighter",
  fileList: "mt-4 space-y-2",
  fileItem: "flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-2",
  fileItemContent: "flex items-center space-x-3 overflow-hidden",
  fileIconWrapper: "w-8 h-8 rounded bg-gray-50 flex items-center justify-center text-gray-400",
  fileNameWrapper: "overflow-hidden",
  fileName: "text-[11px] font-black text-gray-700 truncate",
  fileSize: "text-[9px] font-bold text-gray-400 uppercase",
  removeButton: "p-2 text-gray-300 hover:text-rose-500 transition-all active:scale-90 hover:-translate-y-0.5",
  removeIcon: "fa fa-times"
};
</script>
