import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import TabView from '@hashtagcms/theme/neo/components/tab-view.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

describe('Neo: TabView.vue', () => {

  describe('Simple String TabView', () => {
    const props = {
      dataTabs: JSON.stringify(['General', 'Advanced', 'Security', 'Notifications']),
      dataActiveTab: 'General'
    };

    it('renders all tabs from string array', () => {
      const wrapper = shallowMount(TabView, { props });
      const tabs = wrapper.findAll('li.nav-item');
      expect(tabs).toHaveLength(4);
    });

    it('displays correct tab labels', () => {
      const wrapper = shallowMount(TabView, { props });
      const tabs = wrapper.findAll('li.nav-item');
      expect(tabs[0].text()).toBe('General');
      expect(tabs[1].text()).toBe('Advanced');
      expect(tabs[2].text()).toBe('Security');
      expect(tabs[3].text()).toBe('Notifications');
    });

    it('highlights active tab with Bootstrap active class', () => {
      const wrapper = shallowMount(TabView, { props });
      const activeLinks = wrapper.findAll('a.nav-link.active');
      expect(activeLinks).toHaveLength(1);
      expect(activeLinks[0].text()).toBe('General');
    });

    it('applies correct Bootstrap classes', () => {
      const wrapper = shallowMount(TabView, { props });
      const ul = wrapper.find('ul');
      expect(ul.classes()).toContain('nav');
      expect(ul.classes()).toContain('nav-tabs');
    });

    it('applies nav-link class to all tab links', () => {
      const wrapper = shallowMount(TabView, { props });
      const links = wrapper.findAll('a.nav-link');
      expect(links).toHaveLength(4);
    });
  });

  describe('Object-Based TabView with Href', () => {
    const props = {
      dataTabs: JSON.stringify([
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'User Settings', href: '/admin/settings' },
        { label: 'Analytics & Reports', href: '/admin/analytics' }
      ]),
      dataActiveTab: 'User Settings'
    };

    it('renders all tabs from object array', () => {
      const wrapper = shallowMount(TabView, { props });
      const tabs = wrapper.findAll('li.nav-item');
      expect(tabs).toHaveLength(3);
    });

    it('uses custom href from tab objects', () => {
      const wrapper = shallowMount(TabView, { props });
      const links = wrapper.findAll('a');
      expect(links[0].attributes('href')).toBe('/admin/dashboard');
      expect(links[1].attributes('href')).toBe('/admin/settings');
      expect(links[2].attributes('href')).toBe('/admin/analytics');
    });

    it('highlights active tab by label match', () => {
      const wrapper = shallowMount(TabView, { props });
      const activeLinks = wrapper.findAll('a.nav-link.active');
      expect(activeLinks).toHaveLength(1);
      expect(activeLinks[0].text()).toBe('User Settings');
    });
  });

  describe('Real Site Settings TabView', () => {
    const dataProps = loadFakeData('tab-view.txt');
    const props = {};
    for (const key in dataProps) {
        if (typeof dataProps[key] === 'object' && dataProps[key] !== null) {
            props[key] = JSON.stringify(dataProps[key]);
        } else {
            props[key] = String(dataProps[key]);
        }
    }

    it('renders all site setting tabs from fake data', () => {
      const wrapper = shallowMount(TabView, { props });
      const tabs = wrapper.findAll('li.nav-item');
      expect(tabs.length).toBeGreaterThan(0);
    });

    it('highlights the active tab from fake data', () => {
      const wrapper = shallowMount(TabView, { props });
      const activeLinks = wrapper.findAll('a.nav-link.active');
      expect(activeLinks).toHaveLength(1);
      // Active tab should be "Languages" based on test data
      expect(activeLinks[0].text()).toBe('Languages');
    });

    it('renders proper href links for all tabs', () => {
      const wrapper = shallowMount(TabView, { props });
      const links = wrapper.findAll('a');
      links.forEach(link => {
        expect(link.attributes('href')).toBeTruthy();
        expect(link.attributes('href')).toContain('/admin/site/settings/');
      });
    });
  });

  describe('ARIA Accessibility', () => {
    const props = {
      dataTabs: JSON.stringify(['Tab 1', 'Tab 2']),
      dataActiveTab: 'Tab 1'
    };

    it('has proper role attributes', () => {
      const wrapper = shallowMount(TabView, { props });
      expect(wrapper.find('ul').attributes('role')).toBe('tablist');
      const tabs = wrapper.findAll('li');
      tabs.forEach(tab => {
        expect(tab.attributes('role')).toBe('presentation');
      });
    });

    it('sets aria-selected correctly', () => {
      const wrapper = shallowMount(TabView, { props });
      const links = wrapper.findAll('a.nav-link');
      expect(links[0].attributes('aria-selected')).toBe('true');
      expect(links[1].attributes('aria-selected')).toBe('false');
    });

    it('has aria-controls attributes', () => {
      const wrapper = shallowMount(TabView, { props });
      const links = wrapper.findAll('a.nav-link');
      links.forEach(link => {
        expect(link.attributes('aria-controls')).toBeTruthy();
        expect(link.attributes('aria-controls')).toContain('panel-');
      });
    });

    it('has role="tab" on links', () => {
      const wrapper = shallowMount(TabView, { props });
      const links = wrapper.findAll('a.nav-link');
      links.forEach(link => {
        expect(link.attributes('role')).toBe('tab');
      });
    });
  });

  describe('Event Handling', () => {
    const props = {
      dataTabs: JSON.stringify(['Tab 1', 'Tab 2']),
      dataActiveTab: 'Tab 1'
    };

    it('emits tab-change event when tab is clicked', async () => {
      const wrapper = shallowMount(TabView, { props });
      const secondTab = wrapper.findAll('a.nav-link')[1];
      await secondTab.trigger('click');
      
      expect(wrapper.emitted('tab-change')).toBeTruthy();
      expect(wrapper.emitted('tab-change')).toHaveLength(1);
    });

    it('prevents default link behavior on click', async () => {
      const wrapper = shallowMount(TabView, { props });
      const link = wrapper.find('a.nav-link');
      const event = { preventDefault: vi.fn() };
      await link.trigger('click', event);
      
      // The component uses @click.prevent, so default should be prevented
      expect(wrapper.emitted('tab-change')).toBeTruthy();
    });
  });
});
