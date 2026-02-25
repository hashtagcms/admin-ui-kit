<template>
  <nav class="navbar navbar-expand-lg bg-light border-bottom">
    <div class="container-fluid">
      <a class="navbar-brand" href="/" target="_blank"
        ><img class="cms-logo" :src="logo" :height="logoHeight" />
        {{ siteName }}
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
        >
          <li class="nav-item">
            <global-site-button
              :data-current-site="dataCurrentSite"
              :data-supported-sites="dataSupportedSites"
              :data-is-admin="dataIsAdmin"
            ></global-site-button>
          </li>
        </ul>
        <div class="d-flex">
          Welcome &nbsp; <span class="text-success">{{ userName }}!</span>
          <ul
            class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll ms-1"
            style="--bs-scroll-height: 100px"
          >
            <li class="nav-item">
              <a href="/logout" @click.prevent="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import GlobalSiteButton from "./global-site-button.vue";

const props = defineProps([
  "dataUsername",
  "dataSiteName",
  "dataCurrentSite",
  "dataSupportedSites",
  "dataIsAdmin",
  "dataSiteCombo",
  "dataLogo",
  "dataLogoHeight",
]);

// State
const siteName = ref(props.dataSiteName || "hashtagcms.org");
const userName = ref(props.dataUsername);
const isLoggedIn = ref(!!(props.dataUsername && props.dataUsername !== ""));
const siteCombo = ref(!(typeof props.dataSiteCombo === "undefined" || props.dataSiteCombo === "false"));
const logoHeight = ref(typeof props.dataLogoHeight === "undefined" || props.dataLogoHeight === "" ? 50 : props.dataLogoHeight);

// Computed
const logo = computed(() => {
  return typeof props.dataLogo !== "undefined" && props.dataLogo !== ""
    ? props.dataLogo
    : AdminConfig.admin_asset("img/logo-transparent.png");
});

// Methods
const logout = () => {
  document.getElementById("logout-form").submit();
};
</script>

