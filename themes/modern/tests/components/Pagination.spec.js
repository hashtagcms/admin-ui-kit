import { shallowMount, mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '@hashtagcms/theme/modern/components/pagination.vue';
import countryData from '../../../../tests/shared/fake-data/country-index.json';

describe('Modern: Pagination.vue', () => {
    
  const props = {
    dataPaginator: JSON.stringify(countryData.paginator),
    dataTotal: String(countryData.paginator.total),
    dataFirstItem: String(countryData.paginator.from),
    dataLastItem: String(countryData.paginator.to),
    dataControllerName: countryData.controller
  };

  it('renders correctly with modern counters and results', () => {
    const wrapper = shallowMount(Pagination, { props });

    // "Showing 1 to 20 of 244 Results"
    expect(wrapper.find('.counters').text()).toContain('Showing 1 to 20 of 244 Results');
    
    // Modern wrapper classes
    expect(wrapper.find('div.bg-white').classes()).toContain('shadow-sm');
    expect(wrapper.find('div.bg-white').classes()).toContain('border-gray-100');
  });

  it('renders active page with standout modern styling', () => {
    const wrapper = mount(Pagination, { props });
    // Active page is 1 in fake data
    const activeLink = wrapper.find('button.bg-blue-600');
    expect(activeLink.exists()).toBe(true);
    expect(activeLink.classes()).toContain('shadow-blue-500/30');
    // Scale is active:scale-95, so not present by default. But we can check for other classes.
    expect(activeLink.classes()).toContain('border-blue-600');
  });
});
