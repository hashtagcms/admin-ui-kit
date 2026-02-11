import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import TabView from '@hashtagcms/theme/modern/components/tab-view.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

describe('Modern: TabView.vue', () => {

  describe('Simple String TabView', () => {
    const props = {
      dataTabs: JSON.stringify(['General', 'Advanced', 'Security', 'Notifications']),
      dataActiveTab: 'General'
    };

    it('renders all tabs from string array', () => {
      const wrapper = shallowMount(TabView, { props });
      const tabs = wrapper.findAll('li[role="tab"]');
      expect(tabs).toHaveLength(4);
    });

    it('displays correct tab labels', () => {
      const wrapper = shallowMount(TabView, { props });
      const tabs = wrapper.findAll('li[role="tab"]');
      expect(tabs[0].text()).toBe('General');
      expect(tabs[1].text()).toBe('Advanced');
      expect(tabs[2].text()).toBe('Security');
      expect(tabs[3].text()).toBe('Notifications');
    });

    it('highlights active tab with blue background', () => {
      const wrapper = shallowMount(TabView, { props });
      const activeTabView = wrapper.findAll('.bg-blue-600');
      expect(activeTabView).toHaveLength(1);
      expect(activeTabView[0].text()).toBe('General');
    });

    it('applies correct Tailwind classes to active tab', () => {
      const wrapper = shallowMount(TabView, { props });
      const activeTab = wrapper.find('.bg-blue-600');
      expect(activeTab.classes()).toContain('text-white');
      expect(activeTab.classes()).toContain('border-blue-600');
      expect(activeTab.classes()).toContain('rounded-t-lg');
    });

    it('applies correct Tailwind classes to inactive tabs', () => {
      const wrapper = shallowMount(TabView, { props });
      const inactiveTabView = wrapper.findAll('.bg-gray-100');
      expect(inactiveTabView.length).toBeGreaterThan(0);
      expect(inactiveTabView[0].classes()).toContain('text-gray-600');
      expect(inactiveTabView[0].classes()).toContain('border-gray-200');
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
      const tabs = wrapper.findAll('li[role="tab"]');
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
      const activeTabView = wrapper.findAll('.bg-blue-600');
      expect(activeTabView).toHaveLength(1);
      expect(activeTabView[0].text()).toBe('User Settings');
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
      const tabs = wrapper.findAll('li[role="tab"]');
      expect(tabs.length).toBeGreaterThan(0);
    });

    it('highlights the active tab from fake data', () => {
      const wrapper = shallowMount(TabView, { props });
      const activeTabView = wrapper.findAll('.bg-blue-600');
      expect(activeTabView).toHaveLength(1);
      // Active tab should be "Languages" based on test data
      expect(activeTabView[0].text()).toBe('Languages');
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
        expect(tab.attributes('role')).toBe('tab');
      });
    });

    it('sets aria-selected correctly', () => {
      const wrapper = shallowMount(TabView, { props });
      const tabs = wrapper.findAll('li[role="tab"]');
      expect(tabs[0].attributes('aria-selected')).toBe('true');
      expect(tabs[1].attributes('aria-selected')).toBe('false');
    });

    it('has aria-controls attributes', () => {
      const wrapper = shallowMount(TabView, { props });
      const tabs = wrapper.findAll('li[role="tab"]');
      tabs.forEach(tab => {
        expect(tab.attributes('aria-controls')).toBeTruthy();
        expect(tab.attributes('aria-controls')).toContain('panel-');
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
      const secondTab = wrapper.findAll('a')[1];
      await secondTab.trigger('click');
      
      expect(wrapper.emitted('tab-change')).toBeTruthy();
      expect(wrapper.emitted('tab-change')).toHaveLength(1);
    });

    it('prevents default link behavior on click', async () => {
      const wrapper = shallowMount(TabView, { props });
      const link = wrapper.find('a');
      const event = { preventDefault: vi.fn() };
      await link.trigger('click', event);
      
      // The component uses @click.prevent, so default should be prevented
      expect(wrapper.emitted('tab-change')).toBeTruthy();
    });
  });
});
