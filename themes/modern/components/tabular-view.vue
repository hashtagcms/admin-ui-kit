<template>
  <div class="clear-both space-y-8">
    <template v-if="!isZeroResult()">
      <!-- Grid View -->
      <div v-if="layoutType === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="row in rows"
          :id="'row_' + row.id"
          :key="row.key"
          class="group"
        >
          <hc-card
            shadow="lg"
            rounded="lg"
            body-class="p-0"
            p="p-0"
            px="px-0"
            py="py-0"
            class="overflow-hidden hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
          >
            <table class="w-full text-xs text-left">
              <tr
                v-for="(fields, index) in headings"
                :class="getCssForRow(fields, index)"
                class="border-b border-gray-100 last:border-0 group/row hover:bg-gray-50/50 transition-colors"
                :key="index"
              >
                <td :class="['px-5 py-2.5 font-black text-gray-400 uppercase tracking-widest bg-gray-100/50 w-1/3 border-r border-gray-100 head_' + getFieldName(fields)]">
                  {{ filterFieldsName(getFieldName(fields)) }}
                </td>
                <td :class="['px-5 py-2.5 font-bold text-gray-700', isActionFieldKey(getFieldName(fields, 'key')) ? 'bg-gray-50/50 border-t border-gray-100' : '']">
                  <span
                    v-if="!isActionFieldKey(getFieldName(fields, 'key'))"
                    v-html="getFieldValue(row, getFieldName(fields, 'key'), fields)"
                  ></span>
                  <div
                    v-else
                    class="flex flex-wrap gap-2 actions"
                    v-html="getActionValue(row)"
                  ></div>
                </td>
              </tr>
            </table>
          </hc-card>
        </div>
      </div>

      <!-- Table View -->
      <div v-if="layoutType === 'table'" class="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead class="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th
                  v-for="fields in headings"
                  :key="'th_' + getFieldName(fields)"
                  :class="['px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] head_' + filterSnakeCase(getFieldName(fields))]"
                  scope="col"
                >
                  {{ filterFieldsName(getFieldName(fields)) }}
                </th>
              </tr>
            </thead>
            <tbody class="">
              <tr
                v-for="row in rows"
                :id="'row_' + row.id"
                :key="row.key"
                :data-id="row.id"
                class="group hover:bg-blue-50/30 transition-all duration-200 list-table-row border-b border-gray-100 last:border-0"
              >
                <td v-for="fields in headings" :key="getFieldName(fields, 'key')" class="px-6 py-3 text-sm font-bold text-gray-700">
                  <div
                    v-if="isActionFieldKey(getFieldName(fields, 'key'))"
                    class="flex items-center gap-2 actions min-w-[120px]"
                    v-html="getActionValue(row)"
                  ></div>
                  <span
                    v-else
                    class="block group-hover:text-blue-900 transition-colors"
                    v-html="getFieldValue(row, getFieldName(fields, 'key'), fields)"
                  ></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- Modal and Popups -->
    <modal-box
      ref="deleteBox"
      :data-show-footer="true"
      :data-show-modal="false"
      @on-close="deleteNow"
    >
      <template v-slot:title>Alert</template>
      <template v-slot:content>
        <span class="text-red-600 font-medium">{{ alertMessage.current }}</span>
      </template>

      <template v-slot:footer>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center">
            <input
              id="flexCheckDefault"
              v-model="preventDeleteBox"
              class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
              type="checkbox"
            />
            <label class="ml-2 text-sm font-medium text-gray-900" for="flexCheckDefault">
              Don't ask again
            </label>
          </div>
          <div class="flex space-x-2">
            <button
              v-show="isDelete"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="button"
              @click="deleteNow(0)"
            >
              No
            </button>
            <button
              v-show="isDelete"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              type="button"
              @click="deleteNow(1)"
            >
              Yes
            </button>
            <button
              v-show="!isDelete"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="button"
              @click="closeDialog()"
            >
              Okay
            </button>
          </div>
        </div>
      </template>
    </modal-box>
    
    <info-popup ref="infoPopup"></info-popup>

    <hc-alert 
      v-if="isZeroResult()" 
      variant="info" 
      :title="noResultsFoundText"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, getCurrentInstance } from 'vue';
