<template>
  <div class="playground-neo theme-neo container py-5">
    <!-- Rendered Components -->
    <div class="row g-5">
        <!-- Global Shell Mockup -->
        <div v-if="isVisible('shell')" class="col-12 mb-5">
            <div class="d-flex align-items-center gap-3 mb-4">
                <span class="display-6 fw-black text-muted">01.</span>
                <h3 class="h5 text-uppercase fw-bold text-secondary mb-0">Global Navigation Shell</h3>
            </div>
            <div class="border rounded-4 overflow-hidden shadow-lg bg-light">
                <!-- Top Header -->
                <div class="bg-dark p-1">
                    <component :is="activeComponents.TopNav" v-bind="topNavProps" />
                </div>
                <div class="d-flex" style="min-height: 400px;">
                    <!-- Sidebar -->
                    <div class="bg-dark border-end" style="width: 250px;">
                         <component :is="activeComponents.LeftNav" v-bind="leftNavProps" />
                    </div>
                    <!-- Content Placeholder -->
                    <div class="flex-grow-1 p-5 d-flex align-items-center justify-content-center bg-white">
                        <div class="text-center opacity-25">
                            <i class="fa fa-th-large fa-4x mb-3"></i>
                            <p class="h4 fw-bold">Application Workspace</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Developer Code -->
            <div class="mt-3">
                <details>
                    <summary class="text-primary cursor-pointer small fw-bold">Developer Code</summary>
                    <pre class="bg-dark text-light p-3 rounded mt-2 small"><code>&lt;TopNav v-bind="topNavProps" /&gt;
&lt;LeftNav v-bind="leftNavProps" /&gt;</code></pre>
                </details>
            </div>
        </div>

        <!-- Title Bar -->
        <div v-if="isVisible('title-bar')" class="col-12 mb-4">
            <div class="d-flex align-items-center gap-3 mb-3">
                <span class="display-6 fw-black text-muted">02.</span>
                <h3 class="h5 text-uppercase fw-bold text-secondary mb-0">Title Bar</h3>
            </div>
            <component :is="activeComponents.TitleBar" v-bind="titleBarProps" />
            <!-- Developer Code -->
            <div class="mt-3">
                <details>
                    <summary class="text-primary cursor-pointer small fw-bold">Developer Code</summary>
                    <pre class="bg-dark text-light p-3 rounded mt-2 small"><code>&lt;TitleBar v-bind="titleBarProps" /&gt;</code></pre>
                </details>
            </div>
        </div>

        <!-- Action Bar -->
        <div v-if="isVisible('action-bar')" class="col-12 mb-4">
            <div class="d-flex align-items-center gap-3 mb-3">
                <span class="display-6 fw-black text-muted">03.</span>
                <h3 class="h5 text-uppercase fw-bold text-secondary mb-0">Action Bar</h3>
            </div>
            <component :is="activeComponents.ActionBar" v-bind="actionBarProps" />
            <!-- Developer Code -->
            <div class="mt-3">
                <details>
                    <summary class="text-primary cursor-pointer small fw-bold">Developer Code</summary>
                    <pre class="bg-dark text-light p-3 rounded mt-2 small"><code>&lt;ActionBar v-bind="actionBarProps" /&gt;</code></pre>
                </details>
            </div>
        </div>

        <!-- Info Boxes -->
        <div v-if="isVisible('info-boxes')" class="col-12 mb-4">
            <div class="d-flex align-items-center gap-3 mb-3">
                <span class="display-6 fw-black text-muted">04.</span>
                <h3 class="h5 text-uppercase fw-bold text-secondary mb-0">Info Boxes</h3>
            </div>
            <div class="row">
                <component :is="activeComponents.InfoBoxes" v-bind="infoBoxesProps" />
            </div>
            <!-- Developer Code -->
            <div class="mt-3">
                <details>
                    <summary class="text-primary cursor-pointer small fw-bold">Developer Code</summary>
                    <pre class="bg-dark text-light p-3 rounded mt-2 small"><code>&lt;InfoBoxes v-bind="infoBoxesProps" /&gt;</code></pre>
                </details>
            </div>
        </div>

        <!-- Data Grid -->
        <div v-if="isVisible('tabular-view')" class="col-12 mb-4">
            <div class="d-flex align-items-center gap-3 mb-3">
                <span class="display-6 fw-black text-muted">05.</span>
                <h3 class="h5 text-uppercase fw-bold text-secondary mb-0">Data Grid & Pagination</h3>
            </div>
            <div class="card shadow-sm">
                <component :is="activeComponents.TabularView" v-bind="tabularViewProps" />
                <div class="card-footer d-flex justify-content-center">
                    <component :is="activeComponents.Pagination" v-bind="paginationProps" />
                </div>
            </div>
            <!-- Developer Code -->
            <div class="mt-3">
                <details>
                    <summary class="text-primary cursor-pointer small fw-bold">Developer Code</summary>
                    <pre class="bg-dark text-light p-3 rounded mt-2 small"><code>&lt;TabularView v-bind="tabularViewProps" /&gt;
