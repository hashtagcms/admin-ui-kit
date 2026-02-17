import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from '@hashtagcms/theme/modern/components/search-bar.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

describe('Modern: SearchBar.vue', () => {

  const defaultProps = {
         dataSelectedParams: JSON.stringify({ q: "", f: "id", o: "=" }),
         dataControllerName: 'users',
         dataFields: JSON.stringify([
            { label: 'ID', key: 'id' }, 
            { label: 'Created At', key: 'created_at' }
         ]),
         dataActionFields: JSON.stringify(['edit'])
  };

  it('renders correctly with modern input group styling', () => {
    const wrapper = shallowMount(SearchBar, { props: defaultProps });

    // Modern inputs have rounded-xl and ring classes
    const input = wrapper.find('input');
    expect(input.classes()).toContain('rounded-xl');
    expect(input.classes()).toContain('focus:ring-blue-500/10');
    
    // Search button
    const searchBtn = wrapper.find('button[name="submit"]');
    expect(searchBtn.classes()).toContain('bg-blue-600');
    expect(searchBtn.classes()).toContain('shadow-blue-500/20');
  });

  it('updates input type for date fields', async () => {
    const wrapper = shallowMount(SearchBar, { 
        props: {
            ...defaultProps,
            dataActionFields: '[]' // no pop
        } 
    });
    
    // Set field to something with _date
    await wrapper.setData({ searchParams: { f: 'created_at', q: '', o: '=' } });
    wrapper.vm.changeInputText();
    await wrapper.vm.$nextTick();
    
    expect(wrapper.find('input').attributes('type')).toBe('date');
  });
});
