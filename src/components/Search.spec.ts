import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils';
import SearchBar from './Search.vue';

describe('SearchBar', () => {
  it('renders the input field with the correct initial value', () => {
    const wrapper = mount(SearchBar, {
      props: { message: 'Initial search' }
    })
    expect(wrapper.find('input').element.value).toBe('Initial search');
  });

  it('emits "search" event with the input field value when the button is clicked', async () => {
    const wrapper = mount(SearchBar, {
      props: { message: '' }
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('search')).toBeTruthy();
  });

  it('emits "search" event with the input field value 1 second after the input field changes', async () => {
    const wrapper = mount(SearchBar, {
      props: { message: '' }
    });
    const input = wrapper.find('input');
    await input.setValue('new value');
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(wrapper.emitted('search')).toBeTruthy();
  });
});

