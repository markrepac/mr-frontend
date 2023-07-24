import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from './Pagination.vue'
import { nextTick } from 'vue'

it('emits event when next is clicked', async () => {
  const wrapper = mount(Pagination, { props: { currentPage: 1, totalPages: 5 } })
  await wrapper.find('.next-button').trigger('click')
  await wrapper.find('.prev-button').trigger('click')
  await nextTick()
  expect(wrapper.emitted()).toHaveProperty('update:currentPage')
  expect(wrapper.emitted()['update:currentPage'][0]).toEqual([2])
})
