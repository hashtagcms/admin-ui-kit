import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from '@hashtagcms/theme/neo/components/search-bar.vue';
import countryData from '../../../../tests/shared/fake-data/country-index.json';

vi.mock('@hashtagcms/helpers/admin-config', () => ({
  default: {
    admin_path: vi.fn((path) => `/admin/${path}`)
  }
}));

describe('SearchBar.vue', () => {

  const defaultProps = {
         dataSelectedParams: JSON.stringify({ q: "", f: "id", o: "=" }),
         dataControllerName: 'Country', 
         dataFields: JSON.stringify(countryData.dataFields),
         dataActionFields: JSON.stringify(countryData.actionFields)
  };

  it('initializes with default params', () => {
    const wrapper = shallowMount(SearchBar, { props: defaultProps });
    // countryData.dataFields has 5 items. With 'edit'/'delete' in actionFields, pop() is called once.
    expect(wrapper.vm.searchFields.length).toBe(4); 
    expect(wrapper.vm.searchFields[0]).toBe('id');
  });

  it('updates input type for date fields', async () => {
    const props = {
        ...defaultProps,
        dataActionFields: '[]' 
    };
    const wrapper = shallowMount(SearchBar, { props });
    
    expect(wrapper.vm.searchFields.length).toBe(5);
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);

    // Select 'updated_at'
    const select = wrapper.find('select[name="fields"]');
    await select.setValue('updated_at');
    
    expect(wrapper.vm.inputType).toBe('date');
    expect(wrapper.find('input[type="date"]').exists()).toBe(true);
  });

  it('redirects on search', async () => {
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };

    const wrapper = shallowMount(SearchBar, { props: defaultProps });
    
    await wrapper.find('input[type="text"]').setValue('john');
    await wrapper.find('form').trigger('submit');
    
    const href = window.location.href;
    expect(href).toContain('/admin/Country/search');
    expect(href).toContain('q=');
    expect(href).toContain('john');
    
    window.location = originalLocation;
  });

  it('resets form', async () => {
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };

    const wrapper = shallowMount(SearchBar, { props: defaultProps });
    
    await wrapper.find('input[type="reset"]').trigger('click');
    expect(window.location.href).toBe('/admin/Country');
    
    window.location = originalLocation;
  });
});
