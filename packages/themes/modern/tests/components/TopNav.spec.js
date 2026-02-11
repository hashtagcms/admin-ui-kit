import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import TopNav from '@hashtagcms/components/top-nav.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

describe('Modern: TopNav.vue', () => {

  const dataProps = loadFakeData('top-nav.txt');
  const props = {};
  for (const key in dataProps) {
      if (typeof dataProps[key] === 'object' && dataProps[key] !== null) {
          props[key] = JSON.stringify(dataProps[key]);
      } else {
          props[key] = String(dataProps[key]);
      }
  }

  it('renders correctly with modern backdrop and brand', () => {
    const wrapper = shallowMount(TopNav, { props });

    // Brand name from top-nav.txt is "CMS - Admin"
    expect(wrapper.find('span.text-lg').text()).toBe('CMS - Admin');
    
    // Modern specific classes
    expect(wrapper.find('nav').classes()).toContain('backdrop-blur-xl');
    expect(wrapper.find('nav').classes()).toContain('sticky');
    
  });

  it('contains mobile toggle and logout', () => {
    const wrapper = shallowMount(TopNav, { props });
    expect(wrapper.find('button.md\\:hidden').exists()).toBe(true);
    expect(wrapper.find('a[href="/logout"]').exists()).toBe(true);
  });
});
