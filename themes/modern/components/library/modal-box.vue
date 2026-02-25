<template>
  <hc-modal 
    v-model="visible" 
    :title="title" 
    :size="modalSize"
  >
    <template #title>
      <slot name="title">{{ title }}</slot>
    </template>

    <div :class="[contentCss, 'text-gray-600 font-medium leading-relaxed']">
      <slot name="content">
        <slot>{{ content }}</slot>
      </slot>
    </div>

    <template #footer v-if="showFooter">
      <slot name="footer">
         <div class="flex gap-3">
            <hc-button variant="secondary" @click="sendData(0)">Cancel</hc-button>
            <hc-button variant="primary" @click="sendData(1)">Okay</hc-button>
         </div>
      </slot>
    </template>
  </hc-modal>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import HcModal from "../../ui-kit/HcModal.vue";
import HcButton from "../../ui-kit/HcButton.vue";

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

const titleCss = ref(typeof props.dataTitleCss === "undefined" ? "" : props.dataTitleCss);
const contentCss = ref(typeof props.dataContentCss === "undefined" ? "" : props.dataContentCss);
const footerCss = ref(typeof props.dataFooterCss === "undefined" ? "" : props.dataFooterCss);
const visible = ref(props.dataShowModal !== undefined && props.dataShowModal.toString() === "true");
const toBeReturned = ref({});
const title = ref("Alert");
const content = ref("Modal Content");
const footerContent = ref("");

const showFooter = computed(() => {
  return (
    (typeof props.dataShowFooter !== "undefined" &&
      props.dataShowFooter.toString() === "true") ||
    footerContent.value !== ""
  );
});

const modalSize = computed(() => {
  if (typeof props.dataWidth != "undefined") {
    const w = parseInt(props.dataWidth);
    if (w < 400) return 'sm';
    if (w < 700) return 'md';
    if (w < 1000) return 'lg';
    return 'xl';
  }
  return "md";
});

const open = (returnedData = {}) => {
    visible.value = true;
    toBeReturned.value = returnedData;
};

const close = () => {
    visible.value = false;
    if (typeof toBeReturned.value === "function") {
        toBeReturned.value();
    }
};

const sendData = (isOkay) => {
    close();
    emit("onClose", isOkay, toBeReturned.value);
};

const show = (message, position, callback, timeout) => {
    if (typeof message == "string") {
        content.value = message;
    } else {
        if (message.title) title.value = message.title;
        if (message.content) content.value = message.content;
        if (message.footerContent) footerContent.value = message.footerContent;
    }
    open(callback);
};

const hide = () => {
    close();
};

onMounted(() => {
    if (visible.value) {
        open();
    }
});

defineExpose({
    open,
    close,
    show,
    hide
});
</script>

