<template>
  <div class="fixed z-50 shadow-lg bg-gray-800 text-white px-6 py-3 rounded-lg text-sm font-medium transition-opacity duration-300" v-show="showMe">
    <div class="toasterContent">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      showMe: false,
      message: "Toast Content",
      intervalId: 0,
    };
  },
  methods: {
    show(message = "", timeout = 3000, position) {
      this.hide();
      let $this = this;
      this.showMe = true;
      this.message = message !== "" ? message : "";
      this.$nextTick(function () {
        this.align(position);
      });

      this.intervalId = setTimeout(function () {
        $this.hide();
      }, timeout);
    },
    hide() {
      this.showMe = false;
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    },
    align(position) {
      let left =
        position !== undefined
          ? position.left
          : window.innerWidth / 2 - this.$el.offsetWidth / 2;
      let top =
        position !== undefined
          ? position.top
          : window.innerHeight / 2 - this.$el.offsetHeight / 2 + window.scrollY;
      this.$el.style.top = top + "px";
      this.$el.style.left = left + "px";
    },
  },
};
</script>
