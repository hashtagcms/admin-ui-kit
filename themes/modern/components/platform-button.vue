<template>
  <div class="flex items-center space-x-2">
    <select
      :name="name"
      :id="id"
      @change="setPlatform"
      v-model="selected"
      :multiple="dataMultiple == 'true' ? multiple : false"
      class="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2 hover:border-gray-400 transition-all cursor-pointer"
    >
      <option value="">Select Platform</option>
      <option v-for="platform in platforms" :value="platform.id" :key="platform.id">
        {{ platform.name }}
      </option>
    </select>
    <i v-show="isLoading" class="fa fa-refresh fa-spin text-blue-600" aria-hidden="true"></i>
  </div>
</template>

<script>
import AdminConfig from "../../../helpers/admin-config";
import { SafeJsonParse } from "../../../helpers/common";
import SplitButton from "./library/split-button.vue";
import { EventBus } from "../../../helpers/event-bus";

export default {
  components: {
    "split-button": SplitButton,
  },
  props: [
    "dataName",
    "dataId",
    "dataPlatforms",
    "dataSelected",
    "dataMultiple",
    "dataSiteId",
    "dataFetchOnInit",
  ],
  mounted() {
    if (this.fetchOnInit !== false) {
      this.init();
    }

    console.log("selected ", this.selected);

    EventBus.$on("site_changed", this.populatePlatform);
  },
  computed: {
    selected: {
      get() {
        //if this is not multiple
        if (
          typeof this.dataMultiple === "undefined" ||
          this.dataMultiple !== "true"
        ) {
          return typeof this.dataSelected === "undefined"
            ? 1
            : parseInt(this.dataSelected);
        }
        //this is multiple
        return SafeJsonParse(this.dataSelected, [1]);
      },
      set(newValue) {
        return newValue;
      },
    },
  },
  data() {
    return {
      platforms: SafeJsonParse(this.dataPlatforms, []),
      name:
        typeof this.dataName === "undefined" ? "platform_id" : this.dataName,
      id: typeof this.dataId === "undefined" ? "platform_id" : this.dataId,
      multiple:
        typeof this.dataMultiple === "undefined" ? "" : "multiple='multiple'",
      siteId:
        typeof this.dataSiteId === "undefined" ? 1 : parseInt(this.dataSiteId),
      fetchOnInit:
        typeof this.dataFetchOnInit === "undefined" ||
        this.dataFetchOnInit === "false"
          ? false
          : this.dataFetchOnInit,
      isLoading: false,
      selectedValue: this.selected,
    };
  },
  methods: {
    init() {
      this.populatePlatform(this.siteId);
    },
    setPlatform() {
      EventBus.$emit("platform_changed", this.selected);
    },
    populatePlatform(siteId = null) {
      if (siteId === null || siteId === "") {
        this.platforms = [];
        return false;
      }
      this.isLoading = true;

      let $this = this;
      let platformUrl = AdminConfig.admin_path("ajax/getInfo/site/" + siteId);
      axios
        .get(platformUrl)
        .then(function (res) {
          $this.platforms = res.data.results.platform;
          $this.isLoading = false;
        })
        .catch(function (res) {
          console.error(res.data);
        });
    },
  },
};
</script>
