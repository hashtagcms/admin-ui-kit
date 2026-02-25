<template>
  <modal-box ref="imageModalBox" data-show-footer="true" data-width="800px">
    <template #title>
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
        <span class="text-xl font-bold text-gray-800">Gallery</span>
        <div class="flex items-center w-full sm:w-auto gap-2">
          <input
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2 outline-none transition-all"
            placeholder="Search images..."
            @keydown.enter="searchImages"
            v-model="searchKey"
          />
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            @click="searchImages"
          >
            Search
          </button>
        </div>
      </div>
    </template>
    <template #content>
      <div class="min-h-[300px]">
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="flex flex-col items-center gap-3">
             <div class="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
             <span class="text-sm text-gray-500 font-medium">Fetching images...</span>
          </div>
        </div>
        <div v-else class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 p-1">
          <div 
            v-for="(current, idx) in data" 
            :key="idx" 
            class="relative aspect-square group cursor-pointer bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-blue-500 hover:shadow-md transition-all duration-200"
            @click="insertContentToEditor(getImage(current.path))"
          >
            <img
              :src="getImage(current.path)"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <i class="fa fa-plus text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-200 text-xl"></i>
            </div>
          </div>
        </div>
        <div v-if="data.length === 0 && loading === false" class="flex flex-col items-center justify-center py-20 text-gray-400">
          <i class="fa fa-image text-5xl mb-4 opacity-20"></i>
          <p class="text-lg font-medium">No images found</p>
          <p class="text-sm text-gray-400">Try a different search term or upload a new image.</p>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="w-full p-2 bg-gray-50 rounded-lg">
        <file-uploader data-accept="image/*"></file-uploader>
      </div>
    </template>
  </modal-box>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import ModalBox from "./library/modal-box.vue";
import { EventBus } from "../../../helpers/event-bus";
import fileUploader from "./file-uploader.vue";

const props = defineProps([
  "dataModel",
  "dataModuleRelations",
  "dataId",
  "dataEditor",
]);

const imageModalBox = ref(null);
const data = ref([]);
const loading = ref(false);
const searchKey = ref("");
const editor = ref(props.dataEditor);

const galleryCreate = computed(() => {
  return AdminConfig.admin_path(
    "gallery/create?return_url=" + encodeURIComponent(window.location.href)
  );
});

const loadData = () => {
  data.value = [];
  loading.value = true;
  let url = AdminConfig.admin_path(`gallery/getAllImages`);
  axios
    .get(url)
    .then((res) => {
      data.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};

const getImage = (value) => {
  return AdminConfig.get_media(`${value}`);
};

const insertContentToEditor = (content) => {
  const htmlContent = `<img src="${content}" />`;
  if (editor.value) {
    editor.value.insertContent(htmlContent);
  }
  close();
};

const searchImages = () => {
  if (searchKey.value.length > 0) {
    data.value = [];
    loading.value = true;
    let url = AdminConfig.admin_path(
      `gallery/searchImages/${searchKey.value}`
    );
    axios
      .get(url)
      .then((res) => {
        data.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loading.value = false;
      });
  } else {
    loadData();
  }
};

const open = (editorInstance) => {
  loadData();
  if (editorInstance) {
    editor.value = editorInstance;
  }
  imageModalBox.value?.open();
  EventBus.emit("image-gallery-open");
};

const close = () => {
  imageModalBox.value?.close();
  EventBus.emit("image-gallery-close");
};

const onImageUploaded = (response) => {
  data.value = [...response.data, ...data.value];
};

onMounted(() => {
  EventBus.on("gallery-image-uploaded", onImageUploaded);
});

onBeforeUnmount(() => {
  EventBus.off("gallery-image-uploaded", onImageUploaded);
});

defineExpose({
  open,
  close,
});
</script>

