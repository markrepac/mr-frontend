import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Header from './Header.vue'

describe('Header', () => {
  it('renders title', () => {
    const headerTitle = 'Mark, zelo si priden in super ti gre. Petek je. Privošči si vikend!';
    const wrapper = mount(Header, { props: { title: headerTitle  } })

    expect(wrapper.text()).toContain(headerTitle)
  })
})