import AdminConfig from "../../../helpers/admin-config";
import axios from "axios";
import { Toast, QueryBuilder, SafeJsonParse } from "../../../helpers/common";
import { Fx } from "../../../helpers/fx";
import { EventBus } from "../../../helpers/event-bus";
import ModalBox from "./library/modal-box.vue";
import InfoPopup from "./info-popup.vue";
import HcCard from "../ui-kit/HcCard.vue";
import HcAlert from "../ui-kit/HcAlert.vue";

const props = defineProps([
  "dataHeaders",
  "dataList",
  "dataActionFields",
  "dataMoreActionFields",
  "dataControllerName",
  "dataActionAsAjax",
  "dataActionCss",
  "dataUserRights",
  "dataMakeFieldAsLink",
  "dataShowDeletePopup",
  "dataEditHandledByOtherComponent",
  "dataMinResultsNeeded",
  "dataLayoutType",
  "dataNoResultsFoundText",
]);

const { proxy } = getCurrentInstance();

// Data
const actionFields = ref(SafeJsonParse(props.dataActionFields, []));
const userRights = ref(SafeJsonParse(props.dataUserRights, []));
const moreActions = ref(SafeJsonParse(props.dataMoreActionFields, []));

// Helper for default values
const getDefaultValue = (key, dv) => {
  return window.Laravel?.htcmsAdminConfig?.(key) || dv;
};

const actionAjax = ref(SafeJsonParse(props.dataActionAsAjax, getDefaultValue("action_as_ajax", [])));
const actionIconCss = ref(SafeJsonParse(props.dataActionCss, getDefaultValue("action_icon_css", [])));

const alertMessage = reactive({
  current: "Are you sure to delete this?",
  delete: "Are you sure to delete this?",
  permission: "Sorry! You don't have permission to delete this.",
});

/** Data **/
const isDelete = ref(true);
const currentActionItem = ref(null);
const preventDeleteBox = ref(false);
const makeFieldAsLink = ref(SafeJsonParse(props.dataMakeFieldAsLink, []));
const fieldAsLinkCache = reactive({});
const showDeletePopup = ref((props.dataShowDeletePopup || "FALSE").toString().toUpperCase());
const editHandledByOtherComponent = ref(!!props.dataEditHandledByOtherComponent && props.dataEditHandledByOtherComponent.toString() === "true");
const minResultsNeeded = ref(parseInt(props.dataMinResultsNeeded) || -1);
const layoutType = ref(props.dataLayoutType || "table");
const noResultsFoundText = ref(props.dataNoResultsFoundText);
const spinnerCss = ["fa-spinner", "fa-pulse", "fa-fw"];

/** Refs for child components **/
const deleteBox = ref(null);
const infoPopup = ref(null);

/** Computed **/
const headings = computed(() => {
  const headingData = SafeJsonParse(props.dataHeaders, []);
  return headingData.map(current => ({
    label: current.label || current,
    key: current.key || current,
    isImage: current.isImage?.toString() === "true",
    showAllScopes: current.showAllScopes?.toString() === "true",
  }));
});

const rows = computed(() => {
  return SafeJsonParse(props.dataList, []);
});

/** Methods **/

/**
 * =============================================================================
 * Field and Action Checkers
 * =============================================================================
 */

/**
 * Checks if a key corresponds to an action field (e.g., 'action' or 'moreactions').
 * @param {string} key - The field key to check.
 * @returns {boolean} True if the key is an action field.
 */
const isActionFieldKey = (key) => {
  const k = (key || "").toLowerCase();
  return k === "action" || k === "moreactions";
};

/**
 * Checks if a field should be rendered as a link based on configuration.
 * Uses a cache to improve performance for repeated checks.
 * @param {string} key - The field key.
 * @returns {object|number} The configuration object if found, or -1 if not.
 */
const isMakeFieldAsLink = (key) => {
  if (fieldAsLinkCache[key] !== undefined) return fieldAsLinkCache[key];
  const found = makeFieldAsLink.value.find(c => c.key === key || c.action === key);
  fieldAsLinkCache[key] = found === undefined ? -1 : found;
  return fieldAsLinkCache[key];
};

/**
 * Checks if the current user has specific rights/permissions.
 * @param {string} rights - The permission string to check.
 * @returns {boolean} True if the user has the permission.
 */
const can = (rights) => {
  return userRights.value.indexOf(rights) >= 0;
};

/**
 * Checks if an action should be performed via AJAX.
 * @param {string} action - The action name.
 * @returns {boolean} True if the action is configured as AJAX.
 */
