import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import TopNav from '@hashtagcms/theme/neo/components/top-nav.vue';
import siteData from '../../../../tests/shared/fake-data/site-settings-platforms.json';
import AdminConfig from '@hashtagcms/helpers/admin-config';

vi.mock('@hashtagcms/helpers/admin-config', () => ({
  default: {
    admin_asset: vi.fn((path) => `/assets/${path}`)
  }
}));

describe('TopNav.vue', () => {

  const props = {
    dataUsername: "Marghoob Suleman",
    dataSiteName: siteData.siteInfo.name,
    dataCurrentSiteId: String(siteData.siteInfo.id)
  };

  it('renders site name and username', () => {
    const wrapper = shallowMount(TopNav, {
        props,
        global: {
            stubs: {
                'global-site-button': true
            }
        }
    });

    expect(wrapper.text()).toContain('Hashtag CMS'); 
    expect(wrapper.text()).toContain('Marghoob Suleman'); 
    expect(wrapper.find('img.cms-logo').attributes('height')).toBe('50');
  });

  it('handles logout', async () => {
    const wrapper = shallowMount(TopNav, { 
        props,
        global: {
            stubs: { 'global-site-button': true }
        }
    });

    // Logout calls document.getElementById('logout-form').submit()
    // We mock document.getElementById
    const formMock = { submit: vi.fn() };
    vi.spyOn(document, 'getElementById').mockReturnValue(formMock);

    await wrapper.find('a[href="/logout"]').trigger('click');
    expect(formMock.submit).toHaveBeenCalled();
  });
});
