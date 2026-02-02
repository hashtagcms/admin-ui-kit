<template>
  <div class="container-fluid">
    <TopNav v-bind="topNavProps" />
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
          <h1>Admin UI Kit Playground</h1>
          <div>
              <span class="me-2 fw-bold">Quick Jump:</span>
              <a href="#" class="btn btn-sm btn-link text-decoration-none" :class="{'fw-bold text-dark': currentView === ''}">Home</a>
              <span class="text-muted mx-1">|</span>
              <template v-for="(view, index) in availableViews" :key="view.id">
                  <a :href="'#' + view.id" class="btn btn-sm btn-link text-decoration-none" :class="{'fw-bold text-dark': currentView === view.id}">{{ view.shortLabel || view.label }}</a>
                  <span v-if="index < availableViews.length - 1" class="text-muted mx-1">|</span>
              </template>
          </div>
      </div>
      
      <!-- Homepage / Table of Contents -->
      <div v-if="currentView === ''" class="mb-5">
          <div class="card bg-light">
              <div class="card-body">
                  <h4 class="card-title">Available Component Tests</h4>
                  <p class="card-text">Select a component to view its rendered state with fake data.</p>
                  <div class="list-group list-group-flush">
                      <a v-for="view in availableViews" :key="view.id" :href="'#' + view.id" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                          {{ view.label }}
                          <span class="badge bg-primary rounded-pill">View</span>
                      </a>
                  </div>
              </div>
          </div>
      </div>

      <!-- Component Views -->
      <div v-if="isVisible('action-bar')" class="mb-4">
        <h3>Action Bar</h3>
        <ActionBar v-bind="actionBarProps" />
      </div>

      <div v-if="isVisible('info-boxes')" class="mb-4">
        <h3>Info Boxes</h3>
        <div class="row">
             <InfoBoxes v-bind="infoBoxesProps" />
        </div>
      </div>

      <div v-if="isVisible('left-nav')" class="row mb-4">
         <h3>Left Nav</h3>
         <div class="col-md-3">
            <LeftNav v-bind="leftNavProps" />
         </div>
      </div>

      <div v-if="isVisible('tabular-view')" class="row mb-4">
          <h3>Tabular View & Pagination</h3>
          <div class="col-md-12">
             <TabularView v-bind="tabularViewProps" />
             <div class="mt-3">
                <Pagination v-bind="paginationProps" />
             </div>
          </div>
      </div>

      <div v-if="isVisible('title-bar')" class="mb-4">
          <h3>Title Bar</h3>
          <TitleBar v-bind="titleBarProps" />
      </div>

      <div v-if="isVisible('sitewise-data')" class="mb-4">
          <h3>Sitewise Data</h3>
          <div class="row">
              <SitewiseData v-bind="sitewiseDataProps" />
          </div>
      </div>

      <div v-if="isVisible('sitewise-copier')" class="mb-4">
          <h3>Sitewise Copier</h3>
          <SitewiseCopier v-bind="sitewiseCopierProps" />
      </div>

      <div v-if="isVisible('site-cloner')" class="mb-4">
          <h3>Site Cloner</h3>
          <SiteCloner v-bind="siteClonerProps" />
      </div>

    </div>

    <!-- Global Mocks for Helpers -->
    <div ref="globalToaster" style="display:none;"></div>
    <div ref="globalLoader" style="display:none;"></div>
    <div ref="globalModalBox" style="display:none;"></div>

  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import LeftNav from '@hashtagcms/components/left-nav.vue';
import TabularView from '@hashtagcms/components/tabular-view.vue';
import TopNav from '@hashtagcms/components/top-nav.vue';
import ActionBar from '@hashtagcms/components/action-bar.vue';
import InfoBoxes from '@hashtagcms/components/info-boxes.vue';
import Pagination from '@hashtagcms/components/pagination.vue';
import TitleBar from '@hashtagcms/components/title-bar.vue';
import SitewiseData from '@hashtagcms/components/sitewise-data.vue';
import SitewiseCopier from '@hashtagcms/components/sitewise-copier.vue';
import SiteCloner from '@hashtagcms/components/site-cloner.vue';

