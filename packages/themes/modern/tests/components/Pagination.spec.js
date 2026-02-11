import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '@hashtagcms/theme/modern/components/pagination.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

describe('Modern: Pagination.vue', () => {

  const dataProps = loadFakeData('pagination-view.txt');
  const props = {};
  for (const key in dataProps) {
      if (typeof dataProps[key] === 'object' && dataProps[key] !== null) {
          props[key] = JSON.stringify(dataProps[key]);
      } else {
          props[key] = String(dataProps[key]);
      }
  }

  it('renders correctly with modern counters and results', () => {
    const wrapper = shallowMount(Pagination, { props });

    // "Showing 1 to 20 of 244 Results"
    expect(wrapper.find('.counters').text()).toContain('Showing 1 to 20 of 244 Results');
    
    // Modern wrapper classes
    expect(wrapper.find('div.bg-white').classes()).toContain('shadow-sm');
    expect(wrapper.find('div.bg-white').classes()).toContain('border-gray-100');
  });

  it('renders active page with standout modern styling', () => {
    const wrapper = shallowMount(Pagination, { props });
    // Active page is 1 in fake data
    const activeLink = wrapper.find('a.bg-blue-600');
    expect(activeLink.exists()).toBe(true);
    expect(activeLink.classes()).toContain('shadow-blue-500/20');
    expect(activeLink.classes()).toContain('scale-105');
  });
});
