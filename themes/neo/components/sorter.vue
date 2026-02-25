<template>
  <div class="sortElem" @click="showHide($event)">
    <ul id="sortableField">
      <li
        v-for="current in allData"
        class="parent"
        v-if="current.module_pid == 0"
      >
        <h3>
          <a>
            <i
              v-if="hasChild(current)"
              class="js_more fa fa-ellipsis-v pull-right adjustMore"
            ></i>
            <span class="text">{{ current.name }}</span>
          </a>
        </h3>
        <ul v-if="hasChild(current)">
          <li v-for="child in current.child">
            <a>
              <span class="text">{{ child.name }}</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, getCurrentInstance } from "vue";
import AdminConfig from "../../../helpers/admin-config";
import Sortable from "sortablejs";
import { Toast, SafeErrorData, SafeJsonParse } from "../../../helpers/common";

const props = defineProps(["dataAllModules", "dataControllerName"]);

const instance = getCurrentInstance();

// State
const allData = ref(SafeJsonParse(props.dataAllModules, []));
const sortable = ref(null);
const sortingInterval = ref(-1);
const lastTarget = ref("");

// Computed
const controllerName = computed(() => {
  const cName = typeof props.dataControllerName === "undefined" ? "" : props.dataControllerName.toLocaleLowerCase();
  return cName.replace(/\s/g, "");
});

const updateIndexUrl = computed(() => AdminConfig.admin_path(`${controllerName.value}/updateIndex`));

// Methods
const hasChild = (data) => data.child && data.child.length > 0;

const hideAll = () => {
  document.querySelectorAll(".sortElem .parent").forEach((i) => {
    i.classList.remove("active");
  });
};

const showHide = (event) => {
  const ele = event.target;
  const parentParentParent = ele.parentElement?.parentElement?.parentElement;
  if (parentParentParent !== lastTarget.value) {
    hideAll();
    if (ele.classList.contains("js_more")) {
      event.preventDefault();
      if (parentParentParent) {
        parentParentParent.classList.add("active", "animated", "fadeIn");
      }
    }
    lastTarget.value = parentParentParent;
  } else {
    if (parentParentParent) {
      if (parentParentParent.classList.contains("active")) {
        parentParentParent.classList.remove("active");
      } else {
        parentParentParent.classList.add("active");
      }
    }
  }
};

const isActive = (c_name, data) => {
  if (controllerName.value === c_name) {
    return true;
  }
  if (data && data.child && data.child.length > 0) {
    const currentControllerName = controllerName.value;
    return data.child.find((c) => c.controller_name === currentControllerName);
  }
  return false;
};

const cancelSortingCallback = () => {
  if (sortingInterval.value !== -1) {
    clearInterval(sortingInterval.value);
  }
};

const onSuccess = (res) => {
  Toast.show(instance, "Modules Sorted.");
};

const onFailure = (res) => {
  console.log(res);
};

const submit = (requestType, url, data) => {
  return new Promise((resolve, reject) => {
    axios[requestType](url, data)
      .then((response) => {
        onSuccess(response);
        resolve(response);
      })
      .catch((error) => {
        onFailure(SafeErrorData(error));
        reject(error);
      });
  });
};

const updateIndex = (data) => {
  submit("post", updateIndexUrl.value, data);
};

const sortingCallback = (evt) => {
  const data = [];
  document.querySelectorAll(".sortElem .parent").forEach((i, index) => {
    const text = i.children[0].children[0].innerText;
    for (let a = 0; a < allData.value.length; a++) {
      if (allData.value[a].module_pid === 0 && allData.value[a].name === text) {
        data[a] = {
          id: allData.value[a].id,
          position: index,
          name: allData.value[a].name,
        };
      }
    }
  });
  updateIndex(data);
  cancelSortingCallback();
};

const enableSorting = () => {
  nextTick(() => {
    if (sortable.value != null) {
      sortable.value.destroy();
    }
    const el = document.getElementById("sortableField");
    if (el) {
      sortable.value = Sortable.create(el, {
        onEnd: sortingCallback,
        onStart: cancelSortingCallback,
      });
    }
  });
};

onMounted(() => {
  enableSorting();
});
</script>


<style>
.sortElem {
  margin-top: 15px;
}

.sortElem .parent {
  list-style: none;
  border: 1px solid #cacaca;
  background: #fff;
}

.sortElem .parent h3 {
  font-size: 16px;
  margin: 0;
}

.sortElem ul {
  padding: 0;
}

.sortElem .parent a {
  padding: 10px;
  color: #666;
  display: block;
}

.sortElem .parent ul {
  display: none;
}

.sortElem .parent.active ul {
  display: block;
  background: #ffff;
  border-top: 1px solid #cacaca;
}

.sortElem .parent.active ul li {
  list-style: none;
  margin-left: 15px;
  line-height: normal;
}

.sortElem .parent.active ul li a span {
  color: #000;
  font-weight: bold;
}

.sortElem .parent.sortable-chosen {
  background: #f4f4f4;
}
</style>
