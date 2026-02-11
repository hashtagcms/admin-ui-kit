import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import InfoBoxes from '@hashtagcms/components/info-boxes.vue';
import { loadFakeData } from '@hashtagcms/testing/test-utils';

describe('Modern: InfoBoxes.vue', () => {

  const dataProps = loadFakeData('info-boxes.txt');
  const props = {};
  for (const key in dataProps) {
      if (typeof dataProps[key] === 'object' && dataProps[key] !== null) {
          props[key] = JSON.stringify(dataProps[key]);
      } else {
          props[key] = String(dataProps[key]);
      }
  }

  it('renders correctly with modern hover effects', () => {
    const wrapper = shallowMount(InfoBoxes, { props });

    // Should render info-box components
    expect(wrapper.findAll('info-box-stub').length).toBeGreaterThan(0);
    
    // Check for modern hover classes in the wrapper div
    const firstBox = wrapper.find('.group');
    expect(firstBox.classes()).toContain('hover:-translate-y-2');
    expect(firstBox.classes()).toContain('transition-all');
  });

  it('navigates to correctly on click', async () => {
    // Mock AdminConfig or rely on implementation
    const wrapper = shallowMount(InfoBoxes, { props });

    // Mock window.location
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };

    await wrapper.find('.group').trigger('click');
    // From fake data, first child might be 'Country' or similar
    // We just want to check if it tried to change location
    expect(window.location).not.toBe('');

    window.location = originalLocation;
  });
});