const isAjax = (action) => {
  return actionAjax.value.indexOf(action) >= 0;
};

// =============================================================================
// UI Helpers
// =============================================================================

/**
 * Retrieves the display name of a field, falling back to the key itself.
 * @param {string|object} key - The field key or object.
 * @param {string} [prop="label"] - The property to use if key is an object.
 * @returns {string} The field name.
 */
const getFieldName = (key, prop = "label") => {
  return typeof key === "string" ? key : key[prop] === undefined ? key : key[prop];
};

/**
 * Formats a field name for display (e.g., replaces underscores with spaces, capitalizes).
 * @param {string} value - The raw field name.
 * @returns {string} The formatted field name.
 */
const filterFieldsName = (value) => {
  if (!value) return "";
  const cleaned = value.toString().replace(/\.|_/g, " ");
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};

/**
 * Converts a string to snake_case.
 * @param {string} value - The input string.
 * @returns {string} The snake_case string.
 */
const filterSnakeCase = (value) => {
  return (value || "").toString().replace(/\s|\./g, "_").toLowerCase();
};

/**
 * Determines the CSS class for a row based on its index (e.g., for active state).
 * @param {object} fields - The fields definition.
 * @param {number} index - The current index.
 * @returns {string} The CSS class string.
 */
const getCssForRow = (fields, index) => {
  return headings.value.length - 1 === index ? "active" : "";
};

/**
 * Retrieves the CSS class for an action icon.
 * @param {string} key - The action key.
 * @returns {string} The CSS class string.
 */
const getIconCSS = (key) => {
  return actionIconCss.value[key] || "";
};

/**
 * Generates the CSS classes for an AJAX action button.
 * @param {string|object} actionValue - The action name or object.
 * @returns {string} A string of CSS classes.
 */
const getAjaxCss = (actionValue, forceAjax = false) => {
  const action = typeof actionValue === "object" ? actionValue.action : actionValue;
  const isAjaxVal = forceAjax || isAjax(action);
  return `js_action ${isAjaxVal ? "js_ajax " : ""}js_${action}`;
};

// =============================================================================
// Value Resolvers
// =============================================================================

/**
 * Helper to extract values from an array of objects for a specific field.
 * @param {Array} scope - The array of objects.
 * @param {string} fieldName - The field to extract.
 * @returns {string} Comma-separated values.
 */
const getScopeAllVals = (scope, fieldName) => {
  return scope.map(item => item[fieldName]).join(",");
};

/**
 * Resolves a nested value from a row object (e.g., 'category.name').
 * @param {object} row - The data row.
 * @param {string} key - The nested key string.
 * @param {object} fields - Field configuration.
 * @returns {string} The resolved value.
 */
const getNestedValue = (row, key, fields) => {
  const [scopeKey, fieldName] = key.split(".");
  const scope = row[scopeKey];

  if (scope === undefined) return "";
  
  if (Array.isArray(scope)) {
    return scope.length > 0
      ? fields.showAllScopes
        ? getScopeAllVals(scope, fieldName)
        : scope[0][fieldName]
      : "";
  }
  
  if (typeof scope === 'object' && scope !== null) {
    return scope[fieldName] || "";
  }
  
  return "";
};

/**
 * Generates HTML for an image or video link.
 * @param {string} v - The filename.
 * @returns {string} HTML string for the media link.
 */
const getImgOrVideoHtml = (v) => {
  const mediaPath = AdminConfig.get("media_path");
  const imgs = ["apng", "avif", "gif", "jpg", "jpeg", "jfif", "pjpeg", "pjp", "png", "svg", "webp", "bmp", "ico", "cur", "tif", "tiff"];
  const vids = ["mp4", "mov", "ogg"];
  const ext = v.toString().substring(v.lastIndexOf(".") + 1).toLowerCase();
  
  let content = "";
  if (vids.includes(ext)) {
    content = `<video height="30"><source src="${mediaPath}/${v}"></video>`;
  } else if (imgs.includes(ext)) {
    content = `<img height="30" src='${mediaPath}/${v}' />`;
  } else {
    content = v;
  }
  
  return `<a class="text-blue-600 hover:text-blue-800 underline" href="${mediaPath}/${v}" target="_blank">${content}</a>`;
};

/**
 * Renders an action link (HTML) for a specific field.
 * @param {object} row - The data row.
 * @param {string} forKey - The key of the field being rendered.
 * @param {object} actionAlias - Configuration for the action link.
 * @returns {string} HTML string for the action link.
 */
