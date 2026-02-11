import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import TitleBar from '@hashtagcms/theme/modern/components/title-bar.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

describe('Modern: TitleBar.vue', () => {

  const dataProps = loadFakeData('title-bar.txt');
  const props = {};
  for (const key in dataProps) {
      if (typeof dataProps[key] === 'object' && dataProps[key] !== null) {
          props[key] = JSON.stringify(dataProps[key]);
      } else {
          props[key] = String(dataProps[key]);
      }
  }

  it('renders correctly with modern tailwind classes', () => {
    const wrapper = shallowMount(TitleBar, { 
        props,
        global: {
            stubs: {
                'left-menu-toggle': true,
                'copy-paste': true
            }
        }
    });

    // Modern uses h4 with specific tailwind classes
    const title = wrapper.find('h4');
    expect(title.text()).toBe('Country'); 
    expect(title.classes()).toContain('font-black');
    expect(title.classes()).toContain('text-2xl');
    
    expect(wrapper.find('button[aria-label="Back"]').exists()).toBe(true);
    expect(wrapper.find('button[aria-label="Back"]').classes()).toContain('bg-gray-900');
  });

  it('handles back button click', async () => {
     const originalLocation = window.location;
     delete window.location;
     window.location = { href: '' };

     const wrapper = shallowMount(TitleBar, { 
        props,
        global: { stubs: { 'left-menu-toggle': true, 'copy-paste': true } }
     });
     
     await wrapper.find('button[aria-label="Back"]').trigger('click');
     expect(window.location.href).toBe('http://localhost:8000/admin/country?id=244');
     
     window.location = originalLocation;
  });
});
