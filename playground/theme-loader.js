/**
 * Theme Configuration Loader
 * 
 * This utility automatically discovers and loads theme configurations
 * from the packages/themes directory.
 */

// Auto-discover all theme playground configs
const themeConfigModules = import.meta.glob('../packages/themes/*/playground.config.js', { eager: true });

/**
 * Get all available theme configurations
 * @returns {Array} Array of theme config objects
 */
export function getAllThemeConfigs() {
  const configs = [];
  
  for (const path in themeConfigModules) {
    const config = themeConfigModules[path].default;
    if (config && config.name) {
      configs.push(config);
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

console.log('🎨 Discovered themes:', getAllThemeConfigs().map(c => c.name).join(', '));
