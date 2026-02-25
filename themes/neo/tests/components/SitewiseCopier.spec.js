import { shallowMount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SiteWiseCopier from '@hashtagcms/theme/neo/components/sitewise-copier.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

// Mock dependencies
vi.mock('@hashtagcms/helpers/admin-config', () => ({
  default: {
    admin_path: vi.fn((path) => `/admin/${path}`)
  }
}));

vi.mock('@hashtagcms/helpers/common', () => ({ 
  SafeJsonParse: (d, def) => { try { return JSON.parse(d); } catch { return def; } },
  Loader: { show: vi.fn(), hide: vi.fn() },
  Toast: { show: vi.fn() },
  SafeErrorData: vi.fn((error) => error)
}));

const mockAxios = {
    post: vi.fn(() => Promise.resolve({ data: { inserted: true, copied: [], ignored: [], siteData: [] } })),
    get: vi.fn(() => Promise.resolve({ data: [] }))
};
vi.stubGlobal('axios', mockAxios);

describe('Neo: SiteWiseCopier.vue', () => {

  const dataProps = loadFakeData('site-wise-copier.txt');
  const props = {};
  for (const key in dataProps) {
      if (key === 'dataAllSites') {
          const sites = dataProps[key];
          sites.push({id: 2, name: 'Secondary Site'}); // Add another site to avoid filtering out everything
          props[key] = JSON.stringify(sites);
      } else if (typeof dataProps[key] === 'object' && dataProps[key] !== null) {
          props[key] = JSON.stringify(dataProps[key]);
      } else {
          props[key] = String(dataProps[key]);
      }
  }

  it('renders correctly', () => {
    const wrapper = shallowMount(SiteWiseCopier, { props });
    
    // Check if site select is rendered
    const select = wrapper.find('select');
    expect(select.exists()).toBe(true);
    expect(select.findAll('option').length).toBeGreaterThan(1); // Default + sites
    
    // Check if child component is rendered (stub)
    expect(wrapper.findComponent({ name: 'SiteWiseData' }).exists()).toBe(true);
  });

  it('fetches data when site selected', async () => {
    const wrapper = shallowMount(SiteWiseCopier, { 
        props,
        global: {
            stubs: {
                'SiteWiseData': {
                    template: '<div />',
                    methods: {
                        setData: vi.fn(),
                        setSiteData: vi.fn()
                    }
                }
            }
        }
    });
    const select = wrapper.find('select');
    
    // Select a site (id: 1)
    await select.setValue('1');
    
    // Should call axios.get
    expect(mockAxios.get).toHaveBeenCalled();
  });
  
  it('handles copy action', async () => {
      const mockSetSiteData = vi.fn();
      const wrapper = shallowMount(SiteWiseCopier, { 
          props,
          global: {
              stubs: {
                  'SiteWiseData': {
                      template: '<div />',
                      methods: {
                          setData: vi.fn(),
                          setSiteData: mockSetSiteData
                      }
                  }
              }
          }
      });
      
      // Trigger actionAdd
      await wrapper.vm.doAction('add', [], [{id:1, selected:true}], [1]);
      await flushPromises();
      
      expect(mockAxios.post).toHaveBeenCalled();
      expect(mockSetSiteData).toHaveBeenCalled();
  });
});
