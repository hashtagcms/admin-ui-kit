import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import TopNav from '@hashtagcms/theme/modern/components/top-nav.vue';
import siteData from '../../../../tests/shared/fake-data/site-settings-platforms.json';

describe('Modern: TopNav.vue', () => {

  const props = {
    dataUsername: "Marghoob Suleman",
    dataSiteName: siteData.siteInfo.name,
    dataCurrentSite: String(siteData.siteInfo.id),
    dataIsAdmin: "true",
    dataSiteCombo: "true",
    dataLogoHeight: "35"
  };

  it('renders correctly with modern backdrop and brand', () => {
    const wrapper = shallowMount(TopNav, { props });

    // Verify site name rendering
    expect(wrapper.find('span.text-lg').text()).toBe('Hashtag CMS');
    
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
