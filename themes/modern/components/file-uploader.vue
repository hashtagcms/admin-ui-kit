<template>
  <form ref="uploaderForm" name="uploaderForm" enctype="multipart/form-data">
    <div class="flex flex-col lg:flex-row gap-4 items-start" v-show="!isUploading">
      <div class="w-full lg:flex-1">
        <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Select Files</label>
        <input
          type="file"
          ref="allFilesC"
          name="msFiles__[]"
          multiple
          class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer border border-gray-200 rounded-xl p-1.5 bg-white shadow-sm"
          required
          @change="checkErrors"
          :accept="acceptFileType"
        />
        <div class="mt-1.5 px-2 text-[11px] text-red-500 font-semibold flex items-center" v-if="errors.files">
          <i class="fa fa-exclamation-circle mr-1"></i> Please select at least one file.
        </div>
      </div>
      
      <div class="w-full lg:flex-[2]">
        <hc-input
           v-model="form.tags"
           label="Tags (Comma separated)"
           placeholder="e.g. hero-banner, background, v2"
           :variant="errors.tags ? 'danger' : ''"
           @change="checkErrors"
        />
        <div class="mt-1.5 px-2 text-[11px] text-red-500 font-semibold flex items-center" v-if="errors.tags">
           <i class="fa fa-exclamation-circle mr-1"></i> Please enter keywords to search later.
        </div>
      </div>

      <div class="w-full lg:w-auto mt-0 lg:mt-5">
        <hc-button
           variant="primary"
           @click="uploadNow"
           icon="fa fa-upload"
           class="w-full lg:w-auto mt-2"
        >
          Upload
        </hc-button>
      </div>
    </div>
  </form>

  <div class="mt-6" v-if="isUploading">
    <hc-progress 
      :percentage="percent" 
      show-label 
      label="Uploading in progress..." 
    />
  </div>

  <div class="mt-4" v-if="message !== ''">
     <hc-alert 
        :variant="msgType === 'alert-danger' ? 'danger' : 'success'"
        dismissible
     >
        {{ message }}
     </hc-alert>
  </div>
</template>

<script>
import AdminConfig from "../../../helpers/admin-config";
import { EventBus } from "../../../helpers/event-bus";
import HcInput from "../ui-kit/HcInput.vue";
import HcButton from "../ui-kit/HcButton.vue";
import HcProgress from "../ui-kit/HcProgress.vue";
import HcAlert from "../ui-kit/HcAlert.vue";

export default {
  name: "FileUploader",
  components: {
    HcInput,
    HcButton,
    HcProgress,
    HcAlert
  },
  props: ["dataTitle", "dataAccept"],
  data() {
    return {
      title: this.dataTitle,
      form: {
        tags: "",
        files: "",
      },
      isUploading: false,
      errors: {
        files: false,
        tags: false,
      },
      percent: 0,
      message: "",
      msgType: "alert-success",
      acceptFileType:
        typeof this.dataAccept !== "undefined" ? this.dataAccept : "image/*",
    };
  },
  methods: {
    checkErrors() {
      this.errors.files = false;
      this.errors.tags = false;
    },
    resetForm() {
      this.form.tags = "";
      this.form.files = "";
      this.errors.tags = false;
      this.errors.files = false;
      this.percent = 0;
      this.$refs.uploaderForm.reset();
    },
    showMsg(msg, isError) {
      this.message = msg;
      if (isError) {
        this.msgType = "alert-danger";
      } else {
        this.msgType = "alert-success";
        setTimeout(() => {
          this.message = "";
        }, 2000);
      }
    },
    uploadNow() {
      let url = AdminConfig.admin_path("gallery/uploadFiles");
      let onProgress = (progress) => {
        this.percent = Math.round(progress.progress * 100);
      };
      let onSuccess = (response) => {
        EventBus.emit("gallery-image-uploaded", response.data);
        this.resetForm();
        this.showMsg(response.data.message, false);
      };
      let onError = (error) => {
        let dm = "There is some error while uploading. Please try again.";
        this.showMsg(error.response?.statusText || error.message || dm, true);
        this.resetForm();
      };

      this.message = "";

      let files = this.$refs.allFilesC.files;

      //check required fields
      let isErrors = false;
      if (files.length === 0) {
        isErrors = this.errors.files = true;
      }
      if (this.form.tags === "") {
        isErrors = this.errors.tags = true;
      }
      if (isErrors) {
        return false;
      }

      this.isUploading = true;
      let formData = new FormData();
      // Append each file to the FormData object
      for (let i = 0; i < files.length; i++) {
        formData.append("images[]", files[i]);
      }

      formData.append("tags", this.form.tags);
      formData.append("groupName", "content");
      // keep only text from the accepted file types and accepted file type can be any input
      formData.append(
        "mediaType",
        this.acceptFileType.replace(/[^a-zA-Z,]/g, ""),
      );

      formData.append("_csrf", window.HashtagCms?.csrfToken || window.Laravel?.csrfToken);

      axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            onProgress(progressEvent);
          },
        })
        .then((response) => {
          onSuccess(response);
        })
        .catch((error) => {
          onError(error);
        })
        .finally(() => {
          this.isUploading = false;
        });
    },
  },
};
</script>
