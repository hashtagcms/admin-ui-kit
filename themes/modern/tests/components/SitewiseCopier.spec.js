import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SitewiseCopier from '@hashtagcms/theme/modern/components/sitewise-copier.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

vi.mock('axios');

describe('Modern: SitewiseCopier.vue', () => {

  it('renders correctly with modern glassmorphism and icons', () => {
    const dataProps = loadFakeData('site-wise.txt'); // Reusing site-wise data for allData
    const props = {
        dataAllSites: JSON.stringify([{id:1, name: 'Main Site'}]),
        dataAllData: JSON.stringify(dataProps.dataAllData),
        dataSiteData: JSON.stringify(dataProps.dataSiteData),
        dataCurrentKey: 'city',
        dataSiteId: '1'
    };

    const wrapper = shallowMount(SitewiseCopier, { 
        props,
        global: { stubs: { 'site-wise': true } }
    });

    // Check for source filter container classes
    const filterBox = wrapper.find('.bg-white.p-6.rounded-lg.shadow-sm');
    expect(filterBox.exists()).toBe(true);
    
    // Check for modern icon wrapper
    const iconWrapper = wrapper.find('.bg-blue-50.text-blue-600');
    expect(iconWrapper.exists()).toBe(true);
    expect(iconWrapper.classes()).toContain('rounded-lg');
  });
});
