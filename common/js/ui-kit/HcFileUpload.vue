<template>
  <div :class="ui.wrapper">
    <div 
      :class="[
        ui.dropzone,
        isDragging ? ui.dropzoneDragging : ui.dropzoneIdle
      ]"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="$refs.fileInput.click()"
    >
      <input 
        ref="fileInput" 
        type="file" 
        :class="ui.srOnly || 'sr-only'" 
        :multiple="multiple" 
        :accept="accept"
        @change="handleFileSelect"
      >
      
      <div :class="ui.iconWrapper">
        <i :class="ui.uploadIcon || 'fa fa-cloud-upload text-xl'"></i>
      </div>
      
      <h5 :class="ui.label">
        {{ label || 'Click or drag files to upload' }}
      </h5>
      <p :class="ui.subLabel">
        {{ subLabel || 'Supports JPG, PNG, PDF (Max 10MB)' }}
      </p>
    </div>

    <!-- File List Preview -->
    <div v-if="files.length > 0" :class="ui.fileList">
      <div v-for="(file, index) in files" :key="index" :class="ui.fileItem">
        <div :class="ui.fileItemContent">
          <div :class="ui.fileIconWrapper">
            <i :class="getFileIcon(file)"></i>
          </div>
          <div :class="ui.fileNameWrapper">
            <p :class="ui.fileName">{{ file.name }}</p>
            <p :class="ui.fileSize">{{ formatSize(file.size) }}</p>
          </div>
        </div>
        <button @click.stop="removeFile(index)" :class="ui.removeButton">
          <i :class="ui.removeIcon || 'fa fa-times'"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HcFileUpload',
  props: {
    // UI configuration passed by the theme wrapper
    ui: {
      type: Object,
      default: () => ({
        wrapper: '',
        dropzone: '',
        dropzoneIdle: '',
        dropzoneDragging: '',
        srOnly: '',
        iconWrapper: '',
        uploadIcon: '',
        label: '',
        subLabel: '',
        fileList: '',
        fileItem: '',
        fileItemContent: '',
        fileIconWrapper: '',
        fileNameWrapper: '',
        fileName: '',
        fileSize: '',
        removeButton: '',
        removeIcon: ''
      })
    },
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
