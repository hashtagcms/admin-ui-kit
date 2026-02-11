import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SitewiseCopier from '@hashtagcms/components/sitewise-copier.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

// Mock dependencies
vi.mock('@hashtagcms/helpers/admin-config', () => ({
  default: {
    admin_path: vi.fn((path) => `/admin/${path}`)
  }
}));

vi.mock('@hashtagcms/helpers/common', () => ({
  Loader: { show: vi.fn(), hide: vi.fn() },
  Toast: { show: vi.fn() },
  safeErrorData: vi.fn((error) => error)
}));

const mockAxios = {
    post: vi.fn(() => Promise.resolve({ data: { inserted: true, copied: [], ignored: [], siteData: [] } })),
    get: vi.fn(() => Promise.resolve({ data: [] }))
};
vi.stubGlobal('axios', mockAxios);

describe('SitewiseCopier.vue', () => {

  const dataProps = loadFakeData('site-wise-copier.txt');
  const props = {};
  for (const key in dataProps) {
      if (typeof dataProps[key] === 'object' && dataProps[key] !== null) {
          props[key] = JSON.stringify(dataProps[key]);
      } else {
          props[key] = String(dataProps[key]);
      }
  }

  it('renders correctly', () => {
    const wrapper = shallowMount(SitewiseCopier, { props });
    
    // Check if site select is rendered
    const select = wrapper.find('select');
    expect(select.exists()).toBe(true);
    expect(select.findAll('option').length).toBeGreaterThan(1); // Default + sites
    
    // Check if child component is rendered (stub)
    expect(wrapper.findComponent({ name: 'site-wise' }).exists()).toBe(true);
  });

  it('fetches data when site selected', async () => {
    const wrapper = shallowMount(SitewiseCopier, { 
        props,
        global: {
            stubs: {
                'site-wise': {
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
      const wrapper = shallowMount(SitewiseCopier, { 
          props,
          global: {
              stubs: {
                  'site-wise': {
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
      
      expect(mockAxios.post).toHaveBeenCalled();
      expect(mockSetSiteData).toHaveBeenCalled();
  });
});
