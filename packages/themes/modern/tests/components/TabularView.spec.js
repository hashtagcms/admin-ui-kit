import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import TabularView from '@hashtagcms/theme/modern/components/tabular-view.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

vi.mock('axios');

// Mock window.Laravel
global.window.Laravel = {
    htcmsAdminConfig: vi.fn().mockReturnValue({})
};

describe('Modern: TabularView.vue', () => {

  const dataProps = loadFakeData('table-view.txt');
  const props = {};
  for (const key in dataProps) {
      if (typeof dataProps[key] === 'object' && dataProps[key] !== null) {
          props[key] = JSON.stringify(dataProps[key]);
      } else {
          props[key] = String(dataProps[key]);
      }
  }

  it('renders correctly as a modern dashboard table', () => {
    const wrapper = shallowMount(TabularView, { 
        props,
        global: {
            stubs: {
                'delete-popup': true,
                'info-popup': true
            }
        }
    });

    // Check for modern table shadows and borders
    const tableContainer = wrapper.find('.bg-white.rounded-lg.shadow-lg');
    expect(tableContainer.exists()).toBe(true);
    
    // Check for high-contrast headers
    const th = wrapper.find('th');
    expect(th.classes()).toContain('text-[10px]');
    expect(th.classes()).toContain('tracking-[0.2em]');
    
    // Check for list rows
    expect(wrapper.findAll('.list-table-row').length).toBeGreaterThan(0);
  });

  it('contains actions with modern gap styling', () => {
     const wrapper = shallowMount(TabularView, { 
        props,
        global: { stubs: { 'delete-popup': true, 'info-popup': true } }
    });
    
    const actions = wrapper.find('.actions');
    expect(actions.exists()).toBe(true);
    expect(actions.classes()).toContain('gap-2');
  });
});