const renderActionLink = (row, forKey, actionAlias) => {
  const actionName = actionAlias.action || forKey;
  const title = filterFieldsName(actionName);
  const path = AdminConfig.admin_path(`${props.dataControllerName}/${actionName}/${row.id}`);
  
  let iconOrValue = row[forKey];
  const status = (row[forKey] === null || row[forKey] === undefined || row[forKey] === "") ? "0" : row[forKey].toString();
  const isAjaxVal = isAjax(forKey);
  let isAjaxCss = getAjaxCss(actionName, isAjaxVal);
  
  if (isAjaxVal) {
    isAjaxCss += ` ${forKey}_${status} w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:bg-gray-100 text-gray-400 hover:text-blue-600`;
    
    // Resolve icon: Try specific status CSS, fallback to generic action icon
    let icon_css = actionAlias["css_" + status] || getIconCSS(actionName) || "";
    
    // Ensure fa base class is present
    if (icon_css && !icon_css.includes("fa ")) icon_css = "fa " + icon_css;
    
    iconOrValue = `<i class="js_icon ${icon_css}"></i>`;
    
    if (!can(actionName)) {
      isAjaxCss += " opacity-30 cursor-not-allowed pointer-events-none";
    }
  }

  if (forKey === "id" && actionFields.value.indexOf("edit") === -1) {
    return iconOrValue;
  }

  return `<a class="${isAjaxCss}" data-value="${status}" data-rowid="${row.id}" data-action="${actionName}" title="${title}" href="${path}">${iconOrValue}</a>`;
};

/**
 * Retrieves the actual value for a field, handling dates, images, and action links.
 * @param {object} row - The data row.
 * @param {string} forKey - The key of the field.
 * @param {object} fields - Field configuration.
 * @returns {string|number} The resolved value or HTML.
 */
const getActualValue = (row, forKey, fields) => {
  const actionAlias = isMakeFieldAsLink(forKey);
  
  // Handle Action Links
  if (actionAlias !== undefined && actionAlias !== -1) {
    return renderActionLink(row, forKey, actionAlias);
  }

  // Handle Regular Values
  let value = row[forKey];
  
  // Format Dates
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      value = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    }
  }

  if (fields.isImage && value) {
    return getImgOrVideoHtml(value);
  }

  return value;
};

/**
 * Main entry point to get a field's value, handling nested keys.
 * @param {object} row - The data row.
 * @param {string} key - The field key.
 * @param {object} fields - Field configuration.
 * @returns {string|number} The resolved value.
 */
const getFieldValue = (row, key, fields) => {
  if (key.includes(".")) {
    return getNestedValue(row, key, fields);
  }
  return getActualValue(row, key, fields);
};

/**
 * Generates the HTML for the action column(s), including primary and "more" actions.
 * @param {object} row - The data row.
 * @returns {string} HTML string containing action buttons.
 */
const getActionValue = (row) => {
  const html = [];

  // Primary Actions (edit, delete, etc.)
  actionFields.value.forEach(current => {
    let path = "";
    const title = filterFieldsName(current);

    if (current === "edit") {
      path = AdminConfig.admin_path(`${props.dataControllerName}/${current}/${row.id}`);
    } else if (current === "delete") {
      if (minResultsNeeded.value === -1 || minResultsNeeded.value < rows.value.length) {
        path = AdminConfig.admin_path(`${props.dataControllerName}/destroy/${row.id}`);
      }
    } else {
      path = AdminConfig.admin_path(`${props.dataControllerName}/${current}/${row.id}`);
    }

    if (path) {
      const isAjaxVal = getAjaxCss(current);
      const baseBtnCss = "w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:bg-gray-100 text-gray-400 hover:text-blue-600";
      let icon_css = getIconCSS(current);
      if (icon_css && !icon_css.includes("fa ")) icon_css = "fa " + icon_css;
      
      const icon = `<i class="js_icon ${icon_css}"></i>`;
      html.push(`<a class="${isAjaxVal} ${baseBtnCss}" data-rowid="${row.id}" data-action="${current}" title="${title}" href="${path}">${icon}</a>`);
    }
  });

  // More Actions
  moreActions.value.forEach(current => {
    const isAjaxVal = getAjaxCss(current);
    const baseBtnCss = "w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:bg-gray-100 text-gray-400 hover:text-blue-600";
    const css = current.css || "";
    let attributes = "";
    if (current.hrefAttributes) {
      Object.entries(current.hrefAttributes).forEach(([attr, val]) => {
        attributes += `${attr}='${val}' `;
      });
    }
    
    const action = current.action;
    const value = row[current.action_append_field] || "";
    const title = filterFieldsName(current.label);
    const path = AdminConfig.admin_path(`${props.dataControllerName}/${action}/${value}`);
    
    let icon_css = current.icon_css || "";
    if (icon_css && !icon_css.includes("fa ")) icon_css = "fa " + icon_css;
    const icon = `<i class="js_icon ${icon_css}"></i>`;
    
    html.push(`<a class="${isAjaxVal} ${baseBtnCss} ${css}" data-rowid="${row.id}" title="${title}" href="${path}" data-action="${action}" ${attributes}>${icon}</a>`);
  });

  return html.join("&nbsp;");
};

