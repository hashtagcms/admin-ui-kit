import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import TitleBar from '@hashtagcms/components/title-bar.vue';
import { loadFakeData } from '../test-utils';

// Mock dependencies
vi.mock('@hashtagcms/helpers/admin-config', () => ({
  default: {
    admin_path: vi.fn((path) => `/admin/${path}`)
  }
}));

describe('TitleBar.vue', () => {

  const dataProps = loadFakeData('title-bar.txt');
  const props = {};
  for (const key in dataProps) {
      if (typeof dataProps[key] === 'object' && dataProps[key] !== null) {
          props[key] = JSON.stringify(dataProps[key]);
      } else {
          props[key] = String(dataProps[key]);
      }
  }

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
     expect(window.location.href).toBe('http://localhost:8000/admin/country?id=244'); // from fake data
     
     window.location = originalLocation;
  });
});
