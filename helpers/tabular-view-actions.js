import axios from "axios";
import { Toast } from "./common";
import AdminConfig from "./admin-config";
import { EventBus } from "./event-bus";

/**
 * Helper class to handle actions in TabularView.
 * Decouples action logic from the Vue component.
 */
export default class TabularViewActions {
    /**
     * Returns a list of supported actions.
     * @returns {string[]}
     */
    static getActions() {
        return ["read", "edit", "delete", "approve", "publish", "showinfo"];
    }

    /**
     * Executes a specific action.
     * @param {string} action - Action name.
     * @param {object} row - Row data.
     * @param {object} context - Execution context (proxy, axios, rows, etc.).
     */
    static execute(action, row, context) {
        const actionMethod = this[action] || this.generic;
        if (typeof actionMethod === "function") {
            return actionMethod.call(this, row, context);
        }
        console.warn(`Action ${action} not implemented and no generic handler found.`);
        return false;
    }

    /**
     * Specialized handler for delete.
     */
    static delete(row, context) {
        const { target, proxy, rows, bindAction, can, showAlert, showHideSpinner } = context;

        if (!can("delete")) {
            Toast.show(proxy, "Sorry! You don't have permission to delete.", 3000, "error");
            setTimeout(() => showHideSpinner(target, false), 1000);
            return;
        }

        const href = target.getAttribute("href");
        
        axios.delete(href).then(res => {
            if (res.status === 200) {
                const index = rows.value.findIndex(c => c.id.toString() === res.data.id.toString());
                if (index >= 0) {
                    Toast.show(proxy, "Record has been deleted", 2000);
                    rows.value.splice(index, 1);
                } else {
                    Toast.show(proxy, "Record deleted but list state mismatch.", 2000, "warning");
                }
                setTimeout(bindAction, 100);
                EventBus.emit("pagination-on-delete");
            } else {
                showHideSpinner(target, false);
                Toast.show(proxy, "Ooops! Got some error!", 5000, "error");
            }
        }).catch(err => {
            showHideSpinner(target, false);
            Toast.show(proxy, err.message || "Delete failed", 5000, "error");
        });
    }

    /**
     * Specialized handler for edit.
     */
    static edit(row, context) {
        const { editHandledByOtherComponent, target } = context;
        if (editHandledByOtherComponent) {
            EventBus.emit("list-view-pre-edit", target);
        } else {
            const href = target.getAttribute("href");
            if (href) window.location.href = href;
        }
    }

    /**
     * Specialized handler for showing info.
     */
    static showinfo(row, context) {
        const { target, infoPopup } = context;
        const { info, editable, excludefields = [] } = target.dataset;
        const rowid = target.dataset.rowid;
        if (infoPopup) {
            infoPopup.showInfo(info, rowid, excludefields, editable);
        }
    }

    /**
     * Generic handler for AJAX actions (status toggles, etc.).
     */
    static generic(row, context) {
        const { target, proxy, showHideSpinner, isMakeFieldAsLink } = context;
        const { action, value: status } = target.dataset;
        let href = target.getAttribute("href");
        if (status) href += `/${status}`;

        axios.get(href).then(res => {
            showHideSpinner(target, false);
            const actionProp = isMakeFieldAsLink(action);
            const icon = target.querySelector(".js_icon");

            if (icon && actionProp) {
                const oldCss = actionProp["css_" + status];
                if (oldCss) icon.classList.remove(...oldCss.split(" "));

                const newStatus = res.data.status;
                target.setAttribute("data-value", newStatus);
                const newCss = actionProp["css_" + newStatus];
                if (newCss) icon.classList.add(...newCss.split(" "));
            }
        }).catch(err => {
            showHideSpinner(target, false);
            Toast.show(proxy, err?.response?.data?.message || "Action failed", 5000, "error");
        });
    }

    /**
     * Placeholder methods for future expansion.
     */
    static approve(row, context) {
        return this.generic(row, context);
    }

    static publish(row, context) {
        return this.generic(row, context);
    }
}