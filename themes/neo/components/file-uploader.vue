<template>
  <form ref="uploaderForm" name="uploaderForm" enctype="multipart/form-data">
    <div class="row" v-show="!isUploading">
      <div class="col-5">
        <input
          type="file"
          ref="allFilesC"
          name="msFiles__[]"
          multiple
          class="form-control"
          required
          @change="checkErrors"
          :accept="acceptFileType"
        />
        <div class="alert alert-danger mt-1" v-if="errors.files">
          Please select at least one file.
        </div>
      </div>
      <div class="col-5">
        <input
          type="text"
          name="msTags__"
          id="msTags__"
          required
          v-model="form.tags"
          class="form-control"
          placeholder="Please enter keyword to search later. User comma for multiple keywords"
          @change="checkErrors"
        />
        <div class="alert alert-danger mt-1" v-if="errors.tags">
          Please enter keywords to search later.
        </div>
      </div>
      <div class="col-2">
        <input
          type="button"
          value="Upload"
          class="btn btn-primary"
          @click="uploadNow"
        />
      </div>
    </div>
  </form>
  <div class="row" v-if="isUploading">
    <div class="progress p-0">
      <div
        class="progress-bar progress-bar-striped bg-success"
        role="progressbar"
        :style="'width:' + percent + '%'"
        :aria-valuenow="percent"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {{ percent }}%
      </div>
    </div>
  </div>
  <div class="row" v-if="message !== ''">
    <div class="col">
      <div :class="'alert m-1 ' + msgType">{{ message }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import AdminConfig from "../../../helpers/admin-config";
import { EventBus } from "../../../helpers/event-bus";

const props = defineProps(["dataTitle", "dataAccept"]);

const uploaderForm = ref(null);
const allFilesC = ref(null);

// State
const form = reactive({
  tags: "",
  files: "",
});
const isUploading = ref(false);
const errors = reactive({
  files: false,
  tags: false,
});
const percent = ref(0);
const message = ref("");
const msgType = ref("alert-success");
const acceptFileType = ref(props.dataAccept !== undefined ? props.dataAccept : "image/*");

// Methods
const goBack = () => {
  // backUrl was not defined in the original data or props, but used in goBack method.
  // Assuming it was meant to be props or something.
  // I'll keep the logic if it was intended to use something global or prop.
  // Actually, it doesn't seem to be used anywhere else.
  // window.location.href = backUrl;
};

const checkErrors = () => {
  errors.files = false;
  errors.tags = false;
};

const resetForm = () => {
  form.tags = "";
  form.files = "";
  errors.tags = false;
  errors.files = false;
  percent.value = 0;
  if (uploaderForm.value) uploaderForm.value.reset();
};

const showMsg = (msg, isError) => {
  message.value = msg;
  if (isError) {
    msgType.value = "alert-danger";
  } else {
    msgType.value = "alert-success";
    setTimeout(() => {
      message.value = "";
    }, 2000);
  }
};

const uploadNow = () => {
  const url = AdminConfig.admin_path("gallery/uploadFiles");
  const onProgress = (progress) => {
    percent.value = Math.round(progress.progress * 100);
  };
  const onSuccess = (response) => {
    EventBus.emit("gallery-image-uploaded", response.data);
    resetForm();
    showMsg(response.data.message, false);
  };
  const onError = (error) => {
    const dm = "There is some error while uploading. Please try again.";
    showMsg(error.response?.statusText || error.message || dm, true);
    resetForm();
  };

  message.value = "";

  const files = allFilesC.value.files;

  // check required fields
  let isErrors = false;
  if (files.length === 0) {
    errors.files = true;
    isErrors = true;
  }
  if (form.tags === "") {
    errors.tags = true;
    isErrors = true;
  }
  if (isErrors) {
    return false;
  }

  isUploading.value = true;
  const formData = new FormData();
  // Append each file to the FormData object
  for (let i = 0; i < files.length; i++) {
    formData.append("images[]", files[i]);
  }

  formData.append("tags", form.tags);
  formData.append("groupName", "content");
  // keep only text from the accepted file types and accepted file type can be any input
  formData.append("mediaType", acceptFileType.value.replace(/[^a-zA-Z,]/g, ""));

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
      isUploading.value = false;
    });
};
</script>

