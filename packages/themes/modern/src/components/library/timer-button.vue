<template>
  <a
    href="#"
    @click="goBack()"
    class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
  >
    <slot>Back in </slot>
    <span class="ml-1 font-bold">{{ totalTime - timeRemaining }} {{ seconds }}</span>
  </a>
</template>

<script>
export default {
  props: ["dataBackUrl", "dataTimeout"],
  data() {
    return {
      totalTime:
        typeof this.dataTimeout == "undefined" ? 5 : parseInt(this.dataTimeout),
      timeRemaining: 0,
      intervalId: 0,
      seconds: "Seconds",
    };
  },
  mounted() {
    this.intervalId = setInterval(this.updateTime, 1000);
  },
  methods: {
    goBack() {
      //console.log(this.dataBackUrl);
      clearInterval(this.intervalId);
      window.location.href = this.dataBackUrl;
    },

    updateTime() {
      if (this.timeRemaining >= this.totalTime) {
        clearInterval(this.intervalId);
        this.goBack();
      } else {
        this.timeRemaining++;
      }

      this.seconds =
        this.totalTime - this.timeRemaining <= 1 ? "Second" : "Seconds";
    },
  },
};
</script>
