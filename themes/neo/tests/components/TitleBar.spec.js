import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import TitleBar from '@hashtagcms/theme/neo/components/title-bar.vue';
import countryData from '../../../../tests/shared/fake-data/country-index.json';

// Mock dependencies
vi.mock('@hashtagcms/helpers/admin-config', () => ({
  default: {
    admin_path: vi.fn((path) => `/admin/${path}`)
  }
}));

describe('TitleBar.vue', () => {

  const props = {
    dataTitle: countryData.name,
    dataBackUrl: countryData.route
  };

  it('renders correctly with given props', () => {
    const wrapper = shallowMount(TitleBar, { 
        props,
        global: {
            stubs: {
                'left-menu-toggle': true,
                'copy-paste': true
            }
        }
    });

    expect(wrapper.find('.moduleTitle').text()).toBe('Country'); // data-title
    expect(wrapper.find('button[aria-label="Back"]').exists()).toBe(true);
  });

  it('handles back button click', async () => {
     // Mock window.location
     const originalLocation = window.location;
     delete window.location;
     window.location = { href: '' };

     const wrapper = shallowMount(TitleBar, { 
        props,
        global: { stubs: { 'left-menu-toggle': true, 'copy-paste': true } }
     });
     
     await wrapper.find('button[aria-label="Back"]').trigger('click');
     expect(window.location.href).toBe('/admin/country'); // from countryData.route
     
     window.location = originalLocation;
  });
});
