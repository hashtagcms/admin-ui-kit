import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SiteWiseCopier from '@hashtagcms/theme/modern/components/sitewise-copier.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

// Mock dependencies
vi.mock('@hashtagcms/helpers/admin-config', () => ({
  default: {
    admin_path: vi.fn((path) => `/admin/${path}`)
  }
}));

vi.mock('@hashtagcms/helpers/common', () => ({ 
  SafeJsonParse: (d, def) => { try { return JSON.parse(d); } catch { return def; } },
  Loader: { show: vi.fn(), hide: vi.fn() },
  Toast: { show: vi.fn() },
  SafeErrorData: vi.fn((error) => error)
}));

describe('Modern: SiteWiseCopier.vue', () => {

  it('renders correctly with modern glassmorphism and icons', () => {
    const dataProps = loadFakeData('site-wise.txt'); // Reusing site-wise data for allData
    const props = {
        dataAllSites: JSON.stringify([{id:1, name: 'Main Site'}, {id:2, name: 'Other Site'}]),
        dataAllData: JSON.stringify(dataProps.dataAllData),
        dataSiteData: JSON.stringify(dataProps.dataSiteData),
        dataCurrentKey: 'city',
        dataSiteId: '1'
    };

    const wrapper = shallowMount(SiteWiseCopier, { 
        props,
        global: { stubs: { 'site-wise': true, 'SiteWiseData': true } }
    });

    // Check for source filter container classes
    const filterBox = wrapper.find('.bg-white.p-6.rounded-lg');
    expect(filterBox.exists()).toBe(true);
    
    // Check for modern icon wrapper
    const iconWrapper = wrapper.find('.bg-blue-50.text-blue-600');
    expect(iconWrapper.exists()).toBe(true);
    expect(iconWrapper.classes()).toContain('rounded-lg');
  });
});
