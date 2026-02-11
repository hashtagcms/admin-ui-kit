/**
 * Modern Theme Playground Configuration
 * 
 * This file defines how the Modern theme should be rendered in the playground.
 * The Modern theme uses Tailwind CSS v4 for styling.
 */

export default {
  name: 'modern',
  displayName: 'Modern (Tailwind v4)',
  framework: 'tailwind',
  version: '1.0.0',
  
  // Theme-specific class mappings
  classes: {
    // Main Layout
    container: 'p-8 max-w-[1600px] mx-auto shadow-sm',
    componentsRow: 'space-y-24',
    
    // Grid System
    col12: 'scroll-mt-24',
    col6: '',
    col3: 'col-md-3',
    col9: 'col-md-9',
    
    // Info Cards (Welcome Section)
    infoCards: {
      wrapper: 'mb-12 grid grid-cols-1 md:grid-cols-2 gap-8',
      colWrapper: '',
      card: 'p-8 rounded-2xl bg-white border border-gray-100 shadow-xl shadow-blue-500/5 relative overflow-hidden group',
      cardBody: '',
      cardBlue: 'p-8 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 flex flex-col justify-center',
      cardBlueBody: '',
      title: 'text-3xl font-black text-gray-900 mb-4 tracking-tight',
      titleBlue: 'text-xl font-black mb-2 uppercase tracking-wide',
      text: 'text-gray-500 font-medium leading-relaxed mb-6',
      textBlue: 'text-blue-100 font-medium text-sm',
      badgeWrapper: 'flex flex-wrap gap-2',
      badge: 'px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-gray-100 italic',
      iconWrapper: 'mt-6 flex items-center gap-4',
      iconGroup: 'flex -space-x-2',
      icon: 'w-8 h-8 rounded-full border-2 border-blue-600 flex items-center justify-center text-[10px] font-bold',
      iconText: 'text-xs font-bold text-blue-200 uppercase tracking-widest',
    },
    
    // Section Headers
    sectionHeader: {
      wrapper: 'flex items-center gap-3 mb-6',
      number: 'text-3xl font-black text-gray-200',
      title: 'text-lg font-black uppercase tracking-widest text-gray-400',
    },
    
    // Component Wrappers (for components that need grid containers)
    componentWrapper: {
      infoBoxes: '',  // Modern doesn't need wrapper - component handles its own grid
      sitewise: '',   // Modern doesn't need wrapper
      leftNav: 'grid grid-cols-1 lg:grid-cols-4 gap-8',
      leftNavSidebar: 'lg:col-span-1 h-[600px] border border-gray-100 rounded-2xl overflow-hidden shadow-2xl',
      leftNavSidebarInner: '',
      leftNavContent: 'lg:col-span-3 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center p-12',
    },
    
    // Card Components
    card: {
      wrapper: 'bg-white p-1 rounded-2xl border border-gray-100 shadow-2xl shadow-gray-200/50',
      footer: 'p-6 border-t border-gray-50 flex justify-center',
    },
  },
  
  // Special rendering flags
  features: {
    showBackgroundIcon: true,  // Show decorative background icon in info card
    useCustomLeftNavLayout: true,  // Use custom left nav layout
  }
}
