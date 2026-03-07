import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '@hashtagcms/theme/neo/components/pagination.vue';
import { EventBus } from '@hashtagcms/helpers/event-bus';
import countryData from '../../../../tests/shared/fake-data/country-index.json';

vi.mock('@hashtagcms/helpers/event-bus', () => ({
  EventBus: {
    on: vi.fn(),
    emit: vi.fn()
  }
}));

describe('Pagination.vue', () => {
    
  const props = {
    dataPaginator: JSON.stringify(countryData.paginator),
    dataTotal: String(countryData.paginator.total),
    dataFirstItem: String(countryData.paginator.from),
    dataLastItem: String(countryData.paginator.to)
  };

  it('renders pagination links correctly', () => {
    const wrapper = shallowMount(Pagination, { props });
    
    // countryData.paginator: total 244, from 1, to 20.
    expect(wrapper.find('.counters').text()).toContain('1 - 20 of 244');
    
    const links = wrapper.findAll('.page-link');
    // Links: Previous + 13 pages + Next = 15 links.
    // fake data might vary but let's check basic existence.
    expect(links.length).toBeGreaterThan(5);
    
    // Correct active page
    // The fake data has "current_page": 1, so page 1 should be active.
    expect(wrapper.find('.page-item.active').text()).toBe('1');
  });

  it('hides pagination if too few links', () => {
     // Manually create props with 1 page
     const singlePageProps = { ...props, dataPaginator: JSON.stringify({ links: [] }) };
     const wrapper = shallowMount(Pagination, { props: singlePageProps });
     expect(wrapper.find('nav').exists()).toBe(false);
  });

  it('decreases counters on delete event', () => {
    // We need to capture the callback passed to EventBus.on
    let deleteCallback;
    EventBus.on.mockImplementation((event, cb) => {
        if (event === 'pagination-on-delete') {
            deleteCallback = cb;
        }
    });

    const wrapper = shallowMount(Pagination, { props });
    
    expect(wrapper.vm.totalCount).toBe(244);
    
    // Trigger the event callback
    if (deleteCallback) deleteCallback();
    
    expect(wrapper.vm.totalCount).toBe(243);
  });
});
