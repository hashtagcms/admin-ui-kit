<template>
  <div class="playground-shell" :class="themeClass">
    <!-- Main Header -->
    <header class="playground-header">
        <div class="brand">
            <div class="logo">H</div>
            <h1>HASHTAGCMS <span>PLAYGROUND</span></h1>
        </div>
        
        <div class="actions">
            <!-- Theme Selector -->
            <div class="theme-selector">
                <span class="label">ACTIVE THEME:</span>
                <select :value="currentTheme" @change="onThemeChange">
                    <option v-for="opt in themeOptions" :key="opt.value" :value="opt.value">
                      {{ opt.label }}
                    </option>
                </select>
            </div>
            
            <div class="divider"></div>
            
            <!-- Quick Navigation (Router Links) -->
            <nav class="quick-nav">
                <span class="label">QUICK JUMP:</span>
                <router-link v-for="view in availableViews" :key="view.id" 
                   :to="{ name: 'ThemePlayground', params: { themeName: currentTheme }, hash: '#' + view.id }"
                   class="nav-item">
                    {{ view.shortLabel }}
                </router-link>
            </nav>
        </div>
    </header>

    <!-- Main Content Rendering via Router -->
    <main class="playground-content py-12 px-6">
       <!-- Centered Container for Modern, standard row for Neo -->
       <div :class="[currentTheme === 'modern' ? 'max-w-7xl mx-auto' : 'container']">
           <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
           </router-view>
       </div>
    </main>

    <!-- Global Mocks/Overlays -->
    <div id="htcms_toaster"></div>
    <div id="htcms_loader"></div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getThemeOptions, getDefaultTheme } from './theme-loader';

const route = useRoute();
const router = useRouter();

const currentTheme = computed(() => route.params.themeName || getDefaultTheme());
const themeClass = computed(() => `theme-${currentTheme.value}`);
const themeOptions = getThemeOptions();

const onThemeChange = (e) => {
  const newTheme = e.target.value;
  router.push({ name: 'ThemePlayground', params: { themeName: newTheme } });
};

const availableViews = [
    { id: 'title-bar', label: 'Title Bar', shortLabel: 'TitleBar' },
    { id: 'action-bar', label: 'Action Bar', shortLabel: 'ActionBar' },
    { id: 'info-boxes', label: 'Info Boxes', shortLabel: 'InfoBoxes' },
    { id: 'tabular-view', label: 'Data Grid', shortLabel: 'Grid' },
    { id: 'left-nav', label: 'Left Navigation', shortLabel: 'Nav' },
    { id: 'sitewise-data', label: 'Contextual Data', shortLabel: 'SiteWise' },
    { id: 'uikit', label: 'UI Kit Components', shortLabel: 'HcKit' }
];

</script>

<style scoped>
/* Scoped styles removed in favor of global playground/style.css which handles Tailwind scans better */
</style>
