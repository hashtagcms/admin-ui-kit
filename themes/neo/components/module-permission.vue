<template>
  <div>
    <div v-if="superAdmin" class="alert alert-info">
      <strong>{{ userModules.name }}</strong> is admin or super admin. No need
      to provide module access.
    </div>
    <div v-if="superAdmin" class="row">
      <div class="form-group center-align">
        <a :href="dataBackUrl" class="btn btn-outline-primary">Okay :)</a>
      </div>
    </div>
    <form
      v-if="!superAdmin"
      :action="permissionSaveUrl"
      class="form-horizontal"
      method="post"
      role="form"
      v-on:submit.prevent="saveData"
    >
      <div class="checkbox title">
        <h4>
          <label>
            <input
              v-model="selectAllModule"
              type="checkbox"
              @click="selectAll()"
            />
            Select
          </label>
          modules for
          <span class="text-info"
            >{{ userModules.name }} {{ userModules.last_name }}</span
          >
        </h4>
      </div>
      <ul class="list-unstyled list-permission">
        <li class="clearfix" v-for="module in form.cmsModuleData">
          <div v-if="isParent(module)" class="row p-2">
            <div class="col">
              <input
                @click="selectMe(module)"
                class="form-check-input"
                type="checkbox"
                v-model="module.selected"
                :id="'check_' + module.id"
                :data-id="module.id"
                data-is-parent="true"
              />
              <label class="form-check-label" :for="'check_' + module.id"
                >&nbsp;{{ module.name }}</label
              >
            </div>
            <div class="col-auto">
              <label>
                <input
                  :id="'check_readonly_' + module.id"
                  v-model="module.readonly"
                  type="checkbox"
                  @click="selectReadOnly(module, $event)"
                  data-is-readonly-checkbox="true"
                />
                Read Only</label
              >
            </div>
          </div>
          <ul
            v-if="hasChild(module)"
            class="list-unstyled clearfix"
            style="margin-left: 20px"
          >
            <li v-for="child in module.child" class="clearfix">
              <div class="row p-2">
                <div class="col">
                  <input
                    @click="selectMe(child, module)"
                    class="form-check-input"
                    type="checkbox"
                    v-model="child.selected"
                    :id="'check_' + child.id"
                    :data-id="child.id"
                    data-is-parent="false"
                  />
                  <label
                    class="form-check-label"
                    :for="'check_' + child.id"
                    data-is-readonly="true"
                    >&nbsp;{{ child.name }}</label
                  >
                </div>
                <div class="col-auto">
                  <label>
                    <input
                      :id="'check_readonly_' + child.id"
                      v-model="child.readonly"
                      type="checkbox"
                      @click="selectReadOnly(child, $event, true)"
                      data-is-readonly-checkbox="true"
                    />
                    Read Only</label
                  >
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>

      <div class="row">
        <div v-if="errorMessage !== ''" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        <div class="form-group center-align">
          <input
            class="btn btn-success btn-from-submit"
            name="submit"
            type="submit"
            value="Save"
          />
          <a :href="dataBackUrl" class="btn btn-outline-secondary">Back</a>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, getCurrentInstance } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import Form from "../../../helpers/form";
import { Toast, SafeJsonParse } from "../../../helpers/common";
import { EventBus } from "../../../helpers/event-bus";

const props = defineProps([
  "dataCmsModules",
  "dataUserModules",
  "dataControllerName",
  "dataBackUrl",
  "dataIsSuperAdmin",
]);

const instance = getCurrentInstance();

// State
const userModules = ref(SafeJsonParse(props.dataUserModules, []));
const form = ref(
  new Form({
    cmsModuleData: [],
    userId: 0,
  })
);
const selectAllModule = ref(false);
const superAdmin = ref(false);
const errorMessage = ref("");