// =============================================================================
// UI Feedback (Spinners)
// =============================================================================

/**
 * Removes loading spinner classes from all elements.
 */
const removeAllSpinners = () => {
  document.querySelectorAll(".fa-spinner").forEach(el => {
    el.classList.remove(...spinnerCss);
  });
};

/**
 * Toggles the visibility of a loading spinner on an element.
 * @param {Event|HTMLElement} event - The event or element to target.
 * @param {boolean} [show=true] - Whether to show or hide the spinner.
 */
const showHideSpinner = (event, show = true) => {
  if (!event) {
    removeAllSpinners();
    return;
  }
  const current = event instanceof HTMLElement ? event : event.currentTarget;
  removeAllSpinners();
  if (show === true && current.firstElementChild) {
    current.firstElementChild.classList.add(...spinnerCss);
  }
};

// =============================================================================
// Ajax Handling
// =============================================================================

/**
 * Performs an AJAX request.
 * @param {string} method - HTTP method (get, post, delete, etc.).
 * @param {string} url - The URL to request.
 * @param {Function} success - Callback for success.
 * @param {Function} fail - Callback for failure.
 * @returns {Promise} The Axios promise.
 */
const doAjax = (method, url, success, fail) => {
  return axios[method](url)
    .then(res => success && success(res))
    .catch(err => {
      if (fail) fail(err);
      else Toast.show(proxy, err.message, 5000, "error");
      showHideSpinner(currentActionItem.value, false);
    });
};

// =============================================================================
// Dialogs & Modals
// =============================================================================

/**
 * Closes the delete confirmation dialog.
 */
const closeDialog = () => {
  if (deleteBox.value) deleteBox.value.close();
};

/**
 * Opens the delete confirmation dialog for a specific item.
 * @param {HTMLElement} current - The element triggering the delete.
 */
const openDeleteAlert = (current) => {
  if (deleteBox.value) deleteBox.value.open(current);
};

/**
 * Executed when the user confirms or cancels deletion.
 * @param {number} [isOk=1] - 1 for confirmed, 0 for cancelled.
 */
const deleteNow = (isOk = 1) => {
  if (isOk !== 1) {
    showHideSpinner(currentActionItem.value, false);
    closeDialog();
    return;
  }

  const target = currentActionItem.value;
  if (!can("delete")) {
    Toast.show(proxy, "Sorry! You don't have permission to delete.", 3000, "error");
    setTimeout(() => showHideSpinner(target, false), 1000);
    closeDialog();
    return;
  }

  const rowid = "row_" + target.getAttribute("data-rowid");
  const href = target.getAttribute("href");
  
  doAjax("delete", href, (res) => {
    if (res.status === 200) {
      const index = rows.value.findIndex(c => c.id.toString() === res.data.id.toString());
      if (index >= 0) {
        Toast.show(proxy, "Record has been deleted", 2000);
        document.getElementById(rowid)?.remove();
        // Note: rows is derived from props, so we cannot splice it reactively here
        // without parent intervention (mutating props is anti-pattern).
        // DOM removal provides immediate visual feedback.
      } else {
         Toast.show(proxy, "Record deleted but list state mismatch.", 2000, "warning");
      }
      setTimeout(bindAction, 100); 
      EventBus.emit("pagination-on-delete");
    } else {
      showHideSpinner(target, false);
      Toast.show(proxy, "Ooops! Got some error!", 5000, "error");
    }
  });
  closeDialog();
};

