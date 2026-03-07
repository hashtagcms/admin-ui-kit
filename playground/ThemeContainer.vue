<template>
  <div class="theme-container">
    <component :is="themeComponent" v-if="themeComponent" />
    <div v-else-if="error" class="error-state">
       <h2>Error Loading Theme: {{ themeName }}</h2>
       <p>{{ error }}</p>
    </div>
    <div v-else class="loading-state">
       <div class="spinner"></div>
       <p>Loading {{ themeName }} playground...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, shallowRef, onMounted } from 'vue';
import { themeExists, getThemePlayground } from './theme-loader';

const props = defineProps({
  themeName: {
    type: String,
    required: true
  }
});

const themeComponent = shallowRef(null);
const error = ref(null);

const loadTheme = async (name) => {
  themeComponent.value = null;
  error.value = null;
  
  if (!themeExists(name)) {
    error.value = `Theme "${name}" not found in discovered themes.`;
    return;
  }

  try {
    const loader = getThemePlayground(name);
    if (!loader) {
      throw new Error(`No playground entry found for theme: ${name}`);
    }
    const module = await loader();
    themeComponent.value = module.default;
  } catch (err) {
    console.error(`Failed to load playground for theme: ${name}`, err);
    error.value = `Could not load playground for "${name}". Ensure themes/${name}/playground/App.vue exists.`;
  }
};

onMounted(() => loadTheme(props.themeName));
watch(() => props.themeName, (newName) => loadTheme(newName));
</script>

<style scoped>
.loading-state, .error-state {
  display: flex;
  flex-direction: column;
  items-center: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  font-family: inherit;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-state h2 { color: #e11d48; }
</style>
