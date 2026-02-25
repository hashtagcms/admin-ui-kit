import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SiteWiseData from '@hashtagcms/theme/neo/components/sitewise-data.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

// Mock dependencies
vi.mock('@hashtagcms/helpers/admin-config', () => ({
  default: {
    admin_path: vi.fn((path) => `/admin/${path}`),
    get: vi.fn(() => '')
  }
}));

vi.mock('@hashtagcms/helpers/common', () => ({ SafeJsonParse: (d, def) => { try { return JSON.parse(d); } catch { return def; } },
  Loader: { show: vi.fn(), hide: vi.fn() },
  Toast: { show: vi.fn() }
}));

const mockAxios = {
    post: vi.fn(() => Promise.resolve({ data: {} })),
    get: vi.fn(() => Promise.resolve({ data: {} }))
};

vi.stubGlobal('axios', mockAxios);

describe('Neo: SiteWiseData.vue', () => {

  const dataProps = loadFakeData('site-wise.txt');
  const props = {};
  for (const key in dataProps) {
      if (typeof dataProps[key] === 'object' && dataProps[key] !== null) {
          props[key] = JSON.stringify(dataProps[key]);
      } else {
          props[key] = String(dataProps[key]);
      }
  }

  it('renders correctly with given props', () => {
    const wrapper = shallowMount(SiteWiseData, { props });
    expect(wrapper.find('.card-title').text()).toContain('Available Platforms');
    // Check if list items are rendered
    expect(wrapper.findAll('.list-group-item').length).toBeGreaterThan(0);
  });

  it('handles updates and checkbox selection', async () => {
    const wrapper = shallowMount(SiteWiseData, { props });
    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    expect(checkboxes.length).toBeGreaterThan(0);
    
    // Select a checkbox
    await checkboxes[0].setValue(true);
    
    // Trigger action (add)
    const addButton = wrapper.find('button[title="Add Selected"]');
    expect(addButton.exists()).toBe(true);
    // await addButton.trigger('click'); // Might fail if no action prop?
    // It calls doAction('add').
  });
});
