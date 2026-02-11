import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import LeftNav from '@hashtagcms/components/left-nav.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

vi.mock('@hashtagcms/helpers/admin-config', () => ({
  default: {
    admin_path: vi.fn((path) => `/admin/${path}`)
  }
}));

describe('LeftNav.vue', () => {

  const dataProps = loadFakeData('admin-modules.txt');
  const props = {};
  for (const key in dataProps) {
      if (typeof dataProps[key] === 'object' && dataProps[key] !== null) {
          props[key] = JSON.stringify(dataProps[key]);
      } else {
          props[key] = String(dataProps[key]);
      }
  }

  it('renders menu items correctly', () => {
    const wrapper = shallowMount(LeftNav, { props });

    // Based on admin-modules.txt
    // Has "Dashboard", "Localization", "Sites", "Settings" etc.
    expect(wrapper.text()).toContain('Dashboard');
    expect(wrapper.text()).toContain('Settings');
    expect(wrapper.text()).toContain('CMS Modules'); // Child of Settings
  });

  it('highlights active menu', () => {
    // Controller name is "dashboard" in fake data
    const wrapper = shallowMount(LeftNav, { props });
    // Find dashboard link
    // Dashboard controller name is "dashboard"
    // active css logic: if dataControllerName === controller_name
    
    // In admin-modules.txt: data-controller-name="dashboard"
    // And Dashboard item: controller_name="dashboard"
    
    const dashboardLink = wrapper.find('a[href="/admin/dashboard"]');
    expect(dashboardLink.classes()).toContain('active');
  });

  it('renders version', () => {
    const wrapper = shallowMount(LeftNav, { props });
    // data-hashtagcms-version="2.0.5"
    expect(wrapper.text()).toContain('v2.0.5'); // Text inside strong tag
  });
  
  it('toggles child menu visibility', async () => {
     // Settings (id:5) has children. 
     const wrapper = shallowMount(LeftNav, { props });
     
     // Find the toggle icon for Localization (first item with children)
     // Localization has children (Zones etc).
     
     const expandIcons = wrapper.findAll('.js_more');
     expect(expandIcons.length).toBeGreaterThan(0);
     const icon = expandIcons[0];

     // Find the corresponding UL (sibling of parent Link)
     // Since structure is <li> <a>...</a> <ul>...</ul> </li>
     // The ul.js_child is inside the same li, next to the a.
     // We can try to find the ul that is hidden/shown.
     
     // Initially no UL should have 'active' class (or filtered by logic)
     // Actually component does not init with active unless controller matches.
     // Controller in fake data is 'dashboard'. Dashboard is not child of Localization.
     // So Localization menu should be closed.
     
     const childMenus = wrapper.findAll('ul.js_child');
     const targetMenu = childMenus[0]; 
     
     expect(targetMenu.classes()).not.toContain('active');
     
     await icon.trigger('click');
     
     // Re-fetch or check classes on the same wrapper (wrapper classes update reactively in test-utils v2)
     expect(targetMenu.classes()).toContain('active');
  });
});
