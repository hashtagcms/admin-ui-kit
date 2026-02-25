<template>
  <div :class="modelCss" tabindex="-1" aria-hidden="true" :style="style">
    <div
      :class="
        'modal-dialog modal-dialog-centered modal-dialog-scrollable ' +
        dataModalCss
      "
      :style="modalWidth"
    >
      <div class="modal-content">
        <div :class="titleCss + ' modal-header'">
          <h5 class="modal-title" style="width: 100%">
            <slot name="title">{{ title }}</slot>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="sendData(0)"
          ></button>
        </div>
        <div :class="contentCss + ' modal-body'">
          <slot name="content">{{ content }}</slot>
        </div>
        <div :class="footerCss + ' modal-footer'" v-show="showFooter">
          <slot name="footer">{{ footerContent }}</slot>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show" :style="backDropStyle"></div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps([
  "dataShowModal",
  "dataShowFooter",
  "dataTitleCss",
  "dataContentCss",
  "dataFooterCss",
  "dataModalCss",
  "dataWidth",
]);

const emit = defineEmits(["onClose"]);

// State
const modelCss = ref("modal modal-lg fade show");
const titleCss = ref(props.dataTitleCss || "");
const contentCss = ref(props.dataContentCss || "");
const footerCss = ref(props.dataFooterCss || "");
const visible = ref(props.dataShowModal?.toString() === "true");
const style = ref("");
const toBeReturned = ref({});
const title = ref("Alert");
const content = ref("Modal Content");
const footerContent = ref("");
const backDropStyle = ref("display:none");

// Computed
const showFooter = computed(() => {
  return (props.dataShowFooter?.toString() === "true") || footerContent.value !== "";
});

const modalWidth = computed(() => {
  if (props.dataWidth && props.dataWidth !== "") {
    return `width:${props.dataWidth}`;
  }
  return "";
});

// Methods
const open = (data = {}) => {
  visible.value = true;
  backDropStyle.value = style.value = "display:block";
  modelCss.value = "modal modal-lg fade show animated bounceInDown";
  toBeReturned.value = data;
};

const close = () => {
  visible.value = false;
  modelCss.value = "modal modal-lg animated bounceOutUp";
  backDropStyle.value = "display:none";

  if (typeof toBeReturned.value === "function") {
    toBeReturned.value();
  }
};

const sendData = (isOkay) => {
  close();
  emit("onClose", isOkay, toBeReturned.value);
};

const show = (message, position, callback, timeout) => {
  if (typeof message === "string") {
    content.value = message;
  } else {
    if (message.title) {
      title.value = message.title;
    }
    if (message.content) {
      content.value = message.content;
    }
    if (message.footerContent) {
      footerContent.value = message.footerContent;
    }
  }

  // handle position
  if (position) {
    // align this
  }

  open(callback);
};

const hide = () => {
  close();
};

defineExpose({ open, close, sendData, show, hide });

onMounted(() => {
  if (visible.value) {
    open();
  }
});
</script>

