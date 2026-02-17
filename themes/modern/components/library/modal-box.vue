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

<script>
import HcModal from "../../ui-kit/HcModal.vue";
import HcButton from "../../ui-kit/HcButton.vue";

export default {
  name: "ModalBox",
  components: {
    HcModal,
    HcButton
  },
  emits: ["onClose"],
  props: [
    "dataShowModal",
    "dataShowFooter",
    "dataTitleCss",
    "dataContentCss",
    "dataFooterCss",
    "dataModalCss",
    "dataWidth",
  ],
  mounted() {
    if (this.visible) {
      this.open();
    }
  },
  data() {
    return {
      titleCss: typeof this.dataTitleCss === "undefined" ? "" : this.dataTitleCss,
      contentCss: typeof this.dataContentCss === "undefined" ? "" : this.dataContentCss,
      footerCss: typeof this.dataFooterCss === "undefined" ? "" : this.dataFooterCss,
      visible: this.dataShowModal !== undefined && this.dataShowModal.toString() === "true",
      toBeReturned: {},
      title: "Alert",
      content: "Modal Content",
      footerContent: "",
    };
  },
  computed: {
    showFooter() {
      return (
        (typeof this.dataShowFooter !== "undefined" &&
          this.dataShowFooter.toString() === "true") ||
        this.footerContent !== ""
      );
    },
    modalSize() {
      if (typeof this.dataWidth != "undefined") {
        const w = parseInt(this.dataWidth);
        if (w < 400) return 'sm';
        if (w < 700) return 'md';
        if (w < 1000) return 'lg';
        return 'xl';
      }
      return "md";
    },
  },
  methods: {
    open(toBeReturned = {}) {
      this.visible = true;
      this.toBeReturned = toBeReturned;
    },
    close() {
      this.visible = false;
      if (typeof this.toBeReturned === "function") {
        this.toBeReturned();
      }
    },
    sendData(isOkay) {
      this.close();
      this.$emit("onClose", isOkay, this.toBeReturned);
    },
    show(message, position, callback, timeout) {
      if (typeof message == "string") {
        this.content = message;
      } else {
        if (message.title) this.title = message.title;
        if (message.content) this.content = message.content;
        if (message.footerContent) this.footerContent = message.footerContent;
      }
      this.open(callback);
    },
    hide() {
      this.close();
    },
  },
};
</script>
