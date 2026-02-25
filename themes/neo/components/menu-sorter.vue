<template>
  <div>
    <h4 v-if="showGroups">
      Arrange Menus
      <split-button
        :data-options="groups"
        @change="arrangeAgain"
        :data-selected="selectedIndex"
      >
      </split-button>
    </h4>
    <ul class="sortable-list js_sortable">
      <template v-for="(item, index) in allData">
        <li
          data-is-parent="true"
          v-if="isParent(item)"
          class="item"
          :data-id="getId(item)"
        >
          <span v-html="getName(item)"></span>
          <div v-if="hasChild(item)" class="inline">
            <label :for="'item_' + index" class="accordion-header pull-right">
              <span class="fa fa-ellipsis-v ellipsis"></span>
            </label>
            <input
              :id="'item_' + index"
              type="checkbox"
              class="accordion-control"
            />
            <ul class="child accordion-body js_sortable">
              <li
                data-is-parent="false"
                class="item"
                v-for="child in item.child"
                :data-id="getId(child)"
              >
                {{ getName(child) }}
              </li>
            </ul>
          </div>
        </li>
      </template>
    </ul>
    <div class="center-align mt-3" v-if="allData.length > 1">
      <input
        type="button"
        class="btn btn-success btn-from-submit"
        value="Save"
        @click="updateIndex()"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, getCurrentInstance } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import Sortable from "sortablejs";
import { Toast, Loader, SafeErrorData, SafeJsonParse } from "../../../helpers/common";
import SplitButton from "./library/split-button.vue";

const props = defineProps([
  "dataAllData",
  "dataFields",
  "dataControllerName",
  "dataControllerChildName",
  "dataGroups",
  "dataGroupName",
  "dataShowGroups",
]);

const instance = getCurrentInstance();

// State
const allData = ref(SafeJsonParse(props.dataAllData, []));
const groups = ref(SafeJsonParse(props.dataGroups, []));
const groupName = ref(props.dataGroupName && props.dataGroupName !== "" ? props.dataGroupName : "");
const showGroups = ref(!!(props.dataShowGroups && props.dataShowGroups === "true"));

// Computed
const fields = computed(() => {
  let fStr = SafeJsonParse(props.dataFields, null);
  if (fStr === null) {
    fStr = { id: "id", label: "name", isImage: false };
  }
  return fStr;
});

const controllerName = computed(() => {
  let cName = typeof props.dataControllerName === "undefined" ? "" : props.dataControllerName.toLowerCase();
  return cName.replace(/\s/g, "");
});

const controlerChildName = computed(() => {
  let cName = typeof props.dataControllerChildName === "undefined" ? "" : props.dataControllerChildName.toLowerCase();
  return cName.replace(/\s/g, "");
});

const selectedIndex = computed(() => {
  let index = 0;
  for (let i = 0; i < groups.value.length; i++) {
    if (groups.value[i] === groupName.value) {
      index = i;
      break;
    }
  }
  return index;
});

// Methods
const isParent = (data) => data.parent_id === 0 || !data.parent_id;

const arrangeAgain = (data) => {
  window.location.href = AdminConfig.admin_path(`${controllerName.value}/sort/${data.value}`);
};

const hasChild = (data) => data.child && data.child.length > 0;

const getName = (data) => {
  if (fields.value.isImage === true) {
    let path = data[fields.value.label]
      ? AdminConfig.get_media(data[fields.value.label])
      : AdminConfig.get_media(data.lang[fields.value.label]);
    return `<a href='${path}' target='_blank'><img height='30' src='${path}' /></a>`;
  } else {
    return data[fields.value.label] ? data[fields.value.label] : data.lang[fields.value.label];
  }
};

const getId = (data) => data[fields.value.id];

const onSuccess = (res, cName) => {
  Toast.show(instance.proxy, `${cName.toUpperCase()} Sorted.`);
};

const onFailure = (res) => {
  Toast.show(instance.proxy, res?.statusText || "There is some error! Don't know the reason", 5000);
  console.log(res);
};

const submit = (requestType, url, data, cName) => {
  Loader.show(instance.proxy, "Please wait. Saving sorting data...");
  return new Promise((resolve, reject) => {
    axios[requestType](url, data)
      .then((response) => {
        onSuccess(response, cName);
        resolve(response);
      })
      .catch((error) => {
        onFailure(SafeErrorData(error));
        reject(error);
      })
      .finally(() => {
        Loader.hide(instance.proxy);
      });
  });
};

const updateIndex = (isParentItem = false) => {
  const items = document.querySelectorAll(".item");
  const datas = [];
  let cName = controllerName.value;
  let saveAll = controlerChildName.value === "";

  cName = isParentItem === true ? controllerName.value : controlerChildName.value !== "" ? controlerChildName.value : controllerName.value;

  let counter = 1;
  items.forEach((current) => {
    if (saveAll === true) {
      const id = current.getAttribute("data-id");
      datas.push({ position: counter, where: { id: parseInt(id) } });
      counter++;
    } else {
      const isParentElement = current.getAttribute("data-is-parent");
      const id = current.getAttribute("data-id");
      if (isParentItem.toString() === isParentElement.toString()) {
        datas.push({ position: counter, where: { id: parseInt(id) } });
        counter++;
      }
    }
  });

  const updateIndexUrl = AdminConfig.admin_path(`${cName}/updateIndex`);
  submit("post", updateIndexUrl, datas, cName);
};

const enableSorting = () => {
  nextTick(() => {
    const list = document.querySelectorAll(".js_sortable");
    list.forEach((current) => {
      Sortable.create(current, {
        animation: 500,
        ghostClass: "text-danger",
        onUpdate: (evt) => {
          // logic if needed
        },
      });
    });
  });
};

const setData = (data) => {
  allData.value = data;
};

defineExpose({
  setData,
});

onMounted(() => {
  enableSorting();
});
</script>