import { parseAttributes } from './utils';
import leftNavData from '../tests/fake-data/admin-modules.txt?raw';
import tabularViewData from '../tests/fake-data/table-view.txt?raw';
import topNavData from '../tests/fake-data/top-nav.txt?raw';
import actionBarData from '../tests/fake-data/action-bar.txt?raw';
import infoBoxesData from '../tests/fake-data/info-boxes.txt?raw';
import paginationData from '../tests/fake-data/pagination-view.txt?raw';
import titleBarData from '../tests/fake-data/title-bar.txt?raw';
import sitewiseDataRaw from '../tests/fake-data/site-wise.txt?raw';
import sitewiseCopierData from '../tests/fake-data/site-wise-copier.txt?raw';
import siteClonerData from '../tests/fake-data/site-cloner.txt?raw';


const currentView = ref('');

const availableViews = [
    { id: 'title-bar', label: 'Title Bar', shortLabel: 'TitleBar' },
    { id: 'action-bar', label: 'Action Bar', shortLabel: 'ActionBar' },
    { id: 'info-boxes', label: 'Info Boxes', shortLabel: 'InfoBoxes' },
    { id: 'left-nav', label: 'Left Navigation', shortLabel: 'LeftNav' },
    { id: 'tabular-view', label: 'Tabular View & Pagination', shortLabel: 'Tabular' },
    { id: 'sitewise-data', label: 'Sitewise Data Component', shortLabel: 'SiteWise' },
    { id: 'sitewise-copier', label: 'Sitewise Copier', shortLabel: 'Copier' },
    { id: 'site-cloner', label: 'Site Cloner', shortLabel: 'Cloner' }
];

const globalToaster = ref(null);
const globalLoader = ref(null);
const globalModalBox = ref(null);

onMounted(() => {
    // Setup Mock Methods for Global Helpers
    if (globalToaster.value) {
        globalToaster.value.show = (msg) => console.log('[Toast Show]', msg);
        globalToaster.value.hide = () => console.log('[Toast Hide]');
    }
    if (globalLoader.value) {
        globalLoader.value.show = () => console.log('[Loader Show]');
        globalLoader.value.hide = () => console.log('[Loader Hide]');
    }
    if (globalModalBox.value) {
        globalModalBox.value.show = () => console.log('[Modal Show]');
        globalModalBox.value.hide = () => console.log('[Modal Hide]');
    }

    const updateView = () => {
        const hash = window.location.hash.replace('#', '');
        currentView.value = hash;
    };
    window.addEventListener('hashchange', updateView);
    updateView();
});

const isVisible = (viewId) => {
    return currentView.value === '' || currentView.value === viewId;
};

// Use safe parse from updated utils.js
const leftNavProps = computed(() => stringifyProps(transformProps(parseAttributes(leftNavData))));
const topNavProps = computed(() => stringifyProps(transformProps(parseAttributes(topNavData))));
const actionBarProps = computed(() => stringifyProps(transformProps(parseAttributes(actionBarData))));
const infoBoxesProps = computed(() => stringifyProps(transformProps(parseAttributes(infoBoxesData))));
const paginationProps = computed(() => stringifyProps(transformProps(parseAttributes(paginationData))));

const tabularViewProps = computed(() => {
    let props = transformProps(parseAttributes(tabularViewData));
    return stringifyProps(props);
});

const titleBarProps = computed(() => stringifyProps(transformProps(parseAttributes(titleBarData))));
const sitewiseDataProps = computed(() => stringifyProps(transformProps(parseAttributes(sitewiseDataRaw))));
const sitewiseCopierProps = computed(() => stringifyProps(transformProps(parseAttributes(sitewiseCopierData))));
const siteClonerProps = computed(() => stringifyProps(transformProps(parseAttributes(siteClonerData))));


function transformProps(props) {
    const newProps = {};
    for (const key in props) {
        newProps[key] = props[key];
    }
    return newProps;
}

function stringifyProps(props) {
    const newProps = {};
    for (const key in props) {
        if (typeof props[key] === 'object' && props[key] !== null) {
            newProps[key] = JSON.stringify(props[key]);
        } else {
            newProps[key] = String(props[key]);
        }
    }
    return newProps;
}
</script>

<style>
/* Add local custom styles if needed */
</style>