&lt;Pagination v-bind="paginationProps" /&gt;</code></pre>
                </details>
            </div>
        </div>

        <!-- Tab View -->
        <div v-if="isVisible('tab-view')" class="col-12 mb-4">
            <div class="d-flex align-items-center gap-3 mb-3">
                <span class="display-6 fw-black text-muted">06.</span>
                <h3 class="h5 text-uppercase fw-bold text-secondary mb-0">Tab Navigation</h3>
            </div>
            <div class="card shadow-sm">
                <div class="card-body">
                    <component :is="activeComponents.TabView" v-bind="tabViewRealProps" />
                </div>
            </div>
            <!-- Developer Code -->
            <div class="mt-3">
                <details>
                    <summary class="text-primary cursor-pointer small fw-bold">Developer Code</summary>
                    <pre class="bg-dark text-light p-3 rounded mt-2 small"><code>&lt;TabView v-bind="tabViewProps" /&gt;</code></pre>
                </details>
            </div>
        </div>
        
        <!-- SiteWise Manager -->
        <div v-if="isVisible('sitewise')" class="col-12 mb-4">
            <div class="d-flex align-items-center gap-3 mb-3">
                <span class="display-6 fw-black text-muted">07.</span>
                <h3 class="h5 text-uppercase fw-bold text-secondary mb-0">SiteWise Manager</h3>
            </div>
            <div class="card shadow-sm p-4">
                <component :is="activeComponents.SiteWiseData" v-bind="sitewiseDataProps" />
            </div>
            <!-- Developer Code -->
            <div class="mt-3">
                <details>
                    <summary class="text-primary cursor-pointer small fw-bold">Developer Code</summary>
                    <pre class="bg-dark text-light p-3 rounded mt-2 small"><code>&lt;SiteWiseData v-bind="sitewiseDataProps" /&gt;</code></pre>
                </details>
            </div>
        </div>

        <!-- Global Site Selection -->
        <div v-if="isVisible('global-site')" class="col-12 mb-4">
            <div class="d-flex align-items-center gap-3 mb-3">
                <span class="display-6 fw-black text-muted">08.</span>
                <h3 class="h5 text-uppercase fw-bold text-secondary mb-0">Global Site Selection (AJAX)</h3>
            </div>
            <div class="card shadow-sm p-4">
                 <div class="row align-items-center g-3">
                    <div class="col-md-3">
                        <component :is="activeComponents.SiteButton" v-bind="siteButtonProps" />
                    </div>
                    <div class="col-md-3">
                        <component :is="activeComponents.GlobalSiteButton" v-bind="globalSiteProps" />
                    </div>
                    <div class="col-md-3">
                        <component :is="activeComponents.LanguageButton" v-bind="languageButtonProps" />
                    </div>
                    <div class="col-md-3">
                        <component :is="activeComponents.PlatformButton" v-bind="platformButtonProps" />
                    </div>
                 </div>
            </div>
            <!-- Developer Code -->
            <div class="mt-3">
                <details>
                    <summary class="text-primary cursor-pointer small fw-bold">Developer Code</summary>
                    <pre class="bg-dark text-light p-3 rounded mt-2 small"><code>&lt;SiteButton v-bind="siteButtonProps" /&gt;
&lt;GlobalSiteButton v-bind="globalSiteProps" /&gt;
&lt;LanguageButton v-bind="languageButtonProps" /&gt;
&lt;PlatformButton v-bind="platformButtonProps" /&gt;</code></pre>
                </details>
            </div>
        </div>

        <!-- Library & Utilities -->
        <div v-if="isVisible('library')" class="col-12 mb-4">
            <div class="d-flex align-items-center gap-3 mb-3">
                <span class="display-6 fw-black text-muted">09.</span>
                <h3 class="h5 text-uppercase fw-bold text-secondary mb-0">Library & Utilities</h3>
            </div>
            <div class="card shadow-sm p-4">
                <div class="d-flex flex-wrap gap-4 align-items-center text-dark">
                    <component :is="activeComponents.CopyPaste" content="npm install @hashtagcms/ui" />
                    <component :is="activeComponents.TimerButton" />
                    <component :is="activeComponents.InfoPopup" />
                    <component :is="activeComponents.ImageGallery" />
                    <component :is="activeComponents.SplitButton" label="Actions" :options="[{label: 'Action 1'}]" />
                </div>
            </div>
            <!-- Developer Code -->
            <div class="mt-3">
                <details>
                    <summary class="text-primary cursor-pointer small fw-bold">Developer Code</summary>
                    <pre class="bg-dark text-light p-3 rounded mt-2 small"><code>&lt;CopyPaste content="..." /&gt;
&lt;TimerButton /&gt;
&lt;InfoPopup /&gt;
&lt;ImageGallery /&gt;
&lt;SplitButton label="..." :options="[...]" /&gt;</code></pre>
                </details>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, shallowRef } from 'vue';

