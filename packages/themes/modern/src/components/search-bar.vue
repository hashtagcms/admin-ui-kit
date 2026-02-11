<template>
  <form
    :action="actionUrl"
    method="get"
    v-on:submit.prevent="searchNow"
    class="w-full"
    role="form"
  >
    <div class="flex flex-wrap items-center gap-4">
      <div class="flex-1 min-w-[200px] flex items-center gap-3">
          <div class="flex-1 sm:flex-none sm:w-48">
              <select
                name="fields"
                v-model="searchParams.f"
                class="bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-inner font-bold cursor-pointer"
                @change="changeInputText()"
              >
                <option
                  v-for="field in searchFields"
                  :value="getFieldName(field, 'key')"
                >
                  {{ getFieldName(field) }}
                </option>
              </select>
          </div>
          
          <div class="w-24">
            <select name="fields" v-model="searchParams.o" class="bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full px-3 py-3 outline-none transition-all shadow-inner font-mono">
              <option v-for="operator in operators" :value="operator">
                {{ operator }}
              </option>
            </select>
          </div>
      </div>
      
      <div class="flex-1 md:flex-[2] min-w-[200px]">
        <input
          :type="inputType"
          v-model="searchParams.q"
          class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full px-5 py-3 outline-none transition-all shadow-sm placeholder-gray-400 font-medium"
          placeholder="What are you looking for?"
        />
      </div>
      
      <div class="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="submit"
            name="submit"
            class="flex-1 sm:flex-none px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <i class="fa fa-search text-[10px]"></i>
            Search
          </button>
          <button
            type="reset"
            name="reset"
            @click="resetForm()"
            class="flex-1 sm:flex-none px-6 py-3 bg-white border border-gray-200 hover:border-gray-300 text-gray-400 hover:text-gray-900 text-xs font-black uppercase tracking-widest rounded-xl transition-all active:scale-95"
          >
            Reset
          </button>
      </div>
    </div>
  </form>
</template>

<script>
import AdminConfig from "@hashtagcms/helpers/admin-config";

export default {
  mounted() {
    this.init();
  },
  props: [
    "dataSelectedParams",
    "dataControllerName",
    "dataFields",
    "dataActionFields",
  ],
  data() {
    return {
      searchParams: { q: "", f: "id", o: "=" },
      actionUrl: AdminConfig.admin_path(this.dataControllerName + "/search"),
      searchFields:
        this.dataFields && this.dataFields != "null"
          ? JSON.parse(this.dataFields)
          : [],
      operators: ["=", "!=", ">", "<", ">=", "<=", "like%", "%like%"],
      hasAction:
        this.dataActionFields && this.dataActionFields != "null"
          ? JSON.parse(this.dataActionFields).length > 0
          : false,
      defaultSearchParams: { q: "", f: "id", o: "=" },
      inputType: "text",
    };
  },
  methods: {
    searchNow() {
      var url;
      if (this.searchParams.q.trim() == "") {
        url = AdminConfig.admin_path(this.dataControllerName);
      } else {
        var q = encodeURI(JSON.stringify(this.searchParams));
        var sep = this.actionUrl.indexOf("?") == -1 ? "?" : "&";
        url = this.actionUrl + sep + "q=" + q;
      }

      window.location.href = url;

      return false;
    },
    resetForm() {
      var url = AdminConfig.admin_path(this.dataControllerName);
      //alert(url);
      window.location.href = url;
    },
    getFieldName(key, prop) {
      prop = prop ? prop : "label";
      return typeof key == "string"
        ? key
        : key[prop] == undefined
          ? key
          : key[prop];
    },
    changeInputText() {
      if (
        this.searchParams.f.endsWith("_date") ||
        this.searchParams.f.endsWith("_at")
      ) {
        this.inputType = "date";
      } else {
        this.inputType = "text";
      }
    },
    init() {
      if (this.hasAction) {
        this.searchFields.pop();
      }

      this.searchParams = JSON.parse(this.dataSelectedParams);

      if (this.searchParams.f == undefined) {
        this.searchParams = this.defaultSearchParams;
      }
    },
  },
};
</script>
