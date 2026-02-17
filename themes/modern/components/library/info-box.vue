<template>
  <component 
    :is="link !== '' ? 'a' : 'div'" 
    :href="link !== '' ? link : null" 
    class="block group no-underline"
  >
    <hc-card 
      :class="[
        'hover:shadow-xl hover:shadow-blue-500/10 active:scale-95 transition-all duration-300',
        link !== '' ? 'cursor-pointer' : ''
      ]" 
      body-class="flex items-center gap-6"
    >
      <div :class="[getModernColor(), 'w-14 h-14 flex shrink-0 items-center justify-center rounded-lg transition-transform group-hover:rotate-12 shadow-lg shadow-current/10']">
          <i style="font-style: normal" :class="[icon, 'text-sm font-black uppercase tracking-tighter leading-none']">
              {{ getIconText() }}
          </i>
      </div>
      
      <div class="flex-1 min-w-0">
          <h5 class="text-xs font-black text-gray-900 uppercase tracking-widest leading-tight">
              <span v-html="content" class="block truncate"></span>
          </h5>
          
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 truncate" v-if="subTitle !== ''">
              {{ subTitle }}
          </p>
      </div>
      
      <div class="opacity-0 group-hover:opacity-100 transition-opacity">
          <i class="fa fa-chevron-right text-blue-500 text-[10px]"></i>
      </div>
    </hc-card>
  </component>
</template>

<script>
import { Store } from "@hashtagcms/admin-sdk";
import { SafeJsonParse } from "../../../../helpers/common";
import HcCard from "../../ui-kit/HcCard.vue";

export default {
  components: {
    HcCard
  },
  mounted() {},
  props: [
    "dataInfo",
    "dataColorIndex",
    "dataSubTitle",
    "dataTitle",
    "dataIconCss",
    "dataLink",
  ],
  data() {
    return {
      info: SafeJsonParse(this.dataInfo, null),
      subTitle:
        typeof this.dataSubTitle !== "undefined" ? this.dataSubTitle : "",
      iconCss: this.dataIconCss,
      link: typeof this.dataLink == "undefined" ? "" : this.dataLink,
    };
  },
  computed: {
    content() {
      return this.info !== null
        ? this.info.name || this.info.title
        : this.dataTitle;
    },
    icon() {
      if (
        (typeof this.iconCss == "undefined" || this.iconCss === "") &&
        this.info !== null
      ) {
        return this.info.icon_css || this.info.iconCss;
      } else {
        return this.iconCss;
      }
    },
  },
  methods: {
    getIconText() {
      return this.info?.icon_css || typeof this.iconCss === "undefined"
        ? this.content
            .replace(/[^a-zA-Z- ]/g, "")
            .match(/\b\w/g)
            .join("")
        : "";
    },
    getModernColor: function () {
      const colors = [
          'bg-blue-50 text-blue-600',
          'bg-indigo-50 text-indigo-600',
          'bg-purple-50 text-purple-600',
          'bg-emerald-50 text-emerald-600',
          'bg-rose-50 text-rose-600',
          'bg-amber-50 text-amber-600',
          'bg-violet-50 text-violet-600',
          'bg-cyan-50 text-cyan-600',
          'bg-teal-50 text-teal-600',
          'bg-pink-50 text-pink-600'
      ];
      let n = !this.dataColorIndex
        ? this.getSerialNumber()
        : this.dataColorIndex;
      
      return colors[(n - 1) % colors.length];
    },
    getRandom(min = 1, max = 10) {
      //not in used
      min = parseInt(min);
      max = parseInt(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getSerialNumber() {
      if (Store.fetch("counter") === undefined) {
        Store.store("counter", 1);
      }

      let counter = Store.fetch("counter");

      if (counter > 10) {
        counter = 1;
      }
      Store.store("counter", counter + 1);

      return counter;
    },
  },
};
</script>
