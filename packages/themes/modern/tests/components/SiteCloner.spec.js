import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SiteCloner from '@hashtagcms/components/site-cloner.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

vi.mock('axios');

describe('Modern: SiteCloner.vue', () => {

  const props = {
    dataAllSites: JSON.stringify([
      { id: 1, name: 'Site A' },
      { id: 2, name: 'Site B' }
    ])
  };

  it('renders correctly with modern mirror tool styling', () => {
    const wrapper = shallowMount(SiteCloner, { props });

    // Check for high-contrast header
    const header = wrapper.find('h2');
    expect(header.text()).toBe('Full Site Mirroring Tool');
    expect(header.classes()).toContain('font-black');
    
    // Check for modern select inputs
    const selects = wrapper.findAll('select');
    expect(selects.length).toBe(2);
    expect(selects[0].classes()).toContain('rounded-lg');
    expect(selects[0].classes()).toContain('focus:ring-blue-500/10');
  });

  it('contains primary action button with shadow and scale effect', () => {
    const wrapper = shallowMount(SiteCloner, { props });
    const btn = wrapper.find('button');
    expect(btn.classes()).toContain('bg-blue-600');
    expect(btn.classes()).toContain('shadow-blue-500/30');
    expect(btn.classes()).toContain('active:scale-95');
  });
});
