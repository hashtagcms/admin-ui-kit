import { shallowMount, mount } from '@vue/test-utils';
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
    const wrapper = mount(TitleBar, { 
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
    
    expect(title.classes()).toContain('text-2xl');
    
    // Find back button which contains "Back" text
    const buttons = wrapper.findAll('a'); // TitleBar renders Back as anchor styled as button sometimes, or button
    // Let's check TitleBar implementation first to see if it renders button or anchor.
    // Based on test name "handles back button click", it likely has a button/link.
    // The previous test assumed button[aria-label="Back"].
    
    const backBtn = buttons.length > 0 ? buttons.find(b => b.text().includes('Back')) : wrapper.findAll('button').find(b => b.text().includes('Back'));
    expect(backBtn).toBeTruthy();
    expect(backBtn.exists()).toBe(true);
    expect(backBtn.classes()).toContain('bg-gray-900');
  });

  it('handles back button click', async () => {
     const originalLocation = window.location;
     delete window.location;
     window.location = { href: '' };

     const wrapper = mount(TitleBar, { 
        props,
        global: { stubs: { 'left-menu-toggle': true, 'copy-paste': true } }
     });
     
     const buttons = wrapper.findAll('a');
     let backBtn = buttons.find(b => b.text().includes('Back'));
     if (!backBtn) {
         backBtn = wrapper.findAll('button').find(b => b.text().includes('Back'));
     }
     
     await backBtn.trigger('click');
     expect(backBtn.attributes('href')).toBe('http://localhost:8000/admin/country?id=244');
     
     window.location = originalLocation;
  });
});
