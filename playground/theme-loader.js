/**
 * Theme Configuration Loader
 * 
 * This utility automatically discovers and loads theme configurations
 * from the packages/themes directory.
 */

// Auto-discover all theme playgrounds
const themePlaygroundModules = import.meta.glob('../themes/*/playground/App.vue');

/**
 * Get all available theme configurations
 * @returns {Array} Array of theme config objects
 */
export function getAllThemeConfigs() {
  const configs = [];
  
  for (const path in themePlaygroundModules) {
    // Extract theme name from path "../themes/modern/playground/App.vue"
    const match = path.match(/\.\.\/themes\/(.*)\/playground\/App\.vue/);
    if (match) {
      const name = match[1];
      configs.push({
        name: name,
        displayName: name.charAt(0).toUpperCase() + name.slice(1)
      });
    }
  }
  
  return configs.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get a specific theme configuration by name
 * @param {string} themeName - The name of the theme (e.g., 'modern', 'neo')
 * @returns {Object|null} Theme configuration object or null if not found
 */
export function getThemeConfig(themeName) {
  const configs = getAllThemeConfigs();
  return configs.find(config => config.name === themeName) || null;
}

/**
 * Get theme names for dropdown/selector
 * @returns {Array} Array of {value, label} objects
 */
export function getThemeOptions() {
  return getAllThemeConfigs().map(config => ({
    value: config.name,
    label: config.displayName || config.name
  }));
}

/**
 * Validate if a theme exists
 * @param {string} themeName - The name of the theme
 * @returns {boolean} True if theme exists
 */
export function themeExists(themeName) {
  return getAllThemeConfigs().some(config => config.name === themeName);
}

/**
 * Get default theme name
 * @returns {string} Name of the default theme
 */
export function getDefaultTheme() {
  const configs = getAllThemeConfigs();
  return configs.length > 0 ? configs[0].name : 'modern';
}

/**
 * Get the playground component for a theme
 * @param {string} themeName 
 * @returns {Function|null} Dynamic import function or null
 */
export function getThemePlayground(themeName) {
  const path = `../themes/${themeName}/playground/App.vue`;
  return themePlaygroundModules[path] || null;
}

console.log('🎨 Discovered themes:', getAllThemeConfigs().map(c => c.name).join(', '));
