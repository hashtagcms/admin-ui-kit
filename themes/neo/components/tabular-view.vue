<template>
  <div class="clearfix" ref="root">
    <template v-if="!isZeroResult()">
      <div v-if="layoutType === 'grid'" class="row">
        <div
          v-for="row in rows"
          :id="'row_' + row.id"
          :key="row.key"
          class="col"
        >
          <table class="table border shadow-sm mt-2 table-grid">
            <tr
              v-for="(fields, index) in headings"
              :class="getCssForRow(fields, index)"
            >
              <td :class="'header head_' + getFieldName(fields)">
                {{ filterFieldsName(getFieldName(fields)) }}
              </td>
              <td>
                <span
                  v-if="!isActionFieldKey(getFieldName(fields, 'key'))"
                  v-html="sanitizeHTML(getFieldValue(row, getFieldName(fields, 'key'), fields))"
                ></span>
                <div
                  v-if="isActionFieldKey(getFieldName(fields, 'key'))"
                  class="actions"
                  v-html="sanitizeHTML(getActionValue(row))"
                ></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <table
        v-if="layoutType === 'table'"
        class="table border shadow-sm mt-2 table-grid"
      >
        <thead>
          <tr>
            <th
              v-for="fields in headings"
              :class="'header head_' + filterSnakeCase(getFieldName(fields))"
            >
              {{ filterFieldsName(getFieldName(fields)) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in rows"
            :id="'row_' + row.id"
            :key="row.key"
            class="list-table-row"
          >
            <td v-for="fields in headings">
                <div
                  v-if="isActionFieldKey(getFieldName(fields, 'key'))"
                  class="actions"
                  v-html="sanitizeHTML(getActionValue(row))"
                ></div>
                <span
                  v-else
                  v-html="sanitizeHTML(getFieldValue(row, getFieldName(fields, 'key'), fields))"
                ></span>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <delete-popup
      ref="deleteBox"
      :data-show-footer="true"
      :data-show-modal="false"
      @on-close="deleteNow"
    >
      <template v-slot:title>Alert</template>
      <template v-slot:content>
        <span class="text-danger">{{ alertMessage.current }}</span>
      </template>

      <template v-slot:footer>
        <div class="row">
          <div class="col-auto">
            <div class="form-check pt-2">
              <input
                id="flexCheckDefault"
                v-model="preventDeleteBox"
                class="form-check-input"
                type="checkbox"
                value=""
              />
              <label class="form-check-label" for="flexCheckDefault">
                Don't ask again
              </label>
            </div>
          </div>
          <div class="col-auto">
            <button
              v-show="isDelete"
              class="btn btn-default"
              data-dismiss="modal"
              type="button"
              @click="deleteNow(0)"
            >
              No
            </button>
            <button
              v-show="isDelete"
              class="btn btn-primary"
              type="button"
              @click="deleteNow(1)"
            >
              Yes
            </button>
            <button
              v-show="!isDelete"
              class="btn btn-primary"
              type="button"
              @click="closeDialog()"
            >
              Okay
            </button>
          </div>
        </div>
      </template>
    </delete-popup>
    <info-popup ref="infoPopup"></info-popup>

    <div v-if="isZeroResult()" class="row">
      <div class="col">
        <div v-html="sanitizeHTML(noResultsFoundText)"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick, getCurrentInstance, watch } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import axios from "axios";
import { Toast, QueryBuilder, SafeJsonParse } from "../../../helpers/common";
import { Fx } from "../../../helpers/fx";
import { EventBus } from "../../../helpers/event-bus";
import DeletePopup from "./library/modal-box.vue";
import InfoPopup from "./info-popup.vue";

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

const instance = getCurrentInstance();
const deleteBox = ref(null);
const infoPopup = ref(null);
const root = ref(null);

// Helpers
const getDefaultValue = (key, dv) => {
  return window.Laravel?.htcmsAdminConfig(key) || dv;
};

// State
const actionFields = ref(SafeJsonParse(props.dataActionFields, []));
const userRights = ref(SafeJsonParse(props.dataUserRights, []));
const moreActions = ref(SafeJsonParse(props.dataMoreActionFields, []));
const actionAjax = ref(SafeJsonParse(props.dataActionAsAjax, getDefaultValue("action_as_ajax", [])));
const actionIconCss = ref(SafeJsonParse(props.dataActionCss, getDefaultValue("action_icon_css", {})));
const alertMessage = reactive({
  current: "Are you sure to delete this?",
  delete: "Are you sure to delete this?",
  permission: "Sorry! You don't have permission to delete this.",
});
const isDelete = ref(true);
const currentActionItem = ref(null);
const preventDeleteBox = ref(false);
const makeFieldAsLink = ref(SafeJsonParse(props.dataMakeFieldAsLink, []));
const fieldAsLinkCache = reactive({});
const showDeletePopup = ref(
  props.dataShowDeletePopup ? props.dataShowDeletePopup.toString().toUpperCase() : "FALSE"
);
const editHandledByOtherComponent = ref(
  props.dataEditHandledByOtherComponent === true ||
    props.dataEditHandledByOtherComponent?.toString() === "true"
);
const minResultsNeeded = ref(
  props.dataMinResultsNeeded === "" || props.dataMinResultsNeeded === undefined
    ? -1
    : parseInt(props.dataMinResultsNeeded)
);
const layoutType = ref(props.dataLayoutType || "table");
const noResultsFoundText = ref(props.dataNoResultsFoundText);
const spinnerCss = ["fa-spinner", "fa-pulse", "fa-fw"];

// Computed
const headings = computed(() => {
  const heading = SafeJsonParse(props.dataHeaders, []);
  const allHeadings = [];
  if (heading.length > 0) {
    heading.forEach((current) => {
      const label = current.label || current;
      const key = current.key || current;
      const isImage = !!(current.isImage && current.isImage.toString() === "true");
      const showAllScopes = !!(current.showAllScopes && current.showAllScopes.toString() === "true");
      allHeadings.push({ label, key, isImage, showAllScopes });
    });
  }
  return allHeadings;
});

const rows = ref(SafeJsonParse(props.dataList, []));
watch(() => props.dataList, (newVal) => {
  rows.value = SafeJsonParse(newVal, []);
});

// Methods
const sanitizeHTML = (html) => {
  if (!html || typeof html !== "string") return html;
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const dangerousTags = ["script", "iframe", "object", "embed", "base"];
    dangerousTags.forEach((tag) => {
      doc.querySelectorAll(tag).forEach((el) => el.remove());
    });
    const allElements = doc.querySelectorAll("*");
    allElements.forEach((el) => {
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

const isActionFieldKey = (key) => {
  const k = (key === undefined ? "" : key).toLowerCase();
  return k === "action" || k === "moreactions";
};

const isMakeFieldAsLink = (key) => {
  if (fieldAsLinkCache[key] !== undefined) {
    return fieldAsLinkCache[key];
  }
  const found = makeFieldAsLink.value.find((current) => current.key === key || current.action === key);
  fieldAsLinkCache[key] = found === undefined ? -1 : found;
  return fieldAsLinkCache[key];
};

const getFieldName = (key, prop = "label") => {
  return typeof key === "string" ? key : key[prop] === undefined ? key : key[prop];
};

const can = (rights) => userRights.value.indexOf(rights) >= 0;
const isAjax = (action) => actionAjax.value.indexOf(action) >= 0;

const getAjaxCss = (action) => {
  let css = "";
  const action_css = Object.prototype.toString.call(action) === "[object Object]" ? action.action : action;
  if (isAjax(action)) {
    css = "js_action js_ajax js_" + action_css;
  } else {
    css = "js_action js_" + action_css;
  }
  return css;
};

const getIconCSS = (key) => {
  const icons = getDefaultValue("action_icon_css", {});
  return icons[key] || "";
};

const removeAllSpinners = () => {
  const css = spinnerCss;
  const allSpinners = document.querySelectorAll(".fa-spinner");
  if (allSpinners.length > 0) {
    allSpinners.forEach((current) => {
      current.classList.remove(...css);
    });
  }
};

const showHideSpinner = (event, show = true) => {
  if (event) {
    let current = event instanceof HTMLAnchorElement ? event : event.currentTarget;
    removeAllSpinners();
    if (show === true) {
      if (current && current.firstElementChild) {
        current.firstElementChild.classList.add(...spinnerCss);
      }
    }
  } else {
    removeAllSpinners();
  }
};

const getFieldValue = (row, key, fields) => {
  if (key.includes(".")) {
    const extract = key.split(".");
    let scopeKey = extract[0];
    const fieldName = extract[1];
    let scope = row[scopeKey];

    switch (Object.prototype.toString.call(scope)) {
      case "[object Undefined]":
        scope = "";
        break;
      case "[object Array]":
        if (scope.length > 0) {
          if (fields.showAllScopes) {
            const values = scope.map((s) => s[fieldName]);
            scope = values.join(",");
          } else {
            scope = scope[0][fieldName];
          }
        } else {
          scope = "";
        }
        break;
      case "[object Object]":
        scope = scope[fieldName] || "";
        break;
    }
    return scope;
  }

  // Actual value logic
  let value = "";
  const actionAlias = isMakeFieldAsLink(key);
  if (actionAlias !== undefined && actionAlias !== -1) {
    const actionName = actionAlias.action || key;
    const title = actionName.charAt(0).toUpperCase() + actionName.slice(1);
    const path = AdminConfig.admin_path(`${props.dataControllerName}/${actionName}/${row.id}`);
    let iconOrValue = row[key];
    let isAjaxCss = "";
    let status = "";

    if (isAjax(key)) {
      isAjaxCss = getAjaxCss(key);
      isAjaxCss += ` ${key}_${row[key]}`;
      const icon_css = actionAlias[`css_${row[key]}`] || "";
      iconOrValue = `<i class="js_icon ${icon_css}"></i>`;
      if (!can(actionName)) {
        isAjaxCss += " disabled";
      }
      status = row[key];
    }
    value = `<a class="${isAjaxCss}" data-value="${status}" data-rowid="${row.id}" data-action="${actionName}" title="${title}" href="${path}">${iconOrValue}</a>`;
    if (key === "id" && actionFields.value.indexOf("edit") === -1) {
      value = iconOrValue;
    }
  } else {
    value = row[key];
    const media_path = AdminConfig.get("media_path");
    if (fields.isImage && value !== "" && value != null) {
      const imgs = ["apng", "avif", "gif", "jpg", "jpeg", "jfif", "pjpeg", "pjp", "png", "svg", "webp", "bmp", "ico", "cur", "tif", "tiff"];
      const vids = ["mp4", "mov", "ogg"];
      const ext = value.substring(value.lastIndexOf(".") + 1).toLowerCase();
      if (vids.indexOf(ext) >= 0) {
        value = `<a class="table-links" href="${media_path}/${value}" target="_blank"><video height="30"><source src="${media_path}/${value}"></video></a>`;
      } else if (imgs.indexOf(ext) >= 0) {
        value = `<a class="table-links" href="${media_path}/${value}" target="_blank"><img height="30" src='${media_path}/${value}' /></a>`;
      } else {
        value = `<a class="table-links" href="${media_path}/${value}" target="_blank">${value}</a>`;
      }
    }
  }
  return value;
};

const getActionValue = (row) => {
  const html = [];
  if (actionFields.value.length > 0) {
    actionFields.value.forEach((current) => {
      let path = "";
      if (current === "edit") {
        path = AdminConfig.admin_path(`${props.dataControllerName}/${current}/${row.id}`);
      } else if (current === "delete") {
        if (minResultsNeeded.value !== -1 && minResultsNeeded.value >= rows.value.length) {
          console.info(`Hiding delete button, because ${minResultsNeeded.value} record(s) needed.`);
        } else {
          path = AdminConfig.admin_path(`${props.dataControllerName}/destroy/${row.id}`);
        }
      } else {
        path = AdminConfig.admin_path(`${props.dataControllerName}/${current}/${row.id}`);
      }

      if (path !== "") {
        const isAjaxCss = getAjaxCss(current);
        const title = current.charAt(0).toUpperCase() + current.slice(1);
        const icon = `<i class="js_icon ${getIconCSS(current)}"></i>`;
        html.push(`<a class="${isAjaxCss}" data-rowid="${row.id}" data-action="${current}" title="${title}" href="${path}">${icon}</a>`);
      }
    });
  }

  if (moreActions.value.length > 0) {
    moreActions.value.forEach((current) => {
      const isAjaxCss = getAjaxCss(current);
      const css = current.css || "";
      let attributes = "";
      if (current.hrefAttributes) {
        for (const attr in current.hrefAttributes) {
          if (Object.prototype.hasOwnProperty.call(current.hrefAttributes, attr)) {
            attributes += `${attr}='${current.hrefAttributes[attr]}' `;
          }
        }
      }
      const action = current.action;
      const value = row[current.action_append_field] || "";
      const title = current.label.charAt(0).toUpperCase() + current.label.slice(1);
      const path = AdminConfig.admin_path(`${props.dataControllerName}/${action}/${value}`);
      const icon = `<i class="js_icon ${current.icon_css}"></i>`;
      html.push(`<a class="${isAjaxCss} ${css}" data-rowid="${row.id}" title="${title}" href="${path}" data-action="${action}" ${attributes}>${icon}</a>`);
    });
  }
  return html.join("&nbsp;");
};

const doAjax = (methodType = "get", url, success, fail) => {
  return axios[methodType](url)
    .then((res) => {
      if (success) success(res);
    })
    .catch((err) => {
      if (fail) {
        fail(err);
      } else {
        Toast.show(instance, err.message, 5000);
      }
      showHideSpinner(currentActionItem.value, false);
    });
};

const closeDialog = () => {
  if (deleteBox.value) deleteBox.value.close();
};

const openDeleteAlert = (current) => {
  if (deleteBox.value) deleteBox.value.open(current);
};

const deleteNow = (isOk = 1) => {
  let rowid = -1;
  try {
    if (isOk === 1) {
      const target = currentActionItem.value;
      if (can("delete")) {
        rowid = "row_" + target.getAttribute("data-rowid");
        const href = target.getAttribute("href");
        doAjax("delete", href, (res) => {
          if (res.status === 200) {
            const index = rows.value.findIndex((r) => r.id.toString() === res.data.id.toString());
            if (index >= 0) {
              Toast.show(instance, "Record has been deleted", 2000);
              rows.value.splice(index, 1);
              // Note: rows is a ref initialized from props.dataList.
              // If dataList is updated, TabularView re-renders via watch.
              EventBus.emit("pagination-on-delete");
              nextTick(() => bindAction());
            }
          } else {
            showHideSpinner(currentActionItem.value, false);
            Toast.show(instance, "Ooops! Got some error!");
          }
        });
      } else {
        Toast.show(instance, "Sorry! You don't have permission to delete.");
        setTimeout(() => showHideSpinner(currentActionItem.value, false), 1000);
      }
    } else {
      showHideSpinner(currentActionItem.value, false);
    }
  } catch (e) {
    showHideSpinner(currentActionItem.value, false);
    Toast.show(instance, "I don't understand what you are trying to do.", 5000);
  }
  closeDialog();
};

const showInfo = (type, id, excludeFields, editable) => {
  if (infoPopup.value) infoPopup.value.showInfo(type, id, excludeFields, editable);
};

const initAjaxAction = (event) => {
  event.preventDefault();
  event.stopPropagation();
  const current = event.currentTarget;
  const dataset = current.dataset;
  const action = dataset.action;
  const status = dataset.value;
  let href = current.getAttribute("href");
  if (status) href = `${href}/${status}`;

  currentActionItem.value = current;

  switch (action) {
    case "delete":
      alertMessage.current = alertMessage.delete;
      isDelete.value = true;
      if (preventDeleteBox.value === false) {
        openDeleteAlert(current);
      } else {
        deleteNow(1);
      }
      break;
    case "showinfo":
      showInfo(dataset.info, dataset.rowid, dataset.excludefields || [], dataset.editable);
      break;
    default:
      doAjax("get", href, (res) => {
        showHideSpinner(current, false);
        const actionFieldProp = isMakeFieldAsLink(action);
        const icon = current.querySelector(".js_icon");
        if (icon) {
          const oldIconCss = actionFieldProp[`css_${status}`];
          if (oldIconCss) icon.classList.remove(...oldIconCss.split(" "));
          const newStatus = res.data.status;
          current.setAttribute("data-value", newStatus);
          const newIconCss = actionFieldProp[`css_${newStatus}`];
          if (newIconCss) icon.classList.add(...newIconCss.split(" "));
        }
      }, (err) => {
        showHideSpinner(current, false);
        Toast.show(instance, err?.response?.data?.message || "Unknown Error!", 3000);
      });
      break;
  }
};

const bindAction = () => {
  if (!root.value) return;
  const allElement = root.value.getElementsByClassName("js_action");
  for (let i = 0; i < allElement.length; i++) {
    const current = allElement[i];
    if (current.classList.contains("js_ajax")) {
      current.addEventListener("click", initAjaxAction, false);
    }
    if (current.classList.contains("js_action")) {
      current.addEventListener("click", showHideSpinner, false);
    }
  }

  if (editHandledByOtherComponent.value === true) {
    const editElements = root.value.querySelectorAll("a[data-action='edit']");
    editElements.forEach((current) => {
      current.addEventListener("click", (event) => {
        event.preventDefault();
        EventBus.emit("list-view-pre-edit", current);
      });
    });
  }
};

const highlight = () => {
  const id = QueryBuilder.get("id");
  if (id !== "") {
    const rowId = `row_${id}`;
    Fx.scrollWinTo(`#${rowId}`, () => {
      Fx.highlight(rowId);
    });
  }
};

const isZeroResult = () => rows.value.length === 0;
const filterFieldsName = (value) => {
  const v = value.replace(/\.|_/g, " ");
  return v.charAt(0).toUpperCase() + v.slice(1);
};
const filterSnakeCase = (value) => value.replace(/\s|\./g, "_").toLowerCase();
const getCssForRow = (fields, index) => (headings.value.length - 1 === index ? "active" : "");

const initialSetup = () => {
  highlight();
  bindAction();
  if (showDeletePopup.value === "FALSE") {
    preventDeleteBox.value = true;
  }
};

// Lifecycle
onMounted(() => {
  initialSetup();
  EventBus.on("list-view-hide-spinner", () => showHideSpinner(undefined, false));
  EventBus.on("info-popup-open", () => removeAllSpinners());
});

onBeforeUnmount(() => {
  EventBus.off("list-view-hide-spinner");
  EventBus.off("info-popup-open");
});
</script>

