<template>
  <modal-box ref="imageModalBox" data-show-footer="true">
    <template #title>
      <div class="row">
        <div class="col-2">Gallery</div>
        <div class="col-auto d-flex">
          <input
            type="text"
            class="form-control me-1"
            placeholder="Search image"
            @keydown.enter="searchImages"
            v-model="searchKey"
          />
          <input
            type="button"
            class="btn btn-secondary me-1"
            value="Search"
            @click="searchImages"
          />
        </div>
      </div>
    </template>
    <template #content>
      <div class="row">
        <span class="spinner-border text-info" role="status" v-if="loading">
          <span class="visually-hidden">Loading...</span>
        </span>
        <div class="col-auto m-1 border" v-for="current in data">
          <img
            :src="getImage(current.path)"
            width="100"
            @click="insertContentToEditor(getImage(current.path))"
          />
        </div>
        <div v-if="data.length === 0 && loading === false">No images found</div>
      </div>
    </template>
    <template #footer>
      <div class="container-fluid">
        <file-uploader data-accept="image/*"></file-uploader>
      </div>
    </template>
  </modal-box>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import AdminConfig from "../../../helpers/admin-config";
import ModalBox from "./library/modal-box.vue";
import { EventBus } from "../../../helpers/event-bus";
import FileUploader from "./file-uploader.vue";

const props = defineProps(["dataModel", "dataModuleRelations", "dataId", "dataEditor"]);

const imageModalBox = ref(null);

// State
const data = ref([]);
const loading = ref(false);
const searchKey = ref("");
const editor = ref(props.dataEditor);
const form = ref({ file: "" });

// Computed
const galleryCreate = AdminConfig.admin_path(
  "gallery/create?return_url=" + encodeURIComponent(window.location.href)
);

// Methods
const loadData = () => {
  data.value = [];
  loading.value = true;
  const url = AdminConfig.admin_path("gallery/getAllImages");
  axios
    .get(url)
    .then((res) => {
      data.value = res.data;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      loading.value = false;
    });
};

const getImage = (value) => AdminConfig.get_media(`${value}`);

const insertContentToEditor = (content) => {
  const contentHtml = `<img src="${content}" />`;
  if (editor.value) {
    editor.value.insertContent(contentHtml);
  }
  close();
};

const searchImages = () => {
  if (searchKey.value.length > 0) {
    data.value = [];
    loading.value = true;
    const url = AdminConfig.admin_path(`gallery/searchImages/${searchKey.value}`);
    axios
      .get(url)
      .then((res) => {
        data.value = res.data;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        loading.value = false;
      });
  } else {
    loadData();
  }
};

const open = (ed) => {
  loadData();
  if (ed) {
    editor.value = ed;
  }
  if (imageModalBox.value) imageModalBox.value.open();
  EventBus.emit("image-gallery-open");
};

const close = () => {
  if (imageModalBox.value) imageModalBox.value.close();
  EventBus.emit("image-gallery-close");
};

const onImageUploaded = (response) => {
  data.value = [...response.data, ...data.value];
};

// Lifecycle
onMounted(() => {
  EventBus.on("gallery-image-uploaded", onImageUploaded);
});

onBeforeUnmount(() => {
  EventBus.off("gallery-image-uploaded", onImageUploaded);
});

// Expose methods to parent
defineExpose({ open, close });
</script>

