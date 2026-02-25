<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Super Admin Message -->
    <div v-if="superAdmin" class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-2xl shadow-sm">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
          <i class="fa fa-shield-alt text-blue-600 text-xl"></i>
        </div>
        <div class="flex-1">
          <h3 class="text-blue-800 font-bold text-lg mb-1">Administrative Privileges Active</h3>
          <p class="text-blue-700 leading-relaxed">
            <span class="font-black underline">{{ userModules.name }}</span> is registered as an Admin or Super Admin. All module accesses are granted automatically by the system. No manual configuration is required.
          </p>
          <div class="mt-6">
            <a :href="dataBackUrl" class="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:scale-95">
              Return to User List
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Permission Form -->
    <form
      v-if="!superAdmin"
      :action="permissionSaveUrl"
      class="bg-white shadow-lg shadow-gray-200/50 border border-gray-100 rounded-lg overflow-hidden"
      method="post"
      role="form"
      v-on:submit.prevent="saveData"
    >
      <div class="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
            <div class="relative flex items-center">
              <input
                v-model="selectAllModule"
                type="checkbox"
                id="selectAll"
                class="w-6 h-6 text-blue-600 bg-white border-gray-300 rounded-lg focus:ring-blue-500 focus:ring-offset-2 transition-all cursor-pointer shadow-sm"
                @change="selectAll()"
              />
            </div>
            <label for="selectAll" class="text-lg font-extrabold text-gray-800 cursor-pointer select-none">
              Assign Modules for <span class="text-blue-600">{{ userModules.name }} {{ userModules.last_name }}</span>
            </label>
        </div>
        <div class="text-[10px] uppercase font-black tracking-widest text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
           Role: {{ userModules.role_name || 'Standard User' }}
        </div>
      </div>

      <div class="p-4 sm:p-8">
        <ul class="space-y-4">
          <li v-for="module in form.cmsModuleData" :key="module.id" class="border border-gray-100 rounded-lg overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <!-- Parent Module -->
            <div 
              v-if="isParent(module)" 
              class="flex items-center justify-between bg-white p-4 sm:px-6 transition-colors border-b border-transparent group"
              :class="{'border-gray-50 bg-gray-50/30': hasChild(module)}"
            >
              <div class="flex items-center gap-4">
                <input
                  @change="selectMe(module)"
                  class="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 transition-all cursor-pointer shadow-sm"
                  type="checkbox"
                  v-model="module.selected"
                  :id="'check_' + module.id"
                />
                <label class="text-base font-bold text-gray-700 cursor-pointer select-none group-hover:text-blue-600 transition-colors" :for="'check_' + module.id">
                  {{ module.name }}
                </label>
              </div>
              <div class="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 group-hover:bg-white group-hover:border-orange-100 transition-all">
                <input
                  :id="'check_readonly_' + module.id"
                  v-model="module.readonly"
                  type="checkbox"
                  class="w-4 h-4 text-orange-500 bg-white border-gray-300 rounded focus:ring-orange-500 transition-all cursor-pointer"
                  @click="selectReadOnly(module, $event)"
                />
                <label :for="'check_readonly_' + module.id" class="text-[10px] font-black text-gray-400 group-hover:text-orange-500 cursor-pointer uppercase tracking-widest select-none">
                  Read Only
                </label>
              </div>
            </div>

            <!-- Child Modules -->
            <ul
              v-if="hasChild(module)"
              class="bg-white divide-y divide-gray-50"
            >
              <li v-for="child in module.child" :key="child.id" class="group">
                <div class="flex items-center justify-between p-4 sm:pl-14 sm:pr-6 hover:bg-blue-50/30 transition-all">
                  <div class="flex items-center gap-3">
                    <input
                      @change="selectMe(child, module)"
                      class="w-4 h-4 text-blue-500 bg-white border-gray-300 rounded-md focus:ring-blue-500 transition-all cursor-pointer shadow-sm"
                      type="checkbox"
                      v-model="child.selected"
                      :id="'check_' + child.id"
                    />
                    <label
                      class="text-sm font-semibold text-gray-600 cursor-pointer group-hover:text-gray-900 select-none"
                      :for="'check_' + child.id"
                    >
                      {{ child.name }}
                    </label>
                  </div>
                  <div class="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    <input
                      :id="'check_readonly_' + child.id"
                      v-model="child.readonly"
                      type="checkbox"
                      class="w-4 h-4 text-orange-400 bg-white border-gray-300 rounded-md focus:ring-orange-400 transition-all cursor-pointer"
                      @click="selectReadOnly(child, $event, true)"
                    />
                    <label :for="'check_readonly_' + child.id" class="text-[9px] font-black text-gray-400 group-hover:text-orange-500 cursor-pointer uppercase tracking-tighter select-none">
                      Read Only
                    </label>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <!-- Action Footer -->
      <div class="px-8 py-8 bg-gray-50/50 border-t border-gray-100 flex flex-col items-center gap-6">
        <div v-if="errorMessage !== ''" class="w-full max-w-md bg-red-50 text-red-700 px-4 py-3 rounded-xl border border-red-100 text-sm font-bold flex items-center gap-3 animate-shake">
           <i class="fa fa-exclamation-triangle text-lg"></i> {{ errorMessage }}
        </div>
        <div class="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <button
            class="w-full sm:w-auto px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-lg shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 active:scale-95 text-lg tracking-wide"
            name="submit"
            type="submit"
          >
            Update Permissions
          </button>
          <a :href="dataBackUrl" class="w-full sm:w-auto px-10 py-4 bg-white border border-gray-200 text-gray-500 font-bold rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-all text-center">
            Cancel
          </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, getCurrentInstance } from "vue";
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
const form = reactive(new Form({
  cmsModuleData: [],
  userId: 0,
}));
const selectAllModule = ref(false);
const superAdmin = ref(false);
const errorMessage = ref("");

