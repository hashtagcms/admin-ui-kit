<template>
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-show="visible" class="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <!-- Backdrop with blur -->
      <div class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" @click="close()"></div>

      <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <!-- Modal panel with premium shadow and rounding -->
        <div 
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-xl border border-white"
            :class="dataModalCss"
            :style="modalWidth"
        >
          <!-- Header -->
          <div class="px-8 pt-8 pb-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <h3 class="text-xl font-black text-gray-900 uppercase tracking-tight" id="modal-title">
              <slot name="title">{{ title }}</slot>
            </h3>
            <button 
                type="button" 
                class="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-100 shadow-sm transition-all active:scale-90"
                @click="sendData(0)"
            >
              <span class="sr-only">Close</span>
              <i class="fa fa-times text-sm"></i>
            </button>
          </div>
          
          <!-- Body -->
          <div class="px-8 py-8">
             <div :class="[contentCss, 'text-gray-600 font-medium leading-relaxed']">
                <slot name="content">{{ content }}</slot>
             </div>
          </div>

          <!-- Footer -->
          <div class="px-8 py-6 sm:flex sm:flex-row-reverse gap-3 bg-gray-50/50 border-t border-gray-50" v-show="showFooter">
            <slot name="footer">{{ footerContent }}</slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
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
      modelCss: "modal modal-lg fade show",
      titleCss:
        typeof this.dataTitleCss === "undefined" ? "" : this.dataTitleCss,
      contentCss:
        typeof this.dataContentCss === "undefined" ? "" : this.dataContentCss,
      footerCss:
        typeof this.dataFooterCss === "undefined" ? "" : this.dataFooterCss,
      visible:
        this.dataShowModal !== undefined &&
        this.dataShowModal.toString() === "true",
      style: "",
      toBeReturned: {},
      title: "Alert",
      content: "Modal Content",
      footerContent: "",
      backDropStyle: "display:none",
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
    modalWidth() {
      if (typeof this.dataWidth != "undefined" && this.dataWidth !== "") {
        return `width:${this.dataWidth}`;
      } else {
        return "";
      }
    },
  },
  methods: {
    open(toBeReturned = {}) {
      this.visible = true;
      this.backDropStyle = this.style = "display:block";
      this.modelCss = "modal modal-lg fade show animated bounceInDown";
      this.toBeReturned = toBeReturned;
    },
    close() {
      this.visible = false;
      this.modelCss = "modal modal-lg animated bounceOutUp";
      this.backDropStyle = "display:none";

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
        if (message.title) {
          this.title = message.title;
        }
        if (message.content) {
          this.content = message.content;
        }
        if (message.footerContent) {
          this.footerContent = message.footerContent;
        }
      }

      //handle position
      if (position) {
        //align this
      }

      this.open(callback);
    },
    hide() {
      this.close();
    },
  },
};
</script>
