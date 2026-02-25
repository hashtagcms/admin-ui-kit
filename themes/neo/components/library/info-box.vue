<template>
  <div class="card mb-3 shadow info-box">
    <span :class="getColor() + ' info-box-icon'"
      ><i style="font-style: normal" :class="icon">{{ getIconText() }}</i></span
    >
    <div class="card-body">
      <h5 class="card-title">
        <a v-if="link !== ''" :href="link" class="info-box-text"
          ><span class="info-box-text" v-html="content"></span
        ></a>
        <span v-if="link === ''" class="info-box-text">{{ content }}</span>
      </h5>
      <p class="card-text text-center" v-if="subTitle !== ''">
        {{ subTitle }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Store, SafeJsonParse } from "../../../../helpers/common";

const props = defineProps([
  "dataInfo",
  "dataColorIndex",
  "dataSubTitle",
  "dataTitle",
  "dataIconCss",
  "dataLink",
]);

// State
const info = ref(SafeJsonParse(props.dataInfo, null));
const subTitle = ref(typeof props.dataSubTitle !== "undefined" ? props.dataSubTitle : "");
const iconCss = ref(props.dataIconCss);
const link = ref(props.dataLink === undefined ? "" : props.dataLink);

// Computed
const content = computed(() => {
  return info.value !== null ? info.value.name || info.value.title : props.dataTitle;
});

const icon = computed(() => {
  if ((iconCss.value === undefined || iconCss.value === "") && info.value !== null) {
    return info.value.icon_css || info.value.iconCss;
  }
  return iconCss.value;
});

// Methods
const getIconText = () => {
  if (info.value?.icon_css || iconCss.value === undefined) {
    return content.value
      .replace(/[^a-zA-Z- ]/g, "")
      .match(/\b\w/g)
      .join("");
  }
  return "";
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

const getColor = () => {
  let n = props.dataColorIndex;
  if (!n) {
    const str = content.value || "";
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    n = (Math.abs(hash) % 10) + 1;
  }
  return `color-${n}`;
};

const getRandom = (min = 1, max = 10) => {
  // not in used
  const parsedMin = parseInt(min);
  const parsedMax = parseInt(max);
  return Math.floor(Math.random() * (parsedMax - parsedMin)) + parsedMin;
};
</script>

