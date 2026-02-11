<template>
  <div class="inline-block">
    <split-button
      v-if="hasLanguage()"
      :data-options="dataLanguages"
      @change="setLanguage"
      :data-parser="parseLang"
      :data-selected="currentIndex"
      data-btn-css="bg-white border border-gray-200 text-gray-700 hover:border-blue-300 shadow-sm"
    >
      <div class="flex items-center gap-2 px-1">
          <i class="fa fa-globe text-[10px] text-gray-400"></i>
          <span class="font-black text-[10px] uppercase tracking-widest">Switch Language</span>
      </div>
    </split-button>
  </div>
</template>

<script>
import AdminConfig from "@hashtagcms/helpers/admin-config";
import SplitButton from "./library/split-button.vue";

export default {
  components: {
    "split-button": SplitButton,
  },
  props: ["dataLanguages", "dataSelectedLanguage"],
  mounted() {
    //console.log(this.languages);
  },
  data() {
    return {
      languages:
        typeof this.dataLanguages == "undefined"
          ? null
          : JSON.parse(this.dataLanguages),
      currentLang:
        typeof this.dataSelectedLanguage == "undefined"
          ? 1
          : parseInt(this.dataSelectedLanguage),
    };
  },
  computed: {
    currentIndex() {
      if (this.languages != null) {
        for (var i = 0; i < this.languages.length; i++) {
          var item = this.languages[i];

          if (item.id == this.currentLang) {
            return i;
          }
        }
      }
      //console.log($this.currentLang);
      return 0;
    },
  },
  methods: {
    hasLanguage() {
      //has language greate than one
      return this.languages != null && this.languages.length > 1;
    },
    parseLang: function (row) {
      //console.log(row);
      return { label: row.name, value: row.id };
    },
    setLanguage(data) {
      //console.log("changed happend")

      let ajaxController = AdminConfig.admin_path(
        `ajax/setLanguage/${data.value}`,
      );

      axios
        .get(ajaxController)
        .then(function (response) {
          //console.log(response);
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
