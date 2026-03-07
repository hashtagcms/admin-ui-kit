import { shallowMount, mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import TabularView from '@hashtagcms/theme/neo/components/tabular-view.vue';
import axios from 'axios';
import { EventBus } from '@hashtagcms/helpers/event-bus';
import countryData from '../../../../tests/shared/fake-data/country-index.json';

// Mock window.Laravel
window.Laravel = {
  htcmsAdminConfig: vi.fn(() => null)
};

// Mocks
vi.mock('@hashtagcms/helpers/admin-config', () => ({
  default: {
    admin_path: vi.fn((path) => `/admin/${path}`),
    get: vi.fn(() => '/media')
  }
}));

vi.mock('axios');
vi.mock('@hashtagcms/helpers/event-bus', () => ({
  EventBus: {
    emit: vi.fn(),
    on: vi.fn()
  }
}));

vi.mock('@hashtagcms/helpers/common', () => ({ SafeJsonParse: (d, def) => { try { return JSON.parse(d); } catch { return def; } },
  Toast: { show: vi.fn() },
  QueryBuilder: { get: vi.fn(() => '') }
}));

vi.mock('@hashtagcms/helpers/fx', () => ({
  Fx: { scrollWinTo: vi.fn(), highlight: vi.fn() }
}));

describe('TabularView.vue', () => {

  const props = {
    dataHeaders: JSON.stringify([...countryData.dataFields, 'action']),
    dataList: JSON.stringify(countryData.paginator.data),
    dataActionFields: JSON.stringify(countryData.actionFields),
    dataUserRights: JSON.stringify(countryData.actionFields),
    dataControllerName: "country"
  };

  it('renders table rows from fake data', () => {
    const wrapper = shallowMount(TabularView, { props });
    
    // Verify row count
    expect(wrapper.findAll('tr.list-table-row').length).toBe(20); 
    // Check for a specific country from the file: Åland Islands
    expect(wrapper.text()).toContain('Åland Islands');
    expect(wrapper.text()).toContain('French Southern Territories');
  });

  it('renders action buttons correctly', () => {
    const wrapper = shallowMount(TabularView, { props });
    // Check first row (Åland Islands id: 244)
    const firstRowActions = wrapper.find('#row_244 .actions');
    expect(firstRowActions.exists()).toBe(true);
    // Actions: edit, delete. controller: country
    expect(firstRowActions.html()).toContain('href="/admin/country/edit/244"');
    expect(firstRowActions.html()).toContain('href="/admin/country/destroy/244"');
  });

  it('handles delete action', async () => {
    const wrapper = mount(TabularView, { 
        props,
        global: {
            stubs: {
                'delete-popup': {
                    template: '<div><slot name="footer"></slot></div>',
                    methods: { open: vi.fn(), close: vi.fn() }
                },
                'info-popup': true
            }
        }
    });

    // Simulate delete on ID 244
    wrapper.vm.currentActionItem = { 
        getAttribute: (attr) => (attr === 'data-rowid' ? '244' : '/admin/country/destroy/244')
    };
    
    // The component calls axios.delete (via doAjax('delete', ...))
    axios.delete = vi.fn().mockResolvedValue({ status: 200, data: { id: 244 } });
    
    await wrapper.vm.deleteNow(1);
    
    expect(axios.delete).toHaveBeenCalledWith('/admin/country/destroy/244');
    expect(wrapper.vm.rows.length).toBe(19); // 20 - 1
  });
});
