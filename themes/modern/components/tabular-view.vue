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
            shadow="md"
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
                <td :class="['px-5 py-2.5 text-gray-700', isActionFieldKey(getFieldName(fields, 'key')) ? 'bg-gray-50/50 border-t border-gray-100' : '']">
                  <span
                    v-if="!isActionFieldKey(getFieldName(fields, 'key'))"
                    v-html="sanitizeHTML(getFieldValue(row, getFieldName(fields, 'key'), fields))"
                  ></span>
                  <div
                    v-else
                    class="flex flex-wrap gap-2 actions"
                    v-html="sanitizeHTML(getActionValue(row))"
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
            <thead class="bg-gray-100/50 border-b border-gray-100">
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
                <td v-for="fields in headings" :key="getFieldName(fields, 'key')" class="px-6 py-3 text-sm text-gray-700">
                  <div
                    v-if="isActionFieldKey(getFieldName(fields, 'key'))"
                    class="flex items-center gap-2 actions min-w-[120px]"
                    v-html="sanitizeHTML(getActionValue(row))"
                  ></div>
                  <span
                    v-else
                    class="block max-w-[220px] truncate group-hover:text-blue-900 transition-colors"
                    :title="getFieldValue(row, getFieldName(fields, 'key'), fields)"
                    v-html="sanitizeHTML(getFieldValue(row, getFieldName(fields, 'key'), fields))"
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
import { ref, reactive, computed, onMounted, getCurrentInstance, watch } from 'vue';
import AdminConfig from "../../../helpers/admin-config";
import axios from "axios";
import { Toast, QueryBuilder, SafeJsonParse, ACTION_MAP } from "../../../helpers/common";
import { Fx } from "../../../helpers/fx";
import { EventBus } from "../../../helpers/event-bus";
import ModalBox from "./library/modal-box.vue";
import InfoPopup from "./info-popup.vue";
import HcCard from "../ui-kit/HcCard.vue";
import HcAlert from "../ui-kit/HcAlert.vue";
import TabularViewActions from "../../../helpers/tabular-view-actions";

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

const emit = defineEmits(["onAction"]);

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
const hasAnyVisibleActions = computed(() => visibleActions.value.length > 0);

const headings = computed(() => {
  const headingData = SafeJsonParse(props.dataHeaders, []);
  return headingData
    .filter(current => {
      const key = current.key || current;
      if (isActionFieldKey(key)) {
        return hasAnyVisibleActions.value;
      }
      return true;
    })
    .map(current => ({
      label: current.label || current,
      key: current.key || current,
      isImage: current.isImage?.toString() === "true",
      showAllScopes: current.showAllScopes?.toString() === "true",
    }));
});

const rows = ref(SafeJsonParse(props.dataList, []));
watch(() => props.dataList, (newVal) => {
  rows.value = SafeJsonParse(newVal, []);
});

const findRowById = (id) => {
    return rows.value.find(r => r.id.toString() === id.toString());
};

/** Methods **/

/**
 * Sanitizes HTML strings to prevent XSS while allowing safe tags/attributes.
 * @param {string} html - The raw HTML string.
 * @returns {string} The sanitized HTML string.
 */
const sanitizeHTML = (html) => {
  if (!html || typeof html !== "string") return html;
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    
    // Remove scripts and potentially dangerous elements
    const dangerousTags = ["script", "iframe", "object", "embed", "base"];
    dangerousTags.forEach(tag => {
      doc.querySelectorAll(tag).forEach(el => el.remove());
    });

    // Strip event handlers (onmouseover, onclick, etc.)
    const allElements = doc.querySelectorAll("*");
    allElements.forEach(el => {
      for (let i = el.attributes.length - 1; i >= 0; i--) {
        const attr = el.attributes[i].name.toLowerCase();
        if (attr.startsWith("on") || attr === "javascript:") {
          el.removeAttribute(attr);
        }
      }
    });
    
    return doc.body.innerHTML;
  } catch (e) {
    console.error("Sanitization failed", e);
    return html;
  }
};

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
 * Normalizes actions and maps them to permissions.
 */
const visibleActions = computed(() => {
  const result = [];
  
  // 1. Process Standard Actions (dataActionFields)
  actionFields.value.forEach(actionName => {
    const requiredRight = ACTION_MAP[actionName] || actionName;
    if (can(requiredRight)) {
      result.push({
        action: actionName,
        label: filterFieldsName(actionName),
        icon_css: getIconCSS(actionName),
        isAjax: isAjax(actionName)
      });
    }
  });

  // 2. Process More Actions (dataMoreActionFields)
  moreActions.value.forEach(item => {
    const actionName = item.action;
    const requiredRight = item.right || ACTION_MAP[actionName] || actionName;
    
    // User requested moreActionFields visibility. 
    // If user has any right and it's not strictly 'read' for single right user, show it.
    const isVisible = can(requiredRight) || (userRights.value.length === 1 && userRights.value[0] !== 'read') || userRights.value.length > 1;

    if (isVisible) {
      result.push({
        ...item,
        label: item.label || filterFieldsName(actionName),
        icon_css: item.icon_css || getIconCSS(actionName) || "",
        isAjax: item.isAjax || isAjax(actionName),
        isCustom: item.isCustom || false
      });
    }
  });

  return result;
});

