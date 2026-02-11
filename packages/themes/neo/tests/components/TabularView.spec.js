import { shallowMount, mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import TabularView from '@hashtagcms/theme/neo/components/tabular-view.vue';
import axios from 'axios';
import { EventBus } from '@hashtagcms/helpers/event-bus';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

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

vi.mock('@hashtagcms/helpers/common', () => ({
  Toast: { show: vi.fn() },
  queryBuilder: { get: vi.fn(() => '') }
}));

vi.mock('@hashtagcms/helpers/fx', () => ({
  Fx: { scrollWinTo: vi.fn(), highlight: vi.fn() }
}));

describe('TabularView.vue', () => {

  const dataProps = loadFakeData('table-view.txt');
  // dataProps values are Objects/Arrays if JSON.parse worked, or Strings.
  // TabularView expects Strings for most props and does JSON.parse internally?
  // Let's check TabularView.vue: 
  // props: ["dataHeaders", ...]
  // data() { return { headings: JSON.parse(this.dataHeaders) ... } }
  // So we must pass Strings if the component parses them, OR Objects if vue-test-utils/Vue allows props to be passed as objects even if propType isn't strictly defined but logic parses it?
  // Actually, JSON.parse(object) will throw "[object Object]".
  // So we must stringify them back if test-utils parsed them? 
  // OR we adjust test-utils NOT to parse JSON?
  
  // My test-utils parses JSON. TabularView expects strings.
  // I should re-stringify for the props that adhere to this pattern.
  
  const props = {};
  for (const key in dataProps) {
      if (typeof dataProps[key] === 'object' && dataProps[key] !== null) {
          props[key] = JSON.stringify(dataProps[key]);
      } else {
          props[key] = String(dataProps[key]);
      }
  }

  it('renders table rows from fake data', () => {
    const wrapper = shallowMount(TabularView, { props });
    
    // table-view.txt has 20 items.
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
