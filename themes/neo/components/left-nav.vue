<template>
  <div class="d-flex flex-column flex-shrink-0 t_left js_left_menu">
    <ul class="list-unstyled ps-0">
      <template v-for="current in filteredData">
        <li v-if="current.parent_id === 0">
          <a
            :title="current.sub_title"
            :href="getHref(current)"
            :class="
              'text-white ' + getActiveCss(current.controller_name, current)
            "
            aria-expanded="true"
          >
            <i
              v-if="hasChild(current)"
              class="js_more fa fa-ellipsis-v pull-right adjustMore"
              @click="showHide($event)"
            ></i>
            <i :class="current.icon_css + ' fa-icons'" aria-hidden="true"></i>
            {{ current.name }}
          </a>
          <template v-if="hasChild(current)">
            <ul
              :class="
                'js_child btn-toggle-nav list-unstyled fw-normal ' +
                getActiveCss(current.controller_name, current)
              "
            >
              <li v-for="child in current.child">
                <a
                  :title="child.sub_title"
                  :href="getHref(child)"
                  :class="
                    'text-white ' + getActiveCss(child.controller_name, child)
                  "
                >
                  <i
                    :class="child.icon_css + ' fa-icons'"
                    aria-hidden="true"
                  ></i>
                  {{ child.name }}
                </a>
              </li>
            </ul>
          </template>
        </li>
      </template>
    </ul>
    <hr />
    <div class="dropdown">
      <a
        title="Open HashtagCms.org"
        :href="linkForHashtag"
        target="_blank"
        class="d-flex align-items-center text-light text-decoration-none"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <strong>v{{ dataHashtagcmsVersion }}</strong>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import { SafeJsonParse } from "../../../helpers/common";

const props = defineProps([
  "dataList",
  "dataControllerName",
  "dataModulesAllowed",
  "dataIsAdmin",
  "dataHashtagcmsVersion",
]);

// State
const allData = ref(SafeJsonParse(props.dataList, []));
const modulesAllowed = ref(SafeJsonParse(props.dataModulesAllowed, []));

const isAdmin = computed(() => String(props.dataIsAdmin) === '1' || props.dataIsAdmin === true);

const filteredData = computed(() => {
  if (isAdmin.value) {
    return allData.value;
  }
  
  const allowed = modulesAllowed.value || [];
  
  return allData.value.reduce((acc, current) => {
    // Check if the parent module is allowed OR if any of its children are allowed
    const isParentAllowed = allowed.some(m => m.module_id === current.id);
    
    let newItem = { ...current };
    
    // Check and filter children separately
    if (newItem.child && newItem.child.length > 0) {
       newItem.child = newItem.child.filter(child => {
          return allowed.some(m => m.module_id === child.id);
       });
    }
    
    // Parent is visible if explicitly allowed or if any child is allowed
    if (isParentAllowed || (newItem.child && newItem.child.length > 0)) {
       acc.push(newItem);
    }
    
    return acc;
  }, []);
});

// Computed
const linkForHashtag = computed(
  () => `https://www.hashtagcms.org/?utm_src=${encodeURIComponent(window.location.href)}`
);

// Methods
const getIconLabel = (data) =>
  data.icon_css === "" || !data.icon_css ? data.controller_name.charAt(0).toUpperCase() : "";

const getIconCss = (data) =>
  data.icon_css === "" || !data.icon_css ? "badge badge-info text-small" : data.icon_css;

const hasChild = (data) => data.child && data.child.length > 0;

const isActive = (controller_name, data) => {
  if (props.dataControllerName === controller_name) {
    return true;
  }
  if (data && data.child && data.child.length > 0) {
    const activeController = props.dataControllerName;
    return data.child.some((c) => c.controller_name === activeController);
  }
  return false;
};

const getActiveCss = (controller_name, data) => (isActive(controller_name, data) ? "active" : "");

const getHref = (data) => AdminConfig.admin_path(data.controller_name);

const hideAll = () => {
  document.querySelectorAll(".js_left_menu .js_child").forEach((ele) => {
    ele.classList.remove("active", "animated", "fadeIn");
  });
};

const showHide = (event) => {
  hideAll();
  const ele = event.target;
  if (ele.classList.contains("js_more")) {
    event.preventDefault();
    const childUl = ele.parentElement.nextElementSibling;
    if (childUl) {
      childUl.classList.add("active", "animated", "fadeIn");
    }
  }
};

// Removed unused hasAccess because filteredData handles the exact requirement automatically

const getMinHeight = () => `height:${window.innerHeight}px;`;
</script>

