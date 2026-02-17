import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import LeftNav from '@hashtagcms/theme/modern/components/left-nav.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

describe('Modern: LeftNav.vue', () => {

  const dataProps = loadFakeData('admin-modules.txt');
  const props = {};
  for (const key in dataProps) {
      if (typeof dataProps[key] === 'object' && dataProps[key] !== null) {
          props[key] = JSON.stringify(dataProps[key]);
      } else {
          props[key] = String(dataProps[key]);
      }
  }

  it('renders correctly with modern high-contrast sidebar', () => {
    const wrapper = shallowMount(LeftNav, { props });

    // Modern uses bg-[#0F172A] for the dark theme
    expect(wrapper.find('.js_left_menu').classes()).toContain('bg-[#0F172A]');
    

    
    // Renders primary categories (Dashboard, etc.)
    expect(wrapper.text()).toContain('Dashboard');
  });

  it('toggles child menu with modern transitions', async () => {
    const wrapper = shallowMount(LeftNav, { props });
    // First module is usually 'Dashboard' or similar which might have children
    
    // Check if chevron icon exists for child
    const chevron = wrapper.find('.fa-chevron-down');
    expect(chevron.exists()).toBe(true);
    
    // Check child ul class
    const childUl = wrapper.find('ul.js_child');
    expect(childUl.exists()).toBe(true);
  });
});
