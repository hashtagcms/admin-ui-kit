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
      <div :class="[colorClasses.icon, 'w-14 h-14 flex shrink-0 items-center justify-center rounded-lg transition-transform group-hover:rotate-12 shadow-lg']">
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

<script setup>
import { computed } from "vue";
import { Store, SafeJsonParse } from "../../../../helpers/common";
import HcCard from "../../ui-kit/HcCard.vue";

const props = defineProps({
  dataInfo: [String, Object],
  dataColorIndex: [Number, String],
  dataSubTitle: String,
  dataTitle: String,
  dataIconCss: String,
  dataLink: String,
});

const info = computed(() => SafeJsonParse(props.dataInfo, null));
const subTitle = computed(() => typeof props.dataSubTitle !== "undefined" ? props.dataSubTitle : "");
const iconCss = computed(() => props.dataIconCss);
const link = computed(() => typeof props.dataLink === "undefined" ? "" : props.dataLink);

const content = computed(() => {
  return info.value !== null
    ? info.value.name || info.value.title
    : props.dataTitle;
});

const icon = computed(() => {
  if (
    (typeof iconCss.value === "undefined" || iconCss.value === "") &&
    info.value !== null
  ) {
    return info.value.icon_css || info.value.iconCss;
  } else {
    return iconCss.value;
  }
});

const getIconText = () => {
  return info.value?.icon_css || typeof iconCss.value === "undefined"
    ? content.value
        .replace(/[^a-zA-Z- ]/g, "")
        .match(/\b\w/g)
        ?.join("") || ""
    : "";
};

const getSerialNumber = () => {
  if (Store.fetch("counter") === undefined) {
    Store.store("counter", 1);
  }

  let counter = Store.fetch("counter");

  if (counter > 10) {
    counter = 1;
  }
  Store.store("counter", counter + 1);

  return counter;
};

const colorClasses = computed(() => {
  const colors = [
    { icon: 'bg-indigo-600 text-white shadow-indigo-500/30' },
    { icon: 'bg-emerald-500 text-white shadow-emerald-500/30' },
    { icon: 'bg-rose-500 text-white shadow-rose-500/30' },
    { icon: 'bg-amber-500 text-white shadow-amber-500/30' },
    { icon: 'bg-blue-600 text-white shadow-blue-500/30' },
    { icon: 'bg-purple-600 text-white shadow-purple-500/30' },
    { icon: 'bg-pink-500 text-white shadow-pink-500/30' },
    { icon: 'bg-orange-500 text-white shadow-orange-500/30' },
    { icon: 'bg-cyan-500 text-white shadow-cyan-500/30' },
    { icon: 'bg-violet-600 text-white shadow-violet-500/30' }
  ];

  let n = props.dataColorIndex;
  
  if (!n) {
    // Generate a consistent index based on the title if no color index is provided
    const str = content.value || "";
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    n = Math.abs(hash) % colors.length + 1;
  }
  
  return colors[(n - 1) % colors.length];
});
</script>

