import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Card from './Card.vue'

describe('Card', () => {
  it('renders films overview', () => {
    const wrapper = mount(Card, { props: { result: { 'vote_average': 5, title: 'Dan!', overview: 'Lorem ipsum' } } })
    expect(wrapper.text()).toContain('Lorem ipsum')
  })
})
