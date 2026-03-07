import { mount, shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ActionBar from '@hashtagcms/theme/neo/components/action-bar.vue';
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

describe('ActionBar.vue', () => {
    
  const props = {
    dataControllerTitle: "Countries",
    dataControllerName: "Country",
    dataSelectedParams: JSON.stringify([]),
    dataFields: JSON.stringify(countryData.dataFields),
    dataActionFields: JSON.stringify(countryData.actionFields),
    dataLanguages: JSON.stringify(countryData.supportedLangs),
    dataSelectedLanguage: "1",
    dataMoreActions: JSON.stringify([]),
    dataHasLangMethod: "true",
    dataCmsModules: JSON.stringify([]),
    dataLayoutType: 'table',
    dataShowSearch: "true",
    dataShowAdd: "true",
    dataUserRights: JSON.stringify(countryData.actionFields)
  };

  it('renders correctly with given props', () => {
    const wrapper = shallowMount(ActionBar, { props });

    // Verify title rendering
    expect(wrapper.find('.moduleTitle').text()).toBe('COUNTRIES'); // Mocked Humanize returns uppercase
    
    // hasLangMethod is true and languages are provided
    expect(wrapper.find('language-button-stub').exists()).toBe(true);
    
    // showAdd is likely true (default/missing prop implies true or explicit true?)
    // Verify add button presence
    // It has action-fields=["edit","delete"]. Edit implies Add button logic if showAdd is true/undefined.
    // Let's check logic: showAdd defaults to true. showAddButtonBasedOnAction checks if 'edit' is in actionFields.
    // Verify edit action
    expect(wrapper.find('button[aria-label="Add New"]').exists()).toBe(true);
  });

  it('toggles search panel visibility', async () => {
    const wrapper = shallowMount(ActionBar, { props });

    // data-show-search="true" in file
    const searchBtn = wrapper.find('button[aria-label="Search"]');
    expect(wrapper.vm.showSearchPanel).toBe(false);
    
    await searchBtn.trigger('click');
    expect(wrapper.vm.showSearchPanel).toBe(true);
  });

  it('navigates to create page on add new click', async () => {
    // Mock window.location
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };

    const wrapper = shallowMount(ActionBar, { props });

    await wrapper.find('button[aria-label="Add New"]').trigger('click');
    // controller name is 'country'
    expect(window.location.href).toBe('/admin/Country/create');

    // Restore
    window.location = originalLocation;
  });
});
