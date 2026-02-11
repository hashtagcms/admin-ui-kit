<template>
  <div>
    <modal-box ref="platformbox" @onClose="hideSpinner">
      <template #title>
        <div class="flex items-center gap-2">
            <i class="fa fa-layer-group text-blue-600"></i>
            <span>Select Platform Context</span>
        </div>
      </template>
      <template #content>
        <div class="flex flex-col sm:flex-row items-center gap-4 py-4">
          <div class="w-full sm:flex-1">
            <select
              v-model="currentPlatform"
              class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-sm cursor-pointer"
              @change="editNow()"
            >
              <option value="">Choose a platform...</option>
              <option v-for="platform in platforms" :key="platform.id" :value="platform.id">
                {{ platform.name }}
              </option>
            </select>
          </div>
          <div class="w-full sm:w-auto">
            <button
              class="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 whitespace-nowrap"
              type="button"
              @click="editNow()"
            >
              Proceed to Edit
            </button>
          </div>
        </div>
      </template>
    </modal-box>
  </div>
</template>

<script>
import AdminConfig from "@hashtagcms/helpers/admin-config";
import { EventBus } from "@hashtagcms/helpers/event-bus";
import { Toast } from "@hashtagcms/helpers/common";
import ModalBox from "./library/modal-box.vue";

export default {
  components: {
    "modal-box": ModalBox,
  },
  mounted() {
    this.verifyAction();
  },
  props: ["dataPlatforms"],
  data() {
    return {
      modelCss: "modal",
      showHide: true,
      platforms:
        this.dataPlatforms && this.dataPlatforms != "null"
          ? JSON.parse(this.dataPlatforms)
          : [],
      currentPlatform: "",
      currentTarget: null,
    };
  },
  methods: {
    verifyAction: function () {
      let $this = this;
      EventBus.on("list-view-pre-edit", function (current) {
        $this.currentTarget = current;
        $this.open();
      });
    },
    editNow() {
      let platform_id = this.currentPlatform;
      if (platform_id === "") {
        Toast.show(this, "Please select a platform");
        return false;
      }
      let target = this.currentTarget;
      let id = target.getAttribute("data-rowid");
      window.location = AdminConfig.admin_path(
        `category/edit/${id}/${platform_id}`,
      );
    },
    open() {
      // console.log(this.platforms);
      if (this.platforms.length > 1) {
        this.$refs.platformbox.open();
      } else {
        this.currentPlatform = this.platforms[0].id;
        this.editNow();
      }
    },
    close() {
      this.$refs.platformbox.close();
    },
    hideSpinner() {
      EventBus.emit("list-view-hide-spinner", this);
    },
  },
};
</script>
