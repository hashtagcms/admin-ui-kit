import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import TopNav from '@hashtagcms/components/top-nav.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';
import AdminConfig from '@hashtagcms/helpers/admin-config';

vi.mock('@hashtagcms/helpers/admin-config', () => ({
  default: {
    admin_asset: vi.fn((path) => `/assets/${path}`)
  }
}));

describe('TopNav.vue', () => {

  const dataProps = loadFakeData('top-nav.txt');
  const props = {};
  for (const key in dataProps) {
      // TopNav simple props are strings mostly.
      if (typeof dataProps[key] === 'object' && dataProps[key] !== null) {
          props[key] = JSON.stringify(dataProps[key]);
      } else {
          props[key] = String(dataProps[key]);
      }
  }

  it('renders site name and username', () => {
    const wrapper = shallowMount(TopNav, {
        props,
        global: {
            stubs: {
                'global-site-button': true
            }
        }
    });

    expect(wrapper.text()).toContain('CMS - Admin'); // data-site-name
    expect(wrapper.text()).toContain('Marghoob Suleman'); // data-username
    expect(wrapper.find('img.cms-logo').attributes('height')).toBe('35');
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