const hasAction = (actionName) => {
  return visibleActions.value.some(a => a.action === actionName);
};


/**
 * Checks if the current user has specific rights/permissions.
 * @param {string} rights - The permission string to check.
 * @returns {boolean} True if the user has the permission.
 */
const can = (rights) => {
    const r = userRights.value;
    const isSpecialAction = ["add", "edit", "approve"].includes(rights);
    // User requested: if user has only one right. should be able add/edit/approve.
    if (r.length === 1 && r[0] !== 'read' && isSpecialAction) {
        return true;
    }
  return r.indexOf(rights) >= 0;
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
      // Alternatively, if the user strictly wants to HIDE it:
      // return iconOrValue; 
    }
  }

  if (forKey === "id") {
    if (hasAction("edit")) {
      const editPath = AdminConfig.admin_path(`${props.dataControllerName}/edit/${row.id}`);
      const extraCss = " text-blue-500 hover:text-blue-800 decoration-blue-200 decoration-2 transition-colors";
      return `<a class="js_action${extraCss}" data-rowid="${row.id}" data-action="edit" title="Edit" href="${editPath}">${iconOrValue}</a>`;
    }
    
    if (!can("edit") && can("read")) {
      const extraCss = " text-blue-500 hover:text-blue-800 decoration-blue-200 decoration-2 transition-colors cursor-pointer";
      return `<a class="js_action js_ajax${extraCss}" data-info="${props.dataControllerName}" data-editable="false" data-value="${status}" data-rowid="${row.id}" data-action="showinfo" title="View Details" href="javascript:void(0)">${iconOrValue}</a>`;
    }
    
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

const getActionValue = (row) => {
  const html = [];
  const baseBtnCss = "w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:bg-gray-100 text-gray-400 hover:text-blue-600";

  visibleActions.value.forEach(item => {
    let path = "";
    const actionName = item.action;
    
    // Determine path
    if (actionName === "delete") {
      if (minResultsNeeded.value === -1 || minResultsNeeded.value < rows.value.length) {
        path = AdminConfig.admin_path(`${props.dataControllerName}/destroy/${row.id}`);
      }
    } else if (item.href) {
       path = item.href;
    } else {
      const appendVal = item.action_append_field ? row[item.action_append_field] : row.id;
      path = AdminConfig.admin_path(`${props.dataControllerName}/${actionName}/${appendVal}`);
    }

    if (path) {
      const isAjaxVal = getAjaxCss(item, item.isAjax);
      let iconCss = item.icon_css;
      if (iconCss && !iconCss.includes("fa ")) iconCss = "fa " + iconCss;
      
      let attributes = item.hrefAttributes ? Object.entries(item.hrefAttributes).map(([k, v]) => `${k}='${v}'`).join(" ") : "";
      if (item.isCustom) {
          attributes += ` data-custom="true"`;
      }
      const icon = `<i class="js_icon ${iconCss}"></i>`;
      
      html.push(`<a class="${isAjaxVal} ${baseBtnCss}" data-rowid="${row.id}" data-action="${actionName}" title="${item.label}" href="${path}" ${attributes}>${icon}</a>`);
    }
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
// Dialogs & Modals
// =============================================================================

/**
 * Opens the delete confirmation dialog for a specific item.
 * @param {HTMLElement} current - The element triggering the delete.
 */
const openDeleteAlert = (current) => {
  if (deleteBox.value) deleteBox.value.open(current);
};

/**
 * Helper to get the context for actions.
 */
const getActionContext = (target) => {
  return {
    target,
    proxy,
    rows,
    bindAction,
    can,
    showHideSpinner,
    isMakeFieldAsLink,
    infoPopup: infoPopup.value,
    deleteBox: deleteBox.value,
    controllerName: props.dataControllerName,
    editHandledByOtherComponent: editHandledByOtherComponent.value,
    emit,
    findRowById
  };
};

/**
 * Executed when the user confirms or cancels deletion.
 * @param {number} [isOk=1] - 1 for confirmed, 0 for cancelled.
 */
const deleteNow = (isOk = 1) => {
  const target = currentActionItem.value;
  if (isOk !== 1) {
    showHideSpinner(target, false);
    if (deleteBox.value) deleteBox.value.close();
    return;
  }

  const row = findRowById(target.dataset.rowid);
  TabularViewActions.execute("delete", row, getActionContext(target));
  if (deleteBox.value) deleteBox.value.close();
};

/**
 * Initial handler for any action click event.
 * Delegates to TabularViewActions for execution.
 * @param {Event} event - The click event.
 */
const initAjaxAction = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const current = event.currentTarget;
  const { action, rowid } = current.dataset;
  currentActionItem.value = current;

  if (action === "delete") {
    alertMessage.current = alertMessage.delete;
    isDelete.value = true;
    preventDeleteBox.value ? deleteNow(1) : openDeleteAlert(current);
  } else if (current.dataset.custom === "true") {
    // Custom action handled by parent component
    emit("onAction", { action, rowid, status: current.dataset.value, row: findRowById(rowid), target: current });
    showHideSpinner(current, false);
  } else {
    const row = findRowById(rowid);
    TabularViewActions.execute(action, row, getActionContext(current));
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
