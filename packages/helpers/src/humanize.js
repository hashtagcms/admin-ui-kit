/**
 * Humanize a string
 * Replaces underscores and dashes with spaces and capitalizes the first letter
 * Fallback implementation since generic SDK might miss it
 */
export default function Humanize(str) {
  if (typeof str !== 'string') return '';
  
  return str
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
}
