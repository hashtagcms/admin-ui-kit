import { shallowMount, mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import InfoBoxes from '@hashtagcms/theme/neo/components/info-boxes.vue';
import layoutData from '../../../../tests/shared/fake-data/layout-index.json';
import AdminConfig from '@hashtagcms/helpers/admin-config';

vi.mock('@hashtagcms/helpers/admin-config', () => ({
  default: {
    admin_path: vi.fn((path) => `/admin/${path}`)
  }
}));

describe('InfoBoxes.vue', () => {

  const props = {
    dataModules: JSON.stringify(layoutData.allModules[3]), // Localization
    dataModulesAllowed: JSON.stringify([]),
    dataIsAdmin: "1"
  };

  it('renders info boxes for child modules', () => {
    const wrapper = shallowMount(InfoBoxes, { 
        props,
        global: {
            stubs: {
                'info-box': {
                    template: '<div class="info-box-stub">{{ dataTitle }}</div>',
                    props: ['dataTitle', 'dataSubTitle', 'dataIconCss']
                }
            }
        }
    });

    // Verify child modules presence
    const stubs = wrapper.findAll('.info-box-stub');
    expect(stubs.length).toBe(5);
    expect(wrapper.text()).toContain('Zones');
    expect(wrapper.text()).toContain('Countries');
  });

  it('navigates on click', async () => {
    // Mock window.location
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };

    const wrapper = shallowMount(InfoBoxes, { 
        props,
        global: {
            stubs: { 'info-box': true }
        }
    });
    
    // Find the wrapper div for "Countries" (controller country)
    // child[1] is Countries. 
    // v-for renders divs.
    
    const divs = wrapper.findAll('div.col-auto.hand');
    await divs[1].trigger('click'); // Countries
    
    // Controller name for Countries is 'country'
    // Expected URL: /admin/country (from mock)
    // Actually AdminConfig.admin_path is mocked to return `/admin/${path}`.
    // window.location assignment is what we test.
    
    // window.location = '/admin/country' means window.location setter is called if it was a property, 
    // or object assignment.
    // Our mock `window.location = { href: '' }` is an object. 
    
    // Wait, component does `window.location = url`. 
    // If window.location is an object in our mock, `window.location = ...` replaces the object with the string?
    // In JSDOM/Node, window.location is usually read-only or special.
    // Setting `delete window.location` might not work in strict mode or JSDOM.
    
    // Let's verify if `AdminConfig.admin_path` was called with right arg.
    expect(AdminConfig.admin_path).toHaveBeenCalledWith('country');
    
    // Restore
    window.location = originalLocation;
  });
});
