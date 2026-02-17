<template>
  <div class="w-full">
    <div 
      :class="[
        'relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer group hover:-translate-y-1 active:scale-[0.98]',
        isDragging ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-blue-400 bg-gray-50/30'
      ]"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="$refs.fileInput.click()"
    >
      <input 
        ref="fileInput" 
        type="file" 
        class="hidden" 
        :multiple="multiple" 
        :accept="accept"
        @change="handleFileSelect"
      >
      
      <div class="mb-4 w-12 h-12 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
        <i class="fa fa-cloud-upload text-xl"></i>
      </div>
      
      <h5 class="text-xs font-black uppercase tracking-widest text-gray-900 mb-1">
        {{ label || 'Click or drag files to upload' }}
      </h5>
      <p class="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
        {{ subLabel || 'Supports JPG, PNG, PDF (Max 10MB)' }}
      </p>
    </div>

    <!-- File List Preview -->
    <div v-if="files.length > 0" class="mt-4 space-y-2">
      <div v-for="(file, index) in files" :key="index" class="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-2">
        <div class="flex items-center space-x-3 overflow-hidden">
          <div class="w-8 h-8 rounded bg-gray-50 flex items-center justify-center text-gray-400">
            <i :class="getFileIcon(file)"></i>
          </div>
          <div class="overflow-hidden">
            <p class="text-[11px] font-black text-gray-700 truncate">{{ file.name }}</p>
            <p class="text-[9px] font-bold text-gray-400 uppercase">{{ formatSize(file.size) }}</p>
          </div>
        </div>
        <button @click.stop="removeFile(index)" class="p-2 text-gray-300 hover:text-rose-500 transition-all active:scale-90 hover:-translate-y-0.5">
          <i class="fa fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HcFileUpload',
  props: {
    multiple: { type: Boolean, default: false },
    accept: { type: String, default: '*' },
    label: { type: String, default: '' },
    subLabel: { type: String, default: '' }
  },
  data() {
    return {
      isDragging: false,
      files: []
    };
  },
  methods: {
    handleDrop(e) {
      this.isDragging = false;
      const droppedFiles = Array.from(e.dataTransfer.files);
      this.addFiles(droppedFiles);
    },
    handleFileSelect(e) {
      const selectedFiles = Array.from(e.target.files);
      this.addFiles(selectedFiles);
    },
    addFiles(newFiles) {
      if (this.multiple) {
        this.files = [...this.files, ...newFiles];
      } else {
        this.files = [newFiles[0]];
      }
      this.$emit('change', this.files);
    },
    removeFile(index) {
      this.files.splice(index, 1);
      this.$emit('change', this.files);
    },
    getFileIcon(file) {
      if (file.type.includes('image')) return 'fa fa-file-image-o';
      if (file.type.includes('pdf')) return 'fa fa-file-pdf-o';
      return 'fa fa-file-o';
    },
    formatSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
  }
};
</script>
