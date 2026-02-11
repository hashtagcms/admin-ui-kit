/**
 * Neo Theme Playground Configuration
 * 
 * This file defines how the Neo theme should be rendered in the playground.
 * The Neo theme uses Bootstrap 5 for styling.
 */

export default {
  name: 'neo',
  displayName: 'Neo (Bootstrap 5)',
  framework: 'bootstrap',
  version: '1.0.0',
  
  // Theme-specific class mappings
  classes: {
    // Main Layout
    container: 'container py-5',
    componentsRow: 'row g-5',
    
    // Grid System
    col12: 'col-12 mb-4',
    col6: 'col-md-6',
    col3: 'col-md-3',
    col9: 'col-md-9',
    
    // Info Cards (Welcome Section)
    infoCards: {
      wrapper: 'row mb-5',
      colWrapper: 'col-md-6',
      card: 'card shadow-sm h-100',
      cardBody: 'card-body',
      cardBlue: 'card bg-primary text-white shadow-sm h-100',
      cardBlueBody: 'card-body d-flex flex-column justify-content-center',
      title: 'h3 fw-bold mb-3',
      titleBlue: 'h4 fw-bold mb-2 text-uppercase',
      text: 'text-muted mb-4',
      textBlue: 'mb-4 opacity-75',
      badgeWrapper: 'd-flex flex-wrap gap-2',
      badge: 'badge bg-light text-muted border',
      iconWrapper: 'd-flex align-items-center gap-3 mt-3',
      iconGroup: 'd-flex',
      icon: 'rounded-circle border border-2 border-white bg-white bg-opacity-25 d-flex align-items-center justify-content-center me-2',
      iconText: 'small fw-bold text-uppercase opacity-75',
    },
    
    // Section Headers
    sectionHeader: {
      wrapper: 'd-flex align-items-center gap-3 mb-3',
      number: 'display-6 fw-black text-muted',
      title: 'h5 text-uppercase fw-bold text-secondary mb-0',
    },
    
    // Component Wrappers (for components that need grid containers)
    componentWrapper: {
      infoBoxes: 'row',  // Bootstrap needs row wrapper for grid
      sitewise: 'row',   // Bootstrap needs row wrapper
      leftNav: 'row',
      leftNavSidebar: 'col-md-3',
      leftNavSidebarInner: 'border rounded overflow-hidden shadow-sm',
      leftNavContent: 'col-md-9',
    },
    
    // Card Components
    card: {
      wrapper: 'card shadow-sm',
      footer: 'card-footer d-flex justify-content-center',
    },
  },
  
  // Special rendering flags
  features: {
    showBackgroundIcon: false,  // Don't show decorative background icon
    useCustomLeftNavLayout: true,  // Use custom left nav layout
  }
}