/**
 * Opens the info popup with details.
 * @param {string} type - The type of info to show.
 * @param {string|number} id - The ID of the record.
 * @param {Array} excludeFields - Fields to exclude.
 * @param {string} editable - Whether the info is editable.
 */
const showInfo = (type, id, excludeFields, editable) => {
  if (infoPopup.value) infoPopup.value.showInfo(type, id, excludeFields, editable);
};

// =============================================================================
// Action Handling
// =============================================================================

/**
 * Handles generic AJAX actions (status toggles, etc.).
 * @param {HTMLElement} current - The element triggering the action.
 * @param {string} action - The action name.
 * @param {string} status - Current status/value.
 * @param {string} href - The URL to call.
 */
const handleGenericAjax = (current, action, status, href) => {
  doAjax("get", href, (res) => {
    showHideSpinner(current, false);
    const actionProp = isMakeFieldAsLink(action);
    const icon = current.querySelector(".js_icon");
    
    if (icon) {
      const oldCss = actionProp["css_" + status];
      if (oldCss) icon.classList.remove(...oldCss.split(" "));
      
      const newStatus = res.data.status;
      current.setAttribute("data-value", newStatus);
      const newCss = actionProp["css_" + newStatus];
      if (newCss) icon.classList.add(...newCss.split(" "));
    }
  }, (res) => {
    showHideSpinner(current, false);
    Toast.show(proxy, res?.response?.data?.message || "Unknown Error!", 5000, "error");
  });
};

/**
 * Initial handler for any AJAX action click event.
 * Delegates to specific handlers based on action type.
 * @param {Event} event - The click event.
 */
const initAjaxAction = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const current = event.currentTarget;
  const { action, rowid, value: status } = current.dataset;
  let href = current.getAttribute("href");
  
  if (status) href += `/${status}`;
  currentActionItem.value = current;

  if (action === "delete") {
    alertMessage.current = alertMessage.delete;
    isDelete.value = true;
    preventDeleteBox.value ? deleteNow(1) : openDeleteAlert(current);
  } else if (action === "showinfo") {
    const { info, editable, excludefields = [] } = current.dataset;
    showInfo(info, rowid, excludefields, editable);
  } else {
    handleGenericAjax(current, action, status, href);
  }
};

/**
 * Binds click events to all action elements in the DOM.
 * Essential for both initial load and after DOM updates (e.g., delete).
 */
const bindAction = () => {
  const allElements = proxy.$el.querySelectorAll(".js_action");
  allElements.forEach(el => {
    if (el.classList.contains("js_ajax")) {
      el.addEventListener("click", initAjaxAction, false);
    }
    el.addEventListener("click", showHideSpinner, false);
  });

  if (editHandledByOtherComponent.value) {
    const editElements = proxy.$el.querySelectorAll("a[data-action='edit']");
    editElements.forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        EventBus.emit("list-view-pre-edit", e.currentTarget); 
      });
    });
  }
};

/**
 * Highlights a specific row if requested via query parameter (e.g., ?id=123).
 */
const highlight = () => {
  const id = QueryBuilder.get("id");
  if (id) {
    const rowSelector = "#row_" + id;
    Fx.scrollWinTo(rowSelector, () => Fx.highlight("row_" + id));
  }
};

/**
 * Checks if the current data list is empty.
 * @returns {boolean} True if no rows exist.
 */
const isZeroResult = () => {
  return rows.value.length === 0;
};

// Lifecycle
onMounted(() => {
  highlight();
  bindAction();
  if (showDeletePopup.value === "FALSE") {
    preventDeleteBox.value = true;
  }
  EventBus.on("list-view-hide-spinner", () => showHideSpinner(undefined, "false"));
  EventBus.on("info-popup-open", () => removeAllSpinners());
});

// Since we can't mutate computed prop 'rows' (derived from props), 
// and the original component splice logic was flawed if strictly following Vue philosophy 
// (it mutated a parsed copy in data() but labeled as rows computed in my previous conversion attempt, 
// actually in original code 'rows' WAS computed so splice shouldn't start working? 
// Wait, original code: rows() { return SafeJsonParse... }. Computed. 
// splice() on array returned from computed? Use caution.
// 'rows' is computed returning a NEW array every time props change.
// But splice() on the *result* of computed property acts on that temporary array. 
// It won't persist if props trigger re-compute.
// Ideally usage of dataList prop implies parent manages state. 
// But here we are just replicating existing behavior.

</script>
