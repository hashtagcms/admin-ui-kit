import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SiteCloner from '@hashtagcms/components/site-cloner.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

// Mock dependencies
vi.mock('@hashtagcms/helpers/admin-config', () => ({
  default: {
    admin_path: vi.fn((path) => `/admin/${path}`)
  }
}));

vi.mock('@hashtagcms/helpers/common', () => ({
  Toast: { show: vi.fn() }
}));

const mockAxios = {
    post: vi.fn(() => Promise.resolve({ data: [] }))
};
vi.stubGlobal('axios', mockAxios);

describe('SiteCloner.vue', () => {

  const dataProps = loadFakeData('site-cloner.txt');
  const props = {};
  for (const key in dataProps) {
      if (typeof dataProps[key] === 'object' && dataProps[key] !== null) {
          props[key] = JSON.stringify(dataProps[key]);
      } else {
          props[key] = String(dataProps[key]);
      }
  }

  it('renders correctly', () => {
    const wrapper = shallowMount(SiteCloner, { props });
    
    const selects = wrapper.findAll('select');
    expect(selects.length).toBe(2); // Copy From, Copy To
  });

  it('calls cloneSite on submit', async () => {
    const wrapper = shallowMount(SiteCloner, { props });
    
    // Set values
    const selects = wrapper.findAll('select');
    await selects[0].setValue('1'); // Source
    await selects[1].setValue('1'); // Target (same allowed in UI logic?)
    
    const btn = wrapper.find('input[type="button"]');
    await btn.trigger('click');
    
    expect(mockAxios.post).toHaveBeenCalled();
  });
});
