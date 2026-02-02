import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from '@hashtagcms/components/search-bar.vue';
import AdminConfig from '@hashtagcms/helpers/admin-config';

vi.mock('@hashtagcms/helpers/admin-config', () => ({
  default: {
    admin_path: vi.fn((path) => `/admin/${path}`)
  }
}));

describe('SearchBar.vue', () => {

  const defaultProps = {
         dataSelectedParams: JSON.stringify({ q: "", f: "id", o: "=" }),
         dataControllerName: 'users',
         dataFields: JSON.stringify([
            { label: 'ID', key: 'id' }, 
            { label: 'Created At', key: 'created_at' }
         ]),
         dataActionFields: JSON.stringify(['edit'])
  };

  it('initializes with default params', () => {
    const wrapper = shallowMount(SearchBar, { props: defaultProps });
    // Check if dropdown contains ID and Created At
    const options = wrapper.findAll('option');
    // We expect 3 fields from props?? No 2.
    // Wait, init() pops one if hasAction is true.
    // dataActionFields is "edit", so hasAction is true.
    // searchFields is [ID, Created At]
    // searchFields.pop() -> removes 'Created At' ?
    // Let's check logic: this.searchFields.pop() removes last element. 
    // Usually Action column is last. So reasonable.
    expect(wrapper.vm.searchFields.length).toBe(1); 
    expect(wrapper.vm.searchFields[0].key).toBe('id');
  });

  it('updates input type for date fields', async () => {
    // We need 2 fields to test change
    const props = {
        ...defaultProps,
        dataActionFields: '[]' // No action, so no pop
    };
    const wrapper = shallowMount(SearchBar, { props });
    
    expect(wrapper.vm.searchFields.length).toBe(2);
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);

    // Select 'created_at'
    const select = wrapper.find('select[name="fields"]');
    await select.setValue('created_at');
    
    expect(wrapper.vm.inputType).toBe('date');
    expect(wrapper.find('input[type="date"]').exists()).toBe(true);
  });

  it('redirects on search', async () => {
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };

    const wrapper = shallowMount(SearchBar, { props: defaultProps });
    
    // Set search query
    await wrapper.find('input[type="text"]').setValue('john');
    
    // Trigger submit
    await wrapper.find('form').trigger('submit');
    
    // Check URL
    // Expected: /admin/users/search?q={"q":"john","f":"id","o":"="}
    const href = window.location.href;
    expect(href).toContain('/admin/users/search');
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
    expect(window.location.href).toBe('/admin/users');
    
    window.location = originalLocation;
  });
});
