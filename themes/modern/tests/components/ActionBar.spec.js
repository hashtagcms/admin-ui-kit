import { mount, shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ActionBar from '@hashtagcms/theme/modern/components/action-bar.vue';
import AdminConfig from '@hashtagcms/helpers/admin-config';
import { Toast } from '@hashtagcms/helpers/common';
import countryData from '../../../../tests/shared/fake-data/country-index.json';

// Mock dependencies
vi.mock('@hashtagcms/helpers/admin-config', () => ({
  default: {
    admin_path: vi.fn((path) => `/admin/${path}`)
  }
}));

vi.mock('@hashtagcms/helpers/common', () => ({ SafeJsonParse: (d, def) => { try { return JSON.parse(d); } catch { return def; } },
  Toast: {
    show: vi.fn()
  }
}));

vi.mock('@hashtagcms/helpers/humanize', () => ({
  default: vi.fn((str) => str.toUpperCase()) // Simple mock behavior
}));

describe('Modern: ActionBar.vue', () => {
    
  const props = {
    dataControllerTitle: String(countryData.controller),
    dataControllerName: countryData.name, // "Country" as per user requirements
    dataSelectedParams: JSON.stringify([]),
    dataFields: JSON.stringify(countryData.dataFields),
    dataActionFields: JSON.stringify(countryData.actionFields),
    dataLanguages: JSON.stringify(countryData.supportedLangs),
    dataSelectedLanguage: "1",
    dataMoreActions: JSON.stringify([]),
    dataHasLangMethod: "true",
    dataCmsModules: JSON.stringify([]),
    dataLayoutType: "table",
    dataShowSearch: String(countryData.showSearch),
    dataShowAdd: "true",
    dataUserRights: JSON.stringify(countryData.user_rights),
    dataShowBack: undefined
  };

  it('renders correctly with modern tailwind classes', () => {
    const wrapper = mount(ActionBar, { 
        props,
        global: {
            stubs: {
                'language-button': true,
                'cms-module-dropdown': true
            }
        }
    });

    // Modern h4 uses font-black and text-gray-900 instead of .moduleTitle
    const title = wrapper.find('h4');
    expect(title.text()).toBe('COUNTRIES');
    expect(title.classes()).toContain('font-black');
    
    // hasLangMethod is true and languages are provided
    expect(wrapper.find('language-button-stub').exists()).toBe(true);
    
    // Action buttons in modern use bg-blue-600
    // Action buttons in modern use bg-blue-600
    // Try finding button with text "Add New"
    const buttons = wrapper.findAll('button');
    const addBtn = buttons.find(b => b.text().includes('Add New'));
    expect(addBtn.exists()).toBe(true);
    expect(addBtn.classes()).toContain('bg-blue-600');
  });

  it('toggles search panel visibility with modern transitions', async () => {
    const wrapper = mount(ActionBar, { 
        props,
        global: {
            stubs: {
                'language-button': true,
                'cms-module-dropdown': true
            }
        }
    });

    // Find search button by icon class fa-search
    const buttons = wrapper.findAll('button');
    const searchBtn = buttons.find(b => b.find('.fa-search').exists());
    expect(wrapper.vm.showSearchPanel).toBe(false);
    
    await searchBtn.trigger('click');
    expect(wrapper.vm.showSearchPanel).toBe(true);
    
    // Check for modern transition classes
    const searchPanel = wrapper.find('.transform');
    expect(searchPanel.classes()).toContain('scale-100');
  });

  it('navigates to create page on add new click', async () => {
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };

    const wrapper = mount(ActionBar, { props });

    const buttons = wrapper.findAll('button');
    const addBtn = buttons.find(b => b.text().includes('Add New'));
    await addBtn.trigger('click');
    expect(window.location.href).toBe('/admin/Country/create');

    window.location = originalLocation;
  });
});
