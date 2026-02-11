import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SitewiseData from '@hashtagcms/theme/modern/components/sitewise-data.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

describe('Modern: SitewiseData.vue', () => {

  const dataProps = loadFakeData('site-wise.txt');

  it('renders correctly with modern dual-column shadow layout', () => {
    // Correct prop mapping for this specific test
    const finalProps = {
        dataAllData: JSON.stringify(dataProps.dataAllData),
        dataSiteData: JSON.stringify(dataProps.dataSiteData),
        dataCurrentKey: 'city',
        dataSiteId: '1'
    };

    const wrapper = shallowMount(SitewiseData, { props: finalProps });

    // Header styling
    const headers = wrapper.findAll('h3');
    expect(headers[0].classes()).toContain('text-xs');
    expect(headers[0].classes()).toContain('font-black');
    expect(headers[0].classes()).toContain('tracking-widest');
    
    // Check for column shadows and rounding
    const columns = wrapper.findAll('.bg-white.rounded-lg.shadow-lg');
    expect(columns.length).toBe(2);
    
    // Action buttons in modern
    const addBtn = wrapper.find('button.bg-blue-600');
    expect(addBtn.exists()).toBe(true);
    expect(addBtn.classes()).toContain('rounded-xl');
  });

  it('filters data using high-contrast search field', async () => {
     // Mock more data to force search visibility (>10 items)
     const bigData = [];
     for(let i=1; i<=15; i++) bigData.push({id: i, name: 'Item '+i});

     const finalProps = {
        dataAllData: JSON.stringify({ label: 'Test', data: bigData }),
        dataSiteData: JSON.stringify([]),
        dataCurrentKey: 'test',
        dataSiteId: '1'
    };
    const wrapper = shallowMount(SitewiseData, { props: finalProps });
    
    // Search input should now be visible
    const searchInput = wrapper.find('input[placeholder="Filter available..."]');
    expect(searchInput.exists()).toBe(true);
    expect(searchInput.classes()).toContain('bg-gray-50');
    expect(searchInput.classes()).toContain('focus:ring-blue-500/5');
  });
});
