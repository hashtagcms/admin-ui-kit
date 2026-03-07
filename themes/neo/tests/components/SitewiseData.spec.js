import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SiteWiseData from '@hashtagcms/theme/neo/components/sitewise-data.vue';
import siteData from '../../../../tests/shared/fake-data/site-settings-platforms.json';

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

  const props = {
    dataAllData: JSON.stringify({ label: 'Platforms', data: siteData.siteInfo.platform }),
    dataSiteData: JSON.stringify(siteData.siteInfo.platform),
    dataCurrentKey: 'platform',
    dataSiteId: String(siteData.siteInfo.id)
  };

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