// Computed
const allModules = computed(() => {
  const uMods = userModules.value.cmsmodules || [];
  const mods = SafeJsonParse(props.dataCmsModules, []);
  
  function findModule(currentModule) {
    if (uMods.length > 0) {
      const found = uMods.find((m) => m.module_id.toString() === currentModule.id.toString());
      return found === undefined ? false : found;
    }
    return false;
  }

  const filtered = [];
  if (mods.length > 0) {
    for (let i = 0; i < mods.length; i++) {
      const current = mods[i];
      const found = findModule(current);
      current.selected = !!found;
      current.readonly = found && found.readonly === 1;
      
      if (current.parent_id === 0 && current.child && current.child.length > 0) {
        for (let c = 0; c < current.child.length; c++) {
          const child = current.child[c];
          const foundChild = findModule(child);
          child.selected = !!foundChild;
          child.readonly = foundChild && foundChild.readonly === 1;
        }
      }
      if (current.parent_id === 0) {
        filtered.push(current);
      }
    }
  }
  return filtered;
});

const permissionSaveUrl = computed(() => {
  return AdminConfig.admin_path(props.dataControllerName + "/saveModulePermissions");
});

const csrfToken = computed(() => {
  return window.HashtagCms?.csrfToken || window.Laravel?.csrfToken;
});

// Methods
const hasChild = (data) => data.child && data.child.length > 0;
const isParent = (data) => data.parent_id === 0;

const selectMe = (current, parentModule, forcedSelectAll = null) => {
  let shouldSelect = current.selected;

  if (forcedSelectAll !== null) {
    shouldSelect = forcedSelectAll;
    current.selected = shouldSelect;
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

const handlePaste = (data) => {
  const pastedData = SafeJsonParse(data, {});
  
  function isCheckBoxSelected(id) {
    const ele = document.getElementById("check_" + id);
    const readonlyEle = document.getElementById("check_readonly_" + id);
    if (ele && ele.checked) {
      return { selected: true, readonly: readonlyEle ? readonlyEle.checked : false };
    }
    return { selected: false, readonly: false };
  }

  form.cmsModuleData.forEach((item) => {
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

const selectReadOnly = (current, event, isChild = false) => {
  const isChecked = event.target.checked;
  if (current.selected !== true) {
    current.selected = isChecked;
  }
};

const selectAll = () => {
  const shouldSelect = selectAllModule.value;
  form.cmsModuleData.forEach((current) => {
    current.selected = shouldSelect;
    selectMe(current, undefined, shouldSelect);
  });
};

const showSuperAdminLogic = () => {
  if (props.dataIsSuperAdmin.toString() === "1" || props.dataIsSuperAdmin.toString() === "true") {
    superAdmin.value = true;
  }
};

const afterFormSaved = (response) => {
  const isSuccess = response.isSaved === true || response.status === 200;
  const message = response.message || (isSuccess ? "Permissions updated successfully!" : "There was an error saving permissions.");
  const type = isSuccess ? "success" : "error";

  Toast.show(instance.proxy, message, 3000, type);
  
  if (!isSuccess) {
    errorMessage.value = message;
  } else {
    errorMessage.value = "";
  }
};

const saveData = () => {
  errorMessage.value = "";
  form
    .post(permissionSaveUrl.value, false)
    .then((response) => afterFormSaved(response))
    .catch((error) => {
      const response = error.response?.data || { isSaved: false, message: error.message };
      afterFormSaved(response);
    });
};

const goBack = () => {
  window.location = props.dataBackUrl;
};

// Lifecycle
onMounted(() => {
  form.cmsModuleData = allModules.value;
  form.userId = userModules.value.id;
  showSuperAdminLogic();
  EventBus.on("on-paste", handlePaste);
});

onBeforeUnmount(() => {
  EventBus.off("on-paste", handlePaste);
});
</script>
