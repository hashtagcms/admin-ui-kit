<template>
  <nav class="w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 px-8 py-4 sticky top-0 z-50 shadow-sm">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-[1920px]">
      
      <!-- Brand & Logo -->
      <a href="/" target="_blank" class="flex items-center gap-4 group">
        <div class="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors shadow-inner">
            <img class="h-10 w-auto transition-transform group-hover:scale-110" :src="logo" :style="{ height: logoHeight + 'px' }" />
        </div>
        <div class="flex flex-col">
            <span class="text-lg font-black text-gray-800 tracking-tighter leading-none">{{ siteName }}</span>            
        </div>
      </a>

      <!-- Mobile Toggle -->
      <button class="md:hidden p-3 text-gray-400 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
      </button>

      <!-- Right Side Content -->
      <div class="hidden md:flex items-center gap-10">
          
          <!-- Site Selector Area -->
          <div class="flex items-center gap-3">            
            <global-site-button
              :data-current-site="dataCurrentSite"
              :data-supported-sites="dataSupportedSites"
              :data-is-admin="dataIsAdmin"
            ></global-site-button>
          </div>

          <!-- User Session Area -->
          <div class="flex items-center gap-6 border-l border-gray-100 pl-10">
            <div :class="['w-1.5 h-1.5 rounded-full transition-all duration-500', 
                        sessionStatus === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]']"></div>
            <div class="flex flex-col items-end">
                <span :class="['text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-1 transition-colors duration-500', 
                             sessionStatus === 'active' ? 'text-gray-400' : 'text-red-500']">
                    {{ sessionLabel }}
                </span>
                <span class="text-sm font-black text-gray-800 tracking-tight">
                  {{ userName }}
                </span>
            </div>
            
            <a 
                href="/logout" 
                @click.prevent="logout" 
                class="w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all shadow-sm hover:shadow-red-500/20 active:scale-95 group"
                title="Secure Logout"
            >
              <i class="fa fa-power-off text-lg group-hover:rotate-12 transition-transform"></i>
            </a>
          </div>

      </div>

    </div>
  </nav>
</template>

<script>
import axios from "axios";
import AdminConfig from "../../../helpers/admin-config";
import GlobalSiteButton from "./global-site-button.vue";
export default {
  components: {
    "global-site-button": GlobalSiteButton,
  },
  mounted() {
    this.startHeartbeat();
  },
  beforeUnmount() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
    }
  },
  props: [
    "dataUsername",
    "dataSiteName",
    "dataCurrentSite",
    "dataSupportedSites",
    "dataIsAdmin",
    "dataSiteCombo",
    "dataLogo",
    "dataLogoHeight",
  ],
  computed: {
    logo() {
      return typeof this.dataLogo !== "undefined" && this.dataLogo !== ""
        ? this.dataLogo
        : AdminConfig.admin_asset("img/logo-transparent.png");
    },
    sessionLabel() {
        return this.sessionStatus === 'active' ? 'Session Active' : 'Session Expired';
    }
  },
  data() {
    return {
      siteName: this.dataSiteName || "hashtagcms.org",
      userName: this.dataUsername,
      isLoggedIn: !!(this.dataUsername && this.dataUsername !== ""),
      siteCombo: !(
        typeof this.dataSiteCombo == "undefined" ||
        this.dataSiteCombo === "false"
      ),
      logoHeight:
        typeof this.dataLogoHeight === "undefined" || this.dataLogoHeight === ""
          ? 50
          : this.dataLogoHeight,
      sessionStatus: "active", // active, expired
      heartbeatTimer: null,
    };
  },
  methods: {
    logout(event) {
      document.getElementById("logout-form").submit();
    },
    async checkSession() {
        try {
            await axios.get(AdminConfig.admin_path("heartbeat"));
            this.sessionStatus = "active";
        } catch (error) {
            // Laravel returns 401 for Unauthorized or 419 for Token Mismatch (CSRF/Session expiry)
            if (error.response && [401, 419].includes(error.response.status)) {
                this.sessionStatus = "expired";
            }
        }
    },
    startHeartbeat() {
        // Check every 60 seconds
        this.heartbeatTimer = setInterval(() => {
            this.checkSession();
        }, 60000);
    }
  },
};
</script>