// State and Data imports
// Data Imports
import countryData from '../../../tests/shared/fake-data/country-index.json';
import layoutData from '../../../tests/shared/fake-data/layout-index.json';
import siteSettingsData from '../../../tests/shared/fake-data/site-settings-platforms.json';
import topNavData from '../../../tests/shared/fake-data/top-nav.json';

const activeComponents = shallowRef({});
const currentView = ref('');

const isVisible = (viewId) => {
    return currentView.value === '' || currentView.value === viewId;
};

const loadAssets = async () => {
    await import('../styles/app.scss');
    const neo = await import('../components/index.js');
    activeComponents.value = neo.default || neo;
};

onMounted(async () => {
    await loadAssets();
    const updateView = () => {
        const hash = window.location.hash.replace('#', '');
        currentView.value = hash;
    };
    window.addEventListener('hashchange', updateView);
    updateView();
});

// Props Computation
const stringifyProps = (props) => {
    const newProps = {};
    for (const key in props) {
        newProps[key] = typeof props[key] === 'object' ? JSON.stringify(props[key]) : String(props[key]);
    }
    return newProps;
};

const leftNavProps = computed(() => stringifyProps({ 
    dataList: JSON.stringify(layoutData.allModules || []),
    dataHashtagcmsVersion: '1.0.0'
}));

const topNavProps = computed(() => stringifyProps({
    dataUsername: topNavData.username,
    dataSiteName: topNavData.siteName,
    dataCurrentSite: String(topNavData.currentSite),
    dataSupportedSites: JSON.stringify(topNavData.supportedSites),
    dataIsAdmin: String(topNavData.isAdmin === 1),
    dataSiteCombo: String(topNavData.siteCombo),
    dataLogoHeight: String(topNavData.logoHeight)
}));

const actionBarProps = computed(() => stringifyProps({
    dataControllerTitle: "Countries",
    dataControllerName: "Country",
    dataFields: JSON.stringify(countryData.dataFields),
    dataActionFields: JSON.stringify(countryData.actionFields),
    dataLanguages: JSON.stringify(countryData.supportedLangs),
    dataSelectedLanguage: 1,
    dataShowSearch: true,
    dataShowAdd: true,
    dataLayoutType: 'table',
    dataCmsModules: JSON.stringify(layoutData.allModules[3])
}));

const infoBoxesProps = computed(() => stringifyProps({
    dataIsAdmin: true,
    dataInfoBoxes: JSON.stringify([
        { title: 'Total Countries', value: 244, icon: 'fa fa-globe', variant: 'primary' },
        { title: 'Active Sites', value: 5, icon: 'fa fa-server', variant: 'success' }
    ])
}));

const tabularViewProps = computed(() => stringifyProps({
    dataHeaders: JSON.stringify([...countryData.dataFields, 'action']),
    dataList: JSON.stringify(countryData.paginator.data),
    dataActionFields: JSON.stringify(countryData.actionFields),
    dataControllerName: "Country"
}));

const paginationProps = computed(() => stringifyProps({
    dataPaginator: countryData.paginator,
    dataTotal: countryData.paginator.total,
    dataPerPage: countryData.paginator.per_page,
    dataCurrentPage: countryData.paginator.current_page,
    dataLastPage: countryData.paginator.last_page,
    dataFrom: countryData.paginator.from,
    dataTo: countryData.paginator.to,
    dataFirstItem: 1,
    dataLastItem: 20
}));

const tabViewRealProps = computed(() => stringifyProps({
    dataTabs: JSON.stringify([
        { label: 'General', href: '#' },
        { label: 'Advanced', href: '#' },
        { label: 'Security', href: '#' },
        { label: 'Notifications', href: '#' }
    ]),
    dataActiveTab: 'General'
}));

const titleBarProps = computed(() => stringifyProps({
    dataTitle: "Countries",
    dataBackUrl: "/admin/dashboard"
}));

const sitewiseDataProps = computed(() => stringifyProps({
    dataAllData: JSON.stringify(siteSettingsData.allData),
    dataSiteData: JSON.stringify(siteSettingsData.selectedData),
    dataCurrentKey: 'platform',
    dataSiteId: String(siteSettingsData.siteInfo.id)
}));

const globalSiteProps = computed(() => stringifyProps({
    dataCurrentSite: String(topNavData.currentSite),
    dataIsAdmin: String(topNavData.isAdmin === 1)
}));

const siteButtonProps = computed(() => stringifyProps({
    dataSites: JSON.stringify(topNavData.supportedSites),
    dataSelected: String(topNavData.currentSite)
}));

const languageButtonProps = computed(() => stringifyProps({
    dataLanguages: JSON.stringify(siteSettingsData.siteInfo.language),
    dataSelectedLanguage: String(siteSettingsData.siteInfo.lang_id)
}));

const platformButtonProps = computed(() => stringifyProps({
    dataPlatforms: JSON.stringify(siteSettingsData.siteInfo.platform),
    dataSelected: String(siteSettingsData.siteInfo.platform_id)
}));

</script>

<style scoped>
.playground-neo {
    animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