// Computed
const allModules = computed(() => {
  const uModules = userModules.value.cmsmodules || [];
  const modules = SafeJsonParse(props.dataCmsModules, []);
  const filterModules = [];

  const findModule = (currentModule) => {
    if (uModules.length > 0) {
      const found = uModules.find(
        (current) => current.module_id.toString() === currentModule.id.toString()
      );
      return found === undefined ? false : found;
    }
    return false;
  };

  if (modules.length > 0) {
    for (let i = 0; i < modules.length; i++) {
      const current = modules[i];
      const found = findModule(current);
      current.selected = !!found;
      current.readonly = found ? found.readonly === 1 : false;

      if (current.parent_id === 0 && current.child && current.child.length > 0) {
        for (let c = 0; c < current.child.length; c++) {
          const child = current.child[c];
          const foundChild = findModule(child);
          child.selected = !!foundChild;
          child.readonly = foundChild ? foundChild.readonly === 1 : false;
        }
      }
      if (current.parent_id === 0) {
        filterModules.push(current);
      }
    }
  }
  return filterModules;
});

const permissionSaveUrl = computed(() => {
  return AdminConfig.admin_path(`${props.dataControllerName}/saveModulePermissions`);
});

const csrfToken = computed(() => window.HashtagCms?.csrfToken || window.Laravel?.csrfToken);

// Methods
const handlePaste = (data) => {
  const pastedData = SafeJsonParse(data, {});
  const isCheckBoxSelected = (id) => {
    const ele = document.getElementById(`check_${id}`);
    const readonlyEle = document.getElementById(`check_readonly_${id}`);
    if (ele && ele.checked) {
      return { selected: true, readonly: readonlyEle ? readonlyEle.checked : false };
    }
    return { selected: false, readonly: false };
  };

  form.value.cmsModuleData.forEach((item) => {
    const status = isCheckBoxSelected(item.id);
    if (status.selected) {
      item.selected = true;
      item.readonly = status.readonly;
    }
    if (item.child && item.child.length > 0) {
      item.child.forEach((childItem) => {
        const statusChild = isCheckBoxSelected(childItem.id);
        if (statusChild.selected) {
          childItem.selected = true;
          childItem.readonly = statusChild.readonly;
        }
      });
    }
  });
};

const hasChild = (data) => data.child && data.child.length > 0;
const isParent = (data) => data.parent_id === 0;

const selectReadOnly = (current, event, isChild = false) => {
  const isChecked = event.target.checked;
  if (current.selected !== true) {
    current.selected = isChecked;
  }
};

const selectMe = (current, parentModule, forcedSelectAll = null) => {
  let shouldSelect = !current.selected;
  if (forcedSelectAll !== null) {
    shouldSelect = forcedSelectAll;
  }

  if (current.child && current.child.length > 0) {
    current.child.forEach((c) => {
      c.selected = shouldSelect;
      if (!shouldSelect) {
        c.readonly = false;
      }
    });
  }

  if (shouldSelect !== true) {
    current.readonly = false;
  }

  if (parentModule) {
    const isAnySelected = parentModule.child.find((c) => c.selected === true);
    if (shouldSelect || isAnySelected) {
      parentModule.selected = true;
    }
  }

  if (shouldSelect === false) {
    selectAllModule.value = false;
  }
};

const selectAll = () => {
  const shouldSelect = selectAllModule.value === false;
  form.value.cmsModuleData.forEach((current) => {
    current.selected = shouldSelect;
    selectMe(current, undefined, shouldSelect);
  });
};

const showSuperAdmin = () => {
  if (props.dataIsSuperAdmin.toString() === "1" || props.dataIsSuperAdmin.toString() === "true") {
    superAdmin.value = true;
  }
};

const afterFormSaved = (response) => {
  if (response.isSaved === true) {
    Toast.show(instance, "Saved Successfully.");
  } else {
    Toast.show(instance, "There is some error.");
  }
};

const saveData = () => {
  form.value
    .post(permissionSaveUrl.value, false)
    .then((response) => afterFormSaved(response))
    .catch((error) => afterFormSaved(error));
};

const goBack = () => {
  window.location = props.dataBackUrl;
};

// Lifecycle
onMounted(() => {
  form.value.cmsModuleData = allModules.value;
  form.value.userId = userModules.value.id;
  showSuperAdmin();
  EventBus.on("on-paste", handlePaste);
});

onBeforeUnmount(() => {
  EventBus.off("on-paste", handlePaste);
});
</script>

